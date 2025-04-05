const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { eq } = require("drizzle-orm");

const { db } = require("../db/index");
const { users } = require("../db/schema");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post(
  "/api/auth/signup",
  upload.single("profile_image"),
  async (req, res) => {
    try {
      const { username, email, password } = req.body;
      let profile_image = null;

      console.log(req.file);
      if (req.file) {
        profile_image = `data:${
          req.file.mimetype
        };base64,${req.file.buffer.toString("base64")}`;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await db
        .insert(users)
        .values({ username, email, password: hashedPassword, profile_image });
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ error: "Username already exists" });
    }
  }
);

router.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .execute();
    if (!user[0] || !(await bcrypt.compare(password, user[0].password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Error logging in" });
  }
});

module.exports = router;

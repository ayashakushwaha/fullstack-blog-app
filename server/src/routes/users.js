const express = require("express");
const { db } = require("../db/index");
const { users } = require("../db/schema");
const { eq } = require("drizzle-orm");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.get("/api/users/me", authenticate, async (req, res) => {
  try {
    const user = await db.select().from(users).where(eq(users.id, req.user.id));

    if (!user.length) {
      return res.status(404).json({ error: "User not found" });
    }
    delete user[0].password;
    res.json(user[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to get user" });
  }
});

router.get("/api/users/:id", authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, Number(id)));

    if (!user.length) {
      return res.status(404).json({ error: "User not found" });
    }

    delete user[0].password;
    res.json(user[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to get user" });
  }
});

module.exports = router;

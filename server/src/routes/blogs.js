const express = require("express");
const { and, eq } = require("drizzle-orm");

const { db } = require("../db/index");
const { blogs } = require("../db/schema");
const upload = require("../middlewares/upload");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post(
  "/api/blogs/",
  authenticate,
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, content } = req.body;
      const user_id = req.user.id;
      const image = req.file
        ? `data:${req.file.mimetype};base64,${req.file.buffer.toString(
            "base64"
          )}`
        : null;
      const blog = await db
        .insert(blogs)
        .values({ title, content, image, user_id })
        .returning();
      res.status(201).json(blog[0]);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Failed to create blog" });
    }
  }
);

router.get("/api/blogs/", authenticate, async (req, res) => {
  try {
    const allBlogs = await db.select().from(blogs).orderBy(blogs.created_at);
    res.json(allBlogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

router.get("/api/blogs/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await db
      .select()
      .from(blogs)
      .where(eq(blogs.id, Number(id)));
    if (!blog.length) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json(blog[0]);
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ error: "Failed to fetch blog" });
  }
});

router.patch(
  "/api/blogs/:id",
  authenticate,
  upload.single("image"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      const user_id = req.user.id;
      const image = req.file.buffer
        ? `data:${req.file.mimetype};base64,${req.file.buffer.toString(
            "base64"
          )}`
        : null;

      let updatedBlog;

      if (!image) {
        updatedBlog = await db
          .update(blogs)
          .set({ title, content })
          .where(and(eq(blogs.id, Number(id)), eq(blogs.user_id, user_id)))
          .returning();
      } else {
        updatedBlog = await db
          .update(blogs)
          .set({ title, content, image })
          .where(and(eq(blogs.id, Number(id)), eq(blogs.user_id, user_id)))
          .returning();
      }

      if (!updatedBlog.length) {
        return res.status(404).json({ error: "Blog not found" });
      }
      console.log(updatedBlog[0], "updatedd");
      res.json(updatedBlog[0]);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "failed to update blog" });
    }
  }
);

router.delete("/api/blogs/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
    const deletedBlog = await db
      .delete(blogs)
      .where(and(eq(blogs.id, Number(id)), eq(blogs.user_id, user_id)))
      .returning();

    if (!deletedBlog.length) {
      return res.status(404).json({ error: "blog not found" });
    }
    console.log("deleted.");
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete blog" });
  }
});

module.exports = router;

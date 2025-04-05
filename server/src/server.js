require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blogs");
const userRoutes = require("./routes/users");

const app = express();
app.use(express.json());

app.use(authRoutes);
app.use(blogRoutes);
app.use(userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

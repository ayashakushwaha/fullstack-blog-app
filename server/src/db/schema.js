const {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  timestamp,
} = require("drizzle-orm/pg-core");

const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  profile_image: text("profile_image"),
  created_at: timestamp("created_at").defaultNow(),
});

const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  image: text("image"), // Store image as Base64 string
  user_id: integer("user_id")
    .references(() => users.id)
    .notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

module.exports = { users, blogs };

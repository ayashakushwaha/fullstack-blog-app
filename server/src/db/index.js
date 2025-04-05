require("dotenv").config();
globalThis.crypto = require("crypto");

const { drizzle } = require("drizzle-orm/vercel-postgres");
const { createPool } = require("@vercel/postgres");

const pool = createPool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

module.exports = { db };

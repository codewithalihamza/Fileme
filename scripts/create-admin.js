const { drizzle } = require("drizzle-orm/node-postgres");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
require("dotenv").config({ path: ".env.local" });

async function createAdminUser() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    console.log("Connecting to database...");
    const db = drizzle(pool);

    // Check if admin already exists
    const existingAdmin = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      ["admin@fileme.com"]
    );

    if (existingAdmin.rows.length > 0) {
      console.log("Admin user already exists");
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("admin123", 12);

    // Create admin user
    const result = await pool.query(
      `INSERT INTO users (id, name, email, phone, password, role, created_at, updated_at) 
       VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())`,
      [
        "admin_" + Date.now(),
        "Admin User",
        "admin@fileme.com",
        "+1234567890",
        hashedPassword,
        "admin",
      ]
    );

    console.log("Admin user created successfully");
    console.log("Email: admin@fileme.com");
    console.log("Password: admin123");
  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    await pool.end();
  }
}

createAdminUser();

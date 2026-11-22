// Creates the table and inserts the starting records (only if the table is empty).
// Run with: npm run init-db
const fs = require("fs");
const path = require("path");
const pool = require("../db");

async function main() {
  const schema = fs.readFileSync(path.join(__dirname, "..", "schema.sql"), "utf8");
  const seed = fs.readFileSync(path.join(__dirname, "..", "seed.sql"), "utf8");
  await pool.query(schema);
  await pool.query(seed);
  const result = await pool.query("SELECT COUNT(*) FROM records");
  console.log(`Database ready. Records in table: ${result.rows[0].count}`);
}

main()
  .catch(error => {
    console.error("Database setup failed:", error.message);
    process.exitCode = 1;
  })
  .finally(() => pool.end());

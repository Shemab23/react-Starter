import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { env } from "../config/env.js";
import * as schema from "./schema.js";

export const pool = new Pool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
});

pool.on("error", (err) => {
  // A background error on an idle client — log it, don't crash the process.
  console.error("Unexpected PostgreSQL pool error:", err);
});

export const client = drizzle(pool, { schema });

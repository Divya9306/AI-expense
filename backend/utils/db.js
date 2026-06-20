import dotenv from 'dotenv';
import path from 'path';
import pkg from 'pg';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const { Pool, types } = pkg;

//Return DATE colums (OID 1082) as plain "YYYY-MM-DD" strings instead of JS dates
// so JSON serialization doesn't UTC-shift the date for clients in non UTC timezones.

types.setTypeParser(1082, (val) => val);

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {rejectUnauthorized: false},
});

pool.on("connect", () =>{
    console.log("Connected to Neon Postgres");
});

pool.on("error", (err) => {
    console.log("Unexpected Postgres error:", err);
});

export default pool;
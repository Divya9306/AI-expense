import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from '../utils/db.js';

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const DROP_ALL= `
    DROP TABLE IF EXISTS ai_insights CASCADE;
    DROP TABLE IF EXISTS BUDGETS CASCADE;
    DROP TABLE IF EXISTS TRANSACTIONS CASCADE;
    DROP TABLE IF EXISTS CATEGORIES CASCADE;
    DROP TABLE IF EXISTS USERS CASCADE;
`;

const runMigration =async() =>{
    const shouldReset = process.argv.includes("--reste");
    const schemaPath = path.join(_dirname, "..", "sql", "schema.sql");

try {
    if (shouldReset) {
        console.log("Dropping existing tables...");
        await pool.query(DROP_ALL);
    }
}
}

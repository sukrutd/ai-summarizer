import { neon } from '@neondatabase/serverless';

export async function getDatabaseConnection() {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
        throw new Error('Database URL is not defined.');
    }
    const sql = neon(databaseUrl);
    return sql;
}

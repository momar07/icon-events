import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

const pool = mysql.createPool({
  uri: process.env.DATABASE_URL!,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

export const db = drizzle({ client: pool, schema, mode: 'default' });

export type Database = typeof db;

// Helper: get a single connection for transactions
export async function getConnection() {
  return pool.getConnection();
}

// Helper: health check
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    const conn = await pool.getConnection();
    await conn.ping();
    conn.release();
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

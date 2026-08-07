import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

// --- FALLBACK PERSISTENCE LOGIC ---
const fallbackFilePath = path.join(process.cwd(), 'fallback-db.json');

function getFallbackOrders() {
  try {
    if (fs.existsSync(fallbackFilePath)) {
      const data = fs.readFileSync(fallbackFilePath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Failed to read fallback DB', err);
  }
  return [];
}

function saveFallbackOrders(orders: any[]) {
  try {
    fs.writeFileSync(fallbackFilePath, JSON.stringify(orders, null, 2));
  } catch (err) {
    console.error('Failed to write fallback DB', err);
  }
}

export let memoryOrders: any[] = getFallbackOrders();
export let memoryOrderCounter = memoryOrders.length > 0 ? Math.max(...memoryOrders.map(o => o.id)) : 0;

// Update the push logic to save to file whenever modified
export function addMemoryOrder(order: any) {
  memoryOrders.unshift(order);
  saveFallbackOrders(memoryOrders);
}

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'pureplush',
  port: parseInt(process.env.DB_PORT || '3306'),
};

let pool: mysql.Pool | null = null;

export function getPool() {
  if (!pool) {
    try {
      pool = mysql.createPool({
        ...dbConfig,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });
    } catch (error) {
      console.error('Failed to create MySQL connection pool:', error);
      pool = null;
    }
  }
  return pool;
}

export async function query<T>(sql: string, params: any[] = []): Promise<T | null> {
  const activePool = getPool();
  if (!activePool) {
    console.warn('MySQL pool is not available.');
    return null;
  }

  try {
    const [results] = await activePool.execute(sql, params);
    return results as T;
  } catch (error) {
    console.error(`Database query failed [SQL: ${sql}]:`, error);
    return null;
  }
}

// Check database connection helper
export async function testConnection(): Promise<boolean> {
  try {
    const activePool = getPool();
    if (!activePool) {
      console.warn('Database connection test failed: MySQL pool is null');
      return false;
    }
    const connection = await activePool.getConnection();
    connection.release();
    return true;
  } catch (error: any) {
    if (error?.code === 'ECONNREFUSED') {
      console.log(`[DB] MySQL offline (${dbConfig.host}:${dbConfig.port}) — fallback mode active.`);
    } else {
      console.warn('Database connection test failed:', error?.message || error);
    }
    return false;
  }
}

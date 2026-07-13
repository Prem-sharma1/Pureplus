import { NextResponse } from 'next/server';
import { query, testConnection } from '@/lib/db';

export async function GET() {
  const result: any = {
    isDbConnected: false,
    error: null,
    tables: [],
    addProductSchema: []
  };

  try {
    result.isDbConnected = await testConnection();
    if (!result.isDbConnected) {
      result.error = 'testConnection returned false';
      return NextResponse.json(result);
    }

    // List all tables
    const tables: any = await query('SHOW TABLES');
    result.tables = tables;

    // Describe add_product table
    try {
      const schema: any = await query('DESCRIBE add_product');
      result.addProductSchema = schema;
    } catch (err: any) {
      result.addProductError = err.message;
    }

    // Try SELECT count
    try {
      const count: any = await query('SELECT COUNT(*) as count FROM add_product');
      result.count = count;
    } catch (err: any) {
      result.countError = err.message;
    }

  } catch (err: any) {
    result.error = err.message || err;
  }

  return NextResponse.json(result);
}

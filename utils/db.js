// utils/db.js
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
export const db = drizzle(sql, { schema });


if (process.env.NODE_ENV === 'development') {
  db.execute('SELECT 1')
    .then(() => console.log('✅ Connected to Neon DB!'))
    .catch((err) => console.error('❌ DB Connection Failed:', err));
}

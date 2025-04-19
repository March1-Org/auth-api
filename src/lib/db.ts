import { config } from 'config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';

export async function getDb() {
  const client = new Client({
    host: config.POSTGRES_HOST,
    port: config.POSTGRES_PORT,
    database: config.POSTGRES_DB,
    user: config.POSTGRES_USER,
    password: config.POSTGRES_PASSWORD,
  });

  await client.connect();

  return drizzle(client);
}

export type DbType = Awaited<ReturnType<typeof getDb>>;

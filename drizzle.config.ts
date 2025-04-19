import { config } from 'config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: ['./node_modules/@march1-org/auth-db/dist/index.js'],
  dialect: 'postgresql',
  dbCredentials: {
    database: config.POSTGRES_DB,
    host: config.POSTGRES_HOST,
    port: config.POSTGRES_PORT,
    user: config.POSTGRES_USER,
    password: config.POSTGRES_PASSWORD,
    ssl: false,
  },
});

import { createApp } from 'createApp';
import { getDb } from 'db';
import { getCache } from 'db/cache';
import { schema, schemaBodies } from 'db/schema';

const db = await getDb();
const cache = getCache();

const authApp = createApp({ cache, db, schema, schemaBodies }).listen(3000);

console.log(
  `🦊 Elysia is running at ${authApp.server?.hostname}:${authApp.server?.port}`
);
type AuthApp = typeof authApp;

export { authApp };
export type { AuthApp };

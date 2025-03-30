import { Auth, authInstance } from 'auth';
import { createApp } from 'createApp';
import { getDb } from 'db';
import { getCache } from 'db/cache';
import { schema, schemaBodies } from 'db/schema';
import { validatePhoneNumber } from 'utils/auth/validate';

const db = await getDb();
const cache = getCache();
const auth = new Auth(authInstance.api, validatePhoneNumber);

const authApp = createApp({ cache, db, schema, schemaBodies, auth }).listen(
  3000
);

console.log(
  `🦊 Elysia is running at ${authApp.server?.hostname}:${authApp.server?.port}`
);
type AuthApp = typeof authApp;

export { authApp };
export type { AuthApp };

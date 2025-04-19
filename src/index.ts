import { authSchema, authSchemaBodies } from '@march1-org/auth-db';
import { getAuth } from 'auth';
import { createApp } from 'createApp';
import { getCache } from 'lib/cache';
import { getDb } from 'lib/db';
import { twilioSendOTP } from 'utils/auth/twilio';
import { validatePhoneNumber } from 'utils/auth/validate';
import { Auth } from 'utils/types/auth';

const db = await getDb();
const cache = getCache();
const authInstance = getAuth({ sendOTP: twilioSendOTP, db });
const auth = new Auth(authInstance.api, validatePhoneNumber);

const authApp = createApp({
  cache,
  db,
  authSchema,
  authSchemaBodies,
  auth,
}).listen(3000);

console.log(
  `🦊 Elysia is running at ${authApp.server?.hostname}:${authApp.server?.port}`
);
type AuthApp = typeof authApp;

export { authApp };
export type { AuthApp };

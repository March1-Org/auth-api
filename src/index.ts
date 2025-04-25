import { getAuth } from 'auth';
import { config } from 'config';
import { createAuthApp } from 'createApp';
import { getDb } from 'lib/db';
import { createTwilioClient, createTwilioSendOTP } from 'utils/auth/twilio';
import { validatePhoneNumber } from 'utils/auth/validate';
import { Auth } from 'utils/types/auth';

const db = await getDb(config);
const authInstance = getAuth({
  sendOTP: await createTwilioSendOTP({
    client: createTwilioClient(config),
    config,
  }),
  db,
});

const auth = new Auth(authInstance.api, validatePhoneNumber);

createAuthApp({
  auth,
  config,
}).listen(3000);

type AuthApp = ReturnType<typeof createAuthApp>;

export type { AuthApp };
export { createAuthApp };

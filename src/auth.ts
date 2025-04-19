import { authSchema } from '@march1-org/auth-db';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { phoneNumber } from 'better-auth/plugins';
import type { getDb } from 'lib/db';
import { getTempEmail, getTempName } from 'utils/auth/temp';
import { validatePhoneNumber } from 'utils/auth/validate';

type Options = {
  sendOTP: (
    data: {
      phoneNumber: string;
      code: string;
    },
    request?: Request
  ) => Promise<void> | void;
  db: Awaited<ReturnType<typeof getDb>>;
};

export function getAuth({ sendOTP, db }: Options) {
  return betterAuth({
    database: drizzleAdapter(db, {
      provider: 'pg',
      schema: authSchema,
      usePlural: true,
    }),
    plugins: [
      phoneNumber({
        sendOTP,
        signUpOnVerification: {
          getTempEmail,
          getTempName,
        },
        phoneNumberValidator: (phoneNumber) => validatePhoneNumber(phoneNumber),
      }),
    ],
  });
}

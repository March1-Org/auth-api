import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { phoneNumber } from 'better-auth/plugins';
import { getDb } from 'db';
import { schema } from 'db/schema';
import { getTempEmail, getTempName } from 'utils/auth/temp';
import { twilioSendOTP } from 'utils/auth/twilio';
import { validatePhoneNumber } from 'utils/auth/validate';

export const auth = betterAuth({
  database: drizzleAdapter(await getDb(), {
    provider: 'pg',
    schema,
  }),
  plugins: [
    phoneNumber({
      sendOTP: twilioSendOTP,
      signUpOnVerification: {
        getTempEmail,
        getTempName,
      },
      phoneNumberValidator: (phoneNumber) => validatePhoneNumber(phoneNumber),
    }),
  ],
});

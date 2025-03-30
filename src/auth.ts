import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { phoneNumber } from 'better-auth/plugins';
import { getDb } from 'db';
import { schema } from 'db/schema';
import { getTempEmail, getTempName } from 'utils/auth/temp';
import { twilioSendOTP } from 'utils/auth/twilio';
import { validatePhoneNumber } from 'utils/auth/validate';

export const authInstance = betterAuth({
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

export class Auth {
  constructor(
    private authApi: typeof authInstance.api,
    private phoneValidator = validatePhoneNumber
  ) {}

  public sendPhoneNumberOTP(
    ...args: Parameters<typeof authInstance.api.sendPhoneNumberOTP>
  ) {
    return this.authApi.sendPhoneNumberOTP(...args);
  }

  public verifyPhoneNumber(
    ...args: Parameters<typeof authInstance.api.verifyPhoneNumber>
  ) {
    return this.authApi.verifyPhoneNumber(...args);
  }

  public validatePhoneNumber(...args: Parameters<typeof validatePhoneNumber>) {
    return this.phoneValidator(...args);
  }
}

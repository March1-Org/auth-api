import type { Auth } from 'auth';
import { error, t } from 'elysia';
import type { JwtType } from 'utils/types/jwt';

export const sendOTPBody = t.Object({
  token: t.String(),
});

type Options = {
  auth: Auth;
  jwt: JwtType;
  body: typeof sendOTPBody.static;
};

export async function sendOTP({ auth, jwt, body: { token } }: Options) {
  const verifiedToken = await jwt.verify(token);

  if (!verifiedToken) {
    return error('Unauthorized');
  }

  if (!verifiedToken.phoneNumber) {
    return error('Bad Request', 'Missing Phone Number');
  }

  const { phoneNumber } = verifiedToken as { phoneNumber: string };
  const validatedPhoneNumber = auth.validatePhoneNumber(phoneNumber);
  if (!validatedPhoneNumber) {
    return error('Bad Request', 'Invalid Phone Number');
  }

  await auth.sendPhoneNumberOTP({ body: { phoneNumber } });

  return 'Code sent';
}

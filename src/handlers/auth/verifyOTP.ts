import type { Auth } from 'auth';
import { error, t } from 'elysia';
import type { JwtType } from 'utils/types/jwt';

export const verifyOTPBody = t.Object({
  token: t.String(),
});

type Options = {
  auth: Auth;
  jwt: JwtType;
  body: typeof verifyOTPBody.static;
};

export async function verifyOTP({ auth, jwt, body: { token } }: Options) {
  const verifiedToken = await jwt.verify(token);
  if (!verifiedToken) {
    return error('Unauthorized');
  }
  if (!verifiedToken.phoneNumber) {
    return error('Bad Request', 'Missing Phone Number');
  }
  if (!verifiedToken.code) {
    return error('Bad Request', 'Missing Code');
  }
  const { phoneNumber, code } = verifiedToken as {
    phoneNumber: string;
    code: string;
  };

  const verifiedRes = await auth.verifyPhoneNumber({
    body: {
      phoneNumber,
      code,
    },
  });

  if (!verifiedRes || !verifiedRes.status || !verifiedRes.token) {
    return error('Bad Request', 'Verification Failed');
  }

  return verifiedRes;
}

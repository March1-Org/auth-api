import { error, t } from 'elysia';
import type { Auth } from 'utils/types/auth';
import type { JwtType } from 'utils/types/jwt';

export const verifyOTPBody = t.Object({
  token: t.String(),
});

type Options = {
  auth: Auth;
  jwt: JwtType;
  tokenizeJwt: JwtType;
  body: typeof verifyOTPBody.static;
};

export async function verifyOTP({
  auth,
  jwt,
  tokenizeJwt,
  body: { token },
}: Options) {
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

  try {
    const verifiedRes = await auth.verifyPhoneNumber({
      body: {
        phoneNumber,
        code,
      },
    });

    if (!verifiedRes || !verifiedRes.status || !verifiedRes.token) {
      return error('Bad Request', 'Verification Failed');
    }

    const userPayload = {
      id: verifiedRes.user.id,
      email: verifiedRes.user.email,
      name: verifiedRes.user.name,
      phoneNumber: verifiedRes.user.phoneNumber,
      phoneNumberVerified: verifiedRes.user.phoneNumberVerified.toString(),
      emailVerified: verifiedRes.user.emailVerified.toString(),
      createdAt: verifiedRes.user.createdAt.toISOString(),
      updatedAt: verifiedRes.user.updatedAt.toISOString(),
    };
    return tokenizeJwt.sign(userPayload);
  } catch (err) {
    return error('Bad Request', err);
  }
}

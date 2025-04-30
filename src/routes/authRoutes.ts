import jwt from '@elysiajs/jwt';
import type { Config } from 'config';
import Elysia from 'elysia';
import { sendOTP, sendOTPBody } from 'handlers/auth/sendOTP';
import { verifyOTP, verifyOTPBody } from 'handlers/auth/verifyOTP';
import type { Auth } from 'utils/types/auth';

type Options = {
  auth: Auth;
  config: Config;
};

export async function authRoutes({ auth, config }: Options) {
  return new Elysia({ prefix: '/auth' })
    .decorate('auth', auth)
    .use(
      jwt({
        secret: config.JWT_AUTH_SECRET!,
      })
    )
    .use(
      jwt({
        name: 'tokenizeJwt',
        secret: config.JWT_TOKENIZE_SECRET,
      })
    )
    .post('/sendOTP', (options) => sendOTP(options), {
      body: sendOTPBody,
    })
    .post('/verifyOTP', (options) => verifyOTP(options), {
      body: verifyOTPBody,
    });
}

import jwt from '@elysiajs/jwt';
import { config } from 'config';
import Elysia from 'elysia';
import { sendOTP, sendOTPBody } from 'handlers/auth/sendOTP';
import { verifyOTP, verifyOTPBody } from 'handlers/auth/verifyOTP';
import type { Auth } from 'utils/types/auth';

type Options = {
  auth: Auth;
};

export async function authRoutes({ auth }: Options) {
  return new Elysia({ prefix: '/auth' })
    .decorate('auth', auth)
    .use(
      jwt({
        secret: config.JWT_SECRET!,
      })
    )
    .use(
      jwt({
        name: 'tokenizeJwt',
        secret: config.JWT_TOKENIZE_SECRET,
      })
    )
    .post('/sendOTP', (config) => sendOTP(config), {
      body: sendOTPBody,
    })
    .post('/verifyOTP', (config) => verifyOTP(config), {
      body: verifyOTPBody,
    });
}

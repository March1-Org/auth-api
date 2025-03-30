import jwt from '@elysiajs/jwt';
import { Auth } from 'auth';
import { config } from 'config';
import Elysia from 'elysia';
import { sendOTP, sendOTPBody } from 'handlers/auth/sendOTP';
import { verifyOTP, verifyOTPBody } from 'handlers/auth/verifyOTP';

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
    .post('/sendOTP', (config) => sendOTP(config), {
      body: sendOTPBody,
    })
    .post('/verfiyOTP', (config) => verifyOTP(config), {
      body: verifyOTPBody,
    });
}

import { treaty } from '@elysiajs/eden';
import jwt from '@elysiajs/jwt';
import { getAuth } from 'auth';
import { config } from 'config';
import { createAuthApp } from 'createApp';
import { getDb } from 'lib/db';
import { validatePhoneNumber } from 'utils/auth/validate';
import { Auth } from 'utils/types/auth';

import { mockSendOTP } from './mockSendOTP';

export async function setup() {
  const db = await getDb(config);
  const authInstance = getAuth({ sendOTP: mockSendOTP, db });
  const auth = new Auth(authInstance.api, validatePhoneNumber);
  const app = createAuthApp({
    auth,
    config,
  });

  const api = treaty(app);

  const authorization = await jwt({
    secret: config.JWT_AUTH_SECRET,
  }).decorator.jwt.sign({ apiPassword: config.AUTH_API_PASSWORD });

  return { db, api, authorization };
}

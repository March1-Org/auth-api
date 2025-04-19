import { treaty } from '@elysiajs/eden';
import jwt from '@elysiajs/jwt';
import { authSchemaBodies, authSchema } from '@march1-org/auth-db';
import { getAuth } from 'auth';
import { config } from 'config';
import { createApp } from 'createApp';
import { getCache } from 'lib/cache';
import { getDb } from 'lib/db';
import { validatePhoneNumber } from 'utils/auth/validate';
import { Auth } from 'utils/types/auth';

import { mockSendOTP } from './mockSendOTP';

export async function setup() {
  const db = await getDb();
  const cache = getCache();
  const authInstance = getAuth({ sendOTP: mockSendOTP, db });
  const auth = new Auth(authInstance.api, validatePhoneNumber);
  const app = createApp({
    auth,
    db,
    authSchemaBodies,
    authSchema,
    cache,
  });

  const api = treaty(app);

  const authorization = await jwt({
    secret: config.JWT_SECRET,
  }).decorator.jwt.sign({ apiPassword: config.API_PASSWORD });

  return { db, api, authorization };
}

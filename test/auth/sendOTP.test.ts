import { treaty } from '@elysiajs/eden';
import jwt from '@elysiajs/jwt';
import { authSchema } from '@march1-org/auth-db';
import { describe, it, expect, beforeAll } from 'bun:test';
import { config } from 'config';
import type { createAuthApp } from 'index';
import type { DbType } from 'lib/db';

import { setup } from '../utils/setup';

const jwtInstance = jwt({
  secret: config.JWT_SECRET!,
}).decorator.jwt;

let db: DbType;
let api: ReturnType<typeof treaty<ReturnType<typeof createAuthApp>>>;
let authorization: string;

beforeAll(async () => {
  const setupVals = await setup();
  db = setupVals.db;
  api = setupVals.api;
  authorization = setupVals.authorization;

  await db.delete(authSchema.users);
  await db.delete(authSchema.sessions);
  await db.delete(authSchema.verifications);
});

describe('GET /auth/sendOTP', () => {
  it('Should throw unauthorized', async () => {
    const body = { token: '1' };
    const res = await api.auth.sendOTP.post(body, {
      headers: {
        authorization,
      },
    });
    expect(res.error?.value).toEqual('Unauthorized');
    expect(res.error?.status).toEqual(401);
  });

  it('Should throw missing phone number', async () => {
    const body = {
      token: await jwtInstance.sign({}),
    };
    const res = await api.auth.sendOTP.post(body, {
      headers: {
        authorization,
      },
    });

    expect(res.error?.value).toEqual('Missing Phone Number');
    expect(res.error?.status).toEqual(400);
  });

  it('Should throw invalid phone number', async () => {
    const body = {
      token: await jwtInstance.sign({ phoneNumber: '2345678910' }),
    };
    const res = await api.auth.sendOTP.post(body, {
      headers: {
        authorization,
      },
    });

    expect(res.error?.value).toEqual('Invalid Phone Number');
    expect(res.error?.status).toEqual(400);
  });

  it('Should throw invalid phone number on non-US phone numbers', async () => {
    const body = {
      token: await jwtInstance.sign({ phoneNumber: '+12505550199' }),
    };
    const res = await api.auth.sendOTP.post(body, {
      headers: {
        authorization,
      },
    });

    expect(res.error?.value).toEqual('Invalid Phone Number');
    expect(res.error?.status).toEqual(400);
  });

  it('Should send OTP for a valid token', async () => {
    const body = {
      token: await jwtInstance.sign({ phoneNumber: '+12345678910' }),
    };
    const res = await api.auth.sendOTP.post(body, {
      headers: {
        authorization,
      },
    });

    expect(res.data).toBe('Code sent');
    expect(res.status).toEqual(200);
  });
});

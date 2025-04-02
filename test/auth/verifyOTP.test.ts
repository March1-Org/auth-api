import { treaty } from '@elysiajs/eden';
import jwt from '@elysiajs/jwt';
import { describe, it, expect, beforeAll } from 'bun:test';
import { config } from 'config';
import type { DbType } from 'db';
import { schema } from 'db/schema';
import type { authApp } from 'index';

import { setup } from '../utils/setup';
import { setupFail } from '../utils/setupFail';

const jwtInstance = jwt({
  secret: config.JWT_SECRET!,
}).decorator.jwt;

let db: DbType;
let api: ReturnType<typeof treaty<typeof authApp>>;
let authorization: string;

beforeAll(async () => {
  const setupVals = await setup();
  db = setupVals.db;
  api = setupVals.api;
  authorization = setupVals.authorization;

  await db.delete(schema.users);
  await db.delete(schema.sessions);
  await db.delete(schema.verifications);
});

describe('GET /auth/verifyOTP', () => {
  it('Should throw unauthorized', async () => {
    const body = { token: '1' };
    const res = await api.auth.verifyOTP.post(body, {
      headers: {
        authorization,
      },
    });
    expect(res.error?.value).toEqual('Unauthorized');
    expect(res.error?.status).toEqual(401);
  });

  it('Should throw missing phone number', async () => {
    const body = {
      token: await jwtInstance.sign({ code: '1' }),
    };
    const res = await api.auth.verifyOTP.post(body, {
      headers: {
        authorization,
      },
    });

    expect(res.error?.value).toEqual('Missing Phone Number');
    expect(res.error?.status).toEqual(400);
  });

  it('Should throw missing phone number', async () => {
    const body = {
      token: await jwtInstance.sign({ code: '1' }),
    };
    const res = await api.auth.verifyOTP.post(body, {
      headers: {
        authorization,
      },
    });

    expect(res.error?.value).toEqual('Missing Phone Number');
    expect(res.error?.status).toEqual(400);
  });

  it('Should throw missing phone number', async () => {
    const body = {
      token: await jwtInstance.sign({ phoneNumber: '1' }),
    };
    const res = await api.auth.verifyOTP.post(body, {
      headers: {
        authorization,
      },
    });

    expect(res.error?.value).toEqual('Missing Code');
    expect(res.error?.status).toEqual(400);
  });

  it('Should catch a failed request', async () => {
    const body = {
      token: await jwtInstance.sign({ phoneNumber: '1', code: '1' }),
    };
    const { api } = await setupFail();
    const res = await api.auth.verifyOTP.post(body, {
      headers: {
        authorization,
      },
    });

    expect(res.error?.value).toEqual('Verification Failed');
    expect(res.error?.status).toEqual(400);
  });

  it('Should verify OTP for a valid token', async () => {
    const body = {
      token: await jwtInstance.sign({ phoneNumber: '1', code: '1' }),
    };
    const res = await api.auth.verifyOTP.post(body, {
      headers: {
        authorization,
      },
    });

    expect(res.data).toMatchObject({
      status: true,
      token: '1',
      user: {
        id: '1',
        email: '@',
        emailVerified: false,
        name: 'test',
        phoneNumber: '1',
        phoneNumberVerified: true,
      },
    });
  });
});

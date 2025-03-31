import { treaty } from '@elysiajs/eden';
import jwt from '@elysiajs/jwt';
import { describe, it, expect, beforeAll } from 'bun:test';
import { config } from 'config';
import type { authApp } from 'index';

import { setup } from './utils/setup';

let api: ReturnType<typeof treaty<typeof authApp>>;

beforeAll(async () => {
  const setupVals = await setup();
  api = setupVals.api;
});

describe('Authorization Checks', () => {
  it("returns 'Unauthorized' when provided the no authorization header", async () => {
    const res = await api.auth.sendOTP.post({ token: '' });

    expect(res.error?.value as string).toBe('Unauthorized');
    expect(res.error?.status as number).toBe(401);
  });

  it("returns 'Unauthorized' when provided the wrong authorization header", async () => {
    const res = await api.auth.sendOTP.post(
      { token: '' },
      {
        query: {},
        headers: {
          authorization: '',
        },
      }
    );

    expect(res.error?.value as string).toBe('Unauthorized');
    expect(res.error?.status as number).toBe(401);
  });

  it("returns 'Unauthorized' when provided no api password", async () => {
    const authorization = await jwt({
      secret: config.JWT_SECRET,
    }).decorator.jwt.sign({});

    const res = await api.auth.sendOTP.post(
      { token: '' },
      {
        query: {},
        headers: {
          authorization,
        },
      }
    );

    expect(res.error?.value as string).toBe('Unauthorized');
    expect(res.error?.status as number).toBe(401);
  });

  it("returns 'Unauthorized' when provided the wrong api password", async () => {
    const authorization = await jwt({
      secret: config.JWT_SECRET,
    }).decorator.jwt.sign({ apiPassword: '123' });

    const res = await api.auth.sendOTP.post(
      { token: '' },
      {
        query: {},
        headers: {
          authorization,
        },
      }
    );

    expect(res.error?.value as string).toBe('Unauthorized');
    expect(res.error?.status as number).toBe(401);
  });
});

import jwt from '@elysiajs/jwt';
import type { AuthSchema, AuthSchemaBodies } from '@march1-org/auth-db';
import { config } from 'config';
import Elysia from 'elysia';
import { checkAuthorization } from 'handlers/checkAuthorization';
import type Redis from 'ioredis';
import type { DbType } from 'lib/db';
import { authRoutes } from 'routes/authRoutes';
import type { Auth } from 'utils/types/auth';

type Options = {
  db: DbType;
  authSchema: AuthSchema;
  authSchemaBodies: AuthSchemaBodies;
  cache: Redis;
  auth: Auth;
};

export function createApp({ auth }: Options) {
  return new Elysia()
    .use(
      jwt({
        secret: config.JWT_SECRET!,
      })
    )
    .onBeforeHandle((options) => checkAuthorization(options))
    .use(authRoutes({ auth }));
}

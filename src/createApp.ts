import jwt from '@elysiajs/jwt';
import { Auth } from 'auth';
import { config } from 'config';
import type { DbType } from 'db';
import type { Schema, SchemaBodies } from 'db/schema';
import Elysia from 'elysia';
import { checkAuthorization } from 'handlers/checkAuthorization';
import type Redis from 'ioredis';
import { authRoutes } from 'routes/authRoutes';
import { userRoutes } from 'routes/usersRoutes';

type Options = {
  db: DbType;
  schemaBodies: SchemaBodies;
  schema: Schema;
  cache: Redis;
  auth: Auth;
};

export function createApp({ auth, db, schemaBodies, schema, cache }: Options) {
  return new Elysia()
    .use(
      jwt({
        secret: config.JWT_SECRET!,
      })
    )
    .onBeforeHandle((options) => checkAuthorization(options))
    .use(authRoutes({ auth }))
    .use(userRoutes({ db, schemaBodies, schema, cache }));
}

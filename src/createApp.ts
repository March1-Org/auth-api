import jwt from '@elysiajs/jwt';
import { auth } from 'auth';
import { config } from 'config';
import type { DbType } from 'db';
import type { Schema, SchemaBodies } from 'db/schema';
import Elysia from 'elysia';
import { checkAuthorization } from 'handlers/checkAuthorization';
import type Redis from 'ioredis';
import { authRoutes } from 'routes/authRoutes';

type Options = {
  db: DbType;
  schemaBodies: SchemaBodies;
  schema: Schema;
  cache: Redis;
};

export function createApp({ db, schemaBodies, schema, cache }: Options) {
  return new Elysia()
    .decorate('db', db)
    .decorate('schemaBodies', schemaBodies)
    .decorate('schema', schema)
    .decorate('cache', cache)
    .use(
      jwt({
        secret: config.JWT_SECRET!,
      })
    )
    .onBeforeHandle((options) => checkAuthorization(options))
    .use(authRoutes({ auth, cache, db, schema, schemaBodies }));
}

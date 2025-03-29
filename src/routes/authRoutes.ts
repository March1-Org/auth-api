import type { auth } from 'auth';
import type { DbType } from 'db';
import type { Schema, SchemaBodies } from 'db/schema';
import Elysia from 'elysia';
import type Redis from 'ioredis';

type Options = {
  auth: typeof auth;
  db: DbType;
  schemaBodies: SchemaBodies;
  schema: Schema;
  cache: Redis;
};

export async function authRoutes({
  auth,
  db,
  schemaBodies,
  schema,
  cache,
}: Options) {
  return new Elysia({ prefix: '/auth' })
    .decorate('auth', auth)
    .decorate('db', db)
    .decorate('schemaBodies', schemaBodies)
    .decorate('schema', schema)
    .decorate('cache', cache);
}

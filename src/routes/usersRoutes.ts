import type { DbType } from 'db';
import type { Schema, SchemaBodies } from 'db/schema';
import Elysia from 'elysia';
import { getUser } from 'handlers/users/getUser';
import type Redis from 'ioredis';

type Options = {
  db: DbType;
  schemaBodies: SchemaBodies;
  schema: Schema;
  cache: Redis;
};

export async function userRoutes({ db, schemaBodies, schema, cache }: Options) {
  return new Elysia({ prefix: '/users' })
    .decorate('db', db)
    .decorate('schemaBodies', schemaBodies)
    .decorate('schema', schema)
    .decorate('cache', cache)
    .get('/:id', (options) => getUser(options));
}

import type { DbType } from 'db';
import type { Schema, SchemaBodies } from 'db/schema';
import Elysia from 'elysia';
import { selectUser } from 'handlers/users/selectUser';
import { selectUsers, selectUsersQuery } from 'handlers/users/selectUsers';
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
    .get('', (options) => selectUsers(options), {
      query: selectUsersQuery,
      detail: {
        summary: 'Selects users in a page',
      },
    })
    .get('/:id', (options) => selectUser(options));
  // .post('', (options) => insertUser(options), {
  //   body: t.Object(schemaBodies.insert.users),
  // })
  // .patch('/:id', (options) => updateUser(options), {
  //   body: t.Object(schemaBodies.update.users),
  // })
  // .delete('/:id', (options) => deleteUser(options));
}

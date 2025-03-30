import type { DbType } from 'db';
import type { Schema } from 'db/schema';
import type { UserRow } from 'db/schema/users';
import { eq } from 'drizzle-orm';
import { error } from 'elysia';
import type Redis from 'ioredis';

type Options = {
  db: DbType;
  schema: Schema;
  params: { id: string };
  cache: Redis;
};

export async function getUser({
  db,
  schema: { users },
  params: { id },
  cache,
}: Options) {
  const cacheKey = `user:${id}`;

  const cachedUser = await cache.get(cacheKey);

  if (cachedUser) {
    return JSON.parse(cachedUser) as UserRow;
  }

  const data = await db.select().from(users).where(eq(users.id, id));

  if (!data.length) {
    return error('Not Found', 'User not found.');
  }

  const user = data[0];

  await cache.set(cacheKey, JSON.stringify(user), 'EX', 3600);

  return user;
}

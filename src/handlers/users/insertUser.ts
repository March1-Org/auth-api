import type { DbType } from 'db';
import type { Schema } from 'db/schema';
import type { UserInsert } from 'db/schema/users';

type Options = {
  db: DbType;
  schema: Schema;
  body: UserInsert;
};

export async function insertUser({ db, schema: { users }, body }: Options) {
  await db.insert(users).values(body);
  return 'Successfully created user.';
}

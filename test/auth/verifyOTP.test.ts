// import { treaty } from '@elysiajs/eden';
// import { describe, it, expect, beforeAll } from 'bun:test';
// import type { DbType } from 'db';
// import { schema } from 'db/schema';
// import type { UserRow } from 'db/schema/users';
// import type { authApp } from 'index';

// import { setup } from '../utils/setup';

// let db: DbType;
// let api: ReturnType<typeof treaty<typeof authApp>>;
// let authorization: string;
// let user: UserRow;

// beforeAll(async () => {
//   const setupVals = await setup();
//   db = setupVals.db;
//   api = setupVals.api;
//   authorization = setupVals.authorization;

//   await db.delete(schema.usersTable);
//   await db
//     .insert(schema.usersTable)
//     .values({ age: 30, email: 'test@email.com', name: 'test' });

//   user = (await db.select().from(schema.usersTable))[0];
// });

// describe('GET /users/:id', () => {
//   it("returns 'User not found' error when user doesn't exist", async () => {
//     const res = await api.users({ id: 999999 }).get({
//       headers: {
//         authorization,
//       },
//     });

//     expect(res.error?.value).toBe('User not found.');
//     expect(res.error?.status).toBe(404);
//   });

//   it('returns user row', async () => {
//     const res = await api.users({ id: user.id }).get({
//       headers: {
//         authorization,
//       },
//     });

//     expect(res.data).toEqual(user);
//     expect(res.status).toBe(200);
//   });

//   it('returns user row from cache', async () => {
//     const res = await api.users({ id: user.id }).get({
//       headers: {
//         authorization,
//       },
//     });

//     expect(res.data).toEqual(user);
//     expect(res.status).toBe(200);
//   });
// });

import {
  relations,
  type InferInsertModel,
  type InferSelectModel,
} from 'drizzle-orm';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { usersTable } from './users';

export const sessionsTable = pgTable('sessions', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => usersTable.id, {
      onDelete: 'cascade',
      onUpdate: 'restrict',
    }),
});

export const sessionsRelations = relations(sessionsTable, ({ one }) => ({
  users: one(usersTable, {
    fields: [sessionsTable.userId],
    references: [usersTable.id],
  }),
}));

export type SessionsRow = InferSelectModel<typeof sessionsTable>;
export type SessionsInsert = InferInsertModel<typeof sessionsTable>;
export type SessionsUpdate = Partial<SessionsRow>;

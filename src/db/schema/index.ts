import { spreads } from 'utils/spread';

import { accountsTable } from './accounts';
import { sessionsTable } from './sessions';
import { usersTable } from './users';
import { verificationsTable } from './verifications';

export const schema = {
  users: usersTable,
  sessions: sessionsTable,
  accounts: accountsTable,
  verifications: verificationsTable,
};

export type Schema = typeof schema;

export const schemaBodies = {
  insert: spreads(schema, 'insert'),
  select: spreads(schema, 'select'),
  update: spreads(schema, 'update'),
};

export type SchemaBodies = typeof schemaBodies;

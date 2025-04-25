import jwt from '@elysiajs/jwt';
import type { Config } from 'config';
import Elysia from 'elysia';
import { checkAuthorization } from 'handlers/checkAuthorization';
import { authRoutes } from 'routes/authRoutes';
import type { Auth } from 'utils/types/auth';

type Options = {
  auth: Auth;
  config: Config;
};

export function createAuthApp({ auth, config }: Options) {
  return new Elysia()
    .use(
      jwt({
        secret: config.JWT_SECRET!,
      })
    )
    .decorate('config', config)
    .onBeforeHandle((options) => checkAuthorization(options))
    .use(authRoutes({ auth, config }));
}

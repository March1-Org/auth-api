import { Auth } from 'auth';
import { validatePhoneNumber } from 'utils/auth/validate';

export function getMockAuth() {
  const authApi = {
    sendPhoneNumberOTP: async ({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      body: { phoneNumber: _pn },
    }: {
      body: { phoneNumber: string };
    }) => {
      return { code: 'code' };
    },
    verifyPhoneNumber: async ({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      body: { phoneNumber: _pn, code: _code },
    }: {
      body: { phoneNumber: string; code: string };
    }) => {
      return {
        status: true,
        token: '1',
        user: {
          id: '1',
          createdAt: new Date(),
          email: '@',
          emailVerified: false,
          name: 'test',
          phoneNumber: '1',
          phoneNumberVerified: true,
          updatedAt: new Date(),
        },
      };
    },
  };

  return new Auth(authApi, validatePhoneNumber);
}

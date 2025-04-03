import type { UserWithPhoneNumber } from 'better-auth/plugins';
import { validatePhoneNumber } from 'utils/auth/validate';

type VerifyPhoneNumberRes =
  | {
      status: boolean;
      token: string;
      user: UserWithPhoneNumber;
    }
  | {
      status: boolean;
      token: null;
      user: UserWithPhoneNumber;
    }
  | null;

type AuthApi = {
  sendPhoneNumberOTP: ({
    body: { phoneNumber },
  }: {
    body: { phoneNumber: string };
  }) => Promise<{ code: string }>;
  verifyPhoneNumber: ({
    body: { phoneNumber, code },
  }: {
    body: { phoneNumber: string; code: string };
  }) => Promise<VerifyPhoneNumberRes>;
};

export class Auth {
  constructor(
    private authApi: AuthApi,
    private phoneValidator = validatePhoneNumber
  ) {}

  public sendPhoneNumberOTP(
    ...args: Parameters<AuthApi['sendPhoneNumberOTP']>
  ) {
    return this.authApi.sendPhoneNumberOTP(...args);
  }

  public verifyPhoneNumber(...args: Parameters<AuthApi['verifyPhoneNumber']>) {
    return this.authApi.verifyPhoneNumber(...args);
  }

  public validatePhoneNumber(...args: Parameters<typeof validatePhoneNumber>) {
    return this.phoneValidator(...args);
  }
}

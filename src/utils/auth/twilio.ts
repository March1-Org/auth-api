import { type Config } from 'config';
import twilio, { Twilio } from 'twilio';

export function createTwilioClient(config: Config) {
  return twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);
}

type CreateTwilioFuncOptions = {
  client: Twilio;
  config: Config;
};

type SendOTPOptions = {
  phoneNumber: string;
};

export async function createTwilioSendOTP({
  client,
  config,
}: CreateTwilioFuncOptions) {
  return async function twilioSendOTP({ phoneNumber }: SendOTPOptions) {
    await client.verify.v2
      .services(config.TWILIO_SERVICE_SID)
      .verifications.create({ channel: 'sms', to: phoneNumber });
  };
}

import { config } from 'config';
import twilio from 'twilio';

const client = twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);

type SendOTPOptions = {
  phoneNumber: string;
};

export async function twilioSendOTP({ phoneNumber }: SendOTPOptions) {
  await client.verify.v2
    .services(config.TWILIO_SERVICE_SID)
    .verifications.create({ channel: 'sms', to: phoneNumber });
}

type VerifyOTPOptions = {
  phoneNumber: string;
  code: string;
};

export async function twilioVerifyOTP({ phoneNumber, code }: VerifyOTPOptions) {
  const res = await client.verify.v2
    .services(config.TWILIO_SERVICE_SID)
    .verificationChecks.create({ to: phoneNumber, code });

  return res.status;
}

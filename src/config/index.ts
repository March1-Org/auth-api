import path from 'path';

import dotenv from 'dotenv';

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

export interface Config {
  NODE_ENV: string;
  PORT: number;
  JWT_AUTH_SECRET: string;
  AUTH_API_PASSWORD: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
  POSTGRES_PORT: number;
  POSTGRES_HOST: string;
  TWILIO_ACCOUNT_SID: string;
  TWILIO_SERVICE_SID: string;
  TWILIO_AUTH_TOKEN: string;
  JWT_TOKENIZE_SECRET: string;
}

export const config: Config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '3000'),
  JWT_AUTH_SECRET: process.env.JWT_AUTH_SECRET || 'jwt-auth-secret',
  AUTH_API_PASSWORD: process.env.AUTH_API_PASSWORD || 'api-password',
  POSTGRES_USER: process.env.POSTGRES_USER || 'db_user',
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || 'db_password',
  POSTGRES_DB: process.env.POSTGRES_DB || 'db',
  POSTGRES_PORT: parseInt(process.env.POSTGRES_PORT || '5432'),
  POSTGRES_HOST: process.env.POSTGRES_HOST || '127.0.0.1',
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID!,
  TWILIO_SERVICE_SID: process.env.TWILIO_SERVICE_SID!,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN!,
  JWT_TOKENIZE_SECRET: process.env.JWT_TOKENIZE_SECRET || 'jwt-tokenize-secret',
};

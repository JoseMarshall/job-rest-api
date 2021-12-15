import { google } from 'googleapis';
import { createTransport } from 'nodemailer';

import {
  accessToken,
  clientId,
  clientSecret,
  refreshToken,
} from '../../../../job-rest-api-key.json';
import { MakeMailOptions } from './email.types';

const { OAuth2 } = google.auth;

export const makeTransporter = async () => {
  const myOAuth2Client = new OAuth2(clientId, clientSecret);

  myOAuth2Client.setCredentials({
    refresh_token: refreshToken,
  });

  return createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL_ADDRESS,
      clientId,
      accessToken,
      clientSecret,
      refreshToken,
    },
    tls: { rejectUnauthorized: false },
  } as any);
};
export const makeMailOptions: MakeMailOptions = data => ({
  ...data,
  from: process.env.EMAIL_ADDRESS,
});

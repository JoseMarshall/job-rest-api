import { createTestAccount, createTransport } from 'nodemailer';

import { MakeMailOptions } from './email.types';

export const makeTransporter = async () => {
  const testAccount = await createTestAccount();

  return createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });
};

export const makeMailOptions: MakeMailOptions = data => ({
  ...data,
  from: process.env.EMAIL_ADDRESS,
});

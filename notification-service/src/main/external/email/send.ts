import { SendMailOptions } from 'nodemailer';

import { makeMailOptions, makeTransporter } from './config';

async function send(options: SendMailOptions) {
  const mailOptions = makeMailOptions(options);
  const transporter = await makeTransporter();

  return transporter.sendMail(mailOptions);
}

export default send;

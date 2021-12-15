import { SendMailOptions } from 'nodemailer';

import { logger } from '../../../utils/logger';
import { makeMailOptions, makeTransporter } from './config';

async function send(options: SendMailOptions) {
  const mailOptions = makeMailOptions(options);
  const transporter = await makeTransporter();

  try {
    const result = await transporter.sendMail(mailOptions);
    logger.info(`Email sent to: ${result.accepted}  messageId: ${result.messageId}`);
  } catch (error) {
    logger.error(error);
  }
}

export default send;

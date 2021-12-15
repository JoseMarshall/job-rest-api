import { makeTransporter } from '../config';
import send from '../send';

jest.mock('../config', () => ({
  ...jest.requireActual<Record<string, unknown>>('../config'),
  makeTransporter: jest.fn().mockResolvedValue({ sendMail: jest.fn(async x => x) }),
}));

jest.mock('../../../../utils/logger', () => ({
  ...jest.requireActual<Record<string, unknown>>('../../../../utils/logger'),
  logger: { info: jest.fn(), error: jest.fn() },
}));

const makeSut = () => ({
  sut: send,
});

describe('send an email to a given address', () => {
  const { sut } = makeSut();

  it('should call nodemailer.createTransport() with given options', async () => {
    const options = {
      from: process.env.EMAIL_ADDRESS,
      to: 'example@teste.com',
      html: 'Stay up-to-date with essential data resources and actionable information, from daily dashboards to real-world solutions',
      subject: 'test',
      attachments: [],
    };
    await sut(options);
    const transporter = await makeTransporter();

    expect(transporter.sendMail).toHaveBeenCalledTimes(1);
    expect(transporter.sendMail).toHaveBeenCalledWith(options);
  });
});

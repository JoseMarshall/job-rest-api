import pino, { stdTimeFunctions } from 'pino';

// eslint-disable-next-line import/prefer-default-export
export const logger = pino({
  name: 'Job-REST',
  prettyPrint: true,
  timestamp: stdTimeFunctions.isoTime,
});

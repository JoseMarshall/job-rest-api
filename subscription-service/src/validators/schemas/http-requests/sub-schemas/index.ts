import joi from 'joi';

// eslint-disable-next-line import/prefer-default-export
export const idSchema = {
  id: joi.string().uuid({ version: 'uuidv4' }).required(),
};

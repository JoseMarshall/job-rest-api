import joi from 'joi';

export const idSchema = {
  id: joi.string().uuid({ version: 'uuidv4' }).required(),
};

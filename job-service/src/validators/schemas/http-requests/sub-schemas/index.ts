import joi from 'joi';

import { limitQueryRegex, pageQueryRegex, sortQueryRegex } from '../../../../utils/regex';

export const getAllSchema = {
  page: joi.string().regex(pageQueryRegex).required(),
  limit: joi.string().regex(limitQueryRegex),
  sort: joi.string().pattern(sortQueryRegex),
};

export const addressSchema = {
  planet: joi.string().required(),
  country: joi.string().required(),
  city: joi.string().required(),
};

export const announcerSchema = joi.object({
  name: joi.string().min(2).required(),
  role: joi.string().min(2).required(),
  email: joi.string().email().required(),
});

export const idSchema = {
  id: joi.string().uuid({ version: 'uuidv4' }).required(),
};

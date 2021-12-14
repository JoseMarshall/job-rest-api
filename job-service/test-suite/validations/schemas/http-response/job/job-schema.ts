import joi from 'joi';

import {
  addressSchema,
  announcerSchema,
} from '../../../../../src/validators/schemas/http-requests/sub-schemas';

export default joi.object({
  id: joi.string().uuid({ version: 'uuidv4' }).required(),
  _id: joi.string().uuid({ version: 'uuidv4' }),
  title: joi.string().min(2).max(50).required(),
  description: joi.string().min(2).required(),
  skills: joi.array().items(joi.string()).min(1).required(),
  companyMarket: joi.string().min(2).required(),
  companyName: joi.string().min(2).required(),
  type: joi.string().min(2).required(),
  location: addressSchema,
  companyWebsite: joi.string().uri(),
  responsabilities: joi.array().items(joi.string()),
  announcedBy: announcerSchema,
  isDeleted: joi.boolean(),
  createdAt: joi.date().required(),
  updatedAt: joi.date().required(),
});

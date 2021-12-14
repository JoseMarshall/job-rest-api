import joi from 'joi';

export default joi.object({
  id: joi.string().uuid({ version: 'uuidv4' }).required(),
  _id: joi.string().uuid({ version: 'uuidv4' }),
  name: joi.string().min(2).max(50).required(),
  email: joi.string().email().required(),
  verified: joi.boolean(),
  isDeleted: joi.boolean(),
  createdAt: joi.date().required(),
  updatedAt: joi.date().required(),
});

import joi from 'joi';

import joiValidator from '../../index';

const deleteSchema = joi
  .object({
    id: joi.string().uuid({ version: 'uuidv4' }),
    _id: joi.string().uuid({ version: 'uuidv4' }),
    isDeleted: joi.boolean().valid(true),
    createdAt: joi.date().required(),
    updatedAt: joi.date().required(),
  })
  .required()
  .unknown(false);

export default joiValidator(deleteSchema);

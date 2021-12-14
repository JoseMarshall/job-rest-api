import joi from 'joi';

import joiValidator from '../../index';
import subscriptionSchema from './subscription-schema';

const createSchema = subscriptionSchema
  .append({
    isDeleted: joi.boolean().valid(false).required(),
    verified: joi.boolean().required(),
  })
  .required()
  .unknown(true);

export default joiValidator(createSchema);

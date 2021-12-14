import joi from 'joi';

import joiValidator from '../../index';
import jobSchema from './job-schema';

const createSchema = jobSchema
  .append({ isDeleted: joi.boolean().valid(false).required() })
  .required()
  .unknown(true);

export default joiValidator(createSchema);

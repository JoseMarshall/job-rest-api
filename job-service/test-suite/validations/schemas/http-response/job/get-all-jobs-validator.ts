import joi from 'joi';

import joiValidator from '../../index';
import jobSchema from './job-schema';

const getAllSchema = joi
  .object({
    data: joi.array().items(jobSchema).required(),
    count: joi.number().min(0).required(),
  })
  .required()
  .unknown(false);

export default joiValidator(getAllSchema);

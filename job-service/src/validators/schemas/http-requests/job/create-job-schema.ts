import joi from 'joi';

import { IJobInput } from '../../../../entities/job/job.types';
import joiValidator from '../../../index';
import { addressSchema, announcerSchema } from '../sub-schemas';

const createJobSchema = joi
  .object({
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
  })
  .required()
  .unknown(false);

export default joiValidator<IJobInput>(createJobSchema);

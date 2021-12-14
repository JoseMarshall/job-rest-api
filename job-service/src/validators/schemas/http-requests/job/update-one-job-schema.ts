import joi from 'joi';

import joiValidator from '../../../index';
import { UpdateOneJob } from '../../../types/job';
import { addressSchema, announcerSchema, idSchema } from '../sub-schemas';

const updateOneJobSchema = joi
  .object({
    params: joi.object(idSchema).required().unknown(false),
    body: joi
      .object({
        title: joi.string().min(2).max(50),
        description: joi.string().min(2),
        skills: joi.array().items(joi.string()).min(1),
        companyMarket: joi.string().min(2),
        companyName: joi.string().min(2),
        type: joi.string().min(2),
        location: addressSchema,
        companyWebsite: joi.string().uri(),
        responsabilities: joi.array().items(joi.string()),
        announcedBy: announcerSchema,
      })
      .min(1)
      .required()
      .unknown(false),
  })
  .required()
  .unknown(true);

export default joiValidator<UpdateOneJob>(updateOneJobSchema);

import joi from 'joi';

import { commaSeparatedWordRegex } from '../../../../utils/regex';
import joiValidator from '../../../index';
import { GetAllJobs } from '../../../types/job';
import { getAllSchema } from '../sub-schemas';

const getAllJobsSchema = joi
  .object(getAllSchema)
  .append({
    title: joi.string().min(1),
    'company-name': joi.string().min(1),
    'company-market': joi.string().min(1),
    skills: joi.string().regex(commaSeparatedWordRegex),
    type: joi.string().min(1),
    planet: joi.string().min(1),
    country: joi.string().min(1),
    city: joi.string().min(1),
  })
  .required()
  .unknown(false);

export default joiValidator<GetAllJobs>(getAllJobsSchema);

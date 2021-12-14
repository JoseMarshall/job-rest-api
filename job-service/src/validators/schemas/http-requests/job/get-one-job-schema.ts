import joi from 'joi';

import joiValidator from '../../../index';
import { GetOneJob } from '../../../types/job';
import { idSchema } from '../sub-schemas';

const getJobSchema = joi.object(idSchema).required().unknown(false);

export default joiValidator<GetOneJob>(getJobSchema);

import joi from 'joi';

import joiValidator from '../../../index';
import { DeleteOneJob } from '../../../types/job';
import { idSchema } from '../sub-schemas';

const deleteJobSchema = joi.object(idSchema).required().unknown(false);

export default joiValidator<DeleteOneJob>(deleteJobSchema);

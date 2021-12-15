import joi from 'joi';

import joiValidator from '../../../index';
import { Verify } from '../../../types/subscription';
import { idSchema } from '../sub-schemas';

const verifySchema = joi.object(idSchema).required().unknown(false);

export default joiValidator<Verify>(verifySchema);

import joi from 'joi';

import joiValidator from '../../index';

const verifySchema = joi.object({ verified: joi.boolean().valid(true).required() }).unknown(true);

export default joiValidator(verifySchema);

import joiValidator from '../../index';
import joi from 'joi';

const verifySchema = joi.object({ verified: joi.boolean().valid(true).required() }).unknown(true);

export default joiValidator(verifySchema);

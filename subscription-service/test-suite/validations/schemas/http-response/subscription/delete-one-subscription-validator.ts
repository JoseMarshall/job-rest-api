import joi from 'joi';

import joiValidator from '../../index';

const deleteSchema = joi
  .object({
    deleted: joi.boolean().valid(true),
  })
  .required()
  .unknown(false);

export default joiValidator(deleteSchema);

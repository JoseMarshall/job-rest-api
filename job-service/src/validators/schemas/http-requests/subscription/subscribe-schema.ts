import joi from 'joi';

import { ISubscriptionInput } from '../../../../entities/subscription/subscription.types';
import joiValidator from '../../../index';

const subscribeSchema = joi
  .object({
    name: joi.string().min(2).max(50).required(),
    email: joi.string().email().required(),
  })
  .required()
  .unknown(false);

export default joiValidator<ISubscriptionInput>(subscribeSchema);

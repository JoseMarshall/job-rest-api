import joi from 'joi';

import joiValidator from '../../../index';
import { Unsubscribe } from '../../../types/subscription';
import { idSchema } from '../sub-schemas';

const unsubscribeSchema = joi.object(idSchema).required().unknown(false);

export default joiValidator<Unsubscribe>(unsubscribeSchema);

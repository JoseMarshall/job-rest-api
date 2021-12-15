import joiValidator from '../../index';
import jobSchema from './job-schema';

const updateSchema = jobSchema.required().unknown(true);

export default joiValidator(updateSchema);

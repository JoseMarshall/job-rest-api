import joiValidator from '../../index';
import jobSchema from './job-schema';

const enableJobSchema = jobSchema.required().unknown(false);

export default joiValidator(enableJobSchema);

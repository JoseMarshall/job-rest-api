import { makeGetAllResponseBodySchema } from '../../../builders';
import { jobSchema } from '../../entities';

// eslint-disable-next-line import/prefer-default-export
export const listJobsResponseBodySchema = makeGetAllResponseBodySchema(
  jobSchema.properties,
  'The signature of each job',
  jobSchema.required
);

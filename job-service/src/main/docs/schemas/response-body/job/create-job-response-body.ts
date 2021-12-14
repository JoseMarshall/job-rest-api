import { makeGeneralResponseBodySchema } from '../../../builders';
import { jobSchema } from '../../entities';

// eslint-disable-next-line import/prefer-default-export
export const createJobResponseBodySchema = makeGeneralResponseBodySchema(
  jobSchema.properties,
  jobSchema.required
);

import { makeGeneralResponseBodySchema, makeStringSchema } from '../../../builders';
import { jobSchema } from '../../entities';

// eslint-disable-next-line import/prefer-default-export
export const getOneJobResponseBodySchema = makeGeneralResponseBodySchema(
  {
    ...jobSchema.properties,
    id: makeStringSchema({
      description: 'the unique identifier for this record on database',
      example: '0778d592-ad9f-4ed2-8c8e-ca11d6b0231d',
    }),
  },
  ['id', ...jobSchema.required]
);

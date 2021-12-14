import { makeRequestBodySchema } from '../../../builders';
import { jobSchema } from '../../entities';

// eslint-disable-next-line import/prefer-default-export
export const createJobRequestBodySchema = makeRequestBodySchema(
  {
    title: jobSchema.properties.title,
    description: jobSchema.properties.description,
    skills: jobSchema.properties.skills,
    companyMarket: jobSchema.properties.companyMarket,
    companyName: jobSchema.properties.companyName,
    type: jobSchema.properties.type,
    location: jobSchema.properties.location,
    companyWebsite: jobSchema.properties.companyWebsite,
    responsabilities: jobSchema.properties.responsabilities,
    announcedBy: jobSchema.properties.announcedBy,
  },
  jobSchema.required
);

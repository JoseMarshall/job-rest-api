import { Tags } from './enums';
import { createJob, deleteJob, getOneJob, listJobs, updateJob } from './paths/job';
import { createJobRequestBodySchema, updateJobRequestBodySchema } from './schemas/request-body';
import {
  createJobResponseBodySchema,
  listJobsResponseBodySchema,
  deleteJobResponseBodySchema,
  getOneJobResponseBodySchema,
  updateJobResponseBodySchema,
} from './schemas/response-body';

export default {
  openapi: '3.0.1',
  info: {
    title: 'Job-REST-API',
    description: 'CRUD Job, last updated at 2021-12-14 10:30 by JoseM@rshall PD',
    version: '1.0.0',
  },
  servers: [{ url: '/' }],
  tags: [
    {
      name: Tags.Jobs,
    },
  ],

  paths: {
    '/api/v1/jobs': { ...listJobs, ...createJob },
    '/api/v1/jobs/{id}': { ...getOneJob, ...updateJob, ...deleteJob },
  },

  schemas: {
    requestBody: {
      updateJob: updateJobRequestBodySchema,
      createJob: createJobRequestBodySchema,
    },
    responseBody: {
      createJob: createJobResponseBodySchema,
      updateJob: updateJobResponseBodySchema,
      deleteJob: deleteJobResponseBodySchema,
      getOneJob: getOneJobResponseBodySchema,
      listJobs: listJobsResponseBodySchema,
    },
  },
};

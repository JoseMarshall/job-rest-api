import { HttpRequest } from '../../../../main/adapters/adapters.types';
import createJobSchemaValidator from './create-job-schema';
import deleteOneJobSchemaValidator from './delete-one-job-schema';
import getAllJobsSchemaValidator from './get-all-jobs-schema';
import getOneJobSchemaValidator from './get-one-job-schema';
import updateOneJobsSchemaValidator from './update-one-job-schema';

export const makeCreateJobValidator = () => async (req: HttpRequest) =>
  createJobSchemaValidator(req.body);

export const makeUpdateOneJobValidator = () => async (req: HttpRequest) =>
  updateOneJobsSchemaValidator(req);

export const makeGetOneJobValidator = () => async (req: HttpRequest) =>
  getOneJobSchemaValidator(req.params);

export const makeGetAllJobsValidator = () => async (req: HttpRequest) =>
  getAllJobsSchemaValidator(req.query);

export const makeDeleteOneJobValidator = () => async (req: HttpRequest) =>
  deleteOneJobSchemaValidator(req.params);

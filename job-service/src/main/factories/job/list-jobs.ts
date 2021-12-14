import { IJob } from '../../../entities/job/job.types';
import { makeGetAllJobsValidator } from '../../../validators/schemas/http-requests/job';
import { GetAllJobs } from '../../../validators/types/job';
import makeGetAllEntitiesController from '../../controllers/get-all-entities';
import uow from '../../external/repositories/mongodb/unit-of-work';
import { listJobsUC } from '../../use-cases/list-jobs';

const listAccounts = makeGetAllEntitiesController<IJob, GetAllJobs>({
  findAll: listJobsUC(uow()),
  requestValidator: makeGetAllJobsValidator(),
  queryFormatter: (query: GetAllJobs) => {
    const { 'company-market': CompanyMarket, 'company-name': CompanyName, ...restOfQuery } = query;

    return {
      ...restOfQuery,
      ...(CompanyMarket ? { CompanyMarket } : {}),
      ...(CompanyName ? { CompanyName } : {}),
    };
  },
});

export default listAccounts;

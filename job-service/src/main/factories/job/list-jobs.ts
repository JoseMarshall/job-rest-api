import { IJob } from '../../../entities/job/job.types';
import { makeGetAllJobsValidator } from '../../../validators/schemas/http-requests/job';
import { GetAllJobs } from '../../../validators/types/job';
import makeGetAllEntitiesController from '../../controllers/get-all-entities';
import uow from '../../external/repositories/mongodb/unit-of-work';
import { listJobsUC } from '../../use-cases/list-jobs';

const listJobs = makeGetAllEntitiesController<IJob, GetAllJobs>({
  findAll: listJobsUC(uow()),
  requestValidator: makeGetAllJobsValidator(),
  queryFormatter: (query: GetAllJobs) => {
    const {
      'company-market': companyMarket,
      'company-name': companyName,
      planet,
      country,
      city,
      skills,
      ...restOfQuery
    } = query;

    return {
      ...restOfQuery,
      ...(companyMarket ? { companyMarket } : {}),
      ...(companyName ? { companyName } : {}),
      ...(planet ? { 'location.planet': planet } : {}),
      ...(country ? { 'location.country': country } : {}),
      ...(city ? { 'location.city': city } : {}),
      ...(skills
        ? {
            skills: {
              $in: (skills as string).split(',').map(skill => new RegExp(`.*${skill}.*`, 'i')),
            },
          }
        : {}),
    };
  },
});

export default listJobs;

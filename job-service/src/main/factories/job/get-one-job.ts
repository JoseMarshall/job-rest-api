import { IJob } from '../../../entities/job/job.types';
import { makeGetOneJobValidator } from '../../../validators/schemas/http-requests/job';
import { GetOneJob } from '../../../validators/types/job';
import makeGetOneEntityController from '../../controllers/get-one-entity';
import uow from '../../external/repositories/mongodb/unit-of-work';
import { getOneJobUC } from '../../use-cases/get-one-job';

const deleteJob = makeGetOneEntityController<IJob, GetOneJob>({
  getOne: getOneJobUC(uow()),
  requestValidator: makeGetOneJobValidator(),
});

export default deleteJob;

import { IJob, IJobInput } from '../../../entities/job/job.types';
import { makeCreateJobValidator } from '../../../validators/schemas/http-requests/job';
import makeCreateEntityController from '../../controllers/create-entity';
import uow from '../../external/repositories/mongodb/unit-of-work';
import { createJobUC } from '../../use-cases/create-job';

const createJob = makeCreateEntityController<IJob, IJobInput>({
  create: createJobUC(uow()),
  requestValidator: makeCreateJobValidator(),
});

export default createJob;

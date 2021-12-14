import { IJob } from '../../../entities/job/job.types';
import { makeUpdateOneJobValidator } from '../../../validators/schemas/http-requests/job';
import { UpdateOneJob } from '../../../validators/types/job';
import makeUpdateEntityController from '../../controllers/update-entity';
import uow from '../../external/repositories/mongodb/unit-of-work';
import { updateJobUC } from '../../use-cases/update-job';

const updateJob = makeUpdateEntityController<IJob, UpdateOneJob>({
  update: updateJobUC(uow()),
  requestValidator: makeUpdateOneJobValidator(),
});

export default updateJob;

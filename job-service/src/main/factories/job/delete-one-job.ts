import { makeDeleteOneJobValidator } from '../../../validators/schemas/http-requests/job';
import { DeleteOneJob } from '../../../validators/types/job';
import makeDeleteEntityController from '../../controllers/delete-entity';
import uow from '../../external/repositories/mongodb/unit-of-work';
import { DeletedEntity } from '../../external/repositories/repository.types';
import { deleteJobUC } from '../../use-cases/delete-job';

const deleteJob = makeDeleteEntityController<DeletedEntity, DeleteOneJob>({
  deleteAll: deleteJobUC(uow()),
  requestValidator: makeDeleteOneJobValidator(),
});

export default deleteJob;

import { IJob, IJobInput } from '../../../entities/job/job.types';
import { makeCreateJobValidator } from '../../../validators/schemas/http-requests/job';
import makeCreateEntityController from '../../controllers/create-entity';
import RabbitMQ from '../../external/message-brokers/rabbit-mq';
import uow from '../../external/repositories/mongodb/unit-of-work';
import { createJobUC } from '../../use-cases/create-job';

const createJob = makeCreateEntityController<IJob, IJobInput>({
  create: createJobUC({ uow: uow(), messageBroker: new RabbitMQ() }),
  requestValidator: makeCreateJobValidator(),
});

export default createJob;

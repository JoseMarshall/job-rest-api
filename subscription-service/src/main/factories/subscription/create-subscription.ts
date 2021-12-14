import {
  ISubscription,
  ISubscriptionInput,
} from '../../../entities/subscription/subscription.types';
import { makeSubscribeValidator } from '../../../validators/schemas/http-requests/subscription';
import makeCreateEntityController from '../../controllers/create-entity';
import RabbitMQ from '../../external/message-brokers/rabbit-mq';
import uow from '../../external/repositories/mongodb/unit-of-work';
import { createSubscriptionUC } from '../../use-cases/create-subscription';

const createSubscription = makeCreateEntityController<ISubscription, ISubscriptionInput>({
  create: createSubscriptionUC({ uow: uow(), messageBroker: new RabbitMQ() }),
  requestValidator: makeSubscribeValidator(),
});

export default createSubscription;

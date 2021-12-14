import { makeUnsubscribeValidator } from '../../../validators/schemas/http-requests/subscription';
import { Unsubscribe } from '../../../validators/types/subscription';
import makeDeleteEntityController from '../../controllers/delete-entity';
import uow from '../../external/repositories/mongodb/unit-of-work';
import { DeletedEntity } from '../../external/repositories/repository.types';
import { deleteSubscriptionUC } from '../../use-cases/delete-subscription';

const deleteSubscription = makeDeleteEntityController<DeletedEntity, Unsubscribe>({
  deleteAll: deleteSubscriptionUC(uow()),
  requestValidator: makeUnsubscribeValidator(),
});

export default deleteSubscription;

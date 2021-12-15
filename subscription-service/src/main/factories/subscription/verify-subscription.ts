import { makeVerifySubscriptionValidator } from '../../../validators/schemas/http-requests/subscription';
import { Verify } from '../../../validators/types/subscription';
import makeUpdateEntityController from '../../controllers/update-entity';
import uow from '../../external/repositories/mongodb/unit-of-work';
import { verifySubscriptionUC } from '../../use-cases/verify-subscription';

const verifySubscription = makeUpdateEntityController<{ verified: boolean }, Verify>({
  update: verifySubscriptionUC(uow()),
  requestValidator: makeVerifySubscriptionValidator(),
});

export default verifySubscription;

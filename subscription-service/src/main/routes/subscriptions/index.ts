import { Router } from 'express';

import { adaptExpressRoute } from '../../adapters/express-route-adapter';
import createSubscription from '../../factories/subscription/create-subscription';
import deleteSubscription from '../../factories/subscription/delete-subscription';
import verifySubscription from '../../factories/subscription/verify-subscription';

const router = Router();

router.get('/:id/cancel', adaptExpressRoute(deleteSubscription));
router.get('/:id/verify', adaptExpressRoute(verifySubscription));
router.post('/', adaptExpressRoute(createSubscription));

export default router;

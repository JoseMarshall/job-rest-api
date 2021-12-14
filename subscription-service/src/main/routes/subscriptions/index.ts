import { Router } from 'express';

import { adaptExpressRoute } from '../../adapters/express-route-adapter';
import createSubscription from '../../factories/subscription/create-subscription';
import deleteSubscription from '../../factories/subscription/delete-subscription';
import verifySubscription from '../../factories/subscription/verify-subscription';

const router = Router();

router.post('/', adaptExpressRoute(createSubscription));
router.patch('/:id', adaptExpressRoute(verifySubscription));
router.delete('/:id', adaptExpressRoute(deleteSubscription));

export default router;

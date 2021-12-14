import { Router } from 'express';

import { adaptExpressRoute } from '../../adapters/express-route-adapter';
import createJob from '../../factories/job/create-job';
import deleteJob from '../../factories/job/delete-one-job';
import getOneJob from '../../factories/job/get-one-job';
import getAllJobs from '../../factories/job/list-jobs';
import updateOneJob from '../../factories/job/update-job';

const router = Router();

router.get('/:id', adaptExpressRoute(getOneJob));
router.get('/', adaptExpressRoute(getAllJobs));
router.patch('/:id', adaptExpressRoute(updateOneJob));
router.post('/', adaptExpressRoute(createJob));
router.delete('/:id', adaptExpressRoute(deleteJob));

export default router;

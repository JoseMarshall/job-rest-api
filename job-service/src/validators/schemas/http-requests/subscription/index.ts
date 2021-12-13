import { HttpRequest } from '../../../../main/adapters/adapters.types';
import subscribeSchemaValidator from './subscribe-schema';
import unsubscribeJobSchemaValidator from './unsubscribe-schema';

export const makeSubscribeValidator = () => async (req: HttpRequest) =>
  subscribeSchemaValidator(req.body);

export const makeUnsubscribeValidator = () => async (req: HttpRequest) =>
  unsubscribeJobSchemaValidator(req.params);

import { makeRequestBodySchema } from '../../../builders';
import { subscriptionSchema } from '../../entities';

// eslint-disable-next-line import/prefer-default-export
export const createSubscriptionRequestBodySchema = makeRequestBodySchema(
  {
    name: subscriptionSchema.properties.name,
    email: subscriptionSchema.properties.email,
  },
  subscriptionSchema.required
);

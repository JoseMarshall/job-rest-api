import { makeGeneralResponseBodySchema } from '../../../builders';
import { subscriptionSchema } from '../../entities';

// eslint-disable-next-line import/prefer-default-export
export const createSubscriptionResponseBodySchema = makeGeneralResponseBodySchema(
  subscriptionSchema.properties,
  subscriptionSchema.required
);

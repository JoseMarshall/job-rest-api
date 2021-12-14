import { makeMsgBodySchema, makeBooleanSchema } from '../../../builders';

// eslint-disable-next-line import/prefer-default-export
export const verifySubscriptionResponseBodySchema = makeMsgBodySchema({
  required: ['verified'],
  properties: {
    verified: makeBooleanSchema('Indicates that this subscription has been verified'),
  },
});

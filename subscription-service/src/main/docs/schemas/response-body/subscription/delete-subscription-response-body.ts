import { makeBooleanSchema, makeMsgBodySchema } from '../../../builders';

// eslint-disable-next-line import/prefer-default-export
export const deleteSubscriptionResponseBodySchema = makeMsgBodySchema({
  required: ['deleted'],
  properties: {
    deleted: makeBooleanSchema('Indicates that this subscription has been deleted'),
  },
});

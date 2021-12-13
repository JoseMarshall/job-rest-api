import { v4 as uuid } from 'uuid';

import { ISubscription, ISubscriptionInput } from './subscription.types';

// eslint-disable-next-line import/prefer-default-export
export const makeSubscription = (data: ISubscriptionInput, id?: string): ISubscription => ({
  id: id ?? uuid(),
  ...data,
  isDeleted: false,
  createdAt: new Date(),
  updatedAt: new Date(),
});

import { CollectionNames } from '../src/constants';
import jobs from './collections/job-collection';
import subscriptions from './collections/subscription-collection';

interface CollectionElement {
  id: string;
  [x: string]: unknown;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default {
  [CollectionNames.Jobs]: jobs,
  [CollectionNames.Subscriptions]: subscriptions,
} as Record<`${CollectionNames}`, ReadonlyArray<CollectionElement>>;

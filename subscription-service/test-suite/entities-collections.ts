import { CollectionNames } from '../src/constants';
import subscriptions from './collections/subscription-collection';

interface CollectionElement {
  id: string;
  [x: string]: unknown;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default {
  [CollectionNames.Subscriptions]: subscriptions,
} as Record<CollectionNames.Subscriptions, ReadonlyArray<CollectionElement>>;

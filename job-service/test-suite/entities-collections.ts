import { CollectionNames } from '../src/constants';
import jobs from './collections/job-collection';

interface CollectionElement {
  id: string;
  [x: string]: unknown;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default {
  [CollectionNames.Jobs]: jobs,
} as Record<CollectionNames.Jobs, ReadonlyArray<CollectionElement>>;

import { Document, Model } from 'mongoose';

export interface MakeGetAllEntitiesDependencies<K> {
  projection?: Record<string, 0 | 1 | boolean>;
  formatData?: (data: ReadonlyArray<Document>) => ReadonlyArray<K>;
}

interface TotalCount {
  total: number;
}

export interface GetAllEntitiesAggregatedData<T> {
  data: ReadonlyArray<T>;
  count: TotalCount[];
}

export interface MakeGetAllEntityData<D extends Document, K> {
  model: Model<D>;
  options: MakeGetAllEntitiesDependencies<K>;
}

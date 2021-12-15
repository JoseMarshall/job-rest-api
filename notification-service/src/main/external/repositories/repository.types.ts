import { ISubscription } from '../../../entities/subscription/subscription.types';

export interface GetAllEntitiesData<T> {
  data: ReadonlyArray<T>;
  count: number;
}

export type QueryGetAll = {
  page: number;
  limit?: number;
  [x: string]: string | number | boolean;
};

export interface IRepository<T> {
  getAll<O>(query: QueryGetAll, options: O): Promise<GetAllEntitiesData<T>>;
}

export interface IUnitOfWork {
  makeSubscriptionRepository: () => IRepository<ISubscription>;
}

export interface DatabaseHelper<
  Collection = unknown,
  Model = unknown,
  Schema = unknown,
  Instance = unknown
> {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  getCollection(name: string): Collection | undefined;
  getModel(name: string, schema: Schema): Model;
  getInstance(): Instance;
  clearCollection?: (name: string) => Promise<void>;
}

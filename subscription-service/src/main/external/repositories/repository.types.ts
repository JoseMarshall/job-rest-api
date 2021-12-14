import { Entity } from '../../../entities/entity.types';
import { ISubscription } from '../../../entities/subscription/subscription.types';

export type Query = Record<string, any>;

export interface DeletedEntity {
  deleted: boolean;
}

export interface IRepository<T> {
  add(entity: T): Promise<T>;
  update(query: Query, body: Omit<Record<string, any>, keyof Entity>): Promise<T>;
  remove(query: Query): Promise<DeletedEntity>;
}

export interface IUnitOfWork {
  transaction: unknown;
  makeSubscriptionRepository: () => IRepository<ISubscription>;
  commitChanges(): Promise<void>;
  rollback(): Promise<void>;
  startTransaction(): Promise<void>;
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

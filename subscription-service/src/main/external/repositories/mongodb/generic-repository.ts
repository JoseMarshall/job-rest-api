import { ClientSession, Document, Model } from 'mongoose';

import { Entity } from '../../../../entities/entity.types';
import { IRepository } from '../repository.types';
import { makeCreateEntity, makeDeleteOneEntity, makeUpdateOneEntity } from './methods';

function GenericRepository<D extends Document, T extends Entity>(
  model: Model<D>,
  transaction: ClientSession
): IRepository<T> {
  const repository: IRepository<T> = {
    async add(entity: T) {
      return makeCreateEntity<D, T>({ model, transaction })(entity);
    },
    async remove(query) {
      return makeDeleteOneEntity<D>({ model, transaction })(query);
    },
    async update(query, body) {
      return makeUpdateOneEntity<D, T>({ model, transaction })(query, body);
    },
  };
  return repository;
}

export default GenericRepository;

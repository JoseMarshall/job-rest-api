import { Document, Model } from 'mongoose';

import { Entity } from '../../../../entities/entity.types';
import { IRepository } from '../repository.types';
import { makeGetAllEntities } from './methods';

function GenericRepository<D extends Document, T extends Entity>(model: Model<D>): IRepository<T> {
  const repository: IRepository<T> = {
    async getAll(query, options) {
      return makeGetAllEntities<D, T>({ model, options })(query);
    },
  };
  return repository;
}

export default GenericRepository;

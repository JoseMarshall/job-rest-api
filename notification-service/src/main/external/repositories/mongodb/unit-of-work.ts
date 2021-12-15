import { IUnitOfWork } from '../repository.types';
import BaseRepository from './generic-repository';
import { SubscriptionModel } from './models';

async function UnitOfWork() {
  const uow: IUnitOfWork = {
    makeSubscriptionRepository() {
      return BaseRepository(SubscriptionModel);
    },
  };
  return uow;
}

export default UnitOfWork;

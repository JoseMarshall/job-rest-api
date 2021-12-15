import { IUnitOfWork } from '../repository.types';
import BaseRepository from './generic-repository';
import { MongoHelper } from './helpers/mongo-helper';
import { JobModel } from './models';

async function UnitOfWork() {
  const uow: IUnitOfWork = {
    transaction: null,
    makeJobRepository() {
      return BaseRepository(JobModel, this.transaction);
    },
    async commitChanges() {
      await this.transaction.commitTransaction();
      this.transaction.endSession();
    },
    async rollback() {
      await this.transaction.abortTransaction();
      this.transaction.endSession();
    },
    async startTransaction() {
      this.transaction = await MongoHelper.getInstance().startSession();
      this.transaction.startTransaction();
    },
  };
  return uow;
}

export default UnitOfWork;

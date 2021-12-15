import { Document, FilterQuery } from 'mongoose';

import { DeletedEntity, Query } from '../../repository.types';
import { queryGuard } from '../helpers';
import { MakeDeleteOneEntityData } from '../mongoose.types';

// eslint-disable-next-line import/prefer-default-export
export function makeDeleteOneEntity<D extends Document>({
  model,
  transaction,
}: MakeDeleteOneEntityData<D>) {
  return async (query: Query) => {
    const doc = await queryGuard<D>(
      model
        .findOneAndUpdate(
          { isDeleted: false, ...query } as FilterQuery<unknown>,
          { isDeleted: true } as FilterQuery<unknown>,
          {
            projection: {
              id: 1,
              isDeleted: 1,
              createdAt: 1,
              updatedAt: 1,
            },
            new: true,
            session: transaction?.id ? transaction : undefined,
          }
        )
        .lean()
    );
    return doc as unknown as DeletedEntity;
  };
}

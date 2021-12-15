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
    await queryGuard<D>(
      model
        .deleteOne(query as FilterQuery<unknown>, {
          session: transaction?.id ? transaction : undefined,
        })
        .lean()
    );
    return { deleted: true } as DeletedEntity;
  };
}

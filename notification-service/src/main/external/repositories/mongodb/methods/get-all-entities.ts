import { Document } from 'mongoose';

import { QueryGetAll } from '../../repository.types';
import { queryGuard } from '../helpers';
import { GetAllEntitiesAggregatedData, MakeGetAllEntityData } from '../mongoose.types';

// eslint-disable-next-line import/prefer-default-export
export function makeGetAllEntities<D extends Document, K>({
  model,
  options,
}: MakeGetAllEntityData<D, K>) {
  return async (query: QueryGetAll & Record<string, unknown>) => {
    const { page, limit, ...filteredQuery } = query;
    const skip = limit > 0 ? limit * (page - 1) : 0;

    const document = await queryGuard<GetAllEntitiesAggregatedData<D>[]>(
      model
        .aggregate([
          {
            $facet: {
              data: [
                {
                  $match: filteredQuery,
                },
                { $skip: skip },
                { $limit: limit || 25 },
                {
                  $project: {
                    _id: 0,
                    ...(options.projection ?? {}),
                  },
                },
              ],
              count: [
                {
                  $match: filteredQuery,
                },
                { $count: 'total' },
              ],
            },
          },
        ])
        .exec()
    );

    return {
      data: options.formatData
        ? options.formatData(document[0].data)
        : (document[0].data as unknown as ReadonlyArray<K>),
      count: document[0].count[0]?.total ?? 0,
    };
  };
}

import { v4 as uuid } from 'uuid';

import { IJob, IJobInput } from './job.types';

// eslint-disable-next-line import/prefer-default-export
export const makeJob = (data: IJobInput, id?: string): IJob => ({
  id: id ?? uuid(),
  ...data,
  isDeleted: false,
  createdAt: new Date(),
  updatedAt: new Date(),
});

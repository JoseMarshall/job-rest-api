import { IJobInput } from '../../../entities/job/job.types';
import { GetAll, Optional } from '../sub-types';

export interface GetAllJobs extends GetAll {
  title?: string;
  'company-name'?: string;
  'company-market'?: string;
  skills?: string;
  type?: string;
  planet?: string;
  country?: string;
  city?: string;
}

export interface GetOneJob {
  id: string;
}

export interface DeleteOneJob {
  id: string;
}

export interface UpdateOneJob {
  params: { id: string };
  body: Optional<IJobInput>;
}

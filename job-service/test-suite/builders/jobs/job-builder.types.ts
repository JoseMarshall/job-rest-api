import { Address } from '../../../src/entities/entity.types';
import { Announcer } from '../../../src/entities/job/job.types';

export interface IJob {
  id?: string;
  title?: string;
  description?: string;
  skills?: ReadonlyArray<string>;
  companyMarket?: string;
  companyName?: string;
  type?: string;
  location?: Address;
  companyWebsite?: string;
  responsabilities?: ReadonlyArray<string>;
  announcedBy?: Announcer;
}

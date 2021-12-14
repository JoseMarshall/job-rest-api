import { Address, Entity } from '../entity.types';

export interface Announcer {
  name: string;
  role: string;
  email: string;
}

export interface IJob extends Entity {
  title: string;
  description: string;
  skills: ReadonlyArray<string>;
  companyMarket: string;
  companyName: string;
  type: string;
  location: Address;
  companyWebsite?: string;
  responsabilities?: ReadonlyArray<string>;
  announcedBy?: Announcer;
}

export type IJobInput = Omit<IJob, keyof Entity>;

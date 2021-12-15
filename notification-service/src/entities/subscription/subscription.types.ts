import { Entity } from '../entity.types';

export interface ISubscription extends Entity {
  email: string;
  name: string;
  verified: boolean;
}

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
import faker from 'faker';
import { v4 as uuid } from 'uuid';

import { ISubscription } from './subscription-builder.types';

class SubscriptionBuilder {
  private entity: ISubscription;

  constructor(entity?: ISubscription) {
    this.entity = entity ?? {};
  }

  build() {
    return this.entity;
  }

  withId(id?: string) {
    this.entity.id = id ?? uuid();
    return this;
  }

  withName(name?: string) {
    this.entity.name = name ?? faker.name.findName();
    return this;
  }

  withEmail(email?: string) {
    this.entity.email = email ?? faker.internet.email();
    return this;
  }

  withVerified(verified?: boolean) {
    this.entity.verified = verified ?? faker.datatype.boolean();
    return this;
  }

  /**
   * This approach allows easy modification of test values
   * @returns the subscription with all fields except the id
   */
  withAll() {
    return this.withName().withEmail().withVerified();
  }
}

export default SubscriptionBuilder;

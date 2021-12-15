/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
import faker from 'faker';
import { v4 as uuid } from 'uuid';

import { Address } from '../../../src/entities/entity.types';
import { Announcer } from '../../../src/entities/job/job.types';
import { IJob } from './job-builder.types';

class JobBuilder {
  private entity: IJob;

  private planets = ['earth, mars'];

  constructor(entity?: IJob) {
    this.entity = entity ?? {};
  }

  build() {
    return this.entity;
  }

  withId(id?: string) {
    this.entity.id = id ?? uuid();
    return this;
  }

  withTitle(title?: string) {
    this.entity.title = title ?? faker.commerce.productName();
    return this;
  }

  withDescription(description?: string) {
    this.entity.description = description ?? faker.commerce.productDescription();
    return this;
  }

  withSkills(skills?: ReadonlyArray<string>) {
    this.entity.skills = skills ?? [
      faker.commerce.productMaterial(),
      faker.commerce.productMaterial(),
      faker.commerce.productMaterial(),
    ];
    return this;
  }

  withResponsabilities(responsabilities?: ReadonlyArray<string>) {
    this.entity.responsabilities = responsabilities ?? [
      faker.lorem.sentence(6),
      faker.lorem.sentence(5),
      faker.lorem.sentence(10),
    ];
    return this;
  }

  withCompanyMarket(companyMarket?: string) {
    this.entity.companyMarket = companyMarket ?? faker.company.bsBuzz();
    return this;
  }

  withCompanyName(companyName?: string) {
    this.entity.companyName = companyName ?? faker.company.companyName();
    return this;
  }

  withCompanyWebsite(companyWebsite?: string) {
    this.entity.companyWebsite = companyWebsite ?? faker.internet.url();
    return this;
  }

  withType(type?: string) {
    this.entity.type = type ?? faker.commerce.department();
    return this;
  }

  withLocation(location?: Address) {
    this.entity.location = location ?? {
      planet: this.planets[faker.datatype.number({ min: 0, max: this.planets.length - 1 })],
      city: faker.address.cityName(),
      country: faker.address.country(),
    };
    return this;
  }

  withAnnouncedBy(announcedBy?: Announcer) {
    this.entity.announcedBy = announcedBy ?? {
      name: faker.name.findName(),
      email: faker.internet.email(),
      role: faker.company.bsAdjective(),
    };
    return this;
  }

  /**
   * This approach allows easy modification of test values
   * @returns the job with all fields except the id
   */
  withAll() {
    return this.withTitle()
      .withDescription()
      .withSkills()
      .withCompanyMarket()
      .withCompanyName()
      .withType()
      .withLocation()
      .withCompanyWebsite()
      .withResponsabilities()
      .withAnnouncedBy();
  }
}

export default JobBuilder;

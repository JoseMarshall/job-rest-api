import SubscriptionBuilder from '../builders/subscription/subscription-builder';

export default Array.from({ length: 20 }, () => ({
  ...new SubscriptionBuilder().withAll().withId().build(),
  isDeleted: false,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

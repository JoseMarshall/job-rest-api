import JobBuilder from '../builders/jobs/job-builder';

export default Array.from({ length: 20 }, () => ({
  ...new JobBuilder().withAll().withId().build(),
  isDeleted: false,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

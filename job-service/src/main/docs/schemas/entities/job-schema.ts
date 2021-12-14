import { makeArraySchema, makeObjectSchema, makeStringSchema } from '../../builders';

// eslint-disable-next-line import/prefer-default-export
export const jobSchema = makeObjectSchema({
  required: ['title', 'description', 'skills', 'companyMarket', 'companyName', 'type', 'location'],
  properties: {
    title: makeStringSchema({
      description: 'The job offer title',
      example: 'Backend Developer',
    }),
    description: makeStringSchema({
      description: 'The job short description',
      example:
        'We’re now looking for a Developer (can be remote or onsite) to work with us, as an architect and builder, developing and maintaining our online shop and community. You’ll be a builder and fundamental team member, with a voice on the course of the company, not just another cog in a machine',
    }),
    skills: makeArraySchema({
      minItems: 1,
      description: 'The required skills for this job',
      example: ['nodejs', 'react', 'nextjs'],
      items: makeStringSchema({
        description: 'One of the required skills',
      }),
    }),
    responsabilities: makeArraySchema({
      description: 'The responsabilities in this job',
      example: [
        'Develop new functionality and features',
        'Think about architecture and infrastructure solutions',
        'Implement design and front-end changes',
      ],
      items: makeStringSchema({
        description: 'One of the responsabilities',
      }),
    }),
    companyMarket: makeStringSchema({
      example: 'Software House',
    }),
    companyName: makeStringSchema({
      example: 'TAIKAI',
      description: 'The name of the company announcing the job',
    }),
    companyWebsite: makeStringSchema({
      example: 'https://taikai.network',
      description: 'The website of the company announcing the job',
    }),
    type: makeStringSchema({
      example: 'Full Time',
    }),
    location: makeObjectSchema({
      properties: {
        planet: makeStringSchema({ description: 'The planet name of this job', example: 'Earth' }),
        country: makeStringSchema({
          description: 'The country name of this job',
          example: 'Portugal',
        }),
        city: makeStringSchema({ description: 'The city name of this job', example: 'Porto' }),
      },
    }),
    announcedBy: makeObjectSchema({
      properties: {
        name: makeStringSchema({
          description: 'The name of the person posting this job',
          example: 'John Doe',
        }),
        role: makeStringSchema({
          description: 'The role of this person in the company',
          example: 'HR - Tech Recruiter',
        }),
        email: makeStringSchema({
          description: 'The email of the person posting this job',
          example: 'john.doe@taikai.com',
          format: 'email',
        }),
      },
    }),
  },
});

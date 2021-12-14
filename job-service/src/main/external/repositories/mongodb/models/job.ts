import { Schema } from 'mongoose';

import { CollectionNames } from '../../../../../constants';
import { MongoHelper } from '../helpers/mongo-helper';
import SchemaConstructor from './schema-constructor';

const addressSchema = new Schema(
  {
    planet: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
  },
  {
    _id: false,
  }
);

const announcerSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
  },
  {
    _id: false,
  }
);

const jobSchema = SchemaConstructor({
  title: { type: String, required: true, trim: true, maxlength: 50 },
  description: { type: String, required: true, trim: true },
  skills: [{ type: String, required: true, trim: true }],
  companyMarket: { type: String, required: true, trim: true },
  companyName: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
  location: addressSchema,
  companyWebsite: { type: String, required: false, trim: true },
  responsabilities: [{ type: String, required: false, trim: true }],
  announcedBy: announcerSchema,
});

jobSchema.set('toObject', {
  virtuals: true,
});

jobSchema.set('toJSON', {
  virtuals: true,
});

export default MongoHelper.getModel(CollectionNames.Jobs, jobSchema);

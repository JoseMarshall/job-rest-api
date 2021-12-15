import { CollectionNames } from '../../../../../constants';
import { MongoHelper } from '../helpers/mongo-helper';
import SchemaConstructor from './schema-constructor';

const subscriptionSchema = SchemaConstructor({
  name: { type: String, required: true, trim: true, maxlength: 50 },
  email: { type: String, required: true, trim: true, unique: true, lowercase: true },
  verified: { type: Boolean, required: true, default: false },
});

subscriptionSchema.set('toObject', {
  virtuals: true,
});

subscriptionSchema.set('toJSON', {
  virtuals: true,
});

export default MongoHelper.getModel(CollectionNames.Subscriptions, subscriptionSchema);

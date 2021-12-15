import { DocumentDefinition, Schema, SchemaDefinition } from 'mongoose';

export default (schemaDefinition: SchemaDefinition<DocumentDefinition<any>>) =>
  new Schema<any, any>(
    {
      id: { type: String, required: true, trim: true, unique: true, index: true },
      _id: { type: String, select: false },
      isDeleted: { type: Boolean, default: false },
      ...schemaDefinition,
    },
    { timestamps: true, versionKey: false }
  );

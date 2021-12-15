import { ClientSession, Document, Model } from 'mongoose';

export interface MakeUpdateOneEntityData<D extends Document> {
  model: Model<D>;
  transaction?: ClientSession;
}

export interface MakeCreateEntityData<D extends Document> {
  model: Model<D>;
  transaction?: ClientSession;
}

export interface MakeDeleteOneEntityData<D extends Document> {
  model: Model<D>;
  transaction?: ClientSession;
}

import { Document, Model } from 'mongoose';

export interface RiskOwnerAttributes {
  name: string;
  email: string;
  role: string;
  title: string;
}

export interface RiskOwnerDocument extends RiskOwnerAttributes, Document {
  createdAt: Date;
  updatedAt: Date;
}

export interface RiskOwnerModel extends Model<RiskOwnerDocument> {}

import { Schema, model } from 'mongoose';
import { RiskOwnerDocument, RiskOwnerModel } from '../types/RiskOwner';

const riskOwnerSchema = new Schema<RiskOwnerDocument, RiskOwnerModel>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true, default:'User', enum: ['User', 'Owner']},
    title: { type: String, required: true },
  }, { timestamps: true });
  
const RiskOwner = model('RiskOwner', riskOwnerSchema);

export default RiskOwner;



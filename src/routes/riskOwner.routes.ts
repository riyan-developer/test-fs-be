import { Router } from 'express';

import { createRiskOwner, getAllRiskOwners, updateRiskOwner, deleteRiskOwner, getRiskOwnerById } from '../controllers/riskOwner.controller';
import { createRiskOwnerValidations } from '../validations/riskOwner.validations';

const router = Router();

router.route('/').get(getAllRiskOwners).post(createRiskOwnerValidations, createRiskOwner);

router.route('/:id').get(getRiskOwnerById).patch(updateRiskOwner).delete(deleteRiskOwner);

export default router;
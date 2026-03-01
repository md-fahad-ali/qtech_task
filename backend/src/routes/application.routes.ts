import { Router } from 'express';
import { createApplication, getApplications } from '../controllers/application.controller';
import { validate } from '../middleware/validate.middleware';
import { createApplicationSchema } from '../validators/schema.validators';

const router = Router();

router.get('/', getApplications);
router.post('/', validate(createApplicationSchema), createApplication);

export default router;

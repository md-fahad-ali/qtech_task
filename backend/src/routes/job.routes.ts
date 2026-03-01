import { Router } from 'express';
import { getJobs, getJobById, createJob, deleteJob, updateJob } from '../controllers/job.controller';
import { validate } from '../middleware/validate.middleware';
import { createJobSchema } from '../validators/schema.validators';

const router = Router();

router.get('/', getJobs);
router.get('/:id', getJobById);
router.post('/', validate(createJobSchema), createJob);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

export default router;

import { Request, Response, NextFunction } from 'express';
import Application from '../models/Application';
import Job from '../models/Job';

// GET /api/applications
export const getApplications = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const applications = await Application.find()
            .populate('job_id', 'title company')
            .sort({ created_at: -1 });
        res.status(200).json(applications);
    } catch (error) {
        next(error);
    }
};

// POST /api/applications
export const createApplication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { job_id, name, email, resume_link, cover_note } = req.body;

        // Check if the job exists
        const job = await Job.findById(job_id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        const application = new Application({
            job_id,
            name,
            email,
            resume_link,
            cover_note
        });

        const savedApplication = await application.save();
        res.status(201).json(savedApplication);
    } catch (error) {
        next(error);
    }
};

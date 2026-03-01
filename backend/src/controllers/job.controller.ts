import { Request, Response, NextFunction } from 'express';
import Job from '../models/Job';

// GET /api/jobs
export const getJobs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { q, category, location, section } = req.query;
        let query: any = {};

        if (q) {
            query.$or = [
                { title: { $regex: q as string, $options: 'i' } },
                { company: { $regex: q as string, $options: 'i' } }
            ];
        }

        if (category) {
            query.category = { $regex: new RegExp(`^${category as string}$`, 'i') };
        }

        if (location) {
            query.location = { $regex: new RegExp(`^${location as string}$`, 'i') };
        }

        if (section) {
            query.section = section as string;
        }

        let dbQuery = Job.find(query).sort({ created_at: -1 });

        const limitStr = req.query.limit as string;
        if (limitStr) {
            const limit = parseInt(limitStr, 10);
            if (!isNaN(limit) && limit > 0) {
                dbQuery = dbQuery.limit(limit);
            }
        }

        const jobs = await dbQuery;
        res.status(200).json(jobs);
    } catch (error) {
        next(error);
    }
};

// GET /api/jobs/:id
export const getJobById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json(job);
    } catch (error) {
        next(error);
    }
};

// POST /api/jobs (Admin)
export const createJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const job = new Job(req.body);
        const savedJob = await job.save();
        res.status(201).json(savedJob);
    } catch (error) {
        next(error);
    }
};

// PUT /api/jobs/:id (Admin)
export const updateJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Return updated document
            runValidators: true // Validate against schema
        });
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json(job);
    } catch (error) {
        next(error);
    }
};

// DELETE /api/jobs/:id (Admin)
export const deleteJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        next(error);
    }
};

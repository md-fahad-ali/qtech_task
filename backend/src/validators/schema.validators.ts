import { z } from 'zod';
import mongoose from 'mongoose';

const objectIdSchema = z.string().refine((val: string) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId',
});

export const createJobSchema = z.object({
    body: z.object({
        title: z.string().min(1, 'Title is required'),
        company: z.string().min(1, 'Company is required'),
        location: z.string().min(1, 'Location is required'),
        category: z.string().min(1, 'Category is required'),
        description: z.string().min(1, 'Description is required'),
    }),
});

export const createApplicationSchema = z.object({
    body: z.object({
        job_id: objectIdSchema,
        name: z.string().min(1, 'Name is required'),
        email: z.string().email('Invalid email address'),
        resume_link: z.string().url('Invalid URL for resume_link'),
        cover_note: z.string().optional(),
    }),
});

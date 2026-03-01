import mongoose, { Schema, Document } from 'mongoose';

export interface IJob extends Document {
    title: string;
    company: string;
    location: string;
    category: string;
    description: string;
    type: string;
    tags: string[];
    logo: string;
    section: 'featured' | 'latest';
    created_at: Date;
}

const JobSchema: Schema = new Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, default: 'Full Time' },
    tags: { type: [String], default: [] },
    logo: { type: String, default: '' },
    section: { type: String, enum: ['featured', 'latest'], required: true },
    created_at: { type: Date, default: () => new Date() },
});

export default mongoose.model<IJob>('Job', JobSchema);

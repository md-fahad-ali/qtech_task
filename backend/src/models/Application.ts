import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IApplication extends Document {
    job_id: Types.ObjectId;
    name: string;
    email: string;
    resume_link: string;
    cover_note?: string;
    created_at: Date;
}

const ApplicationSchema: Schema = new Schema({
    job_id: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    resume_link: { type: String, required: true },
    cover_note: { type: String },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: false }
});

export default mongoose.model<IApplication>('Application', ApplicationSchema);

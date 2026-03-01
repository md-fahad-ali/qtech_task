import express from 'express';
import cors from 'cors';
import path from 'path';
import jobRoutes from './routes/job.routes';
import applicationRoutes from './routes/application.routes';
import { errorHandler, notFound } from './middleware/error.middleware';

const app = express();

app.use(cors());
app.use(express.json());

// Serve company logos and other static assets
app.use('/public', express.static(path.join(__dirname, '../public')));

app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;

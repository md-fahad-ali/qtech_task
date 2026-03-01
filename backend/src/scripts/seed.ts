import mongoose from 'mongoose';
import Job from '../models/Job';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const MONGO_URI = process.env.MONGODB_URI || '';

const jobs = [
    // ── Featured Jobs (February 2026 — previous month) ────────────────────────
    {
        title: 'Email Marketing',
        company: 'Revolut',
        location: 'Madrid, Spain',
        description: 'Revolut is looking for Email Marketing to help team manage and optimize email campaigns.',
        type: 'Full Time',
        tags: ['Marketing', 'Design'],
        logo: '/public/logos/featured/revolut.svg',
        category: 'Marketing',
        section: 'featured',
        created_at: new Date('2026-02-03'),
    },
    {
        title: 'Brand Designer',
        company: 'Dropbox',
        location: 'San Francisco, US',
        description: 'Dropbox is looking for Brand Designer to help the team to create visual brand identity.',
        type: 'Full Time',
        tags: ['Design', 'Business'],
        logo: '/public/logos/featured/dropbox.svg',
        category: 'Design',
        section: 'featured',
        created_at: new Date('2026-02-06'),
    },
    {
        title: 'Email Marketing',
        company: 'Pitch',
        location: 'Berlin, Germany',
        description: 'Pitch is looking for Customer Manager to join marketing team.',
        type: 'Full Time',
        tags: ['Marketing'],
        logo: '/public/logos/featured/pitch.svg',
        category: 'Marketing',
        section: 'featured',
        created_at: new Date('2026-02-09'),
    },
    {
        title: 'Visual Designer',
        company: 'Blinkist',
        location: 'Granada, Spain',
        description: 'Blinkist is looking for Visual Designer to help team design visual content.',
        type: 'Full Time',
        tags: ['Design'],
        logo: '/public/logos/featured/blinkist.svg',
        category: 'Design',
        section: 'featured',
        created_at: new Date('2026-02-12'),
    },
    {
        title: 'Product Designer',
        company: 'ClassPass',
        location: 'Manchester, UK',
        description: 'ClassPass is looking for Product Designer to help us create amazing products.',
        type: 'Full Time',
        tags: ['Marketing', 'Design'],
        logo: '/public/logos/featured/classpass.svg',
        category: 'Design',
        section: 'featured',
        created_at: new Date('2026-02-15'),
    },
    {
        title: 'Lead Designer',
        company: 'Canva',
        location: 'Ontario, Canada',
        description: 'Canva is looking for Lead Engineer to develop new features.',
        type: 'Full Time',
        tags: ['Design', 'Business'],
        logo: '/public/logos/featured/canva.svg',
        category: 'Design',
        section: 'featured',
        created_at: new Date('2026-02-18'),
    },
    {
        title: 'Brand Strategist',
        company: 'GoDaddy',
        location: 'Marseille, France',
        description: 'GoDaddy is looking for Brand Strategist to join the team.',
        type: 'Full Time',
        tags: ['Marketing'],
        logo: '/public/logos/featured/godaddy.svg',
        category: 'Marketing',
        section: 'featured',
        created_at: new Date('2026-02-21'),
    },
    {
        title: 'Data Analyst',
        company: 'Twitter',
        location: 'San Diego, US',
        description: 'Twitter is looking for Data Analyst to help team design data solutions.',
        type: 'Full Time',
        tags: ['Technology'],
        logo: '/public/logos/featured/twitter.svg',
        category: 'Technology',
        section: 'featured',
        created_at: new Date('2026-02-24'),
    },

    // ── Latest Jobs (March 2026 — current month) ──────────────────────────────
    {
        title: 'Social Media Assistant',
        company: 'Nomad',
        location: 'Paris, France',
        description: 'Nomad is looking for a Social Media Assistant to help grow our online presence and engage with our audience across multiple platforms.',
        type: 'Full Time',
        tags: ['Marketing', 'Design'],
        logo: '/public/logos/latest/nomad.svg',
        category: 'Marketing',
        section: 'latest',
        created_at: new Date('2026-03-01'),
    },
    {
        title: 'Brand Designer',
        company: 'Dropbox',
        location: 'San Francisco, USA',
        description: 'Dropbox is hiring a Brand Designer to craft compelling visual identities and maintain brand consistency across all channels.',
        type: 'Full Time',
        tags: ['Marketing', 'Design'],
        logo: '/public/logos/latest/dropbox.svg',
        category: 'Design',
        section: 'latest',
        created_at: new Date('2026-03-01'),
    },
    {
        title: 'Interactive Developer',
        company: 'Terraform',
        location: 'Hamburg, Germany',
        description: 'Terraform is looking for an Interactive Developer to build engaging, data-driven web experiences for enterprise clients.',
        type: 'Full Time',
        tags: ['Marketing', 'Design'],
        logo: '/public/logos/latest/terraform.svg',
        category: 'Technology',
        section: 'latest',
        created_at: new Date('2026-03-01'),
    },
    {
        title: 'HR Manager',
        company: 'Packer',
        location: 'Lucern, Switzerland',
        description: 'Packer is seeking an experienced HR Manager to lead talent acquisition, employee relations, and culture-building initiatives.',
        type: 'Full Time',
        tags: ['Marketing', 'Design'],
        logo: '/public/logos/latest/packer.svg',
        category: 'Human Resource',
        section: 'latest',
        created_at: new Date('2026-03-01'),
    },
    {
        title: 'Social Media Assistant',
        company: 'Netlify',
        location: 'Paris, France',
        description: 'Netlify is looking for a Social Media Assistant to curate content and build community across social platforms.',
        type: 'Full Time',
        tags: ['Marketing', 'Design'],
        logo: '/public/logos/latest/netlify.svg',
        category: 'Marketing',
        section: 'latest',
        created_at: new Date('2026-03-01'),
    },
    {
        title: 'Brand Designer',
        company: 'Maze',
        location: 'San Francisco, USA',
        description: 'Maze is hiring a Brand Designer to define and evolve the visual language of our product and marketing materials.',
        type: 'Full Time',
        tags: ['Marketing', 'Design'],
        logo: '/public/logos/latest/maze.svg',
        category: 'Design',
        section: 'latest',
        created_at: new Date('2026-03-01'),
    },
    {
        title: 'Interactive Developer',
        company: 'Udacity',
        location: 'Hamburg, Germany',
        description: 'Udacity is looking for an Interactive Developer to create rich, interactive learning experiences for our global student base.',
        type: 'Full Time',
        tags: ['Marketing', 'Design'],
        logo: '/public/logos/latest/udacity.svg',
        category: 'Technology',
        section: 'latest',
        created_at: new Date('2026-03-01'),
    },
    {
        title: 'HR Manager',
        company: 'Webflow',
        location: 'Lucern, Switzerland',
        description: 'Webflow is seeking an HR Manager to scale our people operations and build a world-class distributed team.',
        type: 'Full Time',
        tags: ['Marketing', 'Design'],
        logo: '/public/logos/latest/webflow.svg',
        category: 'Human Resource',
        section: 'latest',
        created_at: new Date('2026-03-01'),
    },
];

async function seed() {
    if (!MONGO_URI) {
        console.error('❌  MONGODB_URI is not set in .env');
        process.exit(1);
    }

    await mongoose.connect(MONGO_URI);
    console.log('✅  Connected to MongoDB');

    const deleted = await Job.deleteMany({});
    console.log(`🗑️   Cleared ${deleted.deletedCount} existing jobs`);

    const inserted = await Job.insertMany(jobs);
    console.log(`🌱  Seeded ${inserted.length} jobs successfully\n`);

    console.table(
        inserted.map((j: any) => ({
            section: j.section,
            title: j.title,
            company: j.company,
            created_at: j.created_at.toISOString().slice(0, 10),
        }))
    );

    await mongoose.disconnect();
    console.log('\n👋  Done!');
}

seed().catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
});

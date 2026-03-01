'use client';

import { useEffect, useState } from 'react';
import AuthGuard from '@/components/admin/AuthGuard';
import Sidebar from '@/components/admin/Sidebar';
import AddJobModal from '@/components/admin/AddJobModal';
import { Plus, Trash2, Pencil } from 'lucide-react';
import EditJobModal from '@/components/admin/EditJobModal';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

interface Job {
    _id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    section: string;
    category: string;
    description: string;
    tags: string[];
    logo?: string;
}

export default function AdminJobsPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [editingJob, setEditingJob] = useState<Job | null>(null);

    async function fetchJobs() {
        try {
            const res = await fetch(`${API_URL}/api/jobs`, { cache: 'no-store' });
            const data = await res.json();
            setJobs(data);
        } catch {
            // silent
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { fetchJobs(); }, []);

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this job?')) return;
        setDeletingId(id);
        try {
            await fetch(`${API_URL}/api/jobs/${id}`, { method: 'DELETE' });
            setJobs((j) => j.filter((job) => job._id !== id));
        } catch {
            alert('Failed to delete job.');
        } finally {
            setDeletingId(null);
        }
    }

    const sectionBadge = (section: string) =>
        section === 'featured'
            ? 'bg-[#4640DE]/10 text-[#4640DE]'
            : 'bg-[#56CDAD]/10 text-[#56CDAD]';

    return (
        <AuthGuard>
            <div className="flex min-h-screen">
                <Sidebar />
                <main className="lg:ml-64 flex-1 p-4 lg:p-8 pt-20 lg:pt-8 w-full max-w-[100vw] overflow-x-hidden">
                    <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-[#25324B]">Jobs</h1>
                            <p className="text-[#7C8493] text-sm mt-1">{jobs.length} total listings</p>
                        </div>
                        <button
                            onClick={() => setShowModal(true)}
                            className="flex items-center gap-2 bg-[#4640DE] hover:bg-[#3833b3] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                        >
                            <Plus size={18} />
                            Add Job
                        </button>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                        {loading ? (
                            <div className="py-16 text-center text-[#7C8493]">Loading jobs...</div>
                        ) : jobs.length === 0 ? (
                            <div className="py-16 text-center text-[#7C8493]">No jobs found.</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <div className="min-w-[800px]">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="bg-[#F8F8FD] text-[#515B6F] text-left">
                                                <th className="px-6 py-4 font-semibold">Title</th>
                                                <th className="px-6 py-4 font-semibold">Company</th>
                                                <th className="px-6 py-4 font-semibold">Location</th>
                                                <th className="px-6 py-4 font-semibold">Section</th>
                                                <th className="px-6 py-4 font-semibold">Type</th>
                                                <th className="px-6 py-4 font-semibold">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {jobs.map((job) => (
                                                <tr key={job._id} className="hover:bg-gray-50/50 transition-colors">
                                                    <td className="px-6 py-4 font-medium text-[#25324B]">{job.title}</td>
                                                    <td className="px-6 py-4 text-[#515B6F]">{job.company}</td>
                                                    <td className="px-6 py-4 text-[#515B6F]">{job.location}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${sectionBadge(job.section)}`}>
                                                            {job.section}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-[#515B6F]">{job.type}</td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <button
                                                                onClick={() => {
                                                                    // Pass the full job object to a new EditJobModal or handle inline
                                                                    setEditingJob(job);
                                                                }}
                                                                className="text-[#4640DE] hover:text-[#3833b3] transition-colors"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(job._id)}
                                                                disabled={deletingId === job._id}
                                                                className="text-red-400 hover:text-red-600 transition-colors disabled:opacity-40"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {showModal && (
                <AddJobModal
                    onClose={() => setShowModal(false)}
                    onSuccess={fetchJobs}
                />
            )}
            {editingJob && (
                <EditJobModal
                    job={editingJob}
                    onClose={() => setEditingJob(null)}
                    onSuccess={fetchJobs}
                />
            )}
        </AuthGuard>
    );
}

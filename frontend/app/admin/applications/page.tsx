'use client';

import { useEffect, useState } from 'react';
import AuthGuard from '@/components/admin/AuthGuard';
import Sidebar from '@/components/admin/Sidebar';
import { ExternalLink } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

interface Application {
    _id: string;
    name: string;
    email: string;
    resume_link: string;
    cover_note?: string;
    created_at: string;
    job_id?: { title: string; company: string };
}

export default function AdminApplicationsPage() {
    const [apps, setApps] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchApps() {
            try {
                const res = await fetch(`${API_URL}/api/applications`, { cache: 'no-store' });
                const data = await res.json();
                setApps(data);
            } catch {
                // silent
            } finally {
                setLoading(false);
            }
        }
        fetchApps();
    }, []);

    return (
        <AuthGuard>
            <div className="flex min-h-screen">
                <Sidebar />
                <main className="lg:ml-64 flex-1 p-4 lg:p-8 pt-20 lg:pt-8 w-full max-w-[100vw] overflow-x-hidden">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-[#25324B]">Applications</h1>
                        <p className="text-[#7C8493] text-sm mt-1">{apps.length} total submissions</p>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                        {loading ? (
                            <div className="py-16 text-center text-[#7C8493]">Loading applications...</div>
                        ) : apps.length === 0 ? (
                            <div className="py-16 text-center text-[#7C8493]">No applications yet.</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <div className="min-w-[800px]">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="bg-[#F8F8FD] text-[#515B6F] text-left">
                                                <th className="px-6 py-4 font-semibold">Applicant</th>
                                                <th className="px-6 py-4 font-semibold">Email</th>
                                                <th className="px-6 py-4 font-semibold">Applied For</th>
                                                <th className="px-6 py-4 font-semibold">Resume</th>
                                                <th className="px-6 py-4 font-semibold">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {apps.map((app) => (
                                                <tr key={app._id} className="hover:bg-gray-50/50 transition-colors">
                                                    <td className="px-6 py-4 font-medium text-[#25324B]">{app.name}</td>
                                                    <td className="px-6 py-4 text-[#515B6F]">{app.email}</td>
                                                    <td className="px-6 py-4">
                                                        <div>
                                                            <p className="font-medium text-[#25324B]">{app.job_id?.title || '—'}</p>
                                                            <p className="text-xs text-[#7C8493]">{app.job_id?.company || ''}</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <a
                                                            href={app.resume_link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1 text-[#4640DE] hover:underline font-medium"
                                                        >
                                                            View <ExternalLink size={13} />
                                                        </a>
                                                    </td>
                                                    <td className="px-6 py-4 text-[#7C8493]">
                                                        {new Date(app.created_at).toLocaleDateString('en-US', {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric',
                                                        })}
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
        </AuthGuard>
    );
}

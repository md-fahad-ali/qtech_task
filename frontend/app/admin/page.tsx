'use client';

import { useEffect, useState } from 'react';
import { Briefcase, FileText, TrendingUp, Users } from 'lucide-react';
import AuthGuard from '@/components/admin/AuthGuard';
import Sidebar from '@/components/admin/Sidebar';
import StatsCard from '@/components/admin/StatsCard';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export default function AdminDashboard() {
    const [stats, setStats] = useState({ jobs: 0, featured: 0, latest: 0, applications: 0 });
    const [recentApplications, setRecentApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const [jobsRes, appsRes] = await Promise.all([
                    fetch(`${API_URL}/api/jobs`, { cache: 'no-store' }),
                    fetch(`${API_URL}/api/applications`, { cache: 'no-store' }),
                ]);
                const jobs = await jobsRes.json();
                const apps = await appsRes.json();
                setStats({
                    jobs: jobs.length,
                    featured: jobs.filter((j: any) => j.section === 'featured').length,
                    latest: jobs.filter((j: any) => j.section === 'latest').length,
                    applications: apps.length,
                });
                setRecentApplications(apps.slice(0, 5));
            } catch {
                // silent
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    return (
        <AuthGuard>
            <div className="flex min-h-screen">
                <Sidebar />
                <main className="lg:ml-64 flex-1 p-4 lg:p-8 pt-20 lg:pt-8 w-full max-w-[100vw] overflow-x-hidden">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-[#25324B]">Dashboard</h1>
                        <p className="text-[#7C8493] text-sm mt-1">Welcome back, Admin</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                        <StatsCard
                            label="Total Jobs"
                            value={stats.jobs}
                            icon={<Briefcase size={22} className="text-[#4640DE]" />}
                            color="bg-[#4640DE]/10"
                        />
                        <StatsCard
                            label="Featured Jobs"
                            value={stats.featured}
                            icon={<TrendingUp size={22} className="text-[#26A4FF]" />}
                            color="bg-[#26A4FF]/10"
                        />
                        <StatsCard
                            label="Latest Jobs"
                            value={stats.latest}
                            icon={<Briefcase size={22} className="text-[#56CDAD]" />}
                            color="bg-[#56CDAD]/10"
                        />
                        <StatsCard
                            label="Applications"
                            value={stats.applications}
                            icon={<FileText size={22} className="text-[#FF6550]" />}
                            color="bg-[#FF6550]/10"
                        />
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                        <Link
                            href="/admin/jobs"
                            className="bg-[#4640DE] text-white rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:bg-[#3833b3] transition-colors group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                                <Briefcase size={24} />
                            </div>
                            <div>
                                <p className="font-bold text-lg">Manage Jobs</p>
                                <p className="text-white/70 text-sm">Add, view & delete job listings</p>
                            </div>
                        </Link>
                        <Link
                            href="/admin/applications"
                            className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:shadow-md transition-shadow group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-[#FF6550]/10 flex items-center justify-center shrink-0">
                                <Users size={24} className="text-[#FF6550]" />
                            </div>
                            <div>
                                <p className="font-bold text-lg text-[#25324B]">Applications</p>
                                <p className="text-[#7C8493] text-sm">Review all submitted applications</p>
                            </div>
                        </Link>
                    </div>

                    {/* Recent Applications */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="font-bold text-[#25324B]">Recent Applications</h2>
                            <Link href="/admin/applications" className="text-sm text-[#4640DE] font-medium hover:underline">
                                View all
                            </Link>
                        </div>
                        {loading ? (
                            <div className="px-6 py-8 text-center text-[#7C8493] text-sm">Loading...</div>
                        ) : recentApplications.length === 0 ? (
                            <div className="px-6 py-8 text-center text-[#7C8493] text-sm">No applications yet.</div>
                        ) : (
                            <div className="divide-y divide-gray-50 overflow-x-auto">
                                <div className="min-w-[600px]">
                                    {recentApplications.map((app: any) => (
                                        <div key={app._id} className="px-6 py-4 flex items-center justify-between">
                                            <div>
                                                <p className="font-semibold text-[#25324B] text-sm">{app.name}</p>
                                                <p className="text-[#7C8493] text-xs">{app.email} · {app.job_id?.title || 'Unknown Job'}</p>
                                            </div>
                                            <span className="text-xs text-[#7C8493]">
                                                {new Date(app.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </AuthGuard>
    );
}

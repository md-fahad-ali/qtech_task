import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import JobFilters from './JobFilters';

export default async function JobsPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string; location?: string; category?: string }>;
}) {
    const resolvedParams = await searchParams;
    const q = resolvedParams.q || '';
    const location = resolvedParams.location || '';
    const category = resolvedParams.category || '';

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

    // Fetch ALL jobs to populate location list
    let allJobs: any[] = [];
    try {
        const res = await fetch(`${apiUrl}/api/jobs`, { cache: 'no-store' });
        if (res.ok) allJobs = await res.json();
    } catch { }

    // Unique sorted locations from all jobs
    const locations: string[] = Array.from(
        new Set<string>(allJobs.map((j: any) => j.location).filter(Boolean))
    ).sort();

    // Fetch filtered jobs based on current search params
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (location) params.set('location', location);
    if (category) params.set('category', category);

    let jobs: any[] = [];
    try {
        const res = await fetch(`${apiUrl}/api/jobs?${params.toString()}`, { cache: 'no-store' });
        if (res.ok) jobs = await res.json();
    } catch { }

    return (
        <div className="bg-[#F8F8FD] min-h-screen">
            <div className="max-w-[1192px] mx-auto px-4 md:px-8 xl:px-0 py-10">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold font-epilogue text-[#25324B] mb-1">Find your next job</h1>
                    <p className="text-gray-500 font-epilogue">
                        {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'} available
                        {(q || location || category) && (
                            <span className="ml-1 text-[#4640DE]">
                                {q && <> for &ldquo;{q}&rdquo;</>}
                                {location && <> in {location}</>}
                                {category && <> · {category}</>}
                            </span>
                        )}
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <div className="w-full lg:w-[280px] shrink-0">
                        <Suspense fallback={null}>
                            <JobFilters
                                locations={locations}
                                activeLocation={location}
                                activeCategory={category}
                                activeQ={q}
                            />
                        </Suspense>
                    </div>

                    {/* Job Listings */}
                    <div className="flex-1">
                        <div className="flex flex-col gap-4">
                            {jobs.length > 0 ? jobs.map((job: any, idx: number) => (
                                <div
                                    key={job._id || idx}
                                    className="border border-gray-200 bg-white p-6 flex flex-col md:flex-row gap-6 items-start md:items-center hover:shadow-md transition-shadow"
                                >
                                    {/* Logo */}
                                    <div className="w-[72px] h-[72px] bg-[#F8F8FD] flex items-center justify-center shrink-0 border border-gray-100 p-2">
                                        {job.logo ? (
                                            <Image
                                                src={job.logo.startsWith('http') ? job.logo : `${apiUrl}${job.logo}`}
                                                alt={job.company}
                                                width={52}
                                                height={52}
                                                className="object-contain w-full h-full"
                                            />
                                        ) : (
                                            <span className="font-bold text-2xl text-blue-600">
                                                {job.company ? job.company[0].toUpperCase() : 'C'}
                                            </span>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 font-epilogue min-w-0">
                                        <h3 className="text-lg font-bold text-[#25324B] leading-tight">{job.title}</h3>
                                        <p className="text-gray-500 mt-0.5 text-sm">
                                            {job.company} <span className="mx-1.5">•</span> {job.location}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            <span className="text-xs px-3 py-1 border border-[#56CDAD] text-[#56CDAD] rounded-full font-semibold">
                                                {job.type}
                                            </span>
                                            {job.tags?.map((tag: string) => (
                                                <span
                                                    key={tag}
                                                    className="text-xs px-3 py-1 border border-gray-300 text-gray-500 rounded-full font-semibold"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Apply */}
                                    <div className="shrink-0">
                                        <Link
                                            href={`/jobs/${job._id}`}
                                            className="block bg-[#4640DE] hover:bg-[#3730c4] text-white px-6 py-3 font-semibold font-epilogue text-sm text-center transition-colors"
                                        >
                                            Apply Now
                                        </Link>
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center py-20 bg-white border border-gray-200">
                                    <h3 className="text-xl font-bold text-[#25324B] mb-2 font-epilogue">No jobs found</h3>
                                    <p className="text-gray-500 font-epilogue">Try adjusting your search criteria.</p>
                                    <Link
                                        href="/jobs"
                                        className="inline-block mt-4 text-[#4640DE] font-semibold font-epilogue hover:underline"
                                    >
                                        Clear filters
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

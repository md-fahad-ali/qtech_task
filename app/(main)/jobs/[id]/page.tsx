import { notFound } from 'next/navigation';
import Image from 'next/image';
import { clashDisplay } from '@/lib/fonts';
import ApplyForm from './ApplyForm'


export default async function JobDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    let job: any = null;
    try {
        const res = await fetch(`${apiUrl}/api/jobs/${id}`, { cache: 'no-store' });
        if (res.ok) {
            job = await res.json();
        }
    } catch (error) {
        console.error('Error fetching job details:', error);
    }

    if (!job) {
        return notFound();
    }

    return (
        <div className="bg-[#F8F8FD] min-h-screen py-12">
            <div className="max-w-[1192px] mx-auto px-4 md:px-8 xl:px-0 flex flex-col lg:flex-row gap-8">

                {/* Left Column: Job Description */}
                <div className="flex-1 space-y-8">
                    {/* Header Card */}
                    <div className="bg-white p-8 border border-gray-200">
                        <div className="flex items-center gap-6 mb-6">
                            <div className="w-[90px] h-[90px] flex items-center justify-center shrink-0">
                                {job.logo ? (
                                    <Image
                                        src={job.logo.startsWith('http') ? job.logo : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}${job.logo}`}
                                        alt={job.company}
                                        width={90}
                                        height={90}
                                        className="object-contain w-full h-full"
                                    />
                                ) : (
                                    <div className="font-bold text-4xl text-blue-600 bg-[#F8F8FD] w-full h-full flex items-center justify-center">
                                        {job.company ? job.company[0].toUpperCase() : 'C'}
                                    </div>
                                )}
                            </div>
                            <div>
                                <h1 className={`${clashDisplay.className} text-[#25324B] font-semibold text-3xl mb-2`}>{job.title}</h1>
                                <p className="text-gray-500 font-epilogue text-lg">{job.company} • {job.location} • {job.type}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            {job.tags && job.tags.map((tag: string) => (
                                <span key={tag} className="text-sm px-4 py-1.5 border border-orange-200 text-orange-400 rounded-full font-semibold font-epilogue">{tag}</span>
                            ))}
                        </div>
                    </div>

                    {/* Description Details */}
                    <div className="bg-white p-8 border border-gray-200">
                        <h2 className={`${clashDisplay.className} text-[#25324B] font-semibold text-2xl mb-4`}>Job Description</h2>
                        <div className="text-gray-600 font-epilogue leading-relaxed mb-6">
                            {('description' in job ? job.description : null) || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}
                        </div>
                        <h3 className={`${clashDisplay.className} text-[#25324B] font-semibold text-xl mb-3`}>Responsibilities</h3>
                        <ul className="list-disc list-inside text-gray-600 font-epilogue leading-relaxed space-y-2">
                            <li>Design and build applications for the iOS/Android platform</li>
                            <li>Ensure the performance, quality, and responsiveness of applications</li>
                            <li>Collaborate with a team to define, design, and ship new features</li>
                            <li>Identify and correct bottlenecks and fix bugs</li>
                        </ul>
                    </div>
                </div>

                {/* Right Column: Apply Form */}
                <div className="w-full lg:w-[450px]">
                    <ApplyForm jobId={job._id || job.id} />
                </div>
            </div>
        </div>
    );
}

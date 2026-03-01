import Image from 'next/image';
import Link from 'next/link';
import { clashDisplay } from '@/lib/fonts';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  tags: string[];
  logo: string;
  section: string;
}

async function getLatestJobs(): Promise<Job[]> {
  try {
    const res = await fetch(`${API_URL}/api/jobs?section=latest&limit=8`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function LatestJobs() {
  const jobs = await getLatestJobs();

  return (
    <section className="relative overflow-hidden bg-[#F8F8FD] py-16">
      {/* Background patterns */}
      <div className="absolute right-0 top-0 h-full w-[797px] z-0 pointer-events-none overflow-hidden">
        <svg width="797" height="877" viewBox="0 0 797 877" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full object-cover object-right">
          <path opacity="0.6" d="M617.984 -3.74906L329.223 135.939L328.968 -72.1731L615.802 -212.021L617.984 -3.74906Z" fill="#F8F8FD" stroke="#CCCCF5" strokeWidth="4" />
          <path d="M816.763 646.272L261.226 928.43L261 590.223L816.762 306.268L816.763 646.272Z" fill="#F8F8FD" stroke="#CCCCF5" strokeWidth="4" />
          <path d="M517.763 1013.25L2.22529 1265.48L2.00226 957.243L517.762 703.214L517.763 1013.25Z" fill="#F8F8FD" stroke="#CCCCF5" strokeWidth="4" />
        </svg>
      </div>

      {/* Top-left triangle pattern */}
      <div
        className="absolute left-0 top-0 z-0 h-[400px] w-[400px] pointer-events-none bg-white"
        style={{ clipPath: 'polygon(0px 0px, 33% 0px, 0px 20%)' }}
      />

      <div className="relative z-10 mx-auto max-w-[1192px] px-4 md:px-8 xl:px-0">
        <div className="mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className={`${clashDisplay.className} text-[36px] md:text-[48px] font-semibold leading-[120%] text-[#25324B]`}>
            Latest{' '}
            <span className="text-[#4640DE]">jobs open</span>
          </h2>
          <Link
            href="/jobs"
            className="text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700"
          >
            Show all jobs →
          </Link>
        </div>

        {jobs.length === 0 ? (
          <p className="text-[#7C8493]">No latest jobs at this time.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="group flex flex-col sm:flex-row cursor-pointer items-start gap-4 rounded-xl bg-white p-6 transition-all hover:shadow-lg border border-gray-100"
              >
                <div className="shrink-0">
                  {job.logo ? (
                    <Image
                      src={job.logo.startsWith('http') ? job.logo : `${API_URL}${job.logo}`}
                      alt={job.company}
                      width={40}
                      height={40}
                      className="rounded-lg"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-200 text-gray-600 font-bold">
                      {job.company[0]}
                    </div>
                  )}
                </div>

                <div>
                  <Link href={`/jobs/${job._id}`}>
                    <h3 className="text-lg font-semibold text-[#25324B] group-hover:text-indigo-600">
                      {job.title}
                    </h3>
                  </Link>
                  <p className="mt-1 text-sm text-[#515B6F]">
                    {job.company} • {job.location}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-[rgba(255,255,255,0.01)] bg-[#56CDAD]/10 px-3 py-1 text-xs font-semibold text-[#56CDAD]">
                      {job.type}
                    </span>
                    {job.tags.map((tag) => {
                      let tagStyle = 'border-gray-200 text-gray-600';
                      if (tag === 'Marketing') tagStyle = 'border-[#FFB836] text-[#FFB836]';
                      if (tag === 'Design') tagStyle = 'border-[#4640DE] text-[#4640DE]';

                      return (
                        <span
                          key={tag}
                          className={`rounded-full border px-3 py-1 text-xs font-semibold ${tagStyle}`}
                        >
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
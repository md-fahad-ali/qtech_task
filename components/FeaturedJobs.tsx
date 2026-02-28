import { FEATURED_JOBS } from '@/lib/constants';

const tagColors: Record<string, string> = {
  Marketing: 'bg-[#EB8533]/10 text-[#EB8533]',
  Design: 'bg-[#56CDAD]/10 text-[#56CDAD]',
  Business: 'bg-[#4640DE]/10 text-[#4640DE]',
  Technology: 'bg-[#FF6550]/10 text-[#FF6550]',
};

import Image from 'next/image';

const companyLogos: Record<string, React.ReactNode> = {
  revolut: <Image src="/Landing Page/Featured Jobs/revolut.svg" alt="Revolut" width={48} height={48} />,
  dropbox: <Image src="/Landing Page/Featured Jobs/dropbox.svg" alt="Dropbox" width={48} height={48} />,
  pitch: <Image src="/Landing Page/Featured Jobs/pitch.svg" alt="Pitch" width={48} height={48} />,
  blinkist: <Image src="/Landing Page/Featured Jobs/blinkist.svg" alt="Blinkist" width={48} height={48} />,
  classpass: <Image src="/Landing Page/Featured Jobs/classpass.svg" alt="ClassPass" width={48} height={48} />,
  canva: <Image src="/Landing Page/Featured Jobs/canva.svg" alt="Canva" width={48} height={48} />,
  godaddy: <Image src="/Landing Page/Featured Jobs/godaddy.svg" alt="GoDaddy" width={48} height={48} />,
  twitter: <Image src="/Landing Page/Featured Jobs/twitter.svg" alt="Twitter" width={48} height={48} />,
};

import { clashDisplay, epilogue } from '@/lib/fonts';

export default function FeaturedJobs() {
  return (
    <section className="bg-white py-10 md:py-16">
      <div className="mx-auto max-w-[1192px] px-4 md:px-8 xl:px-0">

        {/* Header */}
        <div className="mb-6 md:mb-10 flex items-center justify-between">
          <h2 className={`${clashDisplay.className} text-[32px] md:text-[48px] font-semibold leading-[120%] text-[#25324B]`}>
            Featured <span className="text-[#26A4FF] md:text-[#4640DE]">jobs</span>
          </h2>
          <a
            href="/jobs"
            className="hidden sm:inline-flex text-[16px] font-semibold text-[#4640DE] transition-colors hover:text-[#3833b3] items-center gap-4"
          >
            Show all jobs
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* Job List Container */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory sm:grid sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 pb-2 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {FEATURED_JOBS.map((job) => (
            <div
              key={job.id}
              className="min-w-[286px] sm:min-w-0 shrink-0 snap-start group cursor-pointer border border-[#D6DDEB] bg-white p-6 shadow-sm transition-all hover:shadow-md flex flex-col"
            >
              {/* Logo and Job Type */}
              <div className="mb-4 flex items-start justify-between w-full">
                {companyLogos[job.logo] || (
                  <div className="flex h-12 w-12 items-center justify-center bg-gray-200 text-gray-600 font-bold border border-gray-100">
                    {job.company[0]}
                  </div>
                )}
                <div className="border border-[#4640DE] bg-white px-3 py-1 flex justify-center items-center">
                  <span className={`${epilogue.className} text-[14px] font-semibold text-[#4640DE]`}>
                    {job.type}
                  </span>
                </div>
              </div>

              {/* Title & Company */}
              <div className="mb-4 flex flex-col items-start gap-1">
                <h3 className={`${epilogue.className} text-[18px] font-semibold leading-[160%] text-[#25324B] group-hover:text-[#4640DE]`}>
                  {job.title}
                </h3>
                <p className={`font-sans text-[16px] font-normal leading-[160%] text-[#7C8493]`}>
                  {job.company} <span className="mx-1">•</span> {job.location}
                </p>
              </div>

              {/* Description */}
              <p className={`font-sans text-[16px] font-normal leading-[160%] text-[#7C8493] line-clamp-2 mb-6`}>
                {job.description}
              </p>

              {/* Tags */}
              <div className="mt-auto flex flex-wrap gap-2 items-start">
                <div className="flex justify-center items-center rounded-[80px] px-4 py-1.5 bg-[#EB8533]/10 text-[#EB8533]">
                  <span className={`${epilogue.className} text-[14px] font-semibold`}>
                    {job.type}
                  </span>
                </div>
                {job.tags.map((tag) => (
                  <div
                    key={tag}
                    className={`flex justify-center items-center rounded-[80px] px-4 py-1.5 ${tagColors[tag] || 'bg-gray-100 text-gray-700'}`}
                  >
                    <span className={`${epilogue.className} text-[14px] font-semibold`}>
                      {tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile bottom CTA */}
        <div className="mt-6 flex justify-start sm:hidden w-full">
          <a
            href="/jobs"
            className={`${epilogue.className} text-[16px] font-semibold text-[#4640DE] transition-colors hover:text-[#3833b3] flex items-center gap-4`}
          >
            Show all jobs
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
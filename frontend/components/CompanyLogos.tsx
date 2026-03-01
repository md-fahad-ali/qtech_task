'use client';

import React from 'react';
import Image from 'next/image';
import { COMPANIES } from '@/lib/constants';

const companyLogos: Record<string, React.ReactNode> = {
  vodafone: <Image src="/logos/vodafone-logo.svg" alt="Vodafone" width={120} height={32} className="h-8 w-auto" unoptimized />,
  intel: <Image src="/logos/intel-logo.svg" alt="Intel" width={80} height={32} className="h-8 w-auto" unoptimized />,
  tesla: <Image src="/logos/tesla-logo.svg" alt="Tesla" width={100} height={32} className="h-8 w-auto" unoptimized />,
  amd: <Image src="/logos/amd-logo.svg" alt="AMD" width={80} height={32} className="h-8 w-auto" unoptimized />,
  talkkit: <Image src="/logos/talkit.svg" alt="Talkkit" width={100} height={32} className="h-8 w-auto" unoptimized />,
};

export default function CompanyLogos() {
  return (
    <section className="bg-white py-16">
      {/* Title: stays inside the max-w-[1192px] container */}
      <div className="mx-auto max-w-[1192px] px-4 md:px-8 xl:px-0">
        <p className="mb-8 text-center text-sm font-medium text-gray-400">
          Companies we helped grow
        </p>

        {/* ── Marquee track: overflow-hidden inside the container ── */}
        <div className="overflow-hidden relative">
          {/* Fade left */}
          <div
            className="pointer-events-none absolute left-0 top-0 h-full w-16 z-10"
            style={{ background: 'linear-gradient(to right, white, transparent)' }}
          />
          {/* Fade right */}
          <div
            className="pointer-events-none absolute right-0 top-0 h-full w-16 z-10"
            style={{ background: 'linear-gradient(to left, white, transparent)' }}
          />

          {/* Scrolling row — logos × 2 for seamless loop */}
          <div
            className="flex"
            style={{
              width: 'max-content',
              animation: 'marquee 18s linear infinite',
            }}
          >
            {/* Set A */}
            {COMPANIES.map((company) => (
              <div
                key={`a-${company.id}`}
                className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity px-6 md:px-12 shrink-0"
              >
                {companyLogos[company.id] ?? (
                  <span className="text-lg font-medium text-gray-400">{company.name}</span>
                )}
              </div>
            ))}
            {/* Set B — duplicate for seamless loop */}
            {COMPANIES.map((company) => (
              <div
                aria-hidden
                key={`b-${company.id}`}
                className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity px-6 md:px-12 shrink-0"
              >
                {companyLogos[company.id] ?? (
                  <span className="text-lg font-medium text-gray-400">{company.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

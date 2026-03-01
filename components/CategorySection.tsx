
import React from 'react';
import { CATEGORIES } from '@/lib/constants';
import { clashDisplay, epilogue } from '@/lib/fonts';

/* ── SVG Icons (48×48, exact from Figma) ─────────────────────────────── */
const categoryIcons: Record<string, React.ReactNode> = {
  design: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_21_1080)">
        <path d="M6 42H14L40 16C41.0609 14.9391 41.6569 13.5003 41.6569 12C41.6569 10.4997 41.0609 9.06086 40 7.99999C38.9391 6.93913 37.5003 6.34314 36 6.34314C34.4997 6.34314 33.0609 6.93913 32 7.99999L6 34V42Z" stroke="#4640DE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M29 11L37 19" stroke="#4640DE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M24 16L14 6L6 14L16 24" stroke="#4640DE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 16L11 19" stroke="#4640DE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M32 24L42 34L34 42L24 32" stroke="#4640DE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M32 34L29 37" stroke="#4640DE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_21_1080">
          <rect width="48" height="48" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),
  sales: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 22C18.4183 22 22 18.4183 22 14C22 9.58172 18.4183 6 14 6C9.58172 6 6 9.58172 6 14C6 18.4183 9.58172 22 14 22Z" stroke="#4640DE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 6V14H22" stroke="#4640DE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 34V42" stroke="#4640DE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M34 28V42" stroke="#4640DE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26 26V42" stroke="#4640DE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M42 24V42" stroke="#4640DE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  marketing: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.9999 11.764V38.48C21.9993 39.3089 21.7062 40.1111 21.1722 40.7451C20.6382 41.3791 19.8976 41.8043 19.0808 41.9458C18.2641 42.0873 17.4236 41.936 16.7074 41.5186C15.9912 41.1012 15.4453 40.4444 15.1659 39.664L10.8719 27.364M35.9999 26C37.5912 26 39.1174 25.3679 40.2426 24.2426C41.3678 23.1174 41.9999 21.5913 41.9999 20C41.9999 18.4087 41.3678 16.8826 40.2426 15.7574C39.1174 14.6321 37.5912 14 35.9999 14V26ZM10.8719 27.366C9.17437 26.6442 7.7783 25.3581 6.91999 23.7253C6.06168 22.0925 5.79385 20.2134 6.16181 18.4058C6.52976 16.5982 7.51092 14.9733 8.93924 13.806C10.3676 12.6387 12.1553 12.0007 13.9999 12H17.6639C25.8639 12 32.9139 9.532 35.9999 6V34C32.9139 30.468 25.8659 28 17.6639 28H13.9999C12.9252 28.0016 11.8612 27.7859 10.8719 27.366Z" stroke="#4640DE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  finance: (
    <svg width="39" height="31" viewBox="0 0 39 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M29.5 9.5V5.5C29.5 4.43913 29.0786 3.42172 28.3284 2.67157C27.5783 1.92143 26.5609 1.5 25.5 1.5H5.5C4.43913 1.5 3.42172 1.92143 2.67157 2.67157C1.92143 3.42172 1.5 4.43913 1.5 5.5V17.5C1.5 18.5609 1.92143 19.5783 2.67157 20.3284C3.42172 21.0786 4.43913 21.5 5.5 21.5H9.5M13.5 29.5H33.5C34.5609 29.5 35.5783 29.0786 36.3284 28.3284C37.0786 27.5783 37.5 26.5609 37.5 25.5V13.5C37.5 12.4391 37.0786 11.4217 36.3284 10.6716C35.5783 9.92143 34.5609 9.5 33.5 9.5H13.5C12.4391 9.5 11.4217 9.92143 10.6716 10.6716C9.92143 11.4217 9.5 12.4391 9.5 13.5V25.5C9.5 26.5609 9.92143 27.5783 10.6716 28.3284C11.4217 29.0786 12.4391 29.5 13.5 29.5ZM27.5 19.5C27.5 20.5609 27.0786 21.5783 26.3284 22.3284C25.5783 23.0786 24.5609 23.5 23.5 23.5C22.4391 23.5 21.4217 23.0786 20.6716 22.3284C19.9214 21.5783 19.5 20.5609 19.5 19.5C19.5 18.4391 19.9214 17.4217 20.6716 16.6716C21.4217 15.9214 22.4391 15.5 23.5 15.5C24.5609 15.5 25.5783 15.9214 26.3284 16.6716C27.0786 17.4217 27.5 18.4391 27.5 19.5Z" stroke="#4640DE" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  ),
  technology: (
    <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 29.5L13.5 35.5L11.5 37.5H27.5L25.5 35.5L24 29.5H15ZM1.5 21.5H37.5H1.5ZM5.5 29.5H33.5C34.5609 29.5 35.5783 29.0786 36.3284 28.3284C37.0786 27.5783 37.5 26.5609 37.5 25.5V5.5C37.5 4.43913 37.0786 3.42172 36.3284 2.67157C35.5783 1.92143 34.5609 1.5 33.5 1.5H5.5C4.43913 1.5 3.42172 1.92143 2.67157 2.67157C1.92143 3.42172 1.5 4.43913 1.5 5.5V25.5C1.5 26.5609 1.92143 27.5783 2.67157 28.3284C3.42172 29.0786 4.43913 29.5 5.5 29.5Z" stroke="#4640DE" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  ),
  engineering: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 40L28 8M36 16L44 24L36 32M12 32L4.00003 24L12 16" stroke="#4640DE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  business: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M42 26.51C36.281 28.8225 30.1688 30.0075 24 30C17.634 30 11.56 28.76 6 26.51M24 24H24.02M32 12V8C32 6.93913 31.5786 5.92172 30.8284 5.17157C30.0783 4.42143 29.0609 4 28 4H20C18.9391 4 17.9217 4.42143 17.1716 5.17157C16.4214 5.92172 16 6.93913 16 8V12H32ZM10 40H38C39.0609 40 40.0783 39.5786 40.8284 38.8284C41.5786 38.0783 42 37.0609 42 36V16C42 14.9391 41.5786 13.9217 40.8284 13.1716C40.0783 12.4214 39.0609 12 38 12H10C8.93913 12 7.92172 12.4214 7.17157 13.1716C6.42143 13.9217 6 14.9391 6 16V36C6 37.0609 6.42143 38.0783 7.17157 38.8284C7.92172 39.5786 8.93913 40 10 40Z" stroke="#4640DE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  hr: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M24 10C22.9391 10 21.9217 10.4214 21.1716 11.1716C20.4214 11.9217 20 12.9391 20 14C20 15.0609 20.4214 16.0783 21.1716 16.8284C21.9217 17.5786 22.9391 18 24 18C25.0609 18 26.0783 17.5786 26.8284 16.8284C27.5786 16.0783 28 15.0609 28 14C28 12.9391 27.5786 11.9217 26.8284 11.1716C26.0783 10.4214 25.0609 10 24 10ZM18.3431 8.34315C19.8434 6.84285 21.8783 6 24 6C26.1217 6 28.1566 6.84285 29.6569 8.34315C31.1571 9.84344 32 11.8783 32 14C32 16.1217 31.1571 18.1566 29.6569 19.6569C28.1566 21.1571 26.1217 22 24 22C21.8783 22 19.8434 21.1571 18.3431 19.6569C16.8429 18.1566 16 16.1217 16 14C16 11.8783 16.8429 9.84344 18.3431 8.34315ZM10 18C9.46957 18 8.96086 18.2107 8.58579 18.5858C8.21071 18.9609 8 19.4696 8 20C8 20.5304 8.21071 21.0391 8.58579 21.4142C8.96086 21.7893 9.46957 22 10 22C10.5304 22 11.0391 21.7893 11.4142 21.4142C11.7893 21.0391 12 20.5304 12 20C12 19.4696 11.7893 18.9609 11.4142 18.5858C11.0391 18.2107 10.5304 18 10 18ZM5.75736 15.7574C6.88258 14.6321 8.4087 14 10 14C11.5913 14 13.1174 14.6321 14.2426 15.7574C15.3679 16.8826 16 18.4087 16 20C16 21.5913 15.3679 23.1174 14.2426 24.2426C13.1174 25.3679 11.5913 26 10 26C8.4087 26 6.88258 25.3679 5.75736 24.2426C4.63214 23.1174 4 21.5913 4 20C4 18.4087 4.63214 16.8826 5.75736 15.7574ZM38 18C37.4696 18 36.9609 18.2107 36.5858 18.5858C36.2107 18.9609 36 19.4696 36 20C36 20.5304 36.2107 21.0391 36.5858 21.4142C36.9609 21.7893 37.4696 22 38 22C38.5304 22 39.0391 21.7893 39.4142 21.4142C39.7893 21.0391 40 20.5304 40 20C40 19.4696 39.7893 18.9609 39.4142 18.5858C39.0391 18.2107 38.5304 18 38 18ZM33.7574 15.7574C34.8826 14.6321 36.4087 14 38 14C39.5913 14 41.1174 14.6321 42.2426 15.7574C43.3679 16.8826 44 18.4087 44 20C44 21.5913 43.3679 23.1174 42.2426 24.2426C41.1174 25.3679 39.5913 26 38 26C36.4087 26 34.8826 25.3679 33.7574 24.2426C32.6321 23.1174 32 21.5913 32 20C32 18.4087 32.6321 16.8826 33.7574 15.7574ZM24 27.9986C22.4005 27.9986 20.8377 28.4778 19.5132 29.3745C18.2646 30.2197 17.2817 31.3993 16.6753 32.7757L16.1931 38H31.8069L31.3247 32.7757C30.7183 31.3993 29.7354 30.2197 28.4868 29.3745C27.1623 28.4778 25.5995 27.9986 24 27.9986ZM36 38H42V36.0001C41.9999 35.1689 41.7409 34.3582 41.2589 33.681C40.7768 33.0037 40.0957 32.4935 39.3103 32.2211C38.5249 31.9488 37.6742 31.928 36.8763 32.1615C36.4028 32.3001 35.9619 32.5242 35.5741 32.82C35.8523 33.835 36 34.902 36 36V38ZM33.8595 29.1553C33.02 27.9464 31.9607 26.8958 30.7291 26.062C28.7427 24.7173 26.3988 23.9986 24 23.9986C21.6012 23.9986 19.2573 24.7173 17.2709 26.062C16.0393 26.8958 14.98 27.9464 14.1405 29.1553C13.5515 28.799 12.9156 28.5182 12.2473 28.3226C10.6517 27.8555 8.95017 27.8972 7.37933 28.4419C5.8085 28.9865 4.44637 30.007 3.4823 31.3615C2.51823 32.716 2.00012 34.3373 2 35.9999V40C2 41.1046 2.89543 42 4 42H44C45.1046 42 46 41.1046 46 40V36C45.9999 34.3374 45.4818 32.716 44.5177 31.3615C43.5536 30.007 42.1915 28.9865 40.6207 28.4419C39.0498 27.8972 37.3483 27.8555 35.7527 28.3226C35.0844 28.5182 34.4485 28.799 33.8595 29.1553ZM12.4259 32.82C12.0381 32.5242 11.5972 32.3001 11.1237 32.1615C10.3258 31.928 9.47509 31.9488 8.68967 32.2211C7.90425 32.4935 7.22318 33.0037 6.74115 33.681C6.25914 34.3582 6.00009 35.1688 6 36V38H12V36C12 34.902 12.1477 33.835 12.4259 32.82Z" fill="#25324B" />
    </svg>
  ),
};

/* ── Arrow Right Icon (24×24, from Figma Jobs Available row) ─── */
function ArrowRightIcon({ color, className }: { color?: string, className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke={color || "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function CategorySection() {
  return (
    /* Section: bg white, padding-top 72px, padding-bottom 72px */
    <section className="bg-white py-12 md:py-[72px] px-4 md:px-8 xl:px-0">
      <div className="mx-auto w-full max-w-[1192px]">
        {/* ── Header row ───────────────────────────────────────────── */}
        <div className="mb-8 md:mb-10 flex flex-row items-center justify-between gap-4">
          <h2
            className={`${clashDisplay.className} text-[32px] md:text-[48px] font-semibold leading-[120%] text-[#25324B]`}
          >
            Explore by{' '}
            <span className="text-[#26A4FF]">category</span>
          </h2>
          <a
            href="/jobs"
            className={`${epilogue.className} hidden md:flex items-center gap-2 text-base font-semibold text-[#4640DE] transition-opacity hover:opacity-80`}
          >
            Show all jobs
            <ArrowRightIcon color="#4640DE" />
          </a>
        </div>

        {/* ── Card grid ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-[32px]">
          {CATEGORIES.map((category, index) => {
            const isActive = index === 2;
            return (
              <div
                key={category.id}
                className={`group cursor-pointer transition-all hover:shadow-lg w-full md:max-w-[274px] mx-auto flex flex-row md:flex-col items-center md:items-start box-border p-4 md:p-[32px] gap-4 md:gap-[32px] h-auto md:h-[214px] ${isActive
                  ? 'border border-[#D6DDEB] md:border-transparent bg-white md:bg-[#4640DE]'
                  : 'border border-[#D6DDEB] bg-white'
                  }`}
              >
                {/* Icon — 48×48 */}
                <div
                  className={`shrink-0 w-[48px] h-[48px] ${isActive ? 'md:brightness-0 md:invert' : ''}`}
                >
                  {categoryIcons[category.icon]}
                </div>

                {/* Category Name block */}
                <div className="flex flex-col md:gap-[12px] w-full gap-1">
                  <h3
                    className={`${clashDisplay.className} text-[18px] md:text-[24px] font-semibold leading-[120%] ${isActive ? 'text-[#25324B] md:text-[#FFFFFF]' : 'text-[#25324B]'
                      }`}
                  >
                    {category.name}
                  </h3>

                  {/* Jobs row */}
                  <div className="flex items-center gap-2 md:gap-4 w-full">
                    <span
                      className={`${epilogue.className} text-[14px] md:text-[18px] font-normal leading-[160%] ${isActive ? 'text-[#7C8493] md:text-white/80' : 'text-[#7C8493]'
                        }`}
                    >
                      {category.jobs} jobs available
                    </span>
                    <span className="ml-auto transition-transform group-hover:translate-x-1">
                      <ArrowRightIcon
                        className={isActive ? "text-[#4640DE] md:text-white" : "text-[#4640DE]"}
                        color={undefined}
                      />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile "Show all jobs" link at the bottom */}
        <div className="mt-8 flex md:hidden">
          <a
            href="/jobs"
            className={`${epilogue.className} flex items-center gap-2 text-[16px] font-semibold text-[#4640DE] transition-opacity hover:opacity-80`}
          >
            Show all jobs
            <ArrowRightIcon color="#4640DE" />
          </a>
        </div>
      </div>
    </section>
  );
}
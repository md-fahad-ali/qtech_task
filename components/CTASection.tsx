import Image from "next/image";
import Link from "next/link";
import { clashDisplay, epilogue } from "@/lib/fonts";

export default function CTASection() {
  return (
    <section className="bg-white py-0 md:py-20 px-0 md:px-8 xl:px-0 overflow-hidden">
      <div className="relative mx-auto w-full max-w-[1192px] h-[640px] md:h-[414px] flex flex-col md:flex-row items-center overflow-hidden md:overflow-visible border-box">

        {/* --- Background Elements --- */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Mobile Polygon Background */}
          {/* Top edge slants UP from left to right: y=40px to y=0px */}
          {/* Bottom edge slants UP from left to right: y=100% to y=calc(100% - 40px) */}
          <div
            className="absolute inset-0 bg-[#4640DE] md:hidden"
            style={{ clipPath: 'polygon(0px 65px, 125px 0px, 100% 0px, 100% calc(100% - 98px), calc(100% - 147px) 100%, 0px 100%)' }}
          />

          {/* Desktop Polygon Background */}
          <div className="hidden md:block absolute inset-0 bg-[#4640DE]">
            {/* Left Slant Cutout (Desktop) */}
            <div
              className="absolute inset-y-0 left-0 bg-white -top-1"
              style={{ width: '130px', clipPath: 'polygon(0 0, 100% 0, 0 15%)' }}
            />
            {/* Right Slant Cutout (Desktop) */}
            <div
              className="absolute inset-y-0 right-0 bg-white"
              style={{ width: '100px', clipPath: 'polygon(100% 76%, 100% 100%, 0 100%)' }}
            />
          </div>
        </div>

        {/* --- Left Content --- */}
        <div className="relative z-10 flex flex-col items-center text-center md:items-start md:text-left px-4 mt-[88px] md:mt-0 md:py-0 md:pl-8 lg:pl-[80px] w-full md:w-1/2 lg:w-[45%] justify-start md:justify-center h-max md:h-full">
          <h2 className={`${clashDisplay.className} w-[80%] sm:w-auto text-[32px] md:text-[36px] lg:text-[48px] text-white font-semibold leading-[1.15] mb-[16px] tracking-tight`}>
            Start posting<br className="hidden lg:block" /> jobs today
          </h2>
          <p className={`${epilogue.className} text-[16px] text-white font-medium mb-[34px] opacity-90`}>
            Start posting jobs for only $10.
          </p>
          <Link href="/signup" className={`${epilogue.className} bg-white text-[#4640DE] w-full sm:w-[179px] h-[50px] flex items-center justify-center font-bold text-[16px] transition-colors hover:bg-gray-50 shadow-sm rounded-sm`}>
            Sign Up For Free
          </Link>
        </div>

        {/* --- Right Dashboard Image --- */}
        <div className="relative z-10 w-full mt-[26px] md:mt-0 md:w-1/2 lg:w-[55%] flex justify-center md:justify-end px-4 md:px-0 md:pr-4 lg:pr-[40px] md:top-6 lg:top-[48px] md:right-4 lg:right-[43px] pointer-events-none">
          <Image
            src="/illustrations/LandingPage/CTA/Dashboard-Company.svg"
            alt="QuickHire Dashboard Preview"
            width={500}
            height={300}
            className="w-auto sm:max-w-[400px] md:max-w-full lg:max-w-[110%] object-contain lg:-translate-x-4"
            priority
          />
        </div>

      </div>
    </section>
  );
}
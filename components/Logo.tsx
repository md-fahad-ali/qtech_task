import Image from "next/image";

interface LogoProps {
  className?: string;
  lightText?: boolean;
}

export default function Logo({ className = '', lightText = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/logos/logo.svg"
        alt="QuickHire Logo"
        width={36}
        height={36}
        className="h-9 w-9"
      />
      <span className={`text-xl font-bold ${lightText ? 'text-white' : 'text-gray-900'}`}>
        QuickHire
      </span>
    </div>
  );
}
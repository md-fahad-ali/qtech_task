import type { Metadata } from "next";
import "./globals.css";
import { clashDisplay, epilogue, geistMono } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "QuickHire - Find Your Dream Job",
  description: "Great platform for job seekers searching for new career heights. Discover 5000+ jobs from top companies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${clashDisplay.variable} ${epilogue.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

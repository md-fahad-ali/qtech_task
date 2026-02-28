import type { Metadata } from "next";
import "./globals.css";
import { clashDisplay, epilogue, geistMono } from "@/lib/fonts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

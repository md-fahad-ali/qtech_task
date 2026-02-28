'use client';

import { useState } from 'react';
import Logo from './Logo';

const navLinks = [
  { label: 'Find Jobs', href: '/jobs' },
  { label: 'Browse Companies', href: '/companies' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="relative overflow-hidden bg-[#F8F8FD]">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E5E7EB" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 mx-auto flex max-w-[1192px] items-center justify-between py-6 px-4 md:px-8 xl:px-0">
        <div className="flex items-center gap-12">
          <Logo />
          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-4 md:flex">
          <a
            href="/login"
            className="text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700"
          >
            Login
          </a>
          <a
            href="/signup"
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Sign Up
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg z-30 md:hidden border-t border-gray-100 pb-6">
          <ul className="flex flex-col px-4 pt-4 pb-2">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="block py-3 text-base font-medium text-gray-800 transition-colors hover:text-indigo-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 px-4 pt-4 border-t border-gray-100">
            <a
              href="/login"
              className="w-full text-center py-3 text-base font-medium text-indigo-600 bg-indigo-50 rounded-lg"
            >
              Login
            </a>
            <a
              href="/signup"
              className="w-full text-center py-3 text-base font-medium text-white bg-indigo-600 rounded-lg"
            >
              Sign Up
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

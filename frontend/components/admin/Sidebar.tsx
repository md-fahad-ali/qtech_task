'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Briefcase, FileText, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/jobs', label: 'Jobs', icon: Briefcase },
    { href: '/admin/applications', label: 'Applications', icon: FileText },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    function handleLogout() {
        sessionStorage.removeItem('adminAuth');
        router.replace('/admin/login');
    }

    return (
        <>
            {/* Mobile Top Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#25324B] z-40 flex items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#4640DE] flex items-center justify-center">
                        <span className="text-white font-bold text-sm">Q</span>
                    </div>
                    <span className="text-white font-bold text-sm block">QuickHire</span>
                </div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-white/70 hover:text-white"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Backdrop overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 h-screen w-64 bg-[#25324B] flex flex-col z-50 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0`}
            >
                {/* Logo */}
                <div className="px-6 py-6 border-b border-white/10 flex justify-between items-center">
                    <Link href="/admin" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                        <div className="w-8 h-8 rounded-lg bg-[#4640DE] flex items-center justify-center">
                            <span className="text-white font-bold text-sm">Q</span>
                        </div>
                        <div>
                            <span className="text-white font-bold text-sm block leading-tight">QuickHire</span>
                            <span className="text-white/50 text-xs">Admin Panel</span>
                        </div>
                    </Link>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="lg:hidden text-white/70 hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-6 space-y-1">
                    {navItems.map(({ href, label, icon: Icon }) => {
                        const isActive = pathname === href;
                        return (
                            <Link
                                key={href}
                                href={href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                                    ? 'bg-[#4640DE] text-white'
                                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                <Icon size={18} />
                                {label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div className="px-3 py-4 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors w-full"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
}

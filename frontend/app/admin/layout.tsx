import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Admin Panel — QuickHire',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[#F8F8FD]">
            {children}
        </div>
    );
}

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    useEffect(() => {
        const isAdmin = sessionStorage.getItem('adminAuth');
        if (!isAdmin) {
            router.replace('/admin/login');
        }
    }, [router]);

    const isAdmin = typeof window !== 'undefined' && sessionStorage.getItem('adminAuth');
    if (!isAdmin) return null;

    return <>{children}</>;
}

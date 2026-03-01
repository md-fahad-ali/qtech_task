'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';

const CATEGORIES = [
    'Design',
    'Marketing',
    'Technology',
    'Business',
    'Human Resource',
];

interface JobFiltersProps {
    locations: string[];
    activeLocation: string;
    activeCategory: string;
    activeQ: string;
}

export default function JobFilters({
    locations,
    activeLocation,
    activeCategory,
    activeQ,
}: JobFiltersProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (updates: Record<string, string>) => {
            const params = new URLSearchParams(searchParams.toString());
            Object.entries(updates).forEach(([key, value]) => {
                if (value) {
                    params.set(key, value);
                } else {
                    params.delete(key);
                }
            });
            return params.toString();
        },
        [searchParams]
    );

    const setFilter = (key: string, value: string) => {
        const current = searchParams.get(key) || '';
        const next = current === value ? '' : value; // toggle off if same
        router.push(`${pathname}?${createQueryString({ [key]: next })}`);
    };

    const clearAll = () => router.push(pathname);

    const hasActiveFilters = activeLocation || activeCategory || activeQ;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="font-bold text-lg font-epilogue text-[#25324B]">Filters</h2>
                {hasActiveFilters && (
                    <button
                        onClick={clearAll}
                        className="text-sm text-[#4640DE] font-semibold hover:underline font-epilogue"
                    >
                        Clear all
                    </button>
                )}
            </div>

            {/* Search box */}
            <div className="bg-white p-5 border border-gray-200">
                <h3 className="font-semibold mb-3 font-epilogue text-[#25324B]">Search</h3>
                <input
                    type="text"
                    defaultValue={activeQ}
                    placeholder="Job title or company..."
                    className="w-full border border-gray-300 px-3 py-2 text-sm font-epilogue text-gray-700 focus:outline-none focus:border-[#4640DE]"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            const val = (e.target as HTMLInputElement).value.trim();
                            router.push(`${pathname}?${createQueryString({ q: val })}`);
                        }
                    }}
                />
                <p className="text-xs text-gray-400 mt-1 font-epilogue">Press Enter to search</p>
            </div>

            {/* Location filter */}
            <div className="bg-white p-5 border border-gray-200">
                <h3 className="font-semibold mb-3 font-epilogue text-[#25324B]">Location</h3>
                <div className="space-y-2">
                    {locations.map((loc) => {
                        const isActive = activeLocation.toLowerCase() === loc.toLowerCase();
                        return (
                            <button
                                key={loc}
                                onClick={() => setFilter('location', loc)}
                                className={`w-full text-left text-sm px-3 py-2 font-epilogue transition-colors ${isActive
                                        ? 'bg-[#4640DE] text-white font-semibold'
                                        : 'text-gray-600 hover:bg-[#F8F8FD] hover:text-[#4640DE]'
                                    }`}
                            >
                                {loc}
                            </button>
                        );
                    })}
                    {locations.length === 0 && (
                        <p className="text-sm text-gray-400 font-epilogue">No locations found</p>
                    )}
                </div>
            </div>

            {/* Category filter */}
            <div className="bg-white p-5 border border-gray-200">
                <h3 className="font-semibold mb-3 font-epilogue text-[#25324B]">Category</h3>
                <div className="space-y-2">
                    {CATEGORIES.map((cat) => {
                        const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
                        return (
                            <button
                                key={cat}
                                onClick={() => setFilter('category', cat)}
                                className={`w-full text-left text-sm px-3 py-2 font-epilogue transition-colors ${isActive
                                        ? 'bg-[#4640DE] text-white font-semibold'
                                        : 'text-gray-600 hover:bg-[#F8F8FD] hover:text-[#4640DE]'
                                    }`}
                            >
                                {cat}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

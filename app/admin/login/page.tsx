'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ username: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
        setError('');
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        // Simulate a small delay for UX
        await new Promise((r) => setTimeout(r, 500));

        if (form.username === 'admin' && form.password === 'admin123') {
            sessionStorage.setItem('adminAuth', 'true');
            router.replace('/admin');
        } else {
            setError('Invalid username or password.');
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-[#25324B] via-[#1e2a3a] to-[#4640DE] flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    {/* Logo */}
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-[#4640DE] flex items-center justify-center">
                            <span className="text-white font-bold text-lg">Q</span>
                        </div>
                        <div>
                            <p className="font-bold text-[#25324B] text-lg leading-tight">QuickHire</p>
                            <p className="text-xs text-[#7C8493]">Admin Dashboard</p>
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold text-[#25324B] mb-1">Welcome back</h1>
                    <p className="text-[#7C8493] text-sm mb-8">Sign in to access the admin panel</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Username */}
                        <div>
                            <label className="block text-sm font-semibold text-[#515B6F] mb-1.5">
                                Username
                            </label>
                            <input
                                name="username"
                                type="text"
                                required
                                autoComplete="username"
                                value={form.username}
                                onChange={handleChange}
                                placeholder="Enter username"
                                className="w-full border border-[#D6DDEB] rounded-lg px-4 py-3 text-sm text-[#25324B] placeholder:text-[#A8ADB7] focus:outline-none focus:ring-2 focus:ring-[#4640DE]/30 focus:border-[#4640DE] transition-colors"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-semibold text-[#515B6F] mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    autoComplete="current-password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Enter password"
                                    className="w-full border border-[#D6DDEB] rounded-lg px-4 py-3 pr-11 text-sm text-[#25324B] placeholder:text-[#A8ADB7] focus:outline-none focus:ring-2 focus:ring-[#4640DE]/30 focus:border-[#4640DE] transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A8ADB7] hover:text-[#515B6F]"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                                <p className="text-red-600 text-sm">{error}</p>
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#4640DE] hover:bg-[#3833b3] text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-60 text-sm"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                </div>

                <p className="text-center text-white/50 text-xs mt-6">
                    © 2026 QuickHire Admin Panel
                </p>
            </div>
        </div>
    );
}

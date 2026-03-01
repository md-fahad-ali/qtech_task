'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

interface AddJobModalProps {
    onClose: () => void;
    onSuccess: () => void;
}

export default function AddJobModal({ onClose, onSuccess }: AddJobModalProps) {
    const [form, setForm] = useState({
        title: '',
        company: '',
        location: '',
        category: '',
        description: '',
        type: 'Full Time',
        tags: '',
        section: 'featured',
        logo: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`${API_URL}/api/jobs`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
                }),
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Failed to add job');
            }
            onSuccess();
            onClose();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-[#25324B]">Add New Job</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

                    {[
                        { name: 'title', label: 'Job Title' },
                        { name: 'company', label: 'Company' },
                        { name: 'location', label: 'Location' },
                        { name: 'category', label: 'Category' },
                        { name: 'logo', label: 'Logo URL' },
                    ].map(({ name, label }) => (
                        <div key={name}>
                            <label className="block text-sm font-medium text-[#515B6F] mb-1">{label}</label>
                            <input
                                name={name}
                                required
                                value={(form as any)[name]}
                                onChange={handleChange}
                                className="w-full border border-[#D6DDEB] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4640DE]/30"
                            />
                        </div>
                    ))}

                    <div>
                        <label className="block text-sm font-medium text-[#515B6F] mb-1">Description</label>
                        <textarea
                            name="description"
                            required
                            rows={3}
                            value={form.description}
                            onChange={handleChange}
                            className="w-full border border-[#D6DDEB] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4640DE]/30 resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-[#515B6F] mb-1">Type</label>
                            <select
                                name="type"
                                value={form.type}
                                onChange={handleChange}
                                className="w-full border border-[#D6DDEB] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4640DE]/30"
                            >
                                <option>Full Time</option>
                                <option>Part Time</option>
                                <option>Remote</option>
                                <option>Contract</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#515B6F] mb-1">Section</label>
                            <select
                                name="section"
                                value={form.section}
                                onChange={handleChange}
                                className="w-full border border-[#D6DDEB] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4640DE]/30"
                            >
                                <option value="featured">Featured</option>
                                <option value="latest">Latest</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#515B6F] mb-1">Tags <span className="text-gray-400">(comma separated)</span></label>
                        <input
                            name="tags"
                            value={form.tags}
                            onChange={handleChange}
                            placeholder="e.g. Design, Marketing, Technology"
                            className="w-full border border-[#D6DDEB] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4640DE]/30"
                        />
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2.5 rounded-lg border border-[#D6DDEB] text-sm font-semibold text-[#515B6F] hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-2.5 rounded-lg bg-[#4640DE] text-white text-sm font-semibold hover:bg-[#3833b3] transition-colors disabled:opacity-60"
                        >
                            {loading ? 'Adding...' : 'Add Job'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

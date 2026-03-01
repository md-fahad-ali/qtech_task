'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// Match the Job interface from your main page or define a shared one
interface Job {
    _id: string;
    title: string;
    company: string;
    location: string;
    category: string;
    description: string;
    type: string;
    tags: string[];
    section: string;
    logo?: string;
}

interface EditJobModalProps {
    job: Job;
    onClose: () => void;
    onSuccess: () => void;
}

export default function EditJobModal({ job, onClose, onSuccess }: EditJobModalProps) {
    const [form, setForm] = useState({
        title: job.title,
        company: job.company,
        location: job.location,
        category: job.category,
        description: job.description,
        type: job.type,
        tags: job.tags.join(', '),
        section: job.section || 'latest',
        logo: job.logo || '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch(`${API_URL}/api/jobs/${job._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...form,
                    tags: form.tags.split(',').map(t => t.trim()).filter(Boolean)
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Failed to update job');
            }

            onSuccess(); // Refresh the list
            onClose(); // Close modal
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-semibold text-[#25324B]">Edit Job</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={20} className="text-[#515B6F]" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
                                required={name !== 'logo'}
                                type="text"
                                name={name}
                                value={form[name as keyof typeof form]}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-[#D6DDEB] rounded-lg focus:outline-none focus:border-[#4640DE] focus:ring-1 focus:ring-[#4640DE]"
                                placeholder={`Enter ${label.toLowerCase()}`}
                            />
                        </div>
                    ))}

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-[#515B6F] mb-1">Job Type</label>
                            <select
                                name="type"
                                value={form.type}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-[#D6DDEB] rounded-lg focus:outline-none focus:border-[#4640DE]"
                            >
                                <option value="Full Time">Full Time</option>
                                <option value="Part Time">Part Time</option>
                                <option value="Contract">Contract</option>
                                <option value="Internship">Internship</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#515B6F] mb-1">Section</label>
                            <select
                                name="section"
                                value={form.section}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-[#D6DDEB] rounded-lg focus:outline-none focus:border-[#4640DE]"
                            >
                                <option value="featured">Featured Job</option>
                                <option value="latest">Latest Job</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#515B6F] mb-1">
                            Tags (comma separated)
                        </label>
                        <input
                            type="text"
                            name="tags"
                            value={form.tags}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-[#D6DDEB] rounded-lg focus:outline-none focus:border-[#4640DE]"
                            placeholder="e.g. React, Node.js, Remote"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#515B6F] mb-1">Description</label>
                        <textarea
                            required
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-2 border border-[#D6DDEB] rounded-lg focus:outline-none focus:border-[#4640DE] resize-y"
                            placeholder="Enter job description"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 border border-[#D6DDEB] text-[#515B6F] font-medium rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-[#4640DE] text-white font-medium rounded-lg hover:bg-[#3833b3] transition-colors disabled:opacity-70 flex items-center justify-center p-4 min-w-[120px]"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin truncate"></div>
                            ) : (
                                "Save Changes"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

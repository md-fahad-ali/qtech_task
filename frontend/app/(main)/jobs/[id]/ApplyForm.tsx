'use client';

import { useState } from 'react';
import { clashDisplay } from '@/lib/fonts';

export default function ApplyForm({ jobId }: { jobId: string }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        resume_link: '',
        cover_note: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const res = await fetch(`${apiUrl}/api/applications`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, job_id: jobId }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Error submitting application');
            }

            setSuccess(true);
            setFormData({ name: '', email: '', resume_link: '', cover_note: '' });
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-white p-8 border border-gray-200">
            <h2 className={`${clashDisplay.className} text-[#25324B] font-semibold text-2xl mb-6`}>Apply Now</h2>

            {success ? (
                <div className="p-4 bg-green-50 text-green-700 rounded mb-6 font-epilogue">
                    Application submitted successfully!
                </div>
            ) : null}

            {error ? (
                <div className="p-4 bg-red-50 text-red-700 rounded mb-6 font-epilogue">
                    {error}
                </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-4 font-epilogue">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#25324B] mb-2">Full Name *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-[#4640DE] focus:border-[#4640DE] outline-none transition-colors text-gray-600"
                        placeholder="Enter your full name"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#25324B] mb-2">Email Address *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-[#4640DE] focus:border-[#4640DE] outline-none transition-colors text-gray-600"
                        placeholder="Enter your email address"
                    />
                </div>

                <div>
                    <label htmlFor="resume_link" className="block text-sm font-medium text-[#25324B] mb-2">Resume link *</label>
                    <input
                        type="url"
                        id="resume_link"
                        name="resume_link"
                        required
                        value={formData.resume_link}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-[#4640DE] focus:border-[#4640DE] outline-none transition-colors text-gray-600"
                        placeholder="Link to your resume/CV"
                    />
                </div>

                <div>
                    <label htmlFor="cover_note" className="block text-sm font-medium text-[#25324B] mb-2">Cover Note (Optional)</label>
                    <textarea
                        id="cover_note"
                        name="cover_note"
                        rows={4}
                        value={formData.cover_note}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-[#4640DE] focus:border-[#4640DE] outline-none transition-colors text-gray-600 resize-none"
                        placeholder="Add a cover note or additional information..."
                    />
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-[#4640DE] text-white font-semibold py-3 px-6 rounded hover:bg-[#3934b3] disabled:opacity-50 transition-colors"
                    >
                        {submitting ? 'Applying...' : 'Apply Now'}
                    </button>
                </div>
            </form>
        </div>
    );
}

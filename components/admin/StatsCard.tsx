interface StatsCardProps {
    label: string;
    value: number;
    icon: React.ReactNode;
    color: string;
}

export default function StatsCard({ label, value, icon, color }: StatsCardProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-100 p-6 flex items-center gap-4 shadow-sm">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
                {icon}
            </div>
            <div>
                <p className="text-3xl font-bold text-[#25324B]">{value}</p>
                <p className="text-sm text-[#7C8493] mt-0.5">{label}</p>
            </div>
        </div>
    );
}

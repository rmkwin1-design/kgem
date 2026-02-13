import React, { useState, useEffect } from 'react';

interface SocialProofProps {
    type: 'live' | 'trust' | 'verify';
    count?: number;
    className?: string;
}

export const SocialProof: React.FC<SocialProofProps> = ({ type, count, className = "" }) => {
    const [displayCount, setDisplayCount] = useState(count || 0);

    useEffect(() => {
        if (type === 'live') {
            // Simulate live fluctuation
            const interval = setInterval(() => {
                setDisplayCount(prev => {
                    const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
                    return Math.max(5, prev + change);
                });
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [type]);

    if (type === 'live') {
        return (
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 animate-pulse ${className}`}>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-tight">
                    {displayCount} Travelers viewing now
                </span>
            </div>
        );
    }

    if (type === 'trust') {
        return (
            <div className={`flex items-center gap-4 py-2 ${className}`}>
                <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center overflow-hidden">
                            <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover opacity-80" />
                        </div>
                    ))}
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-black text-white">Trusted by 1,200+ Travelers</span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Global Community verified</span>
                </div>
            </div>
        );
    }

    if (type === 'verify') {
        return (
            <div className={`flex items-center gap-1.5 text-indigo-400 ${className}`}>
                <span className="text-xs">🛡️</span>
                <span className="text-[10px] font-black uppercase tracking-widest">AI & Local Verified</span>
            </div>
        );
    }

    return null;
};

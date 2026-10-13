import React from 'react';

export const VMSkeleton: React.FC = () => {
    return (
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 animate-pulse">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-800 rounded-xl"></div>
                    <div className="space-y-2">
                        <div className="w-32 h-4 bg-slate-800 rounded"></div>
                        <div className="w-20 h-3 bg-slate-800/60 rounded"></div>
                    </div>
                </div>
                <div className="w-16 h-6 bg-slate-800 rounded-full"></div>
            </div>
            <div className="grid grid-cols-3 gap-2 py-3 my-2 border-y border-slate-800">
                <div className="h-10 bg-slate-800/50 rounded-lg"></div>
                <div className="h-10 bg-slate-800/50 rounded-lg"></div>
                <div className="h-10 bg-slate-800/50 rounded-lg"></div>
            </div>
            <div className="flex justify-between items-center pt-2">
                <div className="w-20 h-7 bg-slate-800 rounded-lg"></div>
                <div className="w-12 h-7 bg-slate-800 rounded-lg"></div>
            </div>
        </div>
    );
};
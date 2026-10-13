import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import type { ToastMessage } from '../types';

interface ToastProps {
    toasts: ToastMessage[];
    onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
    return (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full">
            {toasts.map((t) => (
                <div
                    key={t.id}
                    className={`flex items-center justify-between p-4 rounded-xl border backdrop-blur-md shadow-2xl transition-all duration-300 ${t.type === 'success'
                            ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200'
                            : t.type === 'error'
                                ? 'bg-rose-950/80 border-rose-500/50 text-rose-200'
                                : 'bg-cyan-950/80 border-cyan-500/50 text-cyan-200'
                        }`}
                >
                    <div className="flex items-center gap-3">
                        {t.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                        {t.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                        {t.type === 'info' && <Info className="w-5 h-5 text-cyan-400 shrink-0" />}
                        <span className="text-sm font-medium">{t.text}</span>
                    </div>
                    <button
                        onClick={() => onDismiss(t.id)}
                        className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ))}
        </div>
    );
};
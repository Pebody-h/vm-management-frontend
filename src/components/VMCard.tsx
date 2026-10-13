import React from 'react';
import { Cpu, Database, HardDrive, Power, Edit3, Trash2, Server } from 'lucide-react';
import type { VirtualMachine, Role } from '../types';

interface VMCardProps {
    vm: VirtualMachine;
    userRole: Role;
    isHighlighted?: boolean;
    onEdit: (vm: VirtualMachine) => void;
    onDelete: (id: string) => void;
    onToggleStatus: (vm: VirtualMachine) => void;
}

export const VMCard: React.FC<VMCardProps> = ({
    vm,
    userRole,
    isHighlighted,
    onEdit,
    onDelete,
    onToggleStatus
}) => {
    const isAdmin = userRole === 'Administrador';

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Encendida':
                return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
            case 'Apagada':
                return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
            case 'Mantenimiento':
                return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
            default:
                return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
        }
    };

    return (
        <div
            className={`bg-slate-900/80 border rounded-2xl p-5 transition-all duration-300 relative overflow-hidden group ${isHighlighted
                    ? 'border-cyan-400 ring-2 ring-cyan-400/50 shadow-2xl shadow-cyan-500/30 animate-pulse-glow'
                    : 'border-slate-800 hover:border-slate-700 hover:shadow-xl hover:shadow-cyan-950/30'
                }`}
        >
            <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-slate-800 rounded-xl border border-slate-700/60 text-slate-300 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-colors">
                        <Server className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-100 text-base">{vm.name}</h3>
                        <span className="text-xs text-slate-400 font-mono">{vm.os}</span>
                    </div>
                </div>

                <span
                    className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getStatusBadge(
                        vm.status
                    )}`}
                >
                    {vm.status}
                </span>
            </div>

            <div className="grid grid-cols-3 gap-2 py-3 my-2 border-y border-slate-800/80 text-xs">
                <div className="flex flex-col items-center p-2 rounded-lg bg-slate-950/40">
                    <div className="flex items-center gap-1 text-slate-400 mb-0.5">
                        <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Cores</span>
                    </div>
                    <span className="font-bold text-slate-200">{vm.cores} vCPU</span>
                </div>

                <div className="flex flex-col items-center p-2 rounded-lg bg-slate-950/40">
                    <div className="flex items-center gap-1 text-slate-400 mb-0.5">
                        <Database className="w-3.5 h-3.5 text-indigo-400" />
                        <span>RAM</span>
                    </div>
                    <span className="font-bold text-slate-200">{vm.ram} GB</span>
                </div>

                <div className="flex flex-col items-center p-2 rounded-lg bg-slate-950/40">
                    <div className="flex items-center gap-1 text-slate-400 mb-0.5">
                        <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Disco</span>
                    </div>
                    <span className="font-bold text-slate-200">{vm.disk} GB</span>
                </div>
            </div>

            {isAdmin && (
                <div className="flex items-center justify-between pt-2">
                    <button
                        onClick={() => onToggleStatus(vm)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${vm.status === 'Encendida'
                                ? 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30'
                                : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30'
                            }`}
                    >
                        <Power className="w-3.5 h-3.5" />
                        {vm.status === 'Encendida' ? 'Apagar' : 'Encender'}
                    </button>

                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => onEdit(vm)}
                            title="Editar Máquina Virtual"
                            className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors"
                        >
                            <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onDelete(vm.id)}
                            title="Eliminar Máquina Virtual"
                            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Cpu, HardDrive, Database } from 'lucide-react';
import type { VirtualMachine } from '../types';

interface ResourceChartProps {
    vms: VirtualMachine[];
}

export const ResourceChart: React.FC<ResourceChartProps> = ({ vms }) => {
    const activeVMs = vms.filter((v) => v.status === 'Encendida');

    const totalCores = activeVMs.reduce((acc, v) => acc + v.cores, 0);
    const totalRam = activeVMs.reduce((acc, v) => acc + v.ram, 0);
    const totalDisk = activeVMs.reduce((acc, v) => acc + v.disk, 0);

    const chartData = [
        { name: 'Cores Totales', value: totalCores, unit: 'vCPU', color: '#06b6d4' },
        { name: 'RAM Asignada', value: totalRam, unit: 'GB', color: '#6366f1' },
        { name: 'Almacenamiento', value: totalDisk, unit: 'GB', color: '#10b981' }
    ];

    return (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-base font-semibold text-slate-100">Consumo de Recursos Activos</h2>
                    <p className="text-xs text-slate-400">Métricas acumuladas de VMs en estado Encendida</p>
                </div>
                <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold rounded-full">
                    {activeVMs.length} VMs Activas
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-slate-400 font-medium">Cores CPU</p>
                        <p className="text-2xl font-bold text-cyan-400 mt-1">{totalCores} <span className="text-xs font-normal text-slate-400">vCPU</span></p>
                    </div>
                    <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400">
                        <Cpu className="w-5 h-5" />
                    </div>
                </div>

                <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-slate-400 font-medium">Memoria RAM</p>
                        <p className="text-2xl font-bold text-indigo-400 mt-1">{totalRam} <span className="text-xs font-normal text-slate-400">GB</span></p>
                    </div>
                    <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
                        <Database className="w-5 h-5" />
                    </div>
                </div>

                <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-slate-400 font-medium">Disco SSD</p>
                        <p className="text-2xl font-bold text-emerald-400 mt-1">{totalDisk} <span className="text-xs font-normal text-slate-400">GB</span></p>
                    </div>
                    <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
                        <HardDrive className="w-5 h-5" />
                    </div>
                </div>
            </div>

            <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                            itemStyle={{ color: '#f8fafc' }}
                            formatter={(value: any, _name: any, props: any) => [`${value ?? 0} ${props.payload?.unit ?? ''}`, 'Total']}
                        />
                        <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
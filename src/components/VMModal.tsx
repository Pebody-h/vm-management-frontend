import React, { useState, useEffect } from 'react';
import { X, Server, AlertTriangle } from 'lucide-react';
import type { VirtualMachine, VMStatus } from '../types';

interface VMModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Omit<VirtualMachine, 'id' | 'createdAt'>) => void;
    initialData?: VirtualMachine | null;
}

export const VMModal: React.FC<VMModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData
}) => {
    const [name, setName] = useState('');
    const [cores, setCores] = useState(2);
    const [ram, setRam] = useState(4);
    const [disk, setDisk] = useState(50);
    const [os, setOs] = useState('Ubuntu 22.04 LTS');
    const [status, setStatus] = useState<VMStatus>('Apagada');

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setCores(initialData.cores);
            setRam(initialData.ram);
            setDisk(initialData.disk);
            setOs(initialData.os);
            setStatus(initialData.status);
        } else {
            setName('');
            setCores(2);
            setRam(4);
            setDisk(50);
            setOs('Ubuntu 22.04 LTS');
            setStatus('Apagada');
        }
        setErrors({});
    }, [initialData, isOpen]);

    const validate = () => {
        const errs: Record<string, string> = {};

        if (!name.trim()) {
            errs.name = 'El nombre es obligatorio';
        } else if (!/^[A-Za-z0-9_-]+$/.test(name)) {
            errs.name = 'El nombre solo permite letras, números, guiones y guión bajo';
        }

        if (cores <= 0) errs.cores = 'Los Cores deben ser mayores a 0';
        if (ram <= 0) errs.ram = 'La RAM debe ser mayor a 0 GB';
        if (disk <= 0) errs.disk = 'El disco debe ser mayor a 0 GB';

        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        onSubmit({
            name,
            cores: Number(cores),
            ram: Number(ram),
            disk: Number(disk),
            os,
            status
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-xl">
                            <Server className="w-5 h-5" />
                        </div>
                        <h2 className="text-lg font-bold text-slate-100">
                            {initialData ? 'Editar Máquina Virtual' : 'Crear Máquina Virtual'}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                            Nombre de la VM
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                if (errors.name) validate();
                            }}
                            placeholder="ej. SRV-APP-01"
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                        />
                        {errors.name && (
                            <p className="flex items-center gap-1 text-xs text-rose-400 mt-1">
                                <AlertTriangle className="w-3 h-3" /> {errors.name}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">
                                Cores (vCPU)
                            </label>
                            <input
                                type="number"
                                value={cores}
                                min={1}
                                onChange={(e) => setCores(Number(e.target.value))}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                            />
                            {errors.cores && <p className="text-xs text-rose-400 mt-1">{errors.cores}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">
                                RAM (GB)
                            </label>
                            <input
                                type="number"
                                value={ram}
                                min={1}
                                onChange={(e) => setRam(Number(e.target.value))}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                            />
                            {errors.ram && <p className="text-xs text-rose-400 mt-1">{errors.ram}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">
                                Disco (GB)
                            </label>
                            <input
                                type="number"
                                value={disk}
                                min={1}
                                onChange={(e) => setDisk(Number(e.target.value))}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                            />
                            {errors.disk && <p className="text-xs text-rose-400 mt-1">{errors.disk}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">
                                Sistema Operativo
                            </label>
                            <select
                                value={os}
                                onChange={(e) => setOs(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                            >
                                <option value="Ubuntu 22.04 LTS">Ubuntu 22.04 LTS</option>
                                <option value="Debian 12">Debian 12</option>
                                <option value="CentOS Stream 9">CentOS Stream 9</option>
                                <option value="Windows Server 2022">Windows Server 2022</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">Estado Inicial</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value as VMStatus)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                            >
                                <option value="Apagada">Apagada</option>
                                <option value="Encendida">Encendida</option>
                                <option value="Mantenimiento">Mantenimiento</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-indigo-600 text-white hover:from-cyan-400 hover:to-indigo-500 shadow-lg shadow-cyan-500/20 transition-all"
                        >
                            {initialData ? 'Guardar Cambios' : 'Crear Máquina'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
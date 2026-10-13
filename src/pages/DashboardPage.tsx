import React, { useEffect, useState } from 'react';
import { Plus, Server, Inbox } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import { apiFetch } from '../api/client';
import type { VirtualMachine, ToastMessage } from '../types';
import { VMCard } from '../components/VMCard';
import { VMSkeleton } from '../components/VMSkeleton';
import { VMModal } from '../components/VMModal';
import { ResourceChart } from '../components/ResourceChart';
import { ToastContainer } from '../components/Toast';

export const DashboardPage: React.FC = () => {
    const { user } = useAuth();
    const { socket } = useSocket();

    const [vms, setVms] = useState<VirtualMachine[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editingVm, setEditingVm] = useState<VirtualMachine | null>(null);
    const [highlightedVmId, setHighlightedVmId] = useState<string | null>(null);
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const isAdmin = user?.role === 'Administrador';

    const addToast = (type: 'success' | 'error' | 'info', text: string) => {
        const id = Date.now().toString();
        setToasts((prev) => [...prev, { id, type, text }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 4000);
    };

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    const fetchVMs = async () => {
        try {
            const data = await apiFetch<VirtualMachine[]>('/vms');
            setVms(data);
        } catch {
            addToast('error', 'Error al cargar el listado de máquinas virtuales');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVMs();
    }, []);

    useEffect(() => {
        if (!socket) return;

        socket.on('vm_created', (newVm: VirtualMachine) => {
            setVms((prev) => {
                if (prev.some((v) => v.id === newVm.id)) return prev;
                const filtered = prev.filter((v) => !(v.id.startsWith('temp-') && v.name === newVm.name));
                return [...filtered, newVm];
            });
            triggerHighlight(newVm.id);
        });

        socket.on('vm_updated', (updatedVm: VirtualMachine) => {
            setVms((prev) => prev.map((v) => (v.id === updatedVm.id ? updatedVm : v)));
            triggerHighlight(updatedVm.id);
        });

        socket.on('vm_deleted', ({ id }: { id: string }) => {
            setVms((prev) => prev.filter((v) => v.id !== id));
        });

        return () => {
            socket.off('vm_created');
            socket.off('vm_updated');
            socket.off('vm_deleted');
        };
    }, [socket]);

    const triggerHighlight = (id: string) => {
        setHighlightedVmId(id);
        setTimeout(() => {
            setHighlightedVmId(null);
        }, 2000);
    };

    const handleCreateOrUpdate = async (formData: Omit<VirtualMachine, 'id' | 'createdAt'>) => {
        if (editingVm) {
            const previousVMs = [...vms];
            const updatedOptimistic: VirtualMachine = {
                ...editingVm,
                ...formData
            };

            setVms((prev) => prev.map((v) => (v.id === editingVm.id ? updatedOptimistic : v)));
            addToast('info', 'Actualizando máquina virtual...');

            try {
                await apiFetch<VirtualMachine>(`/vms/${editingVm.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(formData)
                });
                addToast('success', 'Máquina virtual actualizada con éxito');
            } catch (error: any) {
                setVms(previousVMs);
                addToast('error', error.message || 'Falló la actualización. Cambios revertidos.');
            }
        } else {
            const previousVMs = [...vms];
            const tempId = `temp-${Date.now()}`;
            const tempVM: VirtualMachine = {
                ...formData,
                id: tempId,
                createdAt: new Date().toISOString()
            };

            setVms((prev) => [...prev, tempVM]);
            addToast('info', 'Creando máquina virtual...');

            try {
                const created = await apiFetch<VirtualMachine>('/vms', {
                    method: 'POST',
                    body: JSON.stringify(formData)
                });
                setVms((prev) => {
                    const existsByRealId = prev.some((v) => v.id === created.id);
                    if (existsByRealId) {
                        return prev.filter((v) => v.id !== tempId);
                    }
                    return prev.map((v) => (v.id === tempId ? created : v));
                });
                addToast('success', 'Máquina virtual creada correctamente');
            } catch (error: any) {
                setVms(previousVMs);
                addToast('error', error.message || 'Falló la creación. Cambios revertidos.');
            }
        }
    };

    const handleDeleteVM = async (id: string) => {
        const previousVMs = [...vms];
        setVms((prev) => prev.filter((v) => v.id !== id));
        addToast('info', 'Eliminando máquina virtual...');

        try {
            await apiFetch(`/vms/${id}`, { method: 'DELETE' });
            addToast('success', 'Máquina virtual eliminada');
        } catch (error: any) {
            setVms(previousVMs);
            addToast('error', error.message || 'Falló la eliminación. Estado restaurado.');
        }
    };

    const handleToggleStatus = async (vm: VirtualMachine) => {
        const newStatus = vm.status === 'Encendida' ? 'Apagada' : 'Encendida';
        const previousVMs = [...vms];

        setVms((prev) =>
            prev.map((v) => (v.id === vm.id ? { ...v, status: newStatus } : v))
        );

        try {
            await apiFetch<VirtualMachine>(`/vms/${vm.id}`, {
                method: 'PUT',
                body: JSON.stringify({ status: newStatus })
            });
            addToast('success', `Estado cambiado a ${newStatus}`);
        } catch {
            setVms(previousVMs);
            addToast('error', 'Error al cambiar estado. Cambio revertido.');
        }
    };

    return (
        <div className="space-y-8">
            <ResourceChart vms={vms} />

            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                        <Server className="w-5 h-5 text-cyan-400" /> Máquinas Virtuales
                    </h2>
                    <p className="text-xs text-slate-400">Listado general de servidores asignados</p>
                </div>

                {isAdmin && (
                    <button
                        onClick={() => {
                            setEditingVm(null);
                            setIsModalOpen(true);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-indigo-500 transition-all"
                    >
                        <Plus className="w-4 h-4" /> Crear Nueva VM
                    </button>
                )}
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <VMSkeleton />
                    <VMSkeleton />
                    <VMSkeleton />
                </div>
            ) : vms.length === 0 ? (
                <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center">
                    <div className="p-4 bg-slate-800/60 rounded-full text-slate-500 mb-4">
                        <Inbox className="w-8 h-8" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-200">No hay Máquinas Virtuales</h3>
                    <p className="text-xs text-slate-400 max-w-sm mt-1">
                        Actualmente no existen recursos creados en este entorno.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vms.map((vm) => (
                        <VMCard
                            key={vm.id}
                            vm={vm}
                            userRole={user?.role || 'Cliente'}
                            isHighlighted={highlightedVmId === vm.id}
                            onEdit={(target) => {
                                setEditingVm(target);
                                setIsModalOpen(true);
                            }}
                            onDelete={handleDeleteVM}
                            onToggleStatus={handleToggleStatus}
                        />
                    ))}
                </div>
            )}

            <VMModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingVm(null);
                }}
                onSubmit={handleCreateOrUpdate}
                initialData={editingVm}
            />

            <ToastContainer toasts={toasts} onDismiss={removeToast} />
        </div>
    );
};
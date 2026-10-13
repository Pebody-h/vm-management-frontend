import React from 'react';
import { Server, LogOut, Shield, User as UserIcon, Wifi, WifiOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';

export const Navbar: React.FC = () => {
    const { user, logout } = useAuth();
    const { isConnected } = useSocket();

    return (
        <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-gradient-to-tr from-cyan-600 to-indigo-600 rounded-xl shadow-lg shadow-cyan-500/20">
                        <Server className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                            CloudVM Manager
                        </h1>
                        <p className="text-xs text-slate-400">Plataforma de Control de Infraestructura</p>
                    </div>
                </div>

                {user && (
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/50 text-xs">
                            {isConnected ? (
                                <>
                                    <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                                    <span className="text-emerald-400 font-medium">Realtime Activo</span>
                                </>
                            ) : (
                                <>
                                    <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                                    <span className="text-amber-400 font-medium">Desconectado</span>
                                </>
                            )}
                        </div>

                        <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
                            <div className="flex flex-col items-end">
                                <span className="text-sm font-semibold text-slate-200">{user.name}</span>
                                <span className="inline-flex items-center gap-1 text-xs font-medium text-cyan-400">
                                    <Shield className="w-3 h-3" />
                                    {user.role}
                                </span>
                            </div>
                            <div className="p-2 bg-slate-800 rounded-full text-slate-300">
                                <UserIcon className="w-5 h-5" />
                            </div>
                            <button
                                onClick={logout}
                                title="Cerrar Sesión"
                                className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};
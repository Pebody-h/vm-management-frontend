import React, { useState } from 'react';
import { Server, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('admin@ifx.com');
    const [password, setPassword] = useState('admin123password');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
        } catch (err: any) {
            setError(err.message || 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    const setPreset = (role: 'admin' | 'cliente') => {
        if (role === 'admin') {
            setEmail('admin@ifx.com');
            setPassword('admin123password');
        } else {
            setEmail('cliente@ifx.com');
            setPassword('cliente123password');
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-md w-full bg-slate-900/80 border border-slate-800 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl relative z-10">
                <div className="text-center mb-8">
                    <div className="inline-flex p-3 bg-gradient-to-tr from-cyan-600 to-indigo-600 rounded-2xl shadow-xl shadow-cyan-500/20 mb-4">
                        <Server className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                        Bienvenido
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                        Gestión Inteligente de Infraestructura Virtual
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-medium text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">Correo Electrónico</label>
                        <div className="relative">
                            <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                                placeholder="correo@ifxcorp.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">Contraseña</label>
                        <div className="relative">
                            <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white rounded-xl text-sm font-semibold hover:from-cyan-400 hover:to-indigo-500 shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                    >
                        {loading ? 'Ingresando...' : 'Iniciar Sesión'}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-800/80">
                    <p className="text-xs text-slate-400 text-center mb-3 font-medium flex items-center justify-center gap-1">
                        <ShieldCheck className="w-4 h-4 text-cyan-400" /> Credenciales rápidas de prueba:
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={() => setPreset('admin')}
                            type="button"
                            className="py-2 px-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-xs font-medium text-slate-300 hover:text-cyan-400 transition-all text-center"
                        >
                            Administrador
                        </button>
                        <button
                            onClick={() => setPreset('cliente')}
                            type="button"
                            className="py-2 px-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-xs font-medium text-slate-300 hover:text-cyan-400 transition-all text-center"
                        >
                            Cliente
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
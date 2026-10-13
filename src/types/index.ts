export type Role = 'Administrador' | 'Cliente';
export type VMStatus = 'Encendida' | 'Apagada' | 'Mantenimiento';

export interface User {
    id: string;
    email: string;
    name: string;
    role: Role;
}

export interface VirtualMachine {
    id: string;
    name: string;
    cores: number;
    ram: number;
    disk: number;
    os: string;
    status: VMStatus;
    createdAt: string;
}

export interface ToastMessage {
    id: string;
    type: 'success' | 'error' | 'info';
    text: string;
}
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const config: RequestInit = {
        ...options,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        }
    };

    const response = await fetch(`${API_URL}${endpoint}`, config);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Error en la petición' }));
        throw new Error(errorData.message || 'Error del servidor');
    }

    return response.json();
}
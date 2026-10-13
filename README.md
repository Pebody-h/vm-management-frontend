# CloudVM Manager - Single Page Application (SPA)

Interfaz de usuario responsiva y moderna construida con React, Vite, TypeScript y Tailwind CSS para la administración de infraestructura virtual. Implementa Dark Mode nativo, Optimistic UI con reversión automática ante fallos de red, visualización agregada de métricas mediante Recharts, feedback visual avanzado y sincronización reactiva en tiempo real vía WebSockets.

---

## 🔗 Enlaces del Proyecto y Despliegue

* **Aplicación en Producción (Frontend):** `[INSERTAR_AQUI_LINK_DE_VERCEL_O_PRODUCCION]`
* **Repositorio Backend:** `https://github.com/Pebody-h/vm-management-backend.git`
* **API Backend en Producción:** `[INSERTAR_AQUI_LINK_DE_RENDER_BACKEND]`

---

## 🔑 Credenciales para Pruebas

El sistema incluye botones de acceso directo en el formulario de inicio de sesión para facilitar la evaluación:

| Rol | Correo Electrónico | Contraseña | Comportamiento en UI |
| :--- | :--- | :--- | :--- |
| **Administrador** | `admin@ifx.com` | `admin123password` | Acceso completo. Visualiza botón "Crear Nueva VM", botones de cambio de estado y acciones de edición/eliminación. |
| **Cliente** | `cliente@ifx.com` | `cliente123password` | Vista restringida. Los controles de modificación no están simplemente deshabilitados, sino **completamente eliminados del árbol DOM**. |

---

## ⚙️ Variables de Entorno (`.env`)

Crea un archivo `.env` en la raíz de la carpeta `frontend`:

```env
VITE_API_URL=http://localhost:4000/api
VITE_SOCKET_URL=http://localhost:4000
```

---

## 🚀 Despliegue y Ejecución Local

Instalar dependencias:

```Bash
npm install
```
Ejecutar servidor de desarrollo:

```Bash
npm run dev
```
La aplicación se abrirá en: http://localhost:5173

Generar compilación optimizada para producción:

```Bash
npm run build
```

---

## 💻 Características Técnicas Implementadas
1. Gestión de Estado y Optimistic UI
Al crear, modificar o eliminar una VM, el estado local de React se actualiza de manera inmediata reflejando el cambio sin esperar el viaje redondo de la petición HTTP. En caso de que el backend retorne un código de error o el servidor no responda, el sistema ejecuta una reversión automática (rollback) al estado previo y dispara una notificación Toast informativa de alerta.

2. Sincronización Real-Time con WebSockets (Socket.io)
Los clientes suscritos escuchan en segundo plano los eventos emitidos por el servidor (vm_created, vm_updated, vm_deleted). Cuando otro usuario o un administrador altera el estado de un recurso (ej. de "Apagada" a "Encendida"), la tarjeta afectada se actualiza inmediatamente en pantalla y ejecuta una animación de resplandor cian (animate-pulse-glow) para resaltar el cambio visualmente.

3. Data Visualization (Recharts)
Un panel superior procesa en tiempo de ejecución las métricas acumuladas de Cores (vCPU), RAM (GB) y Almacenamiento (GB) de todas las máquinas en estado Encendida, reflejando incrementos o decrementos de manera dinámica según las acciones realizadas.

4. Feedback Visual Integral
Skeletons: Indicadores de carga estructurados durante la consulta inicial a la API.

Empty States: Pantalla informativa cuando no existen recursos registrados.

Toasts: Notificaciones flotantes no bloqueantes para acciones exitosas y advertencias.

Validación en Tiempo Real: El modal de creación/edición valida formatos y prohíbe valores negativos en tiempo real.


---

## 📂 Organización del Proyecto Frontend
```
frontend/src/
├── api/          # Cliente fetch centralizado con credentials: 'include'
├── components/   # Componentes de interfaz (Navbar, VMCard, VMModal, Chart, Skeleton, Toast)
├── context/      # Proveedores de estado global (AuthContext y SocketContext)
├── pages/        # Vistas raíz (LoginPage y DashboardPage)
├── types/        # Definiciones estrictas de TypeScript
├── index.css     # Estilos globales y animaciones de keyframes
└── main.tsx      # Punto de entrada de la aplicación
```

---

## 📝 Bitácora de IA
1. Herramientas Utilizadas
Asistente de IA (Modelos LLM) como soporte técnico para desarrollo ágil.

2. Delegación vs. Intervención Humana
Implementado por el Candidato:

Lógica base de conexión con WebSockets y suscripción de clientes.

Arquitectura de componentes, protección de rutas y control de visibilidad por rol.

Solución a la condición de carrera entre el estado optimista y los eventos entrantes del socket (prevención de tarjetas duplicadas).

Delegado a la IA:

Refinamiento en la integración de Socket.io dentro de React Context para garantizar la limpieza correcta de listeners (off).

Asistencia en el diseño estilístico con clases de Tailwind CSS (efectos de cristal, bordes sutiles y modo oscuro).

Redacción y estructuración técnica del archivo README.

3. Prompts Clave Utilizados
```
Prompt 1 (Refinamiento de WebSockets sobre base existente):
"Tengo esta implementación base de sockets en React. Ayúdame a refinar el contexto para que mantenga la conexión viva solo mientras el usuario esté autenticado y permita capturar eventos globales sin duplicar listeners al desmontar componentes."
```

```
Prompt 2 (Estilizado UI con Tailwind CSS):
"Genera la estructura de componentes con Tailwind CSS para una tarjeta de servidor y un panel de métricas con Recharts en Dark Mode estricto, incluyendo una clase de animación para resaltar visualmente cuando una propiedad del componente cambie."
```

# Guía Paso a Paso: Creación de Monorepo con Turborepo, React y Express

Este repositorio es un ejemplo práctico de cómo configurar un monorepo desde cero utilizando **Turborepo** para gestionar un frontend en **React (Vite)** y un backend en **Express**.

---

## Estructura del Proyecto

```text
monorepo/
├── Apps/
│   ├── apis/          # Backend (Express)
│   └── client/        # Frontend (React + Vite)
├── package.json       # Configuración de espacios de trabajo (Workspaces)
├── turbo.json         # Configuración de Turborepo
└── ...
```

---

## 🚀 Pasos de Creación

### 1. Inicialización del Root
Primero, creamos la carpeta raíz e inicializamos el proyecto de Node.js.

```bash
mkdir monorepo && cd monorepo
npm init -y
```

### 2. Instalación de Turborepo
Instalamos Turbo como dependencia de desarrollo en la raíz.

```bash
npm install turbo --save-dev
```

### 3. Configuración de Workspaces
Modificamos el `package.json` de la raíz para definir dónde estarán nuestras aplicaciones.

```json
{
  "name": "monorepo",
  "workspaces": [
    "Apps/*"
  ],
  "scripts": {
    "start:dev": "turbo dev",
    "build": "turbo build"
  }
}
```

### 4. Creación de Aplicaciones

Creamos la carpeta `Apps` y dentro generamos nuestros proyectos:

#### Frontend (Client)
Dentro de `Apps/`, ejecutamos:
```bash
npm create vite@latest client -- --template react-swc
```

#### Backend (Apis)
Creamos la carpeta `Apps/apis` e inicializamos un proyecto simple:
```bash
mkdir apis && cd apis
npm init -y
npm install express
npm install nodemon --save-dev
```

### 5. Configuración de Turborepo (`turbo.json`)
Creamos un archivo `turbo.json` en la raíz para definir cómo debe ejecutar Turbo las tareas.

```json
{
  "$schema": "https://turborepo.dev/schema.json",
  "tasks": {
    "dev": {
      "cache": false,
      "persistent": true
    },
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    }
  }
}
```

### 6. Conexión Frontend-Backend (Proxy)
Para evitar problemas de CORS durante el desarrollo, configuramos un proxy en el frontend (`Apps/client/vite.config.js`):

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})
```

### 7. Implementación de los Scripts de Desarrollo
Aseguramos que cada `package.json` dentro de `Apps` tenga un script llamado `dev`:
- **Client**: `"dev": "vite"`
- **Apis**: `"dev": "nodemon src/index.js"`

---

## 🛠️ Cómo ejecutar el proyecto

### Modo Desarrollo
Para ejecutar ambas aplicaciones simultáneamente con recarga en vivo:

```bash
npm run start:dev
```
*   **Frontend**: Accesible en el puerto de Vite (ej: `http://localhost:5173`)
*   **Backend**: Accesible en `http://localhost:3000`

### Construcción para Producción
Para compilar ambos proyectos:

```bash
npm run build
```

---

## 📝 Notas Adicionales
- El backend está configurado para servir los archivos estáticos del frontend una vez que este ha sido compilado en la carpeta `dist`.
- Turborepo se encarga de optimizar la caché y ejecutar las tareas en paralelo, lo que acelera el flujo de trabajo en proyectos de gran escala.

Guía Maestra: Monorepo con Turborepo, Express y React
Este monorepo utiliza Turborepo para gestionar un Backend en Node.js (Express) y un Frontend en React (Vite) de forma centralizada y eficiente.

🛠 Paso 1: Configuración de la Raíz (Root)
Inicializar npm:

Bash
npm init -y
Configurar package.json raíz: Abre el archivo y asegúrate de tener estas propiedades clave:

JSON
{
  "name": "mi-monorepo",
  "private": true,
  "packageManager": "npm@10.8.2",
  "workspaces": [ "Apps/*" ],
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build"
  }
}
Nota: El nombre en workspaces debe coincidir exactamente con tu carpeta (ej. Apps con A mayúscula en Linux).

Configurar turbo.json: Crea este archivo en la raíz para definir cómo interactúan las tareas:

JSON
{
  "$schema": "https://turborepo.dev/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
🌎 Paso 2: Backend (Apps/apis)
Crear carpeta e inicializar:

Bash
mkdir -p Apps/apis && cd Apps/apis
npm init -y
npm install express cors
npm install -D nodemon
Configurar ES Modules: En Apps/apis/package.json, añade "type": "module".

Scripts del Backend:

JSON
"scripts": {
  "dev": "nodemon src/index.js",
  "build": "echo 'No build needed'",
  "start": "node src/index.js"
}
Código base (src/index.js) con fix de ESM:

JavaScript
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Servir frontend en producción
const frontendPath = path.join(__dirname, "../../client/dist");
app.use(express.static(frontendPath));

app.get('/api/saludo', (req, res) => res.json({ msg: "Hola desde Express" }));

app.listen(3000, () => console.log("Backend en puerto 3000"));
💻 Paso 3: Frontend (Apps/client)
Crear proyecto con Vite:

Bash
cd Apps
npm create vite@latest client -- --template react
cd client && npm install
Configurar el Proxy en vite.config.js: Esto evita problemas de CORS y permite usar rutas relativas:

JavaScript
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
})
⚡ Paso 4: Ejecución y Comandos
Para que todo funcione, regresa a la raíz y sigue este orden:

Instalación Global:

Bash
npm install
(Esto genera el package-lock.json necesario para que Turbo detecte los paquetes).

Modo Desarrollo:

Bash
npx turbo dev
(Lanza Express en el 3000 y Vite en el 5173 simultáneamente).

Modo Producción:

Bash
npx turbo build
(Genera la carpeta dist en el cliente para que Express pueda servirla).

⚠️ Solución de Problemas Comunes
Bucle Infinito: Asegúrate de que el script "dev" del Root no sea igual al comando que ejecuta Turbo (usa npx turbo dev directamente o renómbralo).

0 Packages Found: Revisa las mayúsculas en la carpeta Apps y el workspaces del package.json.

CORS en el navegador: Verifica que el Proxy de Vite esté apuntando al puerto correcto del backend.

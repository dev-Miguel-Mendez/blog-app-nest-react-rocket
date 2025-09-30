# Aplicación de Blog (NestJS + React)

Este repositorio contiene una API REST de NestJS respaldada por PostgreSQL y Prisma, además de un cliente mìnimo de React. El backend expone endpoints tipados para entradas que el frontend consume, pero también puedes trabajar con la API de forma independiente.

## Arquitectura del Backend
- `AppModule` conecta el `EntriesModule` específico del dominio con el `PrismaModule` compartido.
- `EntriesController` mapea rutas REST a la capa de servicios; los DTO con Zod validan cada cuerpo de la petición antes de llegar a la base de datos.
- `EntriesService` encapsula las consultas de Prisma para crear, listar, buscar y recuperar entradas individuales del blog.
- `PrismaService` centraliza la conexión con PostgreSQL y reexporta el cliente de Prisma generado ubicado en `backend/generated/prisma`.

## Ejecutar el Backend sin Docker
1. Inicia PostgreSQL localmente (o en otro contenedor) y crea una base de datos. La conexión predeterminada es `postgres://postgres:postgres@localhost:5432/posts`.
2. Dentro de `backend/`, crea un archivo `.env` con tu conexión:
   ```env
   DATABASE_URL=postgres://postgres:postgres@localhost:5432/posts
   ```
3. Instala las dependencias y genera el cliente de Prisma:
   ```bash
   npm install
   npx prisma generate
   ```
4. Aplica las migraciones del esquema:
   ```bash
   npx prisma migrate dev
   ```
5. Inicia la API (modo hot-reload):
   ```bash
   npm run start:dev
   ```
   El servidor escucha en `http://localhost:8001` por defecto (puedes sobrescribirlo con `PORT`).

## Ejecutar la applicación con Docker
- `docker compose up --build backend` construye la imagen de Nest, aplica las migraciones y levanta la API junto a una instancia de PostgreSQL 16 (expuesta en el puerto 5435).
- Agrega `frontend` al comando (o simplemente `docker compose up --build`) para ejecutar el cliente React en `http://localhost:8000`.
- Detén todo con `docker compose down` (añade `--volumes` para reiniciar la base de datos).

## Referencia Rápida de la API
- `POST /entries` — crea una entrada (`title`, `author`, `content` obligatorios).
- `GET /entries` — lista todas las entradas, de la más reciente a la más antigua.
- `GET /entries?q=term` — busca en el título, autor y contenido.
- `GET /entries/:id` — obtiene una entrada por su identificador numérico.

## Frontend (Opcional)
El cliente de React se encuentra en `fronted/`. Proporciona la URL del backend mediante `VITE_API_URL` (valor predeterminado `http://localhost:8001`) e inícialo con `npm install && npm run dev`.

## Comandos Útiles
- Ejecutar pruebas unitarias: `npm test`
- Inspeccionar la base de datos visualmente: `npx prisma studio`
- Ejecutar el linter: `npm run lint`

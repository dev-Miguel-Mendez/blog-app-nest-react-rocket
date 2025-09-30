# Blog App (NestJS + React)

This repository contains a NestJS REST API backed by PostgreSQL and Prisma, plus
an optional React client. The backend exposes typed entry endpoints that the
frontend consumes, but you can work with the API on its own.

## Backend Architecture
- `AppModule` wires the domain-specific `EntriesModule` together with the shared
  `PrismaModule`.
- `EntriesController` maps REST routes to the service layer; Zod-powered DTOs
  validate every request body before reaching the database.
- `EntriesService` encapsulates Prisma queries for creating, listing, searching,
  and retrieving individual blog entries.
- `PrismaService` centralizes the PostgreSQL connection and re-exports the
  generated Prisma client located in `backend/generated/prisma`.

## Run the Backend Without Docker
1. Start PostgreSQL locally (or in another container) and create a database.
   The default connection string is `postgres://postgres:postgres@localhost:5432/posts`.
2. Inside `backend/`, create a `.env` file with your connection string:
   ```env
   DATABASE_URL=postgres://postgres:postgres@localhost:5432/posts
   ```
3. Install dependencies and generate the Prisma client:
   ```bash
   npm install
   npx prisma generate
   ```
4. Apply the schema migrations:
   ```bash
   npx prisma migrate dev
   ```
5. Launch the API (hot-reload mode):
   ```bash
   npm run start:dev
   ```
   The server listens on `http://localhost:8001` by default (`PORT` overrides it).

## Run the Stack With Docker
- `docker compose up --build backend` builds the Nest image, applies migrations,
  and starts the API alongside a PostgreSQL 16 instance (exposed on port 5435).
- Add `frontend` to the command (or simply `docker compose up --build`) to run the
  React client on `http://localhost:8000`.
- Tear everything down with `docker compose down` (append `--volumes` to reset the database).

## API Quick Reference
- `POST /entries` — create an entry (`title`, `author`, `content` required).
- `GET /entries` — list all entries, newest first.
- `GET /entries?q=term` — search across title, author, and content.
- `GET /entries/:id` — fetch a single entry by numeric identifier.

## Frontend (Optional)
The React client lives in `fronted/`. Provide the backend URL through
`VITE_API_URL` (defaults to `http://localhost:8001`) and start it with
`npm install && npm run dev`.


## Useful Commands
- Run unit tests: `npm test`
- Inspect the database visually: `npx prisma studio`
- Lint the codebase: `npm run lint`

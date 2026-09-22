# Shema Express Backend Starter Kit

A minimal, fully-wired instance of the starter described in the spec:
config validated → app assembled → server started, with nothing else
added yet. This is the exact state to commit as "Shema Express Starter
Kit v1" before any entity (products, orders, etc.) exists.

## Quick start

```bash
npm install
cp .env.example .env
# fill in real DB_*, SESSION_SECRET, etc. in .env

npm run dev
```

Then check it's alive:

```bash
curl http://localhost:5000/api/health
# {"success":true,"data":{"status":"ok","uptimeSeconds":0,"timestamp":"..."}}
```

If any required env var is missing, `env.ts` prints exactly which one
and exits — the server will never start half-configured.

## What's here

Every folder in `src/` matches the spec: `config/`, `database/`,
`lib/`, `middlewares/`, `routes/`, `types/`, `utils/`, plus empty
`controllers/`, `services/`, `validators/` folders waiting for the
first entity.

Only two routes exist: `GET /api/health` and the catch-all 404. No
`product.*` or similar files — those get added per project, following
the 13-step development sequence in the spec (schema → types →
validators → services → controllers → routes → register → test).

## Scripts

| Command | Does |
|---|---|
| `npm run dev` | Runs the server with hot reload (`tsx watch`) |
| `npm run build` | Compiles TypeScript to `dist/` |
| `npm start` | Runs the compiled build |
| `npm run db:generate` | Generates a Drizzle migration from `schema.ts` |
| `npm run db:push` | Pushes the schema straight to the database |
| `npm run db:studio` | Opens Drizzle Studio |

## Adding the first entity

Don't start with a controller. Follow the sequence: define the table
in `database/schema.ts` (split into `database/schema/` once there's
more than one), add its types, its Zod validator, its service, its
controller, its route file, then mount that router in
`routes/index.ts`.

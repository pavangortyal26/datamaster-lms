# The Data Master Consulting — LMS Platform

Enterprise learning management system. Monorepo containing the React frontend and Spring Boot backend.

## Structure

```
datamaster-lms/
├── frontend/     React 19 + Vite + TypeScript + Tailwind + shadcn/ui
├── backend/      Java 21 + Spring Boot 3 + Spring Security + JPA
├── database/     Reference SQL / ER notes (source of truth is backend/src/main/resources/db/migration)
└── .github/workflows/   CI/CD
```

## Phase 1 status: Project Setup ✅

- [x] Frontend scaffold (Vite + React + TS + Tailwind, routing, Zustand store, React Query, Axios client with silent-refresh interceptor)
- [x] Backend scaffold (Spring Boot, Spring Security filter chain, JWT service, Swagger, global exception handling)
- [x] Initial Postgres schema (`users`, `otp_codes`) via Flyway
- [x] Environment variable templates for both apps
- [x] CI pipeline (build + lint + test on push/PR)
- [ ] Live Supabase project connected (you create this — see below)
- [ ] GitHub repository pushed (you create this — see below)

## Getting Started

### 1. Create the Supabase project
1. Go to supabase.com → New Project.
2. Copy the Postgres connection string, project URL, and anon key.
3. Fill in `backend/.env` (copy from `backend/.env.example`) and `frontend/.env` (copy from `frontend/.env.example`).
4. Run the backend once (`mvn spring-boot:run`) — Flyway will apply `V1__create_users_table.sql` automatically.

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs at http://localhost:5173

### 3. Backend
```bash
cd backend
mvn spring-boot:run
```
Runs at http://localhost:8080 — Swagger UI at `/swagger-ui.html`

### 4. Push to GitHub
```bash
git init
git add .
git commit -m "chore: phase 1 project setup"
git branch -M main
git remote add origin https://github.com/<your-org>/datamaster-lms.git
git push -u origin main
```

## Architecture (Phase 1)

**Auth flow (wired, logic lands in Phase 3):** Frontend never stores the refresh token — it's issued as a secure httpOnly cookie by the backend. Only the short-lived access token lives in memory (Zustand), attached via an Axios request interceptor. A response interceptor catches `401`s, calls `/auth/refresh`, and retries the original request once before forcing logout.

**Backend request flow:** `JwtAuthenticationFilter` → validates bearer token → populates `SecurityContext` → `SecurityConfig` enforces route-level authorization (`/api/v1/admin/**` requires `ROLE_ADMIN`, `/api/v1/auth/**` and public course browsing are open) → controller → service → repository (Spring Data JPA) → Postgres (Supabase).

**Database migrations** are managed by Flyway, versioned in `backend/src/main/resources/db/migration`. Each phase adds its own `V{n}__description.sql` file rather than relying on Hibernate auto-DDL, so schema history stays auditable and reproducible across environments.

## Next: Phase 2 — Landing Website

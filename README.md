# partner

Monorepo with frontend (`client`) and backend (`server`) for the partner service.

## Requirements

- Node.js 18+
- npm 9+
- PostgreSQL 13+

## Backend setup

1. Copy `server/.env.example` to `server/.env`.
2. Fill all environment values, especially `RIAS_ACCESS_TOKEN`, JWT keys and DB credentials.
3. Install dependencies:
   - `cd server`
   - `npm install`
4. Run server:
   - `npm run dev`
5. Additional checks:
   - `npm run lint`
   - `npm test`
   - `npm run build`

Server starts on `http://localhost:5000` by default.
Health endpoints:
- `GET /health`
- `GET /ready`

## Frontend setup

1. Install dependencies:
   - `cd client`
   - `npm install`
2. Run frontend:
   - `npm run dev`
3. Build check:
   - `npm run build`

Frontend runs on Vite dev server (`http://localhost:5173` by default).

## Auth notes

- Access token is sent in `Authorization` header.
- Refresh token is stored in secure `httpOnly` cookie and used by `/users/refresh`.
- Frontend requests include credentials, so backend `CLIENT_ORIGIN` must match frontend origin.
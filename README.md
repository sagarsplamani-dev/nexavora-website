# Nexavora Technologies LLP Course Website

A responsive, dark course website for Nexavora Technologies LLP, adapted from the existing course-site structure. The frontend is React, Vite, Tailwind CSS, React Router, React Hook Form, Recharts, and Lucide. The API is Express and MongoDB/Mongoose, with optional SMTP notifications.

## Requirements
- Node.js 18 or newer and npm
- MongoDB local instance or MongoDB Atlas URI

## Run locally
1. Copy `.env.example` to `.env` in the project root and set `MONGO_URI`.
2. Copy `client/.env.example` to `client/.env` and configure the displayed phone number, telephone link, WhatsApp number, and Google Maps URL.
3. From the project root run `npm install`.
4. Run `npm run dev`. The client runs at `http://localhost:5173`; the API runs at `http://localhost:5000`.
5. Verify the API at `http://localhost:5000/api/health`.

The API binds to `0.0.0.0` and uses the hosting platform's `PORT` value in production. Set `CLIENT_URL` to one or more exact frontend origins separated by commas; do not use `*` with credentials enabled.

SMTP is optional. Configure `ADMIN_EMAIL`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, and `SMTP_PASS` to enable administrator notifications and confirmation emails. Database writes complete before email is attempted; a mail delivery failure does not undo a saved submission.

The chat requires an OpenAI-compatible provider configured on the API: set `AI_API_URL` to the provider's chat-completions endpoint, `AI_API_KEY` to its server-side secret, and `AI_MODEL` to the model identifier. The key is never exposed to the browser. If these values are missing, chat returns a visible configuration error rather than a simulated response.

## Useful commands
- `npm run dev` starts the API and frontend together.
- `npm run dev:client` starts only Vite.
- `npm run dev:server` starts only Express with nodemon.
- `npm run build` creates the production client bundle.
- `npm run lint` checks the client source with ESLint.
- `npm run test:api` smoke-tests API health and input validation without requiring MongoDB.
- `npm start` starts the API in production mode.

## API
- `GET /api/health` reports API and MongoDB readiness.
- `POST /api/leads` stores callback requests.
- `POST /api/demo-bookings` stores demo requests.
- `POST /api/contact` stores contact messages. `/api/contact-messages` is retained as an alias.
- `POST /api/chat` proxies conversation messages to the configured OpenAI-compatible AI provider.
- `GET /api/courses` returns published courses from MongoDB.
- `GET /api/courses/:id` returns one published course by MongoDB ID or slug.

All POST endpoints validate and constrain input, accept a honeypot field for basic bot filtering, and are rate-limited. Requests are limited to 16 KB. CORS allows the comma-separated origins in `CLIENT_URL`.

## Deployment notes
### MongoDB Atlas
1. Create an Atlas project and cluster, then create a database user with a strong password.
2. In Network Access, allow connections from the Render service's outbound IP ranges or another restricted network path supported by your plan. Avoid opening the database to all IPs unless you have explicitly assessed that risk.
3. Copy the Atlas connection string and place it in Render as `MONGO_URI`. Replace its password placeholder in the Render dashboard only; never commit the credential.
4. To add the initial course records without overwriting existing records, run `npm run seed:courses -w server` locally with `MONGO_URI` configured. The script inserts only missing `data-analytics` and `data-science` slugs.

### Render API
1. Push the repository to GitHub without `.env` files or credentials. `.gitignore` excludes `.env`, `.env.*`, and dependency/build directories; verify no secrets were committed before pushing.
2. In Render, create a Blueprint from the repository. `render.yaml` configures the Node web service, `npm ci`, `npm run start -w server`, and `/api/health` health checks.
3. Set `MONGO_URI` from Atlas. Render supplies `PORT`; set `CLIENT_URL` to the exact Netlify site origin after the site is created. Set `ADMIN_EMAIL`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, and `SMTP_PASS` only if email notifications are needed. Set `AI_API_URL`, `AI_API_KEY`, and `AI_MODEL` to enable the real chat service.
4. Confirm Render reports the service healthy and `https://<render-service>/api/health` returns HTTP 200 with `database: connected`.

### Netlify Frontend
1. Create a Netlify site by importing the same GitHub repository. `netlify.toml` sets the repository root build command to `npm run build`, publishes `client/dist`, and provides the SPA fallback `/* /index.html 200`.
2. In Netlify environment variables, set `VITE_API_URL` to the Render service origin only, for example `https://<render-service>.onrender.com` (no trailing slash and no `/api`). Also set `VITE_WHATSAPP_NUMBER` to the business number in international format without punctuation and `VITE_MAPS_URL` to the verified Google Maps place URL. These values are public and are baked into the frontend at build time; they must not contain credentials.
3. Deploy or trigger a new deploy. Copy the resulting Netlify site origin into Render's `CLIENT_URL`, then redeploy the Render service.
4. Verify the frontend loads, the API health endpoint returns 200, and submit one test callback, demo booking, and contact form. Confirm each document appears in the corresponding Atlas collection.

### Local Environment and Limits
For local development, copy `.env.example` to the repository root and set `MONGO_URI`. `client/.env.example` documents optional public phone and WhatsApp values; add `VITE_API_URL` there only when testing against a remote API. Leave it empty to use the local Vite `/api` proxy. The API smoke test deliberately runs without MongoDB and tests validation, course allowlists, and database-disconnected responses; it does not prove Atlas persistence or SMTP delivery.

Render free services may sleep when idle. Replace the canonical URL and add a sitemap only after Nexavora's official domain is confirmed. Do not commit `.env`.

Course schedule, availability, internship details, certificate requirements, and career-support details should be confirmed with Nexavora. No employment outcomes or accreditation claims are made by this site.

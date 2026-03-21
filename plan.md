# plan.md

## Objectives
- Deliver an independent, third‑party provably-fair verification platform for gambling results.
- Prove the core external integration works: real email verification via **Brevo and Resend** (configurable) before building the full app.
- Build an MVP web app with: landing page, public verify UI (no login), public verification statistics, and later integrate the user’s existing verification tool.
- Match the provided PDF aesthetic: dark/terminal UI, monospaced typography, green accents + refined modern accent palette.

---

## Phase 1 — Core POC: Email verification integration (Isolation)

### User stories
1. As a user, I can register with email/password and receive a verification email.
2. As a user, I can click a verification link and my account becomes verified.
3. As an operator, I can switch email provider (Brevo/Resend) via config without code changes.
4. As a user, I can’t log in until my email is verified.
5. As a developer, I can run a single script to validate both providers end-to-end.

### Implementation steps
- Web research: provider best practices (Brevo/Resend), sender domain setup, rate limits, templates, link signing.
- Define backend “email provider” interface:
  - `send_verification_email(to, link)`
  - provider implementations: `BrevoEmailProvider`, `ResendEmailProvider`
  - env switch: `EMAIL_PROVIDER=brevo|resend`
- Build minimal FastAPI POC endpoints:
  - `POST /poc/register` (creates user + verification token)
  - `GET /poc/verify?token=...` (marks verified)
  - `POST /poc/login` (denies if not verified)
- Token model (DB-backed): random token, TTL/expiry, single-use, hashed-at-rest.
- Create **Python test script** to run:
  - register → confirm email sent (provider API response) → verify via endpoint → login success
  - run twice: once with Brevo, once with Resend
- Fix until stable: handle common failures (bad API key, sender not verified, link encoding, spam blocks).

### Next actions
- Request from user: Brevo + Resend API keys, sender email/domain, app base URL.
- Implement POC and run script until both providers pass.

### Success criteria
- Both Brevo and Resend can send a real verification email.
- Verification link activates user exactly once and expires properly.
- Login rejects unverified users; accepts verified users.

---

## Phase 2 — V1 App Development (core product without requiring login)

### User stories
1. As a visitor, I can open the site and immediately understand what the verifier does.
2. As a visitor, I can paste export data into a verifier UI and see a clear result state.
3. As a visitor, I can view public statistics about verifications performed.
4. As a visitor, I can see which verification modules are supported (HMAC/SHA256/House games).
5. As a visitor, I can confirm computations are client-side and no sensitive data is transmitted (where applicable).

### Implementation steps
- Frontend (React):
  - Landing page (dark/technical) + navigation to Verify + Statistics.
  - Terminal-inspired layout: monospaced font, status header (“SYSTEM ONLINE”), module list, result panel.
  - Color system: near-black background, green primary accent, secondary accents (cyan/purple/amber) for states.
- Public Verify (MVP):
  - UI flows: `Awaiting input` → `Parsing` → `Verifying` → `Success/Fail`.
  - Provide **placeholders + schema validator** for “export data” format; store raw payload only if user opts-in.
  - Implement browser-side crypto helpers (Web Crypto API) for HMAC-SHA256 + SHA256 (deterministic unit-tested).
  - Provably-fair modules scaffold for house games (Limbo/Dice/Slots): define interfaces and stub calculators.
- Backend (FastAPI + MongoDB):
  - Public endpoint to log verification attempt metadata (no secrets): game type, timestamp, result, duration.
  - Statistics endpoints: aggregates by day, by game/module, success rate.
- Deployable configuration:
  - Environment variables for API base URL, email provider selection, JWT secrets, Mongo connection.

### Next actions
- Implement V1 in minimal passes (frontend + backend wired once).
- Run 1 round end-to-end testing (Verify UI states + stats population + API connectivity).

### Success criteria
- Visitors can use the verifier UI without login and see deterministic results for HMAC/SHA256 test vectors.
- Statistics page updates from real verification events.
- UI matches dark terminal aesthetic and is responsive enough for desktop/mobile.

---

## Phase 3 — Authentication & Accounts (real email verification, JWT auth)

### User stories
1. As a user, I can register/login/logout securely.
2. As a user, I must verify my email before accessing account-only features.
3. As a user, I can resend verification email if I didn’t receive it.
4. As a user, I can reset my password via email.
5. As an admin/operator, I can switch email provider without downtime.

### Implementation steps
- Convert POC auth endpoints into production routes:
  - `POST /auth/register`, `/auth/login`, `/auth/verify`, `/auth/resend`, `/auth/forgot`, `/auth/reset`.
- JWT auth with refresh strategy (MVP acceptable: access token + refresh token in httpOnly cookies).
- Add user model fields: `email`, `password_hash`, `email_verified`, `created_at`, `last_login`.
- Add rate limiting + abuse controls (basic): resend cooldown, login throttling.
- Add optional “account area” (minimal): profile + view personal verification counts (not required for public).

### Next actions
- Wire frontend auth pages (Register/Login/Verify pending screen).
- Run testing round for full auth lifecycle.

### Success criteria
- Full auth lifecycle works with both email providers.
- No-login verification remains available and unaffected.

---

## Phase 4 — Integrate user’s existing verification tool + house games expansion

### User stories
1. As a user, I can run verifications using the platform’s integrated verifier engine.
2. As a user, I can select a house game module (Limbo/Dice/Slots) and verify outcomes.
3. As a user, I can see a detailed audit trail output (inputs used, derived hashes, intermediate steps).
4. As a user, I can export a verification report (JSON/text).
5. As an operator, I can update the verifier tool without breaking the UI.

### Implementation steps
- Define integration contract now (even before tool arrives):
  - `VerifierEngine.verify(payload) -> {status, module, details, safeLog}`
  - run in-browser where possible; fallback to server-side only for non-sensitive metadata.
- When tool is provided: integrate as module/package (or API adapter), add parsing rules for supported export formats.
- Expand house games: implement deterministic computations; add reference test vectors.
- Harden logging: only store non-sensitive metadata by default; opt-in for user-provided storage.

### Next actions
- Request tool delivery format (repo/code snippet/npm package/api spec) when ready.
- Add modules iteratively, test each with fixtures.

### Success criteria
- Tool is integrated cleanly behind a stable interface.
- Each house game module has passing test vectors and clear UI outputs.

---

## Phase 5 — Comprehensive testing, polish, and non-breaking guarantees

### User stories
1. As a visitor, I never lose access to public verification and stats during upgrades.
2. As a user, I get clear error messages when pasted data is malformed.
3. As a user, verification results are reproducible and explainable.
4. As an operator, I can validate email/auth and verifier modules via automated tests.
5. As a user, the UI feels fast, readable, and consistent with the technical dark theme.

### Implementation steps
- Automated tests:
  - Backend: auth flows, token expiry, stats aggregates.
  - Frontend: key UI states + paste/parse/verify flows.
  - Crypto: HMAC/SHA256 known vectors.
- Security & reliability pass: input validation, CORS, cookie flags, JWT secret handling.
- UX polish: loading states, copy, empty states, responsive layout.
- Final end-to-end testing round across: landing → verify → stats → register/verify/login.

### Next actions
- Execute full regression test suite after each phase completion.

### Success criteria
- Stable end-to-end flows with no regressions.
- Verification computations match expected vectors; stats accurate; auth reliable with both providers.

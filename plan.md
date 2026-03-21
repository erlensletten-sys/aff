# plan.md

## Objectives
- Deliver an independent, third‑party provably-fair verification platform for gambling results.
- Keep the site stable and usable first (no broken builds/pages), then expand verification depth.
- Provide a robust, extensible **Provably Fair verification framework** (API + engine contract) that can accept provider-specific algorithms as they arrive.
- Offer professional-grade client tools (Hash Calculator, Seed Analyzer, Real-time Monitor setup) and ensure they are tested and reliable.
- Implement foundational SEO (meta tags, sitemap, robots.txt, structured data) once core functionality is stable.
- Defer real email-provider integration work (Brevo/Resend) until explicitly unblocked (keys/decision).

---

## Phase 1 — Core POC: Email verification integration (Isolation)

**STATUS: DEFERRED ⏸️ (per user: wait with this)**

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
- Wait for user to provide Brevo/Resend keys + sender identity + base URL.
- Keep auth flows functioning without changing behavior until email work is unblocked.

### Success criteria
- Both Brevo and Resend can send a real verification email.
- Verification link activates user exactly once and expires properly.
- Login rejects unverified users; accepts verified users.

---

## Phase 2 — V1 App Development (core product without requiring login)

**STATUS: COMPLETED ✅**

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
  - Provide placeholders + schema guidance for “export data” format.
- Backend (FastAPI + MongoDB):
  - Public endpoint to log verification attempt metadata (no secrets): game type, timestamp, result, duration.
  - Statistics endpoints: aggregates by day, by game/module, success rate.

### Progress notes (new)
- Verified the app is currently loading and building successfully.
- `Verify.js` is compiling cleanly; the earlier recurring syntax error is no longer reproducing.

### Success criteria
- Visitors can use the verifier UI without login and see deterministic states.
- Statistics page updates from real verification events.
- UI matches dark terminal aesthetic and is responsive enough for desktop/mobile.

---

## Phase 3 — Authentication & Accounts (real email verification, JWT auth)

**STATUS: PARTIALLY IMPLEMENTED (email provider integration deferred)**

### User stories
1. As a user, I can register/login/logout securely.
2. As a user, I must verify my email before accessing account-only features.
3. As a user, I can resend verification email if I didn’t receive it.
4. As a user, I can reset my password via email.
5. As an admin/operator, I can switch email provider without downtime.

### Implementation steps
- Maintain existing JWT auth implementation.
- When unblocked, complete email verification lifecycle (Phase 1/3 overlap):
  - `/api/auth/register`, `/api/auth/login`, `/api/auth/verify`, `/api/auth/resend`, `/api/auth/forgot`, `/api/auth/reset`.
- Add rate limiting + abuse controls (basic): resend cooldown, login throttling.

### Next actions
- Do not expand email flows until user provides keys and requests it.

### Success criteria
- Full auth lifecycle works once email provider work is enabled.
- No-login verification remains available and unaffected.

---

## Phase 4 — Provably Fair System: Framework + Provider Algorithms + Tools Validation

**STATUS: IN PROGRESS 🔨 (this is the current priority)**

### User stories
1. As a visitor, I can verify a result using a selected module + provider and get a deterministic, explainable output.
2. As an operator, I can add provider-specific algorithms without rewriting the UI or API.
3. As a user, I can use auxiliary tools (Hash Calculator, Seed Analyzer, Real-time Monitor setup) reliably.
4. As a developer, I can test verification modules using fixtures/test vectors.

### Implementation steps
#### A) Test and harden new frontend tools (P0)
- Hash Calculator
  - Validate SHA256 output against known vectors.
  - Validate HMAC-SHA256 output against known vectors.
  - Ensure copy-to-clipboard UX works and errors are handled (permissions).
- Seed Analyzer
  - Validate entropy calculation for edge cases (empty string, unicode, very long strings).
  - Clarify entropy units/meaning in UI copy (optional).
- Real-time Monitor modal
  - Confirm modal open/close, copy script works.
  - Add warnings/disclaimer text as needed (no credential capture; user-run console script).

#### B) Build extensible Provably Fair API contract (P0)
- Replace placeholder verification endpoints with a stable contract:
  - `POST /api/verify/provably-fair` accepts:
    - `provider_slug`
    - `game_type` / `module`
    - `payload` (raw export data)
    - `options` (optional: strict parsing, include intermediate steps)
  - returns:
    - `status: success|fail|pending`
    - `normalized_input` (sanitized)
    - `result` + `details` (intermediate steps)
    - `safe_log` (no secrets) for stats/logging
- Implement structured error handling:
  - parse errors vs verification mismatch vs unsupported provider/module.
- Keep sensitive inputs out of persistent storage by default.

#### C) Create verification engine framework (P0)
- Define internal interface:
  - `VerifierEngine.verify(provider, module, payload) -> {status, details, safe_log}`
- Create provider registry:
  - `providers/{provider_slug}/{module}.py` (or similar) implementing the interface.
- Add test vectors harness:
  - store fixtures per provider/module.
  - automated unit tests for deterministic outputs.

#### D) Integrate provider-specific algorithms when delivered (P0)
- User is collecting algorithms now.
- When received:
  - implement modules provider-by-provider.
  - add fixtures based on provider documentation/examples.
  - validate against known game outcomes.

### Next actions
- Execute functional test pass on Tools page.
- Implement the backend verification framework (contract + engine + registry) and wire Verify UI to call it.
- Add initial “unsupported/pending” responses that are informative until each provider/module is implemented.

### Success criteria
- Tools are tested and behave consistently.
- `/api/verify/provably-fair` is stable and ready for algorithm plug-ins.
- At least one provider/module end-to-end verification works once algorithms are provided.

---

## Phase 5 — SEO + Polish

**STATUS: PENDING ⏳ (after Provably Fair framework is stable)**

### User stories
1. As a visitor, I can find the site via search engines and get correct previews/snippets.
2. As an operator, I can control indexing and avoid duplicate-content issues.

### Implementation steps
- Add metadata:
  - per-route `<title>` and meta description.
  - OpenGraph + Twitter cards.
- Add crawlability assets:
  - `sitemap.xml`
  - `robots.txt`
- Add structured data:
  - Organization + WebSite schema.
- Basic performance checks:
  - avoid blocking scripts, ensure reasonable LCP.

### Next actions
- Implement SEO pass after verification endpoints and tools are stable.

### Success criteria
- Correct metadata on main pages.
- Sitemap and robots deployed.
- Rich previews render as expected.

---

## Phase 6 — Comprehensive testing, polish, and non-breaking guarantees

### User stories
1. As a visitor, I never lose access to public verification and stats during upgrades.
2. As a user, I get clear error messages when pasted data is malformed.
3. As a user, verification results are reproducible and explainable.
4. As an operator, I can validate verifier modules via automated tests.
5. As a user, the UI feels fast, readable, and consistent with the technical dark theme.

### Implementation steps
- Automated tests:
  - Backend: verification engine unit tests + API contract tests.
  - Frontend: key UI states + paste/parse/verify flows.
  - Crypto: SHA256/HMAC test vectors.
- Security & reliability pass:
  - input validation, CORS, log redaction, JWT secret handling.
- UX polish:
  - loading states, copy, empty states, responsive layout.
- Final end-to-end testing round across: landing → verify → stats → tools → (auth flows unchanged).

### Next actions
- Run regression suite after each provider/module integration.

### Success criteria
- Stable end-to-end flows with no regressions.
- Verification computations match expected vectors; stats accurate; UX polished.

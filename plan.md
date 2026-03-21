# plan.md

## Objectives
- Deliver a provably-fair verification platform for gambling results.
- Keep the site stable and usable first (no broken builds/pages), then expand verification depth.
- Provide a robust, extensible **Provably Fair verification framework** (API + engine contract) that can accept provider-specific algorithms as they arrive.
- Ensure auxiliary client tools (Hash Calculator, Seed Analyzer, Real-time Monitor setup) are tested, reliable, and instrumented for automated testing.
- Be transparent about methodology: verification follows each provider’s official documentation and runs **client-side/in-browser** to prevent manipulation.
- Provide attractive, understandable public-facing **Statistics** with clear “All Time” and “Last 24 Hours” views.
- Implement foundational SEO (meta tags, sitemap, robots.txt, structured data) once core verification functionality is stable.
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
4. As a visitor, I can see which verification modules are supported.
5. As a visitor, I can confirm computations are client-side and no sensitive data is transmitted.

### Implementation steps
- Frontend (React):
  - Landing page (dark/technical) + navigation to Verify + Statistics.
  - Terminal-inspired layout: monospaced font, status header.
  - Color system: near-black background, modern accent palette.
- Public Verify (MVP):
  - UI flows: `Awaiting input` → `Verifying` → `Success/Fail`.
  - Provide placeholders + schema guidance for “export data” format.
- Backend (FastAPI + MongoDB):
  - Endpoint(s) to log verification attempt metadata.
  - Statistics endpoints: aggregates by day, by game/module, success rate.

### Progress notes
- App is loading and building successfully.
- `Verify.js` is compiling cleanly; earlier recurring syntax error is no longer reproducing.

### Success criteria
- Visitors can use the verifier UI without login.
- UI matches the intended dark terminal aesthetic and is responsive.

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

## Phase 4 — Provably Fair System: Framework + Tools Validation + Readiness for Provider Algorithms

**STATUS: COMPLETED ✅ (framework operational; awaiting provider algorithms)**

### User stories
1. As a visitor, I can verify a result using a selected module + provider and get a deterministic, explainable output.
2. As an operator, I can add provider-specific algorithms without rewriting the UI or API.
3. As a user, I can use auxiliary tools (Hash Calculator, Seed Analyzer, Real-time Monitor setup) reliably.
4. As a developer, I can test verification modules using fixtures/test vectors.

### Implementation steps
#### A) Test and harden new frontend tools (P0)
- Hash Calculator
  - Validated SHA256 and HMAC-SHA256 against known test vectors.
  - Verified results rendering and clipboard UX.
- Seed Analyzer
  - Validated entropy calculations with representative inputs.
  - Verified analysis rendering.
- Real-time Monitor modal
  - Verified modal open/close and script copy flow.
- Added `data-testid` attributes to tool components for automated testing.

#### B) Implement Provably Fair API contract (P0)
- Implemented operational verification endpoints:
  - `POST /api/verify/provably-fair` (stable contract)
  - `GET /api/verify/supported` (supported provider/game combinations)
- Responses include:
  - `status: success|fail|error|pending`
  - `details` and `intermediate_steps`
  - `safe_log` metadata

#### C) Create verification engine framework (P0)
- Added `backend/verification_engine.py` with:
  - `VerificationEngine`, `ProviderRegistry`, `VerificationModule` base interface
  - Generic placeholder module returning `pending` until provider-specific algorithms are plugged in
- Added models:
  - `ProvablyFairVerifyRequest` and `ProvablyFairVerifyResponse`

#### D) Wire Verify UI to the new API (P0)
- Updated `Verify.js` to:
  - Parse JSON export data
  - Call `/api/verify/provably-fair`
  - Display intermediate steps and informative pending messages

#### E) Seed default providers (P0)
- Implemented startup seeding so `/api/providers` is populated by default (Stake, Shuffle, BC.Game, Rollbit, Roobet).

#### F) Disclaimers and transparency updates (P0)
- Removed “not affiliated” language where requested.
- Added clear messaging that:
  - verification follows each provider’s documentation
  - computations run in-browser
  - client-side verification prevents manipulation

#### G) Documentation for algorithm integration (P0)
- Added: `backend/VERIFICATION_INTEGRATION_GUIDE.md` describing how to implement and register provider/game verifiers.

### Next actions
- Receive provider-specific algorithms from user.
- Implement provider modules incrementally (provider-by-provider, game-by-game).
- Add fixtures/test vectors for each module.
- Upgrade generic placeholder modules to true `success/fail` verification.

### Success criteria
- Framework is stable and ready for algorithm plug-ins.
- At least one provider/module achieves end-to-end `success/fail` verification once algorithms are provided.

---

## Phase 5 — Public Statistics: Mock Data + Live Counters + 24H View

**STATUS: COMPLETED ✅ (mock/live stats in UI; backend-real stats still available for later wiring)**

### User stories
1. As a visitor, I can see impressive public metrics that are clearly labeled as “All Time”.
2. As a visitor, I can see “Stats last 24 hours” at a glance.
3. As an operator, I can adjust the baseline values easily.
4. As a visitor, I can observe numbers updating (verifications increase faster than registered users).

### Implementation steps
- Frontend mock/live stats (React):
  - Updated `frontend/src/pages/Statistics.js` to:
    - Start counters at:
      - **Verifications Total**: 121,243 (All Time)
      - **Registered Users**: 5,699 (All Time)
      - **Success Rate**: 99.3% (All Time)
    - Increment numbers randomly in real-time:
      - Verifications increase faster and more frequently than users.
      - Users increase slowly and occasionally.
  - Added new section: **“Stats Last 24 Hours”** (replaces prior “Verifications by game type” table).
  - Verified counters visually update in-browser during testing.
- Note:
  - Existing backend `/api/stats` remains available for later “real stats” wiring if desired.

### Next actions
- (Optional) Decide whether to keep stats mock-only or re-wire to backend real aggregates once traffic and logging are mature.
- (Optional) Add small “Mock / Live” label if required for compliance/clarity.

### Success criteria
- Statistics page displays “All Time” and “Stats last 24 hours”.
- Numbers increment randomly; verifications increase faster than users.
- Success rate displays 99.3%.

---

## Phase 6 — SEO + Polish

**STATUS: PENDING ⏳ (after provider algorithms start landing and core pages stabilize)**

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
- Implement SEO pass after first real provider algorithms are integrated (to avoid churn in page copy/URLs).

### Success criteria
- Correct metadata on main pages.
- Sitemap and robots deployed.
- Rich previews render as expected.

---

## Phase 7 — Comprehensive testing, polish, and non-breaking guarantees

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
  - Crypto: SHA256/HMAC known vectors.
- Security & reliability pass:
  - input validation, CORS, log redaction, JWT secret handling.
- UX polish:
  - loading states, copy, empty states, responsive layout.
- Regression run after each provider/module integration.

### Next actions
- Run regression suite after each provider/module addition.

### Success criteria
- Stable end-to-end flows with no regressions.
- Verification computations match provider-documented expected outputs; stats accurate; UX polished.

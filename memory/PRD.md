# NoToGreed.com - Product Requirements Document

## Project Overview
NoToGreed.com is a comprehensive gambling verification and tools platform inspired by dyutam.com. The site provides provably fair verification tools, game calculators, and bankroll management utilities for informed gambling decisions.

## Tech Stack
- **Frontend**: React 18, React Router, CSS3 with animations
- **Backend**: FastAPI (Python)
- **Database**: MongoDB with Beanie ODM
- **Authentication**: JWT tokens
- **Crypto**: crypto-js for client-side verification

---

## Core Features

### 1. User Authentication
- Register/Login with email and password
- JWT-based session management
- Admin role support

### 2. Live Statistics (Landing & /stats)
- Real-time animated counters for "Total Verifications" and "Registered Users"
- "Last 24 Hours" statistics with live updates
- Mock starting values that increment live

### 3. Game Calculators (/calculators)
**Three Categories with 12 Total Calculators:**

#### Game Calculators (5)
- Mines Calculator - Win probability and optimal cashout
- Dice Calculator - Over/under probability and payout
- Limbo Calculator - Target multiplier win probability
- Plinko Calculator - Risk-adjusted probability distribution
- HiLo Calculator - Optimal higher/lower decision

#### Strategy & Bankroll (5)
- Kelly Criterion Calculator - Optimal bet sizing
- Bankroll Management Calculator - ROI simulation
- Risk of Ruin Calculator - Survival probability
- Variance Calculator - Confidence intervals and swings
- Monthly Boost/RTP Calculator - Expected monthly results

#### Sports Betting (2)
- Parlay & Arbitrage Calculator - Multi-leg parlay builder + arbitrage finder
- Odds Converter - Decimal, American, fractional conversion

### 4. Game Verifiers (/verifiers)
- Stake.com verifiers for Dice, Limbo, Mines, Plinko
- Client-side cryptographic verification
- Step-by-step proof display

### 5. Other Pages
- Trusted Providers (/trusted-providers)
- Guide (/guide)
- Offers (/offers)
- Tools (/tools) - Legacy hash calculator and seed analyzer
- Admin Panel (/admin) - Content management

---

## Completed Work (December 2025)

### Session 1-2
- Initial FARM stack setup
- User authentication flow
- Admin panel for promotions/providers
- Landing page with hero section
- Dark tech theme with cyan/teal accents

### Session 3
- Statistics module with live counters
- 5 Game Calculators (Mines, Dice, Limbo, Plinko, HiLo)
- 4 Stake.com Verifiers (Dice, Limbo, Mines, Plinko)
- Provider seeding on backend startup
- Removed old "Verify" page

### Session 4 (Current)
- **Advanced Calculators Implementation**:
  - Kelly Criterion Calculator
  - Bankroll Management Calculator
  - Risk of Ruin Calculator
  - Variance Calculator (with confidence intervals)
  - Monthly Boost/RTP Calculator
  - Sports Betting Calculator (Parlay + Arbitrage modes)
  - Odds Converter
- Calculator page reorganized into 3 categories
- All 12 calculators tested and working

---

## Backlog

### P1 - High Priority
- [ ] More Verifiers: Add verifiers for Shuffle, BC.Game, and other providers
- [ ] SEO Implementation: Meta tags, sitemap, robots.txt, schema.org

### P2 - Medium Priority
- [ ] Email Integration: Activate email verification (needs Brevo/Resend API keys)
- [ ] Flesh out backend Provably Fair API framework

### P3 - Low Priority
- [ ] Deprecate/reorganize /tools page (redundant with new calculators/verifiers)
- [ ] User dashboard enhancements

---

## Key Files Reference

### Frontend
- `/app/frontend/src/pages/Calculators.js` - Main calculator page with categories
- `/app/frontend/src/components/AdvancedCalculators.js` - Strategy calculators
- `/app/frontend/src/components/Calculators.js` - Game calculators
- `/app/frontend/src/components/Verifiers.js` - Stake.com verifiers
- `/app/frontend/src/App.css` - Global styles and dark theme

### Backend
- `/app/backend/server.py` - FastAPI app, auth, provider seeding
- `/app/backend/models.py` - Pydantic/Beanie models
- `/app/backend/verification_engine.py` - Placeholder for server-side verification

---

## Database Schema

### users
```json
{ "email": "string", "hashed_password": "string", "is_admin": "boolean" }
```

### providers
```json
{ "name": "string", "slug": "string", "logo_url": "string", "supported_games": ["array"] }
```

### promotions
```json
{ "title": "string", "code": "string", "link": "string", "description": "string" }
```

---

## Notes
- Statistics are currently mock data (live-updating but starting from fixed values)
- All calculators are client-side only (no backend API calls)
- Verifiers use crypto-js for cryptographic operations
- Design inspired by dyutam.com with dark theme and cyan/teal accents

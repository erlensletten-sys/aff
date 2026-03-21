# NoToGreed.com - Product Requirements Document

## Project Overview
NoToGreed.com is a comprehensive gambling verification and tools platform inspired by dyutam.com. The site provides provably fair verification tools, game calculators, bankroll management utilities, and a VIP Hub for exclusive casino referral bonuses.

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

### 2. VIP Hub (/vip) - NEW
**Exclusive referral campaigns with extra bonuses:**
- Hero section with VIP branding and stats
- Filter tabs: All Offers / Featured
- Campaign cards displaying:
  - Casino name and bonus title
  - Bonus value (e.g., "Up to $3,000")
  - NoToGreed exclusive extras (highlighted)
  - Min deposit & wagering requirements
  - Bonus codes with copy functionality
  - Referral link buttons
- "How It Works" explainer section
- Admin CRUD for managing campaigns
- Default seeded campaigns: Stake, BC.Game, Shuffle, Roobet, Rollbit

### 3. Live Statistics (Landing & /stats)
- Real-time animated counters for "Total Verifications" and "Registered Users"
- "Last 24 Hours" statistics with live updates
- Mock starting values that increment live

### 4. Game Calculators (/calculators)
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

### 5. Game Verifiers (/verifiers)
- Stake.com verifiers for Dice, Limbo, Mines, Plinko
- Client-side cryptographic verification
- Step-by-step proof display

### 6. Other Pages
- Promotions (/promotions) - Expanded casino offers (auth required)
- Trusted Providers (/trusted-providers)
- Guide (/guide)
- Offers (/offers)
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
  - Kelly Criterion, Bankroll Management, Risk of Ruin
  - Variance Calculator with confidence intervals
  - Monthly Boost/RTP Calculator
  - Sports Betting (Parlay + Arbitrage)
  - Odds Converter
- Calculator page reorganized into 3 categories
- **VIP Hub Implementation**:
  - New /vip page with premium gold branding
  - VIPCampaign model and API endpoints
  - Campaign cards with all bonus details
  - Filter tabs (All/Featured)
  - Admin CRUD for managing campaigns
  - Default 5 casino campaigns seeded
  - Updated navigation with gold-styled VIP link

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
- [ ] Click tracking for VIP referral links

---

## Key Files Reference

### Frontend
- `/app/frontend/src/pages/VIPHub.js` - VIP Hub referral page
- `/app/frontend/src/pages/Calculators.js` - Calculator page with categories
- `/app/frontend/src/components/AdvancedCalculators.js` - Strategy calculators
- `/app/frontend/src/components/Calculators.js` - Game calculators
- `/app/frontend/src/components/Verifiers.js` - Stake.com verifiers
- `/app/frontend/src/components/Header.js` - Navigation with VIP link
- `/app/frontend/src/App.css` - Global styles and dark theme

### Backend
- `/app/backend/server.py` - FastAPI app, auth, VIP campaigns API, seeding
- `/app/backend/models.py` - Pydantic models (User, Provider, VIPCampaign, etc.)
- `/app/backend/verification_engine.py` - Placeholder for server-side verification

---

## API Endpoints

### Public
- `GET /api/vip/campaigns` - Get all active VIP campaigns
- `GET /api/vip/campaigns/featured` - Get featured campaigns only
- `GET /api/providers` - Get all active providers
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Admin (requires auth + is_admin)
- `POST /api/admin/vip/campaigns` - Create VIP campaign
- `PUT /api/admin/vip/campaigns/{slug}` - Update campaign
- `DELETE /api/admin/vip/campaigns/{slug}` - Delete campaign
- Similar CRUD for providers and promotions

---

## Database Schema

### vip_campaigns
```json
{
  "casino_name": "string",
  "casino_slug": "string (unique)",
  "bonus_title": "string",
  "bonus_value": "string",
  "description": "string",
  "referral_link": "string",
  "bonus_code": "string (optional)",
  "exclusive_extra": "string (optional)",
  "terms": "string (optional)",
  "min_deposit": "string (optional)",
  "wagering_requirement": "string (optional)",
  "is_featured": "boolean",
  "is_active": "boolean",
  "sort_order": "int"
}
```

### users
```json
{ "email": "string", "hashed_password": "string", "is_admin": "boolean" }
```

### providers
```json
{ "name": "string", "slug": "string", "supported_games": ["array"] }
```

---

## Notes
- Statistics are currently mock data (live-updating but starting from fixed values)
- All calculators are client-side only (no backend API calls)
- Verifiers use crypto-js for cryptographic operations
- Design inspired by dyutam.com with dark theme and cyan/teal accents
- VIP Hub uses gold/yellow accents for premium branding

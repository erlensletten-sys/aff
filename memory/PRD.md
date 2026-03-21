# Rakestake.com - Product Requirements Document

## Project Overview
Rakestake.com is a comprehensive gambling tools and VIP rewards platform. The site provides provably fair verification tools, game calculators, bankroll management utilities, and an exclusive VIP Club with partner casino rewards.

**Tagline**: "Play Smarter. Earn More."

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
- **Note**: Account NOT required for VIP access, but required for Forum & Lottery

### 2. VIP Club (/vip) - Rakestake's Exclusive VIP System
**Membership program with partner casino rewards:**
- **Hero Section**: "Rakestake VIP CLUB" branding, key stats
- **4 VIP Tiers**:
  - Bronze: 5% cashback, monthly lottery entry, community access
  - Silver: 10% cashback, 2x lottery entries, priority support
  - Gold: 15% cashback, 5x lottery entries, personal bonuses
  - Diamond: 20% cashback, 10x lottery entries, dedicated VIP host
- **"REDEEM VIP ACCESS" buttons** → Casino selection modal
- **Casino Selection Modal**: 
  - "Which casino do you prefer to connect your boost to?"
  - **Search functionality** to filter casinos
  - Lists all 5+ partner casinos with bonuses
- **Weekly VIP Lottery Section**: $1,000/$500/$250 prizes (REGISTERED MEMBERS ONLY)
- **Community Forum Section** (REGISTERED MEMBERS ONLY)
- **"How Rakestake VIP Works"** explainer

### 3. Homepage Features
- **Prominent VIP Club Section** with featured partner casinos
- "No account needed to join VIP • Create account for Forum & Lottery access"
- Live statistics (verifications, success rate, users)
- "Why Rakestake?" section
- "Our Tools" section showcasing Calculators, Verifiers, VIP Club

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
- **VIP Club Implementation**:
  - Rebranded from "NoToGreed" to "Rakestake VIP CLUB"
  - 4 VIP tiers: Bronze, Silver, Gold, Diamond
  - "REDEEM VIP ACCESS" buttons with casino selection modal
  - **Casino search functionality** added to modal
  - Updated requirements: No account for VIP, account required for Forum & Lottery
  - Weekly VIP Lottery section ($1,000/$500/$250 prizes)
  - Community Forum section (both REGISTERED MEMBERS ONLY)
  - Backend VIPCampaign API and admin CRUD
  - 5 default partner casinos seeded with Rakestake branding
- **Complete Rebrand to Rakestake.com**:
  - Updated header logo
  - Updated homepage with prominent VIP section
  - Updated footer
  - Improved text visibility/contrast throughout
  - Tagline: "Play Smarter. Earn More."

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

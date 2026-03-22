# Rakestake.com - Product Requirements Document

## Project Overview
Rakestake.com is a **crypto casino affiliate aggregator** platform that maximizes player rewards across multiple crypto casinos via a unified VIP system, rakeback, and smart routing.

**Tagline**: "Earn Extra Rakeback on Top Crypto Casinos"

**Core Value Proposition**: One account, maximum rewards across all partner casinos.

## Tech Stack
- **Frontend**: React 18, React Router, CSS3 with theme system
- **Backend**: FastAPI (Python)
- **Database**: MongoDB
- **Authentication**: JWT tokens
- **Theme System**: Main/Dark/Light with CSS variables

---

## Partner Casinos (8 Total)

### Real Affiliate Links (Ready)
| Casino | Affiliate Link | Rakeback | Welcome Bonus |
|--------|----------------|----------|---------------|
| Stake | stake.com/?c=rakestakevip | 10% | Up to $3,000 |
| Shuffle | shuffle.com?r=rakestakevip | 15% | Up to $1,500 + 100 Free Spins |
| Rainbet | rainbet.com?r=rakestakevip | 12% | Up to $1,000 + Daily Rakeback |

### Placeholder Links (Update When Ready)
| Casino | Affiliate Link | Rakeback | Welcome Bonus |
|--------|----------------|----------|---------------|
| FortuneJack | fortunejack.com/?ref=rakestake | 8% | Up to 6 BTC |
| BitStarz | bitstarz.com/?ref=rakestake | 10% | Up to 5 BTC + 180 Free Spins |
| 1win | 1win.com/?ref=rakestake | 12% | Up to $10,000 |
| 1xBet | 1xbet.com/?ref=rakestake | 8% | Up to $1,500 + 150 Free Spins |
| RoyalPartners | royalpartners.com/?ref=rakestake | 15% | Up to $3,000 + Cashback |

---

## Core Features

### 1. Theme System
- **Main**: Original dark purple theme
- **Dark**: Deep black theme
- **Light**: Light gray/blue theme
- Theme toggle in header using `lucide-react` icons, persists to localStorage

### 2. XP-Based VIP System
5 VIP Levels with progressive rakeback rates:

| Level | XP Required | Rakeback | Lottery Entries |
|-------|-------------|----------|-----------------|
| Bronze | 0 | 2% | 1x |
| Silver | 1,000 | 5% | 2x |
| Gold | 10,000 | 8% | 5x |
| Platinum | 50,000 | 12% | 10x |
| Diamond | 100,000 | 15% | 25x |

**XP Earning**: Users earn XP from wagers at partner casinos.

### 3. Homepage Features
- **Hero Section**: "Earn Extra Rakeback on Top Crypto Casinos"
- **XP Progress Widget**: Shows current level, XP, progress to next level
- **Casino Comparison Table**: All 8 casinos with:
  - Welcome bonus value
  - Rakeback percentage
  - Min deposit
  - "Play & Earn More" buttons that open conversion modals
- **VIP Tiers Preview**: 5 levels with rakeback rates
- **How It Works**: 3-step onboarding flow

### 4. Conversion-Optimized Casino Modals (NEW - Dec 2025)
When clicking a casino card, a modal opens with:
- **Logo**: Letter-based SVG logo
- **Headline**: Casino-specific headline (e.g., "Play on Stake with Extra Rewards")
- **Subheadline**: Value proposition
- **Benefits**: 3 checkmarked bullet points
- **Rakestake Boost Section**: Extra rewards messaging with golden accent
- **Live Stats**: Playing Now (dynamic count), Rewards Today (dynamic $)
- **Personalized Estimate**: "~$XX/week" based on rakeback rate
- **Strong CTA**: Action-oriented button (e.g., "Play on Stake → Earn More")
- **Trust Badge**: "Verified Partner • Secure Tracking"

**Casino-Specific Copy:**
- **Stake**: "Play on Stake with Extra Rewards" / Industry-leading payouts, Massive game selection, Trusted by millions
- **Shuffle**: "Provably Fair Gaming with Extra Rewards" / Fully provably fair system, Fast crypto deposits, Competitive RTP
- **Rainbet**: "Play & Earn in a Community-Driven Casino" / Frequent bonuses, Engaged player base, Smooth UX
- **Default**: "Maximize Your Rewards" for other casinos

### 5. VIP Club Page (/vip)
- XP progress display
- All 5 VIP tier cards with benefits
- Partner casino cards with conversion modals (same as homepage)
- Weekly VIP Lottery ($1,000/$500/$250 prizes)

### 6. Slots & Sportsbook API Page (/slots-api)
Developer-focused page for B2B partnerships:
- 10,000+ Slots integration
- Live Sportsbook API
- Multi-Currency support (BTC, ETH, USDT)
- Provably Fair verification
- 99.9% Uptime SLA
- Curacao eGaming licensed
- Code examples with SDK usage

### 7. Provably Fair Verifiers (/verifiers)
- Stake.com verifiers for Dice, Limbo, Mines, Plinko
- Client-side cryptographic verification

---

## Completed Work

### Phase 1 (December 2025)
- ✅ **Theme Toggle**: Main/Dark/Light with lucide-react icons
- ✅ **Real Affiliate Links**: Stake, Shuffle, Rainbet with correct URLs
- ✅ **Casino Comparison Table**: Bonus, rakeback, cryptos, PLAY NOW buttons
- ✅ **XP-Based VIP System**: 5 levels (Bronze→Diamond), progress widget
- ✅ **VIP Page Redesign**: Level cards, partner casinos, lottery
- ✅ **Rebrand to Rakestake**: All pages updated
- ✅ **UI Refresh with lucide-react**: All icons replaced with clean Lucide icons
- ✅ **Uniform Casino Logos**: Letter-based SVG logos for consistent branding
- ✅ **Conversion-Optimized Modals**: Casino-specific copy, live stats, personalized estimates, strong CTAs
- ✅ **Elegant Casino Section Redesign**: Premium card design with brand-specific colors and official logos
- ✅ **Official Casino Logos**: Custom SVG logos for each casino (Stake chart, Shuffle grid, Rainbet rain, etc.)
- ✅ **Slots & Sportsbook API Page**: New B2B developer page replacing Calculators in navigation

### Previous Sessions
- User authentication (register/login/JWT)
- Admin panel for managing content
- 12 game calculators
- Provably fair verifiers
- Live statistics page

---

## Roadmap

### Phase 2 (Next)
- [ ] Live wins feed widget
- [ ] Affiliate click tracking
- [ ] SEO comparison pages (stake-vs-shuffle, etc.)
- [ ] User dashboard with rewards tracking

### Phase 3 (Future)
- [ ] Reward engine (actual rakeback calculations)
- [ ] User tracking & LTV analytics
- [ ] Leaderboards
- [ ] Discord integration
- [ ] Forum functionality

### Phase 4 (Advanced)
- [ ] ML-based casino routing
- [ ] Postback API integration
- [ ] Advanced analytics dashboard

---

## Key Files

### Frontend
- `/app/frontend/src/pages/Landing.js` - Homepage with comparison table
- `/app/frontend/src/pages/VIPHub.js` - VIP Club page
- `/app/frontend/src/contexts/ThemeContext.js` - Theme system
- `/app/frontend/src/components/ThemeToggle.js` - Theme toggle button
- `/app/frontend/src/components/Header.js` - Navigation with theme toggle

### Backend
- `/app/backend/server.py` - API endpoints, casino seeding
- `/app/backend/models.py` - Data models including VIPCampaign

---

## API Endpoints

### Public
- `GET /api/vip/campaigns` - Get all partner casinos
- `GET /api/vip/campaigns/featured` - Get featured casinos
- `GET /api/providers` - Get all providers
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login

### Admin
- CRUD for VIP campaigns, providers, promotions

---

## Notes
- XP is currently demo/simulated (stored in localStorage)
- Affiliate links are real and ready for use
- Theme preference persists across sessions
- All calculators are client-side only

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

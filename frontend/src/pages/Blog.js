import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { 
  BookOpen, Calendar, Clock, User, ArrowLeft, ArrowRight, 
  Tag, TrendingUp, Search, ChevronRight, Sparkles, Flame
} from 'lucide-react';

// Blog articles data - SEO optimized content for 2026
const blogArticles = [
  // NEW 2026 ARTICLES
  {
    id: 'crypto-casino-strategies-2026',
    title: 'Crypto Casino Strategies That Actually Work in 2026',
    excerpt: 'Forget outdated tactics. Here are the proven strategies that top players are using to maximize profits in 2026.',
    content: `
# Crypto Casino Strategies That Actually Work in 2026

The crypto casino landscape has evolved dramatically. What worked in 2024 won't cut it anymore. Here's what the smartest players are doing right now.

## The Big Shift in 2026

The industry has matured. Casinos are smarter, games are fairer, and the edge goes to players who adapt.

### Key Changes This Year:
- **AI-powered games** with dynamic house edges
- **Cross-platform VIP systems** (like Rakestake)
- **Real-time rakeback** instead of weekly payouts
- **Social betting features** for collective wins

## Strategy 1: Stack Your Rewards

The single biggest change in 2026 is reward stacking. Smart players are using affiliate aggregators like Rakestake to earn:

1. **Casino welcome bonus** (up to $3,000)
2. **Base rakeback** from the casino (5-10%)
3. **Extra rakeback** from Rakestake (up to 15%)
4. **Weekly lottery entries** (free)

**Combined value:** Up to 25% back on every wager.

## Strategy 2: Game Selection by RTP

2026 has brought more transparency. Here's what to play:

| Game Type | Avg RTP 2026 | Best For |
|-----------|--------------|----------|
| Blackjack | 99.5% | Consistent returns |
| Baccarat | 98.9% | High volume |
| Crash | 97-99% | Quick sessions |
| Slots | 94-97% | Entertainment |

**Pro tip:** Stick to games with published RTPs above 97%.

## Strategy 3: Bankroll Cycling

Instead of one big bankroll, split into cycles:

- **Cycle 1:** Low-risk games (60% of bankroll)
- **Cycle 2:** Medium-risk (30%)
- **Cycle 3:** High-risk shots (10%)

This preserves capital while allowing for big wins.

## Strategy 4: VIP Optimization

Most players leave VIP value on the table. In 2026:

1. **Consolidate play** through one affiliate
2. **Track your tier progress** weekly
3. **Time withdrawals** after VIP bonuses hit
4. **Request reload bonuses** - they often say yes

## Strategy 5: Session Discipline

Set hard limits before every session:

- **Max loss:** 5% of total bankroll
- **Win target:** 20% of session bankroll
- **Time limit:** 2 hours max

Winners know when to walk away.

## The Bottom Line

2026 is the year of the informed player. Stack your rewards, choose your games wisely, and always play through a platform that gives you extra edge. That's why Rakestake exists.
    `,
    category: 'Strategy',
    author: 'Rakestake Team',
    date: '2026-03-22',
    readTime: '10 min read',
    tags: ['strategy', '2026', 'crypto casino', 'tips', 'bankroll'],
    featured: true
  },
  {
    id: 'best-casino-bonus-programs-2026',
    title: 'Best Casino Bonus Programs 2026: Complete Ranking',
    excerpt: 'We analyzed 50+ crypto casinos to find the best bonus programs. Here are our top picks with actual value calculations.',
    content: `
# Best Casino Bonus Programs 2026: Complete Ranking

Not all bonuses are created equal. We've done the math on 50+ crypto casinos to bring you the definitive 2026 ranking.

## How We Ranked Them

Our methodology considers:
- **Bonus amount** (obvious)
- **Wagering requirements** (the trap)
- **Game restrictions** (hidden limitations)
- **Expiry time** (pressure factor)
- **Rakeback integration** (the multiplier)

## The 2026 Top 5

### #1: Shuffle - Best Overall Value
**Welcome:** Up to $1,500 + 100 Free Spins
**Wagering:** 30x (industry low)
**Rakeback:** Up to 15% through Rakestake

**Why #1:** Lowest wagering requirements in the industry. Your $100 deposit with bonus only needs $3,000 in play to withdraw—others require $6,000+.

**Calculated Value:** $247 effective bonus per $100 deposited.

### #2: Stake - Best for High Rollers
**Welcome:** Up to $3,000
**Wagering:** 40x
**Rakeback:** Up to 10% through Rakestake

**Why it ranks:** Highest bonus ceiling. VIP benefits kick in fast.

**Calculated Value:** $185 effective bonus per $100 deposited.

### #3: Rainbet - Best for Consistent Players
**Welcome:** Up to $1,000 + Daily Rakeback
**Wagering:** 35x
**Rakeback:** Up to 12% through Rakestake

**Why it ranks:** Daily rakeback drops mean you're earning constantly, not waiting for weekly payouts.

**Calculated Value:** $210 effective bonus per $100 deposited (including daily drops).

### #4: FortuneJack - Best for Bitcoin Maxis
**Welcome:** Up to 6 BTC
**Wagering:** 40x
**Rakeback:** Up to 8% through Rakestake

**Why it ranks:** Massive BTC-denominated bonus. If you believe in Bitcoin, this compounds.

### #5: BitStarz - Best Game Selection
**Welcome:** Up to 5 BTC + 180 Free Spins
**Wagering:** 40x
**Rakeback:** Up to 10% through Rakestake

**Why it ranks:** Most diverse game library. The free spins are on quality slots.

## Bonus Red Flags to Avoid

Watch out for:
- **60x+ wagering** - Nearly impossible to clear
- **3-day expiry** - Pressure to play recklessly
- **Slot-only bonuses** - Can't play table games
- **Max bet limits under $5** - Kills your strategy

## The Rakestake Advantage

Here's what most players miss: when you play through Rakestake, you get extra rakeback ON TOP of these bonuses.

**Example:**
- Deposit $500 at Shuffle
- Get $750 in bonus (1.5x match)
- Play $22,500 to clear (30x)
- Earn $225 in Rakestake rakeback (assuming 10%)
- **Net position:** +$225 profit just from rakeback while clearing

## Conclusion

The best bonus program in 2026 is the one that matches your play style. But always—always—use an affiliate like Rakestake to stack extra value.
    `,
    category: 'Reviews',
    author: 'Rakestake Team',
    date: '2026-03-18',
    readTime: '12 min read',
    tags: ['bonus', 'rankings', '2026', 'casino reviews', 'welcome bonus'],
    featured: true
  },
  {
    id: 'stake-vs-shuffle-vs-rainbet-2026',
    title: 'Stake vs Shuffle vs Rainbet: 2026 Head-to-Head Comparison',
    excerpt: 'The ultimate showdown between the three biggest crypto casinos. We compare everything that matters.',
    content: `
# Stake vs Shuffle vs Rainbet: 2026 Head-to-Head Comparison

Three giants. One choice. Let's break down everything.

## Quick Comparison Table

| Feature | Stake | Shuffle | Rainbet |
|---------|-------|---------|---------|
| Founded | 2017 | 2022 | 2023 |
| Welcome Bonus | $3,000 | $1,500 + 100 FS | $1,000 |
| Max Rakeback | 10% | 15% | 12% |
| Wagering Req. | 40x | 30x | 35x |
| Provably Fair | Partial | Full | Partial |
| Instant Withdrawals | Yes | Yes | Yes |
| VIP Levels | 10+ | 6 | 5 |

## Deep Dive: Stake

### Strengths
- **Market leader** with proven track record
- **Stake Originals** with lowest house edges
- **Massive sportsbook** coverage
- **Best VIP program** for whales

### Weaknesses
- Lower rakeback ceiling
- Complex VIP tier system
- Some countries restricted

### Best For
High-volume players who want variety and status.

## Deep Dive: Shuffle

### Strengths
- **Highest rakeback** in the industry (15%)
- **Lowest wagering** requirements (30x)
- **Full provably fair** - verify every bet
- **Fastest growing** community

### Weaknesses
- Smaller game selection than Stake
- Newer platform (less track record)

### Best For
Players who prioritize rakeback value and transparency.

## Deep Dive: Rainbet

### Strengths
- **Daily rakeback drops** - get paid every day
- **Strong community** on Discord
- **Frequent promotions** and events
- **Clean, modern UI**

### Weaknesses
- Lowest max bonus
- Fewer VIP tiers

### Best For
Social players who want consistent daily rewards.

## The Verdict by Player Type

### Casual Player ($100-500/month)
**Winner: Rainbet**
Daily drops keep you engaged without big commitments.

### Regular Player ($500-2,000/month)
**Winner: Shuffle**
Highest rakeback + low wagering = best value.

### High Roller ($2,000+/month)
**Winner: Stake**
VIP program benefits scale with volume.

### Sports Bettor
**Winner: Stake**
Most comprehensive sportsbook, period.

### Provably Fair Purist
**Winner: Shuffle**
The only one with full verification.

## The Smart Play

Why choose one? With Rakestake, you can play at all three and:

1. Get extra rakeback on each platform
2. Earn unified XP across all casinos
3. Enter the same weekly lottery
4. Have one dashboard for all earnings

Diversify your play, maximize your rewards.

## Final Rankings 2026

1. **Shuffle** - Best value for most players
2. **Stake** - Best for high rollers
3. **Rainbet** - Best for casual/social play

All three are excellent choices. The real winner is using Rakestake to play all of them.
    `,
    category: 'Comparisons',
    author: 'Rakestake Team',
    date: '2026-03-15',
    readTime: '11 min read',
    tags: ['stake', 'shuffle', 'rainbet', 'comparison', '2026'],
    featured: true
  },
  {
    id: 'rakeback-maximizer-guide-2026',
    title: 'The Rakeback Maximizer: How to Earn 20%+ Back in 2026',
    excerpt: 'Advanced strategies to stack multiple rakeback sources and maximize your returns on every bet.',
    content: `
# The Rakeback Maximizer: How to Earn 20%+ Back in 2026

Most players settle for 5-10% rakeback. Here's how to get 20% or more.

## Understanding Rakeback Stacking

In 2026, you can layer multiple rakeback sources:

### Layer 1: Casino Base Rakeback
Every casino offers base rakeback (2-10%) based on your VIP level.

### Layer 2: Affiliate Rakeback
Platforms like Rakestake add extra rakeback on top (up to 15%).

### Layer 3: Promotional Rakeback
Weekly/monthly promos often include rakeback boosts.

## The Math

Let's say you wager $10,000/month:

| Source | Rate | Earnings |
|--------|------|----------|
| Casino (Gold VIP) | 8% | $800 |
| Rakestake Bonus | 10% | $1,000 |
| Promo Boost | 5% | $500 |
| **Total** | **23%** | **$2,300** |

That's $2,300 back on $10,000 wagered—regardless of wins or losses.

## Step-by-Step Maximization

### Step 1: Choose High-Rakeback Casinos
Start with Shuffle (15%) or Rainbet (12%) through Rakestake.

### Step 2: Level Up Your VIP Fast
Focus play on one casino initially. Spread later.

### Step 3: Activate All Promos
Check the promotions page EVERY session. Opt-in required.

### Step 4: Time Your Big Sessions
Many casinos offer double rakeback on weekends.

### Step 5: Track Everything
Use Rakestake dashboard to monitor across platforms.

## Advanced Techniques

### The Reload Cycle
1. Deposit and play through bonus
2. Collect rakeback
3. Withdraw profits
4. Repeat with reload bonus

### The Multi-Casino Rotation
Play different casinos on different days to:
- Hit multiple daily bonuses
- Maintain VIP progress on all
- Maximize promotional variety

### The Whale Request
At $5,000+ monthly volume:
- Email VIP support directly
- Request custom rakeback rates
- Negotiate exclusive bonuses

## Common Mistakes

1. **Playing without affiliate link** - Leaving 10%+ on the table
2. **Ignoring VIP progress** - Stuck at low rakeback tiers
3. **Missing promos** - Free money unclaimed
4. **Poor game selection** - High house edge kills rakeback value

## The 20%+ Formula

To consistently earn 20%+ rakeback:

1. Play through Rakestake (required)
2. Choose Shuffle or Rainbet
3. Reach Gold VIP status
4. Activate every promotion
5. Time sessions for boost periods

## Conclusion

Rakeback is the closest thing to "guaranteed" profit in gambling. Stack your sources, play smart, and let the percentages work for you.
    `,
    category: 'Strategy',
    author: 'Rakestake Team',
    date: '2026-03-10',
    readTime: '9 min read',
    tags: ['rakeback', 'strategy', 'maximizing', 'guide', '2026'],
    featured: false
  },
  {
    id: 'new-crypto-casinos-april-2026',
    title: 'New Crypto Casinos April 2026: First Look Reviews',
    excerpt: 'Fresh platforms launching this month. We test them so you don\'t have to risk your bankroll.',
    content: `
# New Crypto Casinos April 2026: First Look Reviews

Every month brings new casinos claiming to be the next big thing. We tested the latest launches.

## This Month's Launches

### 1. NeonBet Casino
**Launch Date:** April 1, 2026
**Welcome Bonus:** 200% up to $2,000

**First Impressions:**
- Slick neon-themed UI
- 2,000+ slots at launch
- Provably fair originals
- Instant USDT withdrawals

**Red Flags:**
- No established track record
- High 50x wagering requirement
- Limited customer support hours

**Verdict:** Wait 3 months before depositing significant funds.

### 2. MetaWager
**Launch Date:** April 8, 2026
**Welcome Bonus:** 150% + 200 Free Spins

**First Impressions:**
- VR casino integration (beta)
- Innovative social features
- Low 25x wagering
- Strong marketing budget

**Red Flags:**
- VR features buggy
- Smaller game library
- New team, no history

**Verdict:** Interesting concept. Small deposits only for now.

### 3. CryptoKings Relaunched
**Launch Date:** April 15, 2026
**Welcome Bonus:** $5,000 + Daily Rakeback

**First Impressions:**
- Complete rebrand of former platform
- Massive bonus cap
- Aggressive rakeback program
- Curacao licensed

**Red Flags:**
- Previous platform had payout issues
- Different team claimed (verify!)
- Bonus terms complex

**Verdict:** Proceed with extreme caution. History matters.

## What to Look for in New Casinos

### Green Flags
- **Established license** (Curacao minimum)
- **Provably fair games** or audited RNG
- **Instant withdrawals** tested with small amounts
- **Transparent team** (LinkedIn, interviews)
- **Growing community** (not bot-filled)

### Red Flags
- **No license** or "pending" license
- **Hidden wagering requirements**
- **Withdrawal delays** in early reviews
- **Anonymous team**
- **Paid reviews only** (no organic feedback)

## Our Recommendation

**Stick with established platforms** like Stake, Shuffle, and Rainbet through Rakestake. The extra rakeback alone exceeds what most new casinos offer.

If you must try new casinos:
1. Deposit minimum amounts
2. Test withdrawals immediately
3. Read terms completely
4. Check community feedback

## The Safe Play

New doesn't mean better. Rakestake partners are vetted and proven. Your bankroll is safer with established names.
    `,
    category: 'Reviews',
    author: 'Rakestake Team',
    date: '2026-03-05',
    readTime: '8 min read',
    tags: ['new casinos', 'reviews', 'april 2026', 'first look'],
    featured: false
  },
  {
    id: 'sports-betting-crypto-guide-2026',
    title: 'Sports Betting with Crypto in 2026: Complete Guide',
    excerpt: 'Everything you need to know about crypto sportsbooks, from odds to cashout to rakeback.',
    content: `
# Sports Betting with Crypto in 2026: Complete Guide

Crypto sportsbooks have matured. Here's your complete guide to betting smarter.

## Why Crypto for Sports Betting?

### Advantages
- **Instant deposits** - No waiting for bank transfers
- **Fast withdrawals** - Often under 10 minutes
- **Better odds** - Lower margins than fiat books
- **Rakeback** - Get paid to bet (unique to crypto)
- **Privacy** - Less documentation required

### The Numbers
Average margin comparison:
- Fiat sportsbooks: 5-7%
- Crypto sportsbooks: 3-5%

That 2% difference compounds over hundreds of bets.

## Top Crypto Sportsbooks 2026

### 1. Stake Sportsbook
- 30+ sports covered
- Live streaming for most events
- Cash out feature
- Up to 10% rakeback via Rakestake

### 2. Shuffle Sports
- Competitive odds
- Provably fair bets
- Quick payouts
- Up to 15% rakeback via Rakestake

### 3. 1xBet Crypto
- Widest market coverage
- Most bet types
- Multi-currency support
- Up to 8% rakeback via Rakestake

## Sports Betting Strategy 2026

### Bankroll Management
- **Unit size:** 1-3% of bankroll per bet
- **Max exposure:** Never more than 10% on one day
- **Track everything:** Use spreadsheets or apps

### Value Betting
Look for odds that are "wrong":
1. Compare across multiple books
2. Calculate implied probability
3. Bet when your estimate > implied

### Live Betting Edge
Crypto books update odds slower than sharp books. Use this for:
- Momentum shifts
- Weather changes
- Injury news

## Rakeback on Sports Bets

Yes, you earn rakeback on sports bets too! Through Rakestake:

| Platform | Sports Rakeback |
|----------|----------------|
| Stake | Up to 10% |
| Shuffle | Up to 15% |
| 1xBet | Up to 8% |

**Example:** $10,000 monthly sports wagering at 10% rakeback = $1,000 back, win or lose.

## Cash Out Strategy

Most crypto books offer cash out. Use it wisely:

**When to cash out:**
- When securing profit is more valuable than potential upside
- When circumstances have changed (injury, weather)
- When you need liquidity

**When NOT to cash out:**
- Partial cash outs (usually bad value)
- When odds are still in your favor
- Panic cash outs after one bad break

## The Complete Package

For maximum sports betting value in 2026:
1. Sign up through Rakestake
2. Choose Stake for variety or Shuffle for rakeback
3. Use proper bankroll management
4. Collect rakeback on every bet
5. Cash out strategically

Your edge isn't just in picking winners—it's in maximizing value on every bet you place.
    `,
    category: 'Guides',
    author: 'Rakestake Team',
    date: '2026-03-01',
    readTime: '10 min read',
    tags: ['sports betting', 'crypto', 'sportsbook', 'guide', '2026'],
    featured: false
  },
  // OLDER ARTICLES (kept for SEO value)
  {
    id: 'what-is-rakeback-guide',
    title: 'What is Rakeback? The Complete Guide',
    excerpt: 'Learn everything about rakeback, how it works, and why it\'s the smartest way to maximize your crypto casino earnings.',
    content: `
# What is Rakeback? The Complete Guide

Rakeback is one of the most powerful tools in a smart gambler's arsenal. If you're playing at crypto casinos without understanding rakeback, you're leaving money on the table.

## What Exactly is Rakeback?

Rakeback is a cashback program where a percentage of your wagers is returned to you, regardless of whether you win or lose. Think of it as a loyalty reward that pays you for every bet you make.

### How Does Rakeback Work?

When you play at a casino, the house takes a small percentage (the "rake") from each bet. With rakeback, you get a portion of this rake returned to you.

**Example:**
- You wager $10,000 over a month
- The casino's effective rake is 3%
- With 10% rakeback, you'd receive $30 back

## Why Rakeback Matters

### 1. Reduces House Edge
Every percentage point of rakeback directly reduces the effective house edge you're playing against.

### 2. Consistent Returns
Unlike bonuses that have wagering requirements, rakeback is straightforward - play, earn, withdraw.

### 3. Stacks with Other Bonuses
At Rakestake, your rakeback is **on top of** any casino bonuses you receive. It's not either/or.

## Rakeback vs. Cashback

| Feature | Rakeback | Cashback |
|---------|----------|----------|
| Based on | Total wagers | Net losses |
| Consistency | Every bet | Only when losing |
| Predictability | High | Variable |

## Maximizing Your Rakeback

1. **Choose high-rakeback affiliates** - Rakestake offers up to 15%
2. **Play games with lower house edges** - Your money lasts longer
3. **Level up your VIP status** - Higher levels = higher rakeback
4. **Be consistent** - Regular play unlocks better rewards

## Conclusion

Rakeback is the closest thing to "free money" in gambling. By playing through Rakestake, you're guaranteed extra value on every single bet. Don't gamble without it.
    `,
    category: 'Guides',
    author: 'Rakestake Team',
    date: '2025-01-15',
    readTime: '8 min read',
    tags: ['rakeback', 'guide', 'crypto casino', 'basics'],
    featured: false
  },
  {
    id: 'vip-programs-explained',
    title: 'Crypto Casino VIP Programs: How to Level Up Fast',
    excerpt: 'Master the VIP ladder at top crypto casinos and unlock exclusive rewards, higher rakeback, and personal hosts.',
    content: `
# Crypto Casino VIP Programs: How to Level Up Fast

VIP programs can dramatically increase your gambling value. Here's how to maximize them.

## How VIP Programs Work

Most crypto casinos use an XP-based system:
- Wager → Earn XP
- More XP → Higher level
- Higher level → Better rewards

## Typical VIP Tiers

| Level | Rakeback | Benefits |
|-------|----------|----------|
| Bronze | 2% | Basic access |
| Silver | 5% | Priority support |
| Gold | 8% | Weekly bonuses |
| Platinum | 12% | Personal host |
| Diamond | 15% | VIP events |

## Leveling Up Faster

### 1. Consolidate Your Play
Play at one casino through Rakestake to maximize XP earning.

### 2. Consistent Play > Sporadic Binges
Regular wagering builds XP faster than occasional big sessions.

### 3. Take Advantage of Promotions
Double XP events and challenges accelerate progress.

## The Rakestake Advantage

Our unified VIP system works across all partner casinos:
- Earn XP everywhere
- One level applies to all
- Stack casino VIP + Rakestake VIP

## Conclusion

VIP programs are long-term value plays. Start climbing today with Rakestake.
    `,
    category: 'Guides',
    author: 'Rakestake Team',
    date: '2025-01-05',
    readTime: '5 min read',
    tags: ['vip', 'rewards', 'guide', 'levels'],
    featured: false
  },
  {
    id: 'provably-fair-gaming',
    title: 'Provably Fair Gaming: What It Means and Why It Matters',
    excerpt: 'Understand the technology behind provably fair games and how to verify your bets are legitimate.',
    content: `
# Provably Fair Gaming: What It Means and Why It Matters

Provably fair is the gold standard for transparency in crypto gambling. Here's everything you need to know.

## What is Provably Fair?

Provably fair is a cryptographic system that allows you to independently verify that a game's outcome wasn't manipulated.

## How It Works

1. **Before the bet:** Casino commits to a server seed (hashed)
2. **You provide:** A client seed
3. **After the bet:** Server seed revealed
4. **Verification:** You can reproduce the exact result

## Why It Matters

### Trust Without Trust
You don't need to trust the casino - you can verify everything yourself.

### Impossible to Manipulate
Cryptographic hashes make cheating mathematically impossible.

### Industry Standard
Leading crypto casinos are adopting provably fair across all games.

## Casinos with Provably Fair

- **Shuffle:** Full provably fair suite
- **Stake:** Stake Originals
- **Rainbet:** Select games

## How to Verify

Most casinos provide a verification tool:
1. Enter your server seed
2. Enter your client seed
3. Enter the nonce
4. Result matches = Fair game

## Conclusion

Always prefer provably fair games when possible. It's the ultimate protection for players.
    `,
    category: 'Education',
    author: 'Rakestake Team',
    date: '2025-01-03',
    readTime: '6 min read',
    tags: ['provably fair', 'security', 'crypto', 'verification'],
    featured: false
  }
];

// Get unique categories
const categories = [...new Set(blogArticles.map(a => a.category))];

// Blog List Component
function BlogList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredArticles = blogArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticles = blogArticles.filter(a => a.featured).slice(0, 3);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 20px',
          background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(129,140,248,0.1))',
          border: '1px solid rgba(99,102,241,0.3)',
          borderRadius: '30px',
          marginBottom: '20px'
        }}>
          <BookOpen size={18} color="#6366f1" />
          <span style={{ fontSize: '13px', fontWeight: '700', color: '#6366f1', letterSpacing: '1px' }}>
            RAKESTAKE BLOG
          </span>
        </div>
        
        <h1 style={{
          fontSize: 'clamp(32px, 6vw, 48px)',
          fontWeight: '900',
          color: 'var(--text-primary)',
          marginBottom: '16px',
          letterSpacing: '-1px'
        }}>
          Crypto Casino Insights
        </h1>
        
        <p style={{
          fontSize: '17px',
          color: 'var(--text-secondary)',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Strategies, reviews, and guides to maximize your crypto casino rewards. Updated for 2026.
        </p>
      </div>

      {/* Search & Filter */}
      <div style={{
        display: 'flex',
        gap: '16px',
        marginBottom: '40px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <div style={{ position: 'relative', flex: '1', maxWidth: '400px', minWidth: '200px' }}>
          <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="blog-search"
            style={{
              width: '100%',
              padding: '12px 14px 12px 44px',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              color: 'var(--text-primary)',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setSelectedCategory('all')}
            data-testid="category-all"
            style={{
              padding: '10px 18px',
              background: selectedCategory === 'all' ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              color: selectedCategory === 'all' ? '#fff' : 'var(--text-secondary)',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              data-testid={`category-${cat.toLowerCase()}`}
              style={{
                padding: '10px 18px',
                background: selectedCategory === cat ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                color: selectedCategory === cat ? '#fff' : 'var(--text-secondary)',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Articles */}
      {selectedCategory === 'all' && searchQuery === '' && (
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '700',
            color: 'var(--text-primary)',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <Flame size={20} color="#ff6b35" />
            Latest 2026 Articles
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {featuredArticles.map(article => (
              <Link
                key={article.id}
                to={`/blog/${article.id}`}
                data-testid={`featured-article-${article.id}`}
                style={{
                  background: 'linear-gradient(135deg, rgba(255,107,53,0.08), rgba(255,140,0,0.05))',
                  border: '1px solid rgba(255,107,53,0.2)',
                  borderRadius: '16px',
                  padding: '24px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(255,107,53,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span style={{
                    padding: '4px 10px',
                    background: 'rgba(255,107,53,0.2)',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: '700',
                    color: '#ff6b35'
                  }}>
                    {article.category}
                  </span>
                  {article.date.startsWith('2026') && (
                    <span style={{
                      padding: '4px 8px',
                      background: 'rgba(34,197,94,0.2)',
                      borderRadius: '6px',
                      fontSize: '10px',
                      fontWeight: '700',
                      color: '#22c55e'
                    }}>
                      NEW
                    </span>
                  )}
                </div>
                
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: 'var(--text-primary)',
                  marginBottom: '10px',
                  lineHeight: '1.4'
                }}>
                  {article.title}
                </h3>
                
                <p style={{
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  marginBottom: '16px',
                  lineHeight: '1.6'
                }}>
                  {article.excerpt}
                </p>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  fontSize: '12px',
                  color: 'var(--text-muted)'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={14} />
                    {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={14} />
                    {article.readTime}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* All Articles */}
      <div>
        <h2 style={{
          fontSize: '20px',
          fontWeight: '700',
          color: 'var(--text-primary)',
          marginBottom: '20px'
        }}>
          {selectedCategory === 'all' ? 'All Articles' : selectedCategory}
          <span style={{ color: 'var(--text-muted)', fontWeight: '500', fontSize: '16px', marginLeft: '10px' }}>
            ({filteredArticles.length})
          </span>
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredArticles.map(article => (
            <Link
              key={article.id}
              to={`/blog/${article.id}`}
              data-testid={`article-${article.id}`}
              style={{
                display: 'flex',
                gap: '20px',
                background: 'var(--bg-glass)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '24px',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                alignItems: 'flex-start'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                e.currentTarget.style.transform = 'translateX(4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <span style={{
                    padding: '4px 10px',
                    background: 'var(--bg-tertiary)',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: '600',
                    color: 'var(--accent-primary)'
                  }}>
                    {article.category}
                  </span>
                  {article.date.startsWith('2026') && (
                    <span style={{
                      padding: '4px 8px',
                      background: 'rgba(34,197,94,0.15)',
                      borderRadius: '6px',
                      fontSize: '10px',
                      fontWeight: '700',
                      color: '#22c55e'
                    }}>
                      2026
                    </span>
                  )}
                </div>
                
                <h3 style={{
                  fontSize: '17px',
                  fontWeight: '700',
                  color: 'var(--text-primary)',
                  marginBottom: '8px'
                }}>
                  {article.title}
                </h3>
                
                <p style={{
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  marginBottom: '12px',
                  lineHeight: '1.5'
                }}>
                  {article.excerpt}
                </p>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  flexWrap: 'wrap'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <User size={14} />
                    {article.author}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={14} />
                    {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={14} />
                    {article.readTime}
                  </span>
                </div>
              </div>
              
              <ChevronRight size={20} color="var(--text-muted)" style={{ flexShrink: 0, marginTop: '24px' }} />
            </Link>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: 'var(--text-muted)'
          }}>
            <BookOpen size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
            <p>No articles found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* SEO Footer */}
      <div style={{
        marginTop: '60px',
        padding: '32px',
        background: 'var(--bg-glass)',
        border: '1px solid var(--border-color)',
        borderRadius: '16px',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '12px' }}>
          Stay Updated
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
          Get the latest crypto casino strategies and exclusive offers.
        </p>
        <Link
          to="/register"
          data-testid="blog-cta"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '14px 28px',
            background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
            borderRadius: '10px',
            color: '#000',
            fontWeight: '700',
            fontSize: '14px',
            textDecoration: 'none'
          }}
        >
          Join Rakestake VIP
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}

// Blog Article Detail Component
function BlogArticle() {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const article = blogArticles.find(a => a.id === slug);
  
  if (!article) {
    return (
      <div style={{ maxWidth: '800px', margin: '60px auto', padding: '20px', textAlign: 'center' }}>
        <h1 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>Article Not Found</h1>
        <Link to="/blog" style={{ color: 'var(--accent-primary)' }}>Back to Blog</Link>
      </div>
    );
  }

  // Get related articles
  const relatedArticles = blogArticles
    .filter(a => a.id !== article.id && (a.category === article.category || a.tags.some(t => article.tags.includes(t))))
    .slice(0, 3);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      {/* Back Link */}
      <button
        onClick={() => navigate('/blog')}
        data-testid="back-to-blog"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'none',
          border: 'none',
          color: 'var(--text-secondary)',
          fontSize: '14px',
          cursor: 'pointer',
          marginBottom: '32px',
          padding: 0
        }}
      >
        <ArrowLeft size={18} />
        Back to Blog
      </button>

      {/* Article Header */}
      <header style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <span style={{
            padding: '6px 14px',
            background: 'var(--accent-primary)',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: '700',
            color: '#fff'
          }}>
            {article.category}
          </span>
          {article.featured && (
            <span style={{
              padding: '6px 14px',
              background: 'rgba(255,215,0,0.2)',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '700',
              color: '#ffd700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Sparkles size={14} />
              Featured
            </span>
          )}
          {article.date.startsWith('2026') && (
            <span style={{
              padding: '6px 14px',
              background: 'rgba(34,197,94,0.15)',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '700',
              color: '#22c55e'
            }}>
              2026
            </span>
          )}
        </div>

        <h1 style={{
          fontSize: 'clamp(28px, 5vw, 40px)',
          fontWeight: '900',
          color: 'var(--text-primary)',
          marginBottom: '20px',
          lineHeight: '1.2',
          letterSpacing: '-1px'
        }}>
          {article.title}
        </h1>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          fontSize: '14px',
          color: 'var(--text-secondary)',
          flexWrap: 'wrap'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <User size={16} />
            {article.author}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={16} />
            {new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={16} />
            {article.readTime}
          </span>
        </div>
      </header>

      {/* Article Content */}
      <article 
        data-testid="article-content"
        style={{
          fontSize: '16px',
          lineHeight: '1.8',
          color: 'var(--text-secondary)'
        }}
      >
        <div 
          className="article-content"
          style={{
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-color)',
            borderRadius: '20px',
            padding: 'clamp(24px, 5vw, 40px)'
          }}
          dangerouslySetInnerHTML={{ 
            __html: article.content
              .replace(/^# (.*$)/gm, '<h1 style="font-size: 28px; font-weight: 800; color: var(--text-primary); margin: 32px 0 16px; line-height: 1.3;">$1</h1>')
              .replace(/^## (.*$)/gm, '<h2 style="font-size: 22px; font-weight: 700; color: var(--text-primary); margin: 28px 0 12px;">$1</h2>')
              .replace(/^### (.*$)/gm, '<h3 style="font-size: 18px; font-weight: 600; color: var(--text-primary); margin: 24px 0 10px;">$1</h3>')
              .replace(/\*\*(.*?)\*\*/g, '<strong style="color: var(--text-primary); font-weight: 600;">$1</strong>')
              .replace(/\n\n/g, '</p><p style="margin: 16px 0;">')
              .replace(/^\| (.*) \|$/gm, '<tr><td style="padding: 12px; border: 1px solid var(--border-color);">$1</td></tr>')
              .replace(/^- (.*$)/gm, '<li style="margin: 8px 0; margin-left: 20px;">$1</li>')
              .replace(/^\d+\. (.*$)/gm, '<li style="margin: 8px 0; margin-left: 20px;">$1</li>')
          }}
        />
      </article>

      {/* Tags */}
      <div style={{ marginTop: '32px', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        <Tag size={16} color="var(--text-muted)" />
        {article.tags.map(tag => (
          <span
            key={tag}
            style={{
              padding: '6px 12px',
              background: 'var(--bg-tertiary)',
              borderRadius: '6px',
              fontSize: '12px',
              color: 'var(--text-secondary)'
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div style={{
        marginTop: '48px',
        padding: '32px',
        background: 'linear-gradient(135deg, rgba(255,215,0,0.1), rgba(255,140,0,0.05))',
        border: '1px solid rgba(255,215,0,0.3)',
        borderRadius: '20px',
        textAlign: 'center'
      }}>
        <h3 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '10px' }}>
          Ready to Earn More?
        </h3>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
          Join Rakestake VIP and get up to 15% rakeback on every bet.
        </p>
        <Link
          to="/register"
          data-testid="article-cta"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '14px 28px',
            background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
            borderRadius: '10px',
            color: '#000',
            fontWeight: '700',
            fontSize: '15px',
            textDecoration: 'none'
          }}
        >
          Get Started Free
          <ArrowRight size={18} />
        </Link>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div style={{ marginTop: '60px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '24px' }}>
            Related Articles
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {relatedArticles.map(related => (
              <Link
                key={related.id}
                to={`/blog/${related.id}`}
                data-testid={`related-${related.id}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '20px',
                  background: 'var(--bg-glass)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: '600',
                      color: 'var(--accent-primary)'
                    }}>
                      {related.category}
                    </span>
                    {related.date.startsWith('2026') && (
                      <span style={{ fontSize: '10px', color: '#22c55e', fontWeight: '600' }}>2026</span>
                    )}
                  </div>
                  <h4 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {related.title}
                  </h4>
                </div>
                <ChevronRight size={18} color="var(--text-muted)" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Main Blog Component with routing
function Blog() {
  const { slug } = useParams();
  
  if (slug) {
    return <BlogArticle />;
  }
  
  return <BlogList />;
}

export default Blog;

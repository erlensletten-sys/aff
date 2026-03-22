import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { 
  BookOpen, Calendar, Clock, User, ArrowLeft, ArrowRight, 
  Tag, TrendingUp, Search, ChevronRight, Sparkles
} from 'lucide-react';

// Blog articles data - SEO optimized content
const blogArticles = [
  {
    id: 'what-is-rakeback-guide',
    title: 'What is Rakeback? The Complete 2025 Guide',
    excerpt: 'Learn everything about rakeback, how it works, and why it\'s the smartest way to maximize your crypto casino earnings.',
    content: `
# What is Rakeback? The Complete 2025 Guide

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
    featured: true
  },
  {
    id: 'best-crypto-casinos-2025',
    title: 'Best Crypto Casinos 2025: Top Picks for Rakeback',
    excerpt: 'Our comprehensive ranking of the best crypto casinos with the highest rakeback rates and best bonuses.',
    content: `
# Best Crypto Casinos 2025: Top Picks for Rakeback

Finding the right crypto casino can make a huge difference in your gambling experience. Here's our curated list of the best platforms, ranked by rakeback potential and overall value.

## Our Top Picks

### 1. Stake - The Industry Leader
**Rakeback: Up to 10%** | **Bonus: Up to $3,000**

Stake has dominated the crypto casino space for years. Known for:
- Stake Originals with low house edges
- Instant crypto withdrawals
- Extensive sportsbook coverage
- Industry-leading VIP program

### 2. Shuffle - Provably Fair Pioneer
**Rakeback: Up to 15%** | **Bonus: Up to $1,500 + 100 FS**

Shuffle stands out with its commitment to transparency:
- Fully provably fair games
- Highest rakeback rates in the industry
- Fast-growing community
- Innovative reward system

### 3. Rainbet - Community Favorite
**Rakeback: Up to 12%** | **Bonus: Up to $1,000**

Rainbet has built a loyal community through:
- Daily rakeback drops
- Active Discord community
- Regular promotions
- Solid slot selection

## What to Look For

When choosing a crypto casino, consider:

1. **Rakeback rate** - Higher is better
2. **Game variety** - Slots, live casino, originals
3. **Withdrawal speed** - Instant is ideal
4. **Reputation** - Check reviews and communities
5. **VIP program** - Long-term value matters

## Why Play Through Rakestake?

By signing up through Rakestake, you get:
- Extra rakeback on top of casino bonuses
- Unified VIP progression
- Weekly lottery entries
- Community perks

## Conclusion

All casinos on our list are vetted and trusted. The best choice depends on your preferences, but you can't go wrong with any of them when you play through Rakestake.
    `,
    category: 'Reviews',
    author: 'Rakestake Team',
    date: '2025-01-12',
    readTime: '10 min read',
    tags: ['casino reviews', 'crypto casino', 'rankings', '2025'],
    featured: true
  },
  {
    id: 'stake-vs-shuffle-comparison',
    title: 'Stake vs Shuffle: Which Crypto Casino is Better?',
    excerpt: 'An in-depth comparison of the two biggest crypto casinos. Find out which one offers better value for your style.',
    content: `
# Stake vs Shuffle: Which Crypto Casino is Better?

Two giants of the crypto casino world go head-to-head. Let's break down everything you need to know.

## Overview

| Feature | Stake | Shuffle |
|---------|-------|---------|
| Founded | 2017 | 2022 |
| Rakeback | Up to 10% | Up to 15% |
| Welcome Bonus | Up to $3,000 | Up to $1,500 + 100 FS |
| Provably Fair | Partial | Full |

## Game Selection

### Stake
- 3,000+ slots
- Stake Originals (Dice, Crash, Mines)
- Extensive live casino
- Full sportsbook

### Shuffle
- 2,000+ slots
- Shuffle Originals
- Live casino
- Sportsbook available

**Winner: Stake** (for variety)

## Rakeback & VIP

### Stake
- Tiered VIP system
- Monthly bonuses
- Reload bonuses
- Host support at high levels

### Shuffle
- Higher base rakeback
- Faster VIP progression
- More transparent calculations
- Better for mid-level players

**Winner: Shuffle** (for rakeback value)

## Withdrawals

Both offer instant crypto withdrawals with no limits. It's a tie.

## Our Recommendation

- **Choose Stake** if you value variety and sports betting
- **Choose Shuffle** if you want maximum rakeback

## The Smart Play

Why choose when you can play both through Rakestake? Earn extra rakeback on both platforms and diversify your play.
    `,
    category: 'Comparisons',
    author: 'Rakestake Team',
    date: '2025-01-10',
    readTime: '7 min read',
    tags: ['stake', 'shuffle', 'comparison', 'crypto casino'],
    featured: false
  },
  {
    id: 'crypto-casino-strategies',
    title: '5 Strategies to Maximize Your Crypto Casino Profits',
    excerpt: 'Proven strategies to improve your odds and maximize returns when playing at crypto casinos.',
    content: `
# 5 Strategies to Maximize Your Crypto Casino Profits

Smart gambling is profitable gambling. Here are five strategies that successful crypto casino players use.

## 1. Always Play with Rakeback

This is non-negotiable. Every bet without rakeback is money wasted.

**Impact:** 10% rakeback on $100k wagered = $10k returned

## 2. Bankroll Management

Never bet more than 1-2% of your bankroll on a single bet.

**The 1% Rule:**
- Bankroll: $1,000
- Max bet: $10-20

## 3. Game Selection Matters

Different games have different house edges:

| Game | House Edge |
|------|------------|
| Blackjack | 0.5% |
| Baccarat | 1.06% |
| Roulette | 2.7% |
| Slots | 2-10% |

Lower house edge = longer sessions = more rakeback earned.

## 4. Utilize Bonuses Strategically

- Read wagering requirements
- Calculate effective value
- Stack rakeback on top

## 5. Set Limits and Stick to Them

- Daily loss limits
- Session time limits
- Win targets

## Conclusion

Combine these strategies with Rakestake's rakeback program for the optimal gambling experience.
    `,
    category: 'Strategy',
    author: 'Rakestake Team',
    date: '2025-01-08',
    readTime: '6 min read',
    tags: ['strategy', 'tips', 'bankroll', 'gambling'],
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

  const featuredArticles = blogArticles.filter(a => a.featured);

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
          Strategies, reviews, and guides to maximize your crypto casino rewards.
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
            <Sparkles size={20} color="#ffd700" />
            Featured Articles
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
                  background: 'linear-gradient(135deg, rgba(255,215,0,0.08), rgba(255,140,0,0.05))',
                  border: '1px solid rgba(255,215,0,0.2)',
                  borderRadius: '16px',
                  padding: '24px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(255,215,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  display: 'inline-block',
                  padding: '4px 10px',
                  background: 'rgba(255,215,0,0.2)',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: '700',
                  color: '#ffd700',
                  marginBottom: '12px'
                }}>
                  {article.category}
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
              .replace(/^### (.*$)/gm, '<h3 style="font-size: 18px; font-weight: 600; color: var(--text-primary); margin: 24px 0 10px;">$3</h3>')
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
                  <div style={{
                    fontSize: '11px',
                    fontWeight: '600',
                    color: 'var(--accent-primary)',
                    marginBottom: '6px'
                  }}>
                    {related.category}
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

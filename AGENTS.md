# AGENTS.md - Development Guide for Drift

## Project Philosophy

Drift is an anti-engagement app. It exists to insert friction, restore boredom, and break the reward loops that modern technology has optimized into our lives.

**Core principle**: If this app becomes addictive, it has failed.

---

## What Drift Is

A minimal tool that:
- Inserts delay between impulse and action
- Breaks reward loops rather than replacing them
- Restores the pause that optimization removed
- Retrains tolerance for boredom and ambiguity

It does NOT motivate, gamify, reward, or "improve" the user.

---

## Development Principles

### 1. Anti-Engagement by Design

Every feature must be evaluated against this question: **Does this make the app more engaging?** If yes, reject it.

- No notifications (unless explicitly requested for a single delayed action)
- No streaks or daily use metrics
- No achievements or progress tracking
- No social features or comparisons
- No variable rewards
- No infinite scroll or feeds
- No personalization that increases stickiness

### 2. Intentional Friction

Friction is the product, not a bug to fix.

- Delays should feel like delays
- The UI should not be "delightful" - it should be calm and forgettable
- Interactions should require deliberate action
- The app should never interrupt the user

### 3. Minimal by Conviction

Less is more. Then remove more.

- Every screen, button, and feature must justify its existence
- Default to removing, not adding
- No analytics beyond what's needed for basic functionality
- No A/B testing for engagement optimization

### 4. Honest Metrics

If we track anything, it should be:
- Impulses delayed (not celebrated, just noted)
- Time given back to the user
- Eventually: declining usage as a success indicator

Never track: session length, daily active users, retention rates.

### 5. Respect for Attention

- No bright colors competing for attention
- No animations that draw the eye
- No sounds unless functionally necessary
- The app should be easy to put down and forget

---

## Technical Guidelines

### Stack Recommendations

Keep it simple. Complexity breeds features.

- **Frontend**: Plain HTML/CSS/JS, or a minimal framework (Svelte, vanilla React)
- **Styling**: Muted colors, high contrast for accessibility, no decorative elements
- **State**: Local-first. User data stays on device when possible
- **Backend**: Minimal or none. If needed, simple and stateless

### What NOT to Build

- User accounts with social graphs
- Recommendation systems
- Push notification infrastructure
- Analytics dashboards
- Sharing features
- Comments or reactions
- Leaderboards
- Premium tiers that unlock "more engagement"

### What TO Build

- A simple delay timer between impulse and action
- Optional: journaling prompt after the delay (not before)
- Settings that default to maximum friction
- Easy exit - the app should never trap the user
- Clear, honest copy that doesn't persuade

---

## UX Principles

### The Interaction Model

1. User feels impulse (to check social media, buy something, etc.)
2. User opens Drift instead
3. Drift presents: "What do you want to do?"
4. User states intention
5. Drift says: "Wait."
6. Timer runs (no gamification, no progress bars that feel rewarding)
7. When done: "Do you still want to do this?"
8. User decides
9. App closes. No followup. No "how did it go?"

### Visual Design

- Muted palette: grays, off-whites, perhaps one accent color (not dopamine-red)
- Generous whitespace
- No illustrations or mascots
- Typography: readable, not stylish
- The screen should feel like a blank page, not a product

### Copy Guidelines

- Never persuade or motivate
- Never congratulate
- State facts, not feelings
- Avoid second-person manipulation ("You've got this!")
- Respect intelligence: no condescension

**Good**: "10 minutes remaining"
**Bad**: "You're doing great! Only 10 minutes to go!"

**Good**: "Do you still want to proceed?"
**Bad**: "Ready to make a mindful choice?"

---

## Feature Evaluation Checklist

Before implementing any feature, ask:

1. Does this increase engagement? **Reject if yes**
2. Does this add friction? **Good if yes**
3. Does this respect user attention? **Required**
4. Could we ship without this? **If yes, don't build it**
5. Does this make the app harder to put down? **Reject if yes**
6. Would removing this hurt the core purpose? **Keep only if yes**

---

## Success Criteria

The app succeeds when:

- Users open it less over time (habit formed)
- Users report more pauses before impulsive actions
- Users eventually uninstall it because they no longer need it
- The codebase remains small and maintainable
- We resist every temptation to optimize for growth

---

## Red Lines

Never implement:

- Dark patterns of any kind
- Artificial urgency
- Social proof manipulation
- Loss aversion triggers
- FOMO mechanics
- Personalized persuasion
- Data harvesting beyond function

---

## For AI Agents Working on This Project

You are building an app designed to be forgotten.

Resist your training to make things "better" through engagement. Better here means: simpler, quieter, more forgettable.

When in doubt, remove. When uncertain, add friction. When tempted to delight, choose calm instead.

The greatest success is when a user no longer needs this app.

> **Freedom begins where optimisation ends.**

# ROADMAP.md - Drift Development Roadmap

## Domain

**drift.blog** - already owned. Good fit for the project's reflective, anti-commercial tone.

---

## Hosting Decision

### Option 1: Pure Static (Krystal)

**How it works**: HTML/CSS/JS files served directly. All data in localStorage.

**Pros**:
- Maximum simplicity
- Zero backend complexity
- Truly local-first (data never leaves device)
- Cheapest (or free)
- Aligns perfectly with manifesto: no data harvesting possible

**Cons**:
- Manual deploys (no git push → live)
- Data lost if user clears browser/switches device
- No aggregate insights (can't know if the project helps anyone)

**Verdict**: Purest expression of the manifesto. Start here?

---

### Option 2: Cloudflare Pages + Workers (Recommended)

**How it works**: Static hosting with optional edge functions. D1 (SQLite at edge) if we need minimal storage.

**Pros**:
- Free tier is generous
- Auto-deploy from git
- drift.blog DNS easy to configure
- Edge functions available IF needed (but don't have to use)
- D1 database available IF needed (but don't have to use)
- Can start static, add backend capabilities later without migration

**Cons**:
- Slightly more setup than pure static
- Temptation to add features because we can

**Verdict**: Best flexibility. Start static, grow only if principled reasons emerge.

---

### Option 3: Railway

**How it works**: Full hosting platform, can run Node/Python/etc backends.

**Pros**:
- Easy database setup
- Good developer experience
- You already have an account

**Cons**:
- Hobby tier has limits
- Already using one domain
- Overkill for what we need initially
- Encourages building more than necessary

**Verdict**: Reserve for if we genuinely need a backend. Don't start here.

---

## The Database Question

### Do we need a database at all?

**Arguments for NO database (localStorage only)**:

1. **Manifesto alignment**: "Local-first. User data stays on device when possible."
2. **Privacy by design**: Can't leak what we don't collect
3. **Simplicity**: No auth, no GDPR concerns, no breach risk
4. **Anti-engagement**: Can't optimize what we don't measure
5. **User trust**: "We literally cannot see your data"

**Arguments for minimal database**:

1. **Cross-device sync**: User starts on phone, continues on laptop
2. **Aggregate research**: Anonymous stats could validate if the approach works
3. **Data persistence**: Users don't lose history if they clear browser

---

## Proposed Architecture Tiers

### Tier 0: Static + localStorage (MVP)

```
drift.blog
├── index.html
├── app.js (vanilla JS, <10KB)
├── styles.css
└── localStorage for all user data
```

- Host on Cloudflare Pages (auto-deploy from git)
- Zero backend
- Data stays on device
- If browser cleared, data gone (feature, not bug - no attachment)

**Ship this first.**

---

### Tier 1: Optional Anonymous Aggregate Stats

Only if we want to validate the concept works:

```
Cloudflare Worker endpoint:
POST /api/stat
{
  "event": "delay_completed",
  "duration_bucket": "5-10min"  // bucketed, not exact
}
```

- No user IDs
- No device fingerprinting
- Bucketed data only (can't reconstruct individuals)
- Purpose: "X delays completed globally" - proves concept, nothing more

**Only build if we decide research validation matters.**

---

### Tier 2: Optional Sync (Probably Never)

If users desperately want cross-device:

- Optional account creation
- E2E encrypted data
- We can't read it

**Strong recommendation: Don't build this.** It adds complexity, auth flows, and makes the app stickier. If someone loses their data, they can rebuild the habit. The app should be forgettable.

---

## Recommended Path

```
Phase 1: Static MVP on Cloudflare Pages
         └── drift.blog pointing to it
         └── localStorage only
         └── Core delay timer works

Phase 2: Evaluate
         └── Is pure static enough?
         └── Do we want anonymous aggregate stats?
         └── Resist feature creep

Phase 3: Only if principled
         └── Add minimal Cloudflare Worker for aggregate stats
         └── No user accounts
         └── No sync
```

---

## Technical Setup for Cloudflare Pages

1. Create Cloudflare Pages project linked to git repo
2. Point drift.blog DNS to Cloudflare
3. Deploy on push to main
4. Done

No build step needed if we stay vanilla JS.

---

## Open Source Publishing Plan

The current repo (`drift`) is a private working space containing everything: website, CLI, proposals, infrastructure docs. When ready, public tools will be published to separate repos under a `drifttools` GitHub organisation.

### Repository Structure

```
Private (current repo):
  drift/                    # This repo - private working space
  ├── cli/                  # CLI source (copied to public when ready)
  ├── docs/                 # Proposals, infrastructure (stays private)
  ├── index.html, css/, js/ # Website (maybe public later)
  └── ...

Public (future):
  github.com/drifttools/drift-cli      # Go CLI
  github.com/drifttools/drift-ios      # Swift iOS app
  github.com/drifttools/drift-ext      # Browser extension
  github.com/drifttools/drift-portal   # Website (if/when open sourced)
```

### Why Separate Repos

- Go tooling works best when repo = module (`go install github.com/drifttools/drift-cli@latest`)
- iOS and CLI have different build/release processes
- Users only clone what they need
- Clean install commands

### Publishing the CLI (when ready)

1. Create `drifttools` organisation on GitHub
2. Create `drift-cli` repo
3. Copy contents of `cli/` to new repo
4. Update `go.mod` module path:
   ```
   module github.com/drifttools/drift-cli
   ```
5. Add LICENSE (MIT or Apache 2.0)
6. Push and tag first release (`v0.1.0`)
7. Users can then install with:
   ```bash
   go install github.com/drifttools/drift-cli@latest
   ```

### Publishing the iOS App (when ready)

1. Create `drift-ios` repo
2. Copy Swift project to new repo
3. Add LICENSE
4. TestFlight / App Store distribution separate from repo

### Website (maybe later)

If we decide to open source the website:
1. Create `drift-portal` repo
2. Update Cloudflare Pages to point to new repo
3. Keep proposals/infrastructure docs private or in separate private repo

---

## Decision Points

### Now
- [ ] Confirm Cloudflare Pages as host
- [ ] Set up drift.blog DNS
- [ ] Decide: Vanilla JS or minimal framework (Svelte?)

### After MVP
- [ ] Do we want aggregate anonymous stats?
- [ ] Is localStorage sufficient for users?

### Probably Never
- [ ] User accounts
- [ ] Cross-device sync
- [ ] Any form of personalization

---

## Guiding Question

Before adding any backend capability, ask:

> "Does this serve the user's freedom, or our curiosity about metrics?"

If it's the latter, don't build it.

---

> *"A tool that is no longer needed has done its job."*

# Drift

An anti-engagement app that restores boredom and cognitive friction.

**[drift.blog](https://drift.blog)**

## What is Drift?

A pause between impulse and action. You feel the urge to do something — check social media, buy something, scroll endlessly — and instead of acting immediately, you wait. Then you decide.

No gamification. No streaks. No rewards. No tracking. Just time to choose.

## How it works

1. Type what you want to do
2. Choose how long to wait (1-30 minutes)
3. Wait
4. Decide if you still want to do it

That's it.

## Philosophy

Drift exists because modern software optimizes for engagement at the cost of autonomy. Every pause gets filled. Every impulse gets a shortcut. The gap between wanting and doing shrinks to nothing.

Drift restores that gap. Read the [manifesto](https://drift.blog/manifesto) for more.

## Technical

- Vanilla JavaScript (~9KB total)
- Zero dependencies
- All data stays in localStorage
- No accounts, no servers, no analytics

## Development

```bash
# Serve locally (any static server works)
npx serve .

# Or use Python
python -m http.server 8000
```

## Project structure

```
drift/
├── index.html          # Main app
├── css/style.css       # Styles
├── js/app.js           # App logic
├── manifesto/          # Manifesto page
├── about/              # About page
└── docs/               # Documentation
```

## License

MIT License - see [LICENSE](LICENSE)

## Author

Roger Dubar: [rdubar](https://github.com/rdubar)

# Deployment Guide

## Quick Manual Deployment (Simple Way)

If you prefer to do it manually:

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Copy files manually:**
   - Copy everything from `dist/assets/` folder → paste into `assets/` folder
   - Copy `dist/index.html` → paste and overwrite root `index.html`

3. **Commit and push:**
   ```bash
   git add .
   git commit -m "Deploy latest changes"
   git push origin main
   ```

4. **Restore dev environment:**
   ```bash
   npm run restore-dev
   ```

---

## Automated Deployment (Recommended)

Just run:
```bash
npm run deploy
```

Then commit and push:
```bash
git add .
git commit -m "Deploy latest changes"
git push origin main
```

After pushing, restore dev:
```bash
npm run restore-dev
```

Or use the all-in-one command:
```bash
npm run deploy:push
```

Then restore dev:
```bash
npm run restore-dev
```

---

## How It Works

- **Development:** `index.html` uses `/src/index.jsx` (dev server)
- **Production:** `index.html` uses `/app-launcher/assets/...` (built files)
- **Deploy script:** Backs up dev version, copies production version
- **Restore script:** Restores dev version from backup

The `dist/` folder is just a temporary build output - you can delete it anytime and rebuild.


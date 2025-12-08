# CROSSLAYERAI Landing Page

A Next.js landing page for CROSSLAYERAI - the first persistent AI companion engine for gaming.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
```

The static output will be in the `out/` directory.

## 📦 Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages.

### Setup Steps:

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository Settings → Pages
   - Under "Build and deployment", select **GitHub Actions** as the source

3. **Automatic Deployment:**
   - Every push to `main` branch triggers automatic build and deploy
   - The workflow file is in `.github/workflows/deploy.yml`

### Custom Domain (Optional)

If using a custom domain:
1. Add a `CNAME` file in the `public/` folder with your domain
2. Configure DNS with your domain provider

### Repository Name Configuration

If your repo is NOT `username.github.io` (e.g., it's `crosslayerai-website`):
1. Uncomment and update `basePath` and `assetPrefix` in `next.config.js`:
   ```js
   basePath: '/your-repo-name',
   assetPrefix: '/your-repo-name/',
   ```

## 🎨 Customization

### Tally Form

The signup form uses Tally. To use your own form:
1. Create a form at [tally.so](https://tally.so)
2. Get the embed URL
3. Update the iframe `data-tally-src` in `src/app/page.tsx`

### Styling

- Global styles: `src/app/globals.css`
- CSS variables for colors, fonts are at the top of the file
- Fonts: Rajdhani (headings) + JetBrains Mono (code/accents)

## 📁 Project Structure

```
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Pages deployment
├── public/
│   └── .nojekyll           # Prevents Jekyll processing
├── src/
│   └── app/
│       ├── layout.tsx      # Root layout with metadata
│       ├── page.tsx        # Main landing page
│       └── globals.css     # All styles
├── next.config.js          # Next.js config (static export)
├── package.json
└── tsconfig.json
```

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** CSS (no frameworks)
- **Forms:** Tally.so embed
- **Deployment:** GitHub Pages via GitHub Actions

## 📝 License

© 2024 CrossLayerAI. All rights reserved.


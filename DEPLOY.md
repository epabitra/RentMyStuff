# Fix: White screen on GitHub Pages

If you see a **white screen** and console errors like:
- `GET https://yourname.github.io/src/main.jsx 404`
- `GET .../favicon.svg 404`

then GitHub is serving your **source code** (the repo files) instead of the **built** app.

## Fix in 3 steps

### 1. Use GitHub Actions as the Pages source

1. Open your repo on GitHub: **https://github.com/epabitra/RentMyStuff**
2. Go to **Settings** → **Pages** (left sidebar).
3. Under **Build and deployment**:
   - **Source:** choose **GitHub Actions** (not "Deploy from a branch").
4. Save (no need to pick a branch or folder).

### 2. Run the deployment workflow

1. Go to the **Actions** tab.
2. Click **Deploy to GitHub Pages** in the left sidebar.
3. Click **Run workflow** (right side), then **Run workflow** again in the dialog.
4. Wait until the workflow run is green (about 1–2 minutes).

### 3. Reload the site

1. Open **https://epabitra.github.io/RentMyStuff/**
2. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R) or open in a private window.

You should now see the RentMyStuff app instead of a white screen.

---

**Why this works:** With **Source = GitHub Actions**, GitHub serves the built files from the workflow (the `dist` folder with compiled JS/CSS). With **Source = Deploy from a branch**, it serves the raw repo (including `index.html` that points to `/src/main.jsx`), which causes the 404 and white screen.

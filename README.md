# RentMyStuff

A peer-to-peer rental platform for students. List what you own, rent what you need—all on campus. Built to save money, reduce waste, and build community.

## Features

- **Browse listings** by category (textbooks, calculators, photography, lab equipment, tech) and campus
- **List items** with price per day, description, and pickup location
- **Book items** with start/end dates (simulated payment; data stored locally)
- **My Listings** – manage availability and edit your listings
- **My Bookings** – see bookings you made or received
- **Profile** – update name and campus
- **Auth** – sign up / log in with email (no backend; stored in localStorage)

## Tech Stack

- **React 18** + **Vite**
- **React Router 6**
- **Tailwind CSS**
- **localStorage** for persistence (works on GitHub Pages and any static hosting)

---

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Host on GitHub Pages

### 1. Create a GitHub repo and push the project

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

Use the **exact repo name** you want in the URL (e.g. `rentmystuff` or `RentMyStuff`). The site will be at:

**https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/**

### 2. Enable GitHub Pages

1. In your repo go to **Settings** → **Pages**.
2. Under **Build and deployment** → **Source**, choose **GitHub Actions** (not “Deploy from a branch”).
3. Save.

### 3. Deploy

- Every push to `main` (or `master`) runs the **Deploy to GitHub Pages** workflow: it builds the app and deploys the `dist` folder.
- You can also run it manually: **Actions** → **Deploy to GitHub Pages** → **Run workflow**.

After the workflow finishes, the site is live at:

**https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/**

### 4. Custom domain (optional)

In **Settings** → **Pages**, set **Custom domain** to your domain and follow the instructions (DNS, HTTPS).

### Build for production manually

To build locally (e.g. to test or deploy elsewhere):

```bash
# Default base path /rentmystuff/ (change in vite.config.js if your repo name differs)
npm run build
```

To use a different base path (must match your repo name):

```bash
VITE_BASE_PATH=/my-repo-name/ npm run build
```

The `dist/` folder (including `404.html` for SPA routing) can be uploaded to any static host.

---

## Project structure

```
src/
  components/   Layout, Nav, ListingCard
  context/      AuthContext (current user)
  lib/          storage.js (localStorage helpers, categories, campuses), seed.js
  pages/        Home, Browse, ListingDetail, AddListing, EditListing, MyListings, MyBookings, Login, Profile
```

Data is seeded on first load with sample users and listings if none exist.

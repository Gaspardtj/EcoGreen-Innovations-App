# Ecogreen Innovations Platform - Deployment Guide

Since you are looking for **100% free hosting**, follow this strategy.

## 1. PUSH TO GITHUB
1. Create a new **Public Repository** on your GitHub account named `ecogreen-innovations`.
2. Open a terminal in the project root (`C:\Users\USER\EcoGreen-Inovation-App`) and run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Ecogreen Innovations Complete System"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/ecogreen-innovations.git
   git push -u origin main
   ```

## 2. FREE FRONTEND DEPLOYMENT (Vercel)
**Platform:** [Vercel.com](https://vercel.com/)
1. Sign in with GitHub.
2. Click **"Add New"** -> **"Project"**.
3. Import your `ecogreen-innovations` repository.
4. **Vercel will detect it as a Vite project automatically.**
5. Click **Deploy**. Your frontend will be live at `your-project.vercel.app`.

## 3. FREE BACKEND DEPLOYMENT (Render)
**Platform:** [Render.com](https://render.com/)
1. Sign in with GitHub.
2. Click **"New +"** -> **"Web Service"**.
3. Select your `ecogreen-innovations` repository.
4. Settings:
   - **Environment:** `Python`
   - **Build Command:** `pip install -r backend/requirements.txt`
   - **Start Command:** `cd backend && gunicorn ecogreen_backend.wsgi`
   - **Root Directory:** `./`
5. **Environment Variables:** Add your `SECRET_KEY`, `DEBUG=False`, etc., in the Render dashboard.

## 4. FREE DATABASE (Neon.tech)
**Platform:** [Neon.tech](https://neon.tech/)
1. Create a **Free PostgreSQL** instance.
2. Copy the **Connection String** (DATABASE_URL).
3. Paste this into your **Render.com** environment variables.

---

### NOTE ON FREE TIERS:
- **Render's Free Tier** will "sleep" after 15 minutes of inactivity. The first request after a sleep might take 30-50 seconds to load.
- **Neon.tech** is free forever for small projects like this.

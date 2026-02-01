---
description: How to deploy WinFolio to GitHub Pages
---

# Deploying to GitHub Pages

I have already configured your project for deployment! Here are the remaining steps you need to follow manually:

## 1. Create a GitHub Repository
1. Go to [github.com/new](https://github.com/new).
2. Name your repository (e.g., `winfolio`).
3. Make it **Public**.
4. Click **Create repository**.

## 2. Connect and Push Code
Run the following commands in your terminal (I can run the local git commands for you if you approve, but you need to authorize git against GitHub):

```powershell
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git push -u origin main
```

**Note**: Replace `YOUR_USERNAME` and `REPO_NAME` with your actual GitHub details.

## 3. Deploy
Once your code is on GitHub, run:

```powershell
npm run deploy
```

This will build your website and push it to a `gh-pages` branch.

## 4. Enable GitHub Pages
1. Go to your GitHub Repository > **Settings**.
2. Click **Pages** (on the left sidebar).
3. Under **Source**, ensure it is set to **Deploy from a branch**.
4. Select the **gh-pages** branch from the dropdown.
5. Click **Save**.

Your site will be live at `https://YOUR_USERNAME.github.io/REPO_NAME/`!

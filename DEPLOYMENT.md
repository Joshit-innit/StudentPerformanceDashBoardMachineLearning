# Deployment Guide

This project deploys as two services:

- Frontend: Netlify, using `student-performance-analytics`
- Backend: Render, using Docker from `Backend/Dockerfile`

## 1. Push the repo to GitHub

Commit and push the latest project files to:

```bash
git push origin main
```

## 2. Deploy the backend on Render

Use Render Blueprint or create a Web Service manually.

### Blueprint

1. Open Render.
2. Create a new Blueprint.
3. Connect this GitHub repo.
4. Render will read `render.yaml`.
5. Deploy `student-performance-backend`.

The backend health check is:

```text
/api/health
```

The backend URL will look like:

```text
https://student-performance-backend.onrender.com
```

If Render assigns a slightly different URL, use that exact URL in Netlify.

## 3. Deploy the frontend on Netlify

Connect the same GitHub repo to Netlify. The root `netlify.toml` already sets:

```toml
[build]
  base = "student-performance-analytics"
  command = "npm run build"
  publish = "dist"
```

In Netlify, add this environment variable:

```text
VITE_API_BASE_URL=https://YOUR-RENDER-BACKEND-URL.onrender.com
```

Redeploy Netlify after setting the environment variable.

## 4. Verify

Open the Netlify site and test:

- Analytics tab loads real EDA visuals.
- Predict tab returns a prediction.
- Insights tab opens the report modal.

Direct backend checks:

```bash
curl https://YOUR-RENDER-BACKEND-URL.onrender.com/api/health
```

```bash
curl -X POST https://YOUR-RENDER-BACKEND-URL.onrender.com/api/predict \
  -H "Content-Type: application/json" \
  -d '{"studyHours":25,"attendance":98,"previousScore":85,"sleepHours":8,"motivation":"Medium","internetAccess":true,"extracurriculars":false}'
```

# FitTrack AI – Frontend

A responsive fitness dashboard that lets users log workouts, track progress, and get AI-powered feedback.

## Tech Stack

- **React** + **TypeScript**
- **Vite** (frontend build tool)
- **Axios** (API calls)
- **MUI** or **Tailwind CSS** (depending on your setup)
- **React Router** (if routing is used)

## Folder Structure

```
fittrack-ai-frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Route pages (Dashboard, Log, etc.)
│   ├── api/            # Axios setup and API helpers
│   ├── types/          # TypeScript types and interfaces
│   └── App.tsx         # Root component
```

## 🚀 Setup & Run

1. **Install dependencies**

```bash
npm install
```

2. **Start the dev server**

```bash
npm run dev
```

3. **Configure environment**

Create a `.env` file:

```env
VITE_API_URL=http://localhost:8000
```

## Build

```bash
npm run build
```

## Deployment

You can deploy this frontend to:

- **Vercel**
- **Netlify**
- **GitHub Pages**
- Docker (with nginx)

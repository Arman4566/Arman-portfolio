# Arman Ahamad: Portfolio (React + Three.js)

## Run it
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs /dist
```

## Deploy on Vercel
Import the repo. Vercel detects Vite; build command `npm run build`, output `dist`.

## Where things live
- `src/data.js`: all text (projects, skills, education, certificates, links). Edit here first.
- `src/components/Terrain.jsx`: the 3D Himalayan hills and floating crystal (Three.js).
- `src/components/SkillGlobe.jsx`: the draggable 3D skill sphere.
- `src/components/Visuals.jsx`: the My Sathi phone and My Buddy flashcard.
- `src/styles.css`: colours are CSS variables at the top.
- `public/`: `profile.jpg`, `ArmanAhamadResume.pdf`, `favicon.svg`.

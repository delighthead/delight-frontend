# Delight International School Website - Copilot Instructions

## Project Overview
React + Vite + TypeScript website for **Delight International School** — an educational institution offering Early Years through Junior High programs.

## Tech Stack
- **React 19** with TypeScript
- **Vite** for build tooling
- **React Router DOM** for client-side routing
- **CSS Modules** for component-scoped styles

## Project Structure
```
src/
├── components/
│   ├── Layout/          # Header, Footer, shared layout components
│   └── UI/              # Reusable UI components (Hero, Card)
├── pages/               # Page components (one folder per route)
│   ├── Home/
│   ├── About/
│   ├── Admissions/
│   ├── Curriculum/
│   ├── Gallery/
│   ├── Contact/
│   └── Apply/
├── styles/
│   └── global.css       # Global styles and CSS reset
├── App.tsx              # Router configuration
└── main.tsx             # Entry point
public/
├── images/              # Static images
└── files/               # Downloadable files (admission forms, etc.)
```

## Page Color Themes
Each page has a unique color scheme via CSS custom properties:

| Page | Primary Colors | Theme |
|------|---------------|-------|
| Home | `--primary: #0055a5` | Blue |
| About | `--wine: #800020` | Wine/Burgundy |
| Admissions | `--blue: #003399` | Deep Blue |
| Curriculum | `--cream: #fff8e7`, `--accent: #e6b800` | Cream/Gold |
| Gallery | `--cream: #fff8e7`, `--accent: #e6b800` | Cream/Gold |
| Contact | `--wine: #800020` | Wine |
| Apply | `--wine: #800020`, `--green: #007f3b` | Wine/Green |

## Key Conventions

### Components
- Use **CSS Modules** (`ComponentName.module.css`) for styling
- Export components via `index.ts` barrel files
- Header component supports variants: `default`, `wine`, `blue`, `cream`
- Card component supports variants: `wine`, `blue`, `gold`

### Styling Patterns
- Define page-specific CSS variables at `.page` class level
- Common variables: `--light`, `--dark`, `--gray`, `--shadow`, `--transition`
- Hero sections: Use `linear-gradient()` overlay on background images
- Cards: `border-left: 5px solid var(--[accent])` with hover transform
- Fixed footer: `position: fixed; bottom: 0;` — pages add `padding-bottom: 100px`

### Routing
Routes defined in `src/App.tsx`:
- `/` → Home
- `/about` → About
- `/admissions` → Admissions
- `/curriculum` → Curriculum
- `/gallery` → Gallery
- `/contact` → Contact
- `/apply` → Apply

### Static Assets
- Images: `/images/filename.jpg` (served from `public/images/`)
- Files: `/files/filename.xlsx` (served from `public/files/`)

## Commands
```bash
npm run dev      # Start development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## When Adding New Pages
1. Create folder in `src/pages/PageName/` with:
   - `PageName.tsx` - Component
   - `PageName.module.css` - Styles
   - `index.ts` - Export
2. Add route in `src/App.tsx`
3. Update navigation in Header component if needed
4. Define unique color variables at `.page` class level

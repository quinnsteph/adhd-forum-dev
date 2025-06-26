# ADHD Forum - Development Repository

This is the development repository for the ADHD Forum project, optimized for GitHub Codespaces development.

## 🚀 Quick Start with Codespaces

1. **Create Codespace**: Click the green "Code" button → "Codespaces" → "Create codespace on main"
2. **Wait for Setup**: The devcontainer will automatically install dependencies
3. **Start Development**: Run `npm run dev` 
4. **Access Site**: The dev server will be available at the forwarded port (usually port 4321)

## 🛠️ Development Setup

### Automatic Setup (Codespaces)
The `.devcontainer/devcontainer.json` automatically configures:
- Node.js 20 LTS
- Required VS Code extensions (Astro, Tailwind CSS, ESLint, etc.)
- Port forwarding for dev server (4321)
- Auto-installation of dependencies

### Manual Setup (Local)
If you need to run locally:
```bash
npm install
npm run dev
```

## 📁 Project Structure

```
src/
├── components/          # React components (islands)
│   ├── Auth/           # Authentication forms
│   ├── Layout/         # Header, layout components  
│   ├── Thread/         # Thread cards, comments
│   ├── Sidebar/        # Navigation sidebar
│   └── Layout.astro    # Main Astro layout
├── pages/              # File-based routing
├── contexts/           # React Context (Auth)
├── data/               # Mock data
├── types/              # TypeScript definitions
└── utils/              # Utility functions
```

## 🎨 Technology Stack

- **Framework**: Astro 5.7.14 (SSG with React islands)
- **React**: 18.3.1 for interactive components
- **Styling**: Tailwind CSS 3.4.1 with ADHD-friendly design
- **TypeScript**: 5.5.3 for type safety
- **Icons**: Lucide React

## 🔧 Available Scripts

```bash
npm run dev      # Start development server (localhost:4321)
npm run build    # Production build
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## 🎯 Key Features

- **ADHD-Friendly Design**: Calm colors, clear hierarchy, focus mode
- **Authentication**: Simulated auth with local storage
- **Forum Features**: Public/private threads, comments, topics
- **Responsive**: Mobile-first design
- **Accessibility**: ADHD-specific UX considerations

## 🔍 Development Notes

- **No Analytics**: All tracking code has been removed
- **Mock Data**: Uses local storage for simulated backend
- **Islands Architecture**: React components hydrate on-demand
- **Focus Mode**: Distraction-free reading mode

## 🐛 Troubleshooting

- **Slow startup**: Initial Astro startup can take 10-15 seconds
- **Port conflicts**: Dev server runs on port 4321 by default
- **Tailwind**: Ensure `.astro` files are included in `tailwind.config.js`

## 📋 Contributing

1. Create feature branch from `main`
2. Make changes using Codespaces
3. Test thoroughly with `npm run dev`
4. Run `npm run lint` before committing
5. Create pull request

This repository is optimized for consistent development across different environments using GitHub Codespaces.
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository as well as inscructions

1. First think through the problem, read the codebase for relevant files, and write a plan to projectplan.md.
2. The plan should have a list of todo items that you can check off as you complete them
3. Before you begin working, check in with me and I will verify the plan.
4. Then, begin working on the todo items, marking them as complete as you go.
5. Please every step of the way just give me a high level explanation of what changes you made
6. Make every task and code change you do as simple as possible. We want to avoid making any massive or complex changes. Every change should impact as little code as possible. Everything is about simplicity.
7. Finally, add a review section to the projectplan.md file with a summary of the changes you made and any other relevant information.


## Project Overview

ADHD Forum is a React-based community platform designed specifically for ADHD discussions and support. The application features public and members-only content areas with ADHD-friendly design patterns.

## Technology Stack

- **Frontend**: React 18.3.1 + TypeScript 5.5.3
- **Build Tool**: Vite 5.4.2
- **Routing**: React Router DOM 6.26.0
- **Styling**: Tailwind CSS 3.4.1 with custom ADHD-friendly color palette
- **Icons**: Lucide React 0.344.0
- **Linting**: ESLint 9.9.1 with TypeScript configuration

## Development Commands

```bash
npm run dev      # Start development server (localhost:5173)
npm run build    # Production build
npm run lint     # Run ESLint across codebase
npm run preview  # Preview production build locally
```

## Project Architecture

### Directory Structure
```
src/
├── components/          # Reusable UI components
│   ├── Forum/          # Forum-specific components
│   ├── Layout/         # Layout components (Header, etc.)
│   ├── Sidebar/        # Sidebar components
│   └── Thread/         # Thread-related components
├── pages/              # Route-based page components
│   ├── Auth/           # Login/Signup pages
│   └── [other pages]   # Home, MembersArea, ThreadView, etc.
├── data/               # Mock data for development
├── types/              # TypeScript type definitions
└── [config files]
```

### Key Architectural Patterns

1. **Component Organization**: Components grouped by feature/domain (Forum, Thread, Layout)
2. **Page-Based Routing**: Each route corresponds to a page component
3. **Props Interface Pattern**: All components have typed interfaces
4. **Mock Data Development**: Centralized mock data in `src/data/mockData.ts`
5. **Conditional Authentication**: Content visibility based on auth state

## Core Data Models

Located in `src/types/index.ts`:

- **User**: Profile with ADHD-specific fields (`adhdType`, role, verification status)
- **Thread**: Forum posts with public/private visibility and category system
- **Comment**: Nested comments with reply support
- **Topic**: Forum topics with color coding and access control
- **ForumSection**: Main forum sections with thread counts

## ADHD-Specific Features

- **Focus Mode**: Sidebar toggle for distraction-free reading
- **ADHD Type Display**: User profiles show specific ADHD subtypes
- **Accessibility**: Clear visual hierarchy, status indicators, role badges
- **Supportive Design**: Warm color palette, encouraging messaging
- **Content Access**: Public vs members-only content with clear indicators

## Custom Tailwind Configuration

Extended with:
- **ADHD-friendly colors**: Primary (blue), secondary (purple), accent (teal), coral, warm (yellow)
- **Custom fonts**: Inter (sans), Nunito (display)
- **Extended spacing**: Additional 18, 88 values
- **Enhanced border radius**: xl, 2xl options

## Development Patterns

### Component Structure
```typescript
interface ComponentProps {
  // Always define props interface
  requiredProp: string;
  optionalProp?: boolean;
}

export default function Component({ requiredProp, optionalProp = false }: ComponentProps) {
  // Component implementation
}
```

### Authentication Flow
- Auth state managed in `App.tsx` and passed as props
- Conditional rendering based on `isAuthenticated` prop
- Login/signup forms in `src/pages/Auth/`

### Styling Conventions
- Utility-first Tailwind approach
- Consistent hover states and transitions
- Mobile-first responsive design
- Focus on accessibility and readability

## Testing & Quality

- **Linting**: ESLint with React and TypeScript rules
- **Type Safety**: Strict TypeScript configuration
- **Code Standards**: Consistent formatting and naming conventions

## Current Limitations

- **No Backend**: Uses mock data only
- **Simulated Auth**: Authentication state is not persistent
- **Static Content**: No real-time updates or data persistence

## Common Tasks

### Adding New Components
1. Create component in appropriate `src/components/` subdirectory
2. Define TypeScript interface for props
3. Follow existing patterns for styling and structure
4. Import and use Lucide icons for consistency

### Adding New Pages
1. Create page component in `src/pages/`
2. Add route to `App.tsx` with React Router
3. Ensure proper authentication checks if needed
4. Follow responsive design patterns

### Modifying Data Models
1. Update interfaces in `src/types/index.ts`
2. Update corresponding mock data in `src/data/mockData.ts`
3. Update components that use the modified types

### Working with Mock Data
- All mock data centralized in `src/data/mockData.ts`
- Includes realistic ADHD community content and user profiles
- Export functions provide filtered data based on authentication state
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository as well as instructions

1. First think through the problem, read the codebase for relevant files, and write a plan to projectplan.md.
2. The plan should have a list of todo items that you can check off as you complete them
3. Before you begin working, check in with me and I will verify the plan.
4. Then, begin working on the todo items, marking them as complete as you go.
5. Please every step of the way just give me a high level explanation of what changes you made
6. Make every task and code change you do as simple as possible. We want to avoid making any massive or complex changes. Every change should impact as little code as possible. Everything is about simplicity.
7. Finally, add a review section to the projectplan.md file with a summary of the changes you made and any other relevant information.


## Project Overview

ADHD Forum is an Astro-based community platform designed specifically for ADHD discussions and support. The application features public and members-only content areas with ADHD-friendly design patterns and uses React components as islands for interactivity.

## Technology Stack

- **Framework**: Astro 5.7.14 with React integration
- **React**: React 18.3.1 + TypeScript 5.5.3 (for interactive components)
- **Styling**: Tailwind CSS 3.4.1 with custom ADHD-friendly color palette
- **Icons**: Lucide React 0.344.0 (in React islands)
- **Linting**: ESLint 9.9.1 with TypeScript configuration

## Development Commands

```bash
npm run dev      # Start development server (localhost:4321)
npm run build    # Production build
npm run lint     # Run ESLint across codebase
npm run preview  # Preview production build locally
```

## Project Architecture

### Directory Structure
```
src/
├── components/          # Reusable UI components
│   ├── Auth/           # Authentication forms (React islands)
│   ├── Forum/          # Forum-specific components
│   ├── Layout/         # Layout components (Header, etc.)
│   ├── Sidebar/        # Sidebar components
│   ├── Thread/         # Thread-related components
│   └── Layout.astro    # Main layout component
├── pages/              # File-based routing (Astro pages)
│   ├── index.astro     # Home page
│   ├── members.astro   # Members area
│   ├── login.astro     # Login page
│   └── signup.astro    # Signup page
├── contexts/           # React Context providers (AuthContext)
├── data/               # Mock data for development
├── types/              # TypeScript type definitions
├── utils/              # Utility functions (SSR-safe)
└── [config files]
```

### Key Architectural Patterns

1. **Astro + React Islands**: Static pages with interactive React components
2. **File-Based Routing**: Astro's built-in routing system
3. **SSR-Safe Storage**: localStorage checks for `typeof window !== 'undefined'`
4. **Component Islands**: React components hydrated on demand with `client:load`
5. **Shared State**: Authentication handled through React Context in islands

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
- Auth state managed through React Context (`AuthContext`)
- Context provider wraps the main app component
- Components access auth state via `useAuth()` hook
- Login/signup forms handle authentication through context methods

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
- **Simulated Auth**: Authentication state is not persistent across browser sessions
- **Static Content**: No real-time updates or data persistence
- **No Analytics**: Analytics tracking has been removed from the codebase

## Common Tasks

### Adding New Components
1. Create component in appropriate `src/components/` subdirectory
2. Define TypeScript interface for props
3. Follow existing patterns for styling and structure
4. Import and use Lucide icons for consistency

### Adding New Pages
1. Create `.astro` page component in `src/pages/`
2. Use Astro's file-based routing system
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
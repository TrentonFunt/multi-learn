# AGENTS.md

> **CRITICAL**: This file defines how all future AI agents must behave when working in this repository.
> Do NOT modify this file unless explicitly instructed by the project owner.

---

## 1. Project Overview

**MultiLearn** is a comprehensive, production-ready e-learning platform (LMS) built with React, TypeScript, and Tailwind CSS. It features Firebase authentication, role-based access control, course management, instructor dashboards, and admin capabilities.

### Core Concept: The E-Learning Platform

MultiLearn provides a complete learning management experience with:
- **Three User Roles**: Students, Instructors (with approval workflow), and Admins
- **Course Management**: Full CRUD with modules, lessons, and video content
- **Authentication**: Firebase Auth with email verification and password reset
- **Responsive Design**: Mobile-first approach with dark/light mode theming

### Architecture

- **Frontend**: React 19 with TypeScript (strict mode)
- **Routing**: React Router DOM v7 with `BrowserRouter` and lazy-loaded routes
- **Styling**: Tailwind CSS v4 with `@tailwindcss/vite` plugin
- **State Management**: Zustand for global state, React Context for cross-cutting concerns
- **Data Fetching**: TanStack React Query for server state
- **Authentication**: Firebase Auth + Firestore for user data
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Build Tool**: Vite v7 for fast development and optimized production builds

### Design Philosophy

**"Professional & Accessible"** – Every feature should be intuitive for students while providing powerful tools for instructors and admins.

#### Good Practices (DO THIS):
- Smooth page transitions with Framer Motion
- Skeleton loaders during data fetching
- Toast notifications for user feedback
- Confirmation modals for destructive actions
- Clear visual hierarchy with the orange/neutral color palette
- Responsive design that works on all devices

#### Bad Practices (AVOID):
- Blocking UI during async operations without feedback
- Layout shifts during page loads
- Inconsistent spacing or typography
- Missing loading states or error handling
- Breaking changes to authentication flow
- Hardcoded strings (use constants or data files)

### User Roles & Permissions

**Students** (Default):
- Browse and search courses
- Enroll in courses and track progress
- Save favorites and manage profile
- Comment on courses and blog posts

**Instructors** (Requires Admin Approval):
- All student capabilities
- Create, edit, and publish courses
- Manage course modules and lessons
- View student analytics and revenue

**Admins**:
- All instructor capabilities
- User management (CRUD)
- Instructor approval/rejection
- Platform settings and analytics

### Performance Rules (MANDATORY):
- **Lazy load routes**: All pages except Home use `React.lazy()`
- **Code splitting**: Heavy components loaded on demand
- **No layout shifts**: Use skeleton loaders and fixed dimensions
- **Optimized images**: Use `LazyImage` component with loading="lazy"
- **Debounced inputs**: Search and filter inputs use debouncing
- **PWA support**: Service worker for offline functionality

### Accessibility Non-Negotiables:
- Keyboard navigation works for all interactive elements
- Visible focus states with custom focus rings
- Color contrast passes WCAG AA
- Screen readers supported with ARIA attributes
- Form validation with clear error messages
- Skip links and semantic HTML structure

---

## 2. Tech Stack & Tools

**Required technologies** (use ONLY these unless explicitly approved):

- **React** 19+ with TypeScript (strict mode)
- **Vite** 7+ for bundling and dev server
- **React Router DOM** 7+ for client-side routing
- **Tailwind CSS** 4+ with `@tailwindcss/vite` plugin
- **Zustand** 5+ for global state management
- **TanStack React Query** 5+ for server state
- **Firebase** 12+ (Auth, Firestore)
- **Framer Motion** 12+ for animations
- **Lucide React** for icons
- **Node.js** 18+ / npm 10+

**Do NOT add**:
- Redux or MobX (Zustand is sufficient)
- Additional CSS frameworks (Tailwind is sufficient)
- Component libraries like Material-UI or Chakra (custom components exist)
- Additional animation libraries (Framer Motion handles all needs)
- Alternative authentication providers (Firebase is standard)
- CSS-in-JS solutions (Tailwind is sufficient)

---

## 3. Code Style & Conventions

### TypeScript

- **Strict mode enabled**: All TypeScript strict options active
- **No `any` type** unless absolutely unavoidable (document why in comments)
- **Define interfaces/types** for all data structures in `src/types/index.ts`
- **Export types explicitly**: `export interface CourseProps { ... }`
- **Use type imports**: `import type { Course } from '../types'`

### Naming Conventions

- **Components**: PascalCase (e.g., `CourseCard.tsx`, `FilterSidebar.tsx`)
- **Pages**: PascalCase in `src/pages/` (e.g., `CourseSingle.tsx`, `Admin.tsx`)
- **Hooks**: camelCase prefixed with `use` (e.g., `useAuth.ts`, `useDebounce.ts`)
- **Stores**: camelCase with `Store` suffix (e.g., `authStore.ts`, `courseStore.ts`)
- **Contexts**: PascalCase with `Context` suffix (e.g., `AuthContext.tsx`)
- **Utilities**: camelCase (e.g., `validation.ts`, `authErrors.ts`)
- **Data files**: camelCase with `Data` suffix (e.g., `courseData.ts`, `blogData.ts`)
- **Routes/paths**: kebab-case (e.g., `/courses/:id`, `/email-verification`)
- **Constants**: UPPER_SNAKE_CASE for true constants
- **CSS classes**: Tailwind defaults only; no custom class names

### Component Structure

```typescript
// ✓ GOOD - React.FC with explicit props interface
interface CourseCardProps {
  course: Course;
  onEnroll?: (courseId: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onEnroll }) => {
  return <div>...</div>
};

export default CourseCard;

// ✓ ALSO ACCEPTABLE - Function component with props
export function CourseCard({ course, onEnroll }: CourseCardProps) {
  return <div>...</div>
}
```

### Component Guidelines

- **Max ~300 lines per component** (extract logic/sub-components if larger)
- **One component per file** (related sub-components can be in same file if small)
- **Default exports for pages**, named exports for reusable components
- **Props interfaces defined above component**
- **Keep components focused**: One primary responsibility per component

### Styling Rules

- **Use Tailwind classes exclusively** in JSX
- **No inline styles** (except dynamic values that must be computed)
- **No magic numbers**: All spacing, sizes, colors from Tailwind scale or CSS variables
- **Group Tailwind classes logically**:
  ```typescript
  // ✓ GOOD - Grouped by: layout → spacing → sizing → typography → colors → effects → states
  <div className="flex items-center justify-between gap-4 p-6 w-full text-lg font-medium text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
  
  // ✗ AVOID - Random order
  <div className="shadow-md text-lg flex bg-white p-6 hover:shadow-lg items-center gap-4 rounded-lg">
  ```
- **Color palette**: Use design system colors (orange primary, neutral grays)
- **Dark mode**: Always include `dark:` variants for colors
- **Responsive design**: Use Tailwind breakpoints (`sm:`, `md:`, `lg:`, `xl:`)

### DRY & Composition

- **Extract repeated patterns** into reusable components in `src/components/ui/`
- **Use existing UI components**: Button, Input, Textarea, Modal, etc.
- **Avoid prop drilling**: Use Context for deeply nested state (>3 levels)
- **Colocate animations** with the component they animate
- **Share logic via custom hooks** in `src/hooks/`

---

## 4. Commands & Build Steps

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start dev server (runs on http://localhost:5173)
npm run dev
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Linting & Type Checking

```bash
# ESLint
npm run lint

# TypeScript type check (via build)
npm run build
```

### Environment Variables

Required in `.env` file (never commit):
```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

---

## 5. Architecture & Design Patterns

### Directory Structure

```
src/
├── components/
│   ├── admin/            # Admin dashboard components
│   ├── auth/             # Authentication components (ProtectedRoute)
│   ├── blog/             # Blog-related components
│   ├── contact/          # Contact page components
│   ├── course/           # Course detail components
│   ├── courses/          # Course listing components
│   ├── home/             # Home page components
│   ├── layout/           # Layout components (Header, Footer, Layout)
│   └── ui/               # Reusable UI components (Button, Input, Modal, etc.)
├── config/
│   └── firebase.ts       # Firebase configuration
├── contexts/
│   ├── AuthContext.tsx   # Authentication state & methods
│   ├── ThemeContext.tsx  # Dark/light mode theming
│   ├── LoadingContext.tsx # Global loading states
│   └── ToastContext.tsx  # Toast notification system
├── data/
│   ├── courseData.ts     # Course mock data & types
│   └── blogData.ts       # Blog mock data & types
├── hooks/
│   ├── useAuth.ts        # Authentication hook
│   ├── useDebounce.ts    # Debounce utility hook
│   ├── useScrollAnimation.ts
│   ├── useScrollToTop.ts
│   └── useTheme.ts       # Theme hook
├── pages/                # Page-level components (route targets)
├── store/
│   ├── authStore.ts      # Zustand auth store
│   ├── courseStore.ts    # Zustand course store
│   ├── enrollmentStore.ts
│   └── favoritesStore.ts
├── types/
│   └── index.ts          # Shared TypeScript types
├── utils/
│   ├── accessibility.ts  # A11y utilities
│   ├── authErrors.ts     # Auth error message mapping
│   ├── validation.ts     # Form validation utilities
│   └── passwordValidation.ts
├── App.tsx               # Router configuration
├── main.tsx              # App entry point
└── index.css             # Global styles & Tailwind imports
```

### Page Components

Pages live in `src/pages/` and are lazy-loaded in `App.tsx`:
- `Home.tsx` → `/` (loaded immediately, not lazy)
- `Courses.tsx` → `/courses`
- `CourseSingle.tsx` → `/courses/:id` (protected)
- `Blog.tsx` → `/blog`
- `BlogSingle.tsx` → `/blog/:id`
- `Contact.tsx` → `/contact`
- `Login.tsx` → `/login`
- `Register.tsx` → `/register`
- `Account.tsx` → `/account` (protected)
- `Favorites.tsx` → `/favorites` (protected)
- `Admin.tsx` → `/admin` (protected, admin only)
- `InstructorDashboard.tsx` → `/instructor` (protected, approved instructors only)

### Protected Routes

Use `ProtectedRoute` wrapper for authenticated routes:
```typescript
<Route 
  path="/account" 
  element={
    <ProtectedRoute>
      <Account />
    </ProtectedRoute>
  } 
/>

// Admin-only route
<Route 
  path="/admin" 
  element={
    <ProtectedRoute requireAdmin={true}>
      <Admin />
    </ProtectedRoute>
  } 
/>
```

### State Management Patterns

1. **React Context** for cross-cutting concerns:
   - `AuthContext` - User authentication state
   - `ThemeContext` - Dark/light mode
   - `ToastContext` - Notifications
   - `LoadingContext` - Global loading states

2. **Zustand Stores** for domain state:
   - `courseStore` - Course data, filters, sorting
   - `authStore` - Auth actions (backup to Context)
   - `enrollmentStore` - User enrollments
   - `favoritesStore` - User favorites

3. **Local State** for component-specific state:
   - Form inputs
   - UI toggles (modals, dropdowns)
   - Temporary selections

### Data Flow Patterns

```typescript
// ✓ GOOD - Use hooks for data access
const { user, isAuthenticated, signOut } = useAuth();
const { addToast } = useToast();

// ✓ GOOD - Use Zustand for global state
const { courses, filters, setFilters } = useCourseStore();

// ✓ GOOD - Colocate related state
const [isOpen, setIsOpen] = useState(false);
const [selectedItem, setSelectedItem] = useState<Item | null>(null);
```

---

## 6. Firebase Integration

### Authentication

```typescript
// Use AuthContext for all auth operations
const { 
  user,
  loading,
  signIn,
  signUp,
  signInWithGoogle,
  signOut,
  resetPassword,
  sendEmailVerification,
  updateUserProfile,
  isAdmin,
  isAuthenticated,
  isInstructor,
  isInstructorVerified
} = useAuth();
```

### Firestore Data Model

**Users Collection** (`users/{uid}`):
```typescript
{
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  role: 'user' | 'instructor' | 'admin';
  createdAt: Timestamp;
  lastLoginAt: Timestamp;
  // Instructor fields (if role === 'instructor')
  instructorVerificationStatus?: 'pending' | 'approved' | 'rejected';
  instructorBio?: string;
  instructorSpecialties?: string[];
  // ... more instructor fields
}
```

### Security Rules

- Users can only read/write their own document
- Admins have full read/write access
- Course data is publicly readable, instructor-writable
- Enrollments are user-specific

---

## 7. Testing & Quality Guidelines

### Not Yet Fully Implemented

Tests are not currently comprehensive, but follow these principles:

### Unit Tests (when added)

- **Location**: Colocate with source (e.g., `Button.test.tsx` next to `Button.tsx`)
- **Framework**: Vitest + React Testing Library (recommended)
- **Coverage**: Aim for >80% on utilities and critical components
- **Focus**: Test behavior, not implementation

### Performance & Accessibility

- **Lighthouse scores**: Aim for 90+ on all metrics
- **Mobile responsiveness**: Test on actual devices or DevTools emulation
- **Accessibility**:
  - Semantic HTML (`<button>`, `<nav>`, `<main>`, `<article>`)
  - ARIA labels for icon buttons and complex widgets
  - Keyboard navigation (Tab, Enter, Escape, Arrow keys)
  - Color contrast: WCAG AA minimum
  - Focus management in modals
- **Bundle size**: Monitor and avoid unnecessary dependencies
- **Core Web Vitals**: LCP, FID, CLS should be green

### Code Quality Checklist

- No console errors or warnings in production
- No unused imports or variables
- No TypeScript errors or `any` types
- All async operations have loading/error states
- All forms have validation and error feedback
- All destructive actions have confirmation

---

## 8. Styling Best Practices (MANDATORY)

All styling decisions must follow these rules:

### Tailwind Usage

- **Prefer utility classes** over custom CSS
- **Use design system values**: spacing, colors, typography from Tailwind scale
- **No arbitrary values** (e.g., `mt-[37px]`) unless absolutely necessary
- **Group classes logically**: layout → spacing → sizing → typography → colors → effects → states
- **Dark mode support**: Always include `dark:` variants

### Color Palette (from DESIGN_SYSTEM.md)

```css
/* Primary */
--primary: #FF7820;      /* Orange - buttons, links, accents */
--primary-hover: #FFAB2D; /* Lighter orange */
--primary-pressed: #F8620E; /* Darker orange */

/* Neutrals */
--black: #000000;
--white: #FFFFFF;
--dark-grey: #555555;
--grey: #909090;
--light-grey: #FAFAFA;

/* Status */
--info: #2580D5;
--success: #558E24;
--warning: #FEAEAE;
--danger: #F31A1A;
```

### Typography

- **Headings**: Font family `Exo`, weight 600 (SemiBold)
- **Body text**: Font family `Jost`, weight 400 (Regular) or 500 (Medium)
- Use Tailwind's font-size utilities (`text-sm`, `text-base`, `text-lg`, etc.)

### Animations

- **Subtle and purposeful**: No excessive motion
- **Respect reduced motion**: Use `motion-reduce:` variants
- **Consistent timing**: Use Framer Motion's spring or easeOut
- **Colocate with component**: Keep animation code with the component

### Responsive Design

- **Mobile-first**: Start with mobile styles, add breakpoint overrides
- **Breakpoints**: `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px)
- **Test all breakpoints**: Ensure layouts work at all sizes

---

## 9. Function Best Practices

All functions must follow these rules:

- **Single responsibility**: Functions should do ONE thing
- **Small and composable**: Prefer small functions that compose
- **Descriptive names**: Use verbs (`getCourseById`, `formatPrice`, `validateEmail`)
- **No complex inline logic** in JSX: Extract to functions or variables
- **Memoization only when justified**: `useMemo`, `useCallback` for expensive operations
- **Error handling**: Always handle async errors with try/catch
- **Type safety**: All parameters and return types should be typed

```typescript
// ✓ GOOD
const formatPrice = (price: number): string => {
  return price === 0 ? 'Free' : `$${price.toFixed(2)}`;
};

// ✗ AVOID
const x = (p) => p === 0 ? 'Free' : '$' + p;
```

---

## 10. Naming Conventions (STRICT)

### Files & Folders

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `CourseCard.tsx` |
| Pages | PascalCase | `CourseSingle.tsx` |
| Hooks | camelCase with `use` prefix | `useDebounce.ts` |
| Stores | camelCase with `Store` suffix | `courseStore.ts` |
| Contexts | PascalCase with `Context` suffix | `AuthContext.tsx` |
| Utilities | camelCase | `validation.ts` |
| Types | PascalCase (interfaces/types) | `Course`, `UserRole` |

### Variables & Functions

| Type | Convention | Example |
|------|------------|---------|
| Variables | camelCase | `courseList`, `selectedId` |
| Functions | camelCase with verb | `getCourse`, `handleSubmit` |
| Constants | UPPER_SNAKE_CASE | `MAX_FILE_SIZE`, `API_URL` |
| Booleans | `is`/`has`/`should` prefix | `isLoading`, `hasError` |
| Event handlers | `handle` + event | `handleClick`, `handleSubmit` |
| Callbacks | `on` + event | `onClick`, `onSubmit` |

### Routes

| Route | Component | Path |
|-------|-----------|------|
| Home | `Home.tsx` | `/` |
| Courses | `Courses.tsx` | `/courses` |
| Course Detail | `CourseSingle.tsx` | `/courses/:id` |
| Admin | `Admin.tsx` | `/admin` |

---

## 11. React-Specific Best Practices

### Component Patterns

- **Functional components only**: No class components
- **Avoid prop drilling**: Use Context for >3 levels deep
- **Composition over configuration**: Prefer children/slots over many props
- **Keep JSX readable**: Extract complex logic to variables or sub-components

### State Management

- **Local state first**: useState for component-specific state
- **Lift state up**: When siblings need shared state
- **Context for cross-cutting**: Auth, theme, toasts
- **Zustand for domain**: Courses, enrollments, favorites

### Performance

- **Lazy load routes**: Use `React.lazy()` for page components
- **Memoize expensive renders**: `React.memo()` for list items
- **Debounce inputs**: Use `useDebounce` for search/filter
- **Virtualize long lists**: For lists with 100+ items

### Hooks Rules

- **Call at top level**: Never inside conditions or loops
- **Custom hooks for reusable logic**: Extract shared stateful logic
- **Cleanup effects**: Return cleanup function from useEffect
- **Dependencies array**: Include all dependencies, use ESLint rule

---

## 12. Accessibility & UX Rules

### Interactive Elements

- **Buttons for actions**: `<button>` for clicks that do things
- **Links for navigation**: `<Link>` or `<a>` for page navigation
- **Focus management**: Trap focus in modals, restore on close
- **Visible focus states**: Custom focus rings on all interactive elements

### Forms

- **Labels for all inputs**: Either visible or sr-only
- **Error messages**: Clear, specific, associated with input
- **Required indicators**: Visual and aria-required
- **Submit feedback**: Loading state, success/error messages

### Feedback

- **Loading states**: Skeleton loaders or spinners
- **Error states**: Clear error messages with retry options
- **Success states**: Toast notifications for completed actions
- **Confirmation**: Modal for destructive actions

### ARIA

- **Live regions**: For dynamic content updates
- **Roles**: Appropriate roles for custom widgets
- **States**: aria-expanded, aria-selected, etc.
- **Labels**: aria-label for icon buttons

---

## 13. Mandatory Pre-Build Code Review (NON-NEGOTIABLE)

Before any build step, major change, refactor, or new feature implementation, a full review of the existing codebase is REQUIRED.

### Review Checklist

- [ ] Scan full folder structure for context
- [ ] Review related files that may be affected
- [ ] Check for duplicated logic that could be reused
- [ ] Identify inconsistencies with existing patterns
- [ ] Verify alignment with this AGENTS.md file
- [ ] Confirm Firebase security implications (if applicable)
- [ ] Check for missing TypeScript types

### Rules

- **Do NOT add features** without understanding current implementation
- **Do NOT refactor unrelated code** unless explicitly instructed
- **Do NOT modify core configs** (package.json, vite.config.ts, tsconfig.json) without approval
- **If issues found**: List clearly, explain impact, propose fixes before implementing
- **Every change** should leave codebase clearer and more consistent

**Skipping this review is a violation of project rules.**

---

## 14. Documentation Requirements (MANDATORY)

### Using Up-to-Date Documentation

When implementing features or fixing issues, AI agents MUST:

1. **Verify library versions** in `package.json` before using API features
2. **Check official documentation** for current syntax and best practices
3. **Use current APIs**:
   - React 19 features (use, Actions, etc.)
   - React Router v7 APIs
   - Tailwind CSS v4 syntax
   - Firebase v12 methods
   - Zustand v5 patterns

### Documentation Sources

| Library | Documentation URL |
|---------|-------------------|
| React | https://react.dev |
| React Router | https://reactrouter.com |
| Tailwind CSS | https://tailwindcss.com |
| Firebase | https://firebase.google.com/docs |
| Zustand | https://zustand-demo.pmnd.rs |
| Framer Motion | https://www.framer.com/motion |
| TanStack Query | https://tanstack.com/query |
| Lucide Icons | https://lucide.dev |

### Version-Specific Notes

- **React 19**: Use new hooks like `use()`, async components where appropriate
- **React Router v7**: Use data APIs, loaders, actions when beneficial
- **Tailwind v4**: New color syntax, container queries, @theme support
- **Firebase v12**: Modular SDK imports, latest auth methods

### When Unsure

- **Fetch current docs** before implementing
- **Check package version** in package.json
- **Test locally** before committing
- **Ask for clarification** if documentation is ambiguous

---

## 15. Common Patterns & Examples

### Adding a New Page

1. Create component in `src/pages/NewPage.tsx`
2. Add lazy import in `src/App.tsx`:
   ```typescript
   const NewPage = React.lazy(() => import('./pages/NewPage'));
   ```
3. Add route in `App.tsx`:
   ```typescript
   <Route path="/new-page" element={
     <Suspense fallback={<PageCardSkeleton />}>
       <NewPage />
     </Suspense>
   } />
   ```
4. Add navigation link in Header if needed

### Adding a New Component

1. Create `src/components/[category]/ComponentName.tsx`
2. Define TypeScript interface for props
3. Use existing UI components from `src/components/ui/`
4. Add dark mode support
5. Ensure accessibility (keyboard nav, ARIA)

### Adding a New Store

```typescript
// src/store/newStore.ts
import { create } from 'zustand';

interface NewState {
  data: SomeType[];
  isLoading: boolean;
  error: string | null;
  
  fetchData: () => Promise<void>;
  setData: (data: SomeType[]) => void;
  clearError: () => void;
}

export const useNewStore = create<NewState>((set, get) => ({
  data: [],
  isLoading: false,
  error: null,
  
  fetchData: async () => {
    set({ isLoading: true, error: null });
    try {
      // API call
      set({ data: result, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  setData: (data) => set({ data }),
  clearError: () => set({ error: null }),
}));
```

### Using Toast Notifications

```typescript
const { addToast } = useToast();

// Success
addToast('Course enrolled successfully!', 'success');

// Error
addToast('Failed to enroll. Please try again.', 'error');

// Info
addToast('Your progress has been saved.', 'info');
```

### Using Confirmation Modal

```typescript
const [showConfirm, setShowConfirm] = useState(false);

<ConfirmationModal
  isOpen={showConfirm}
  onClose={() => setShowConfirm(false)}
  onConfirm={handleDelete}
  title="Delete Course"
  message="Are you sure you want to delete this course? This action cannot be undone."
  confirmText="Delete"
  confirmVariant="danger"
/>
```

### Framer Motion Animations

```typescript
import { motion } from 'framer-motion';

// Page entrance
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>

// Staggered list
<motion.ul>
  {items.map((item, i) => (
    <motion.li
      key={item.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: i * 0.1 }}
    >
      {item.name}
    </motion.li>
  ))}
</motion.ul>
```

---

## 16. Summary Checklist for Agents

Before submitting changes:

- [ ] **TypeScript**: All code is TypeScript (no `any` types)
- [ ] **Naming**: Components PascalCase, functions camelCase, constants UPPER_SNAKE
- [ ] **Imports**: No unused imports, organized logically
- [ ] **Styling**: Tailwind only, no inline styles, dark mode supported
- [ ] **Responsiveness**: Works on mobile, tablet, desktop
- [ ] **Accessibility**: Keyboard nav, ARIA labels, semantic HTML
- [ ] **Error handling**: Async operations have try/catch, user feedback
- [ ] **Loading states**: Skeleton or spinner during data fetching
- [ ] **Types defined**: Props interfaces, function return types
- [ ] **Component size**: Under ~300 lines (extract if larger)
- [ ] **Documentation checked**: Using current library APIs
- [ ] **Local test**: `npm run dev` runs without errors
- [ ] **Console clean**: No errors or warnings in browser
- [ ] **Security**: No secrets in code, proper auth checks

---

## 17. Boundaries & Safety

### DO NOT MODIFY (without explicit approval)

- `package.json`, `vite.config.ts`, `tsconfig.json`
- `src/config/firebase.ts` (security sensitive)
- `AGENTS.md` (this file)
- Core authentication flow in `AuthContext.tsx`
- Protected route logic in `ProtectedRoute.tsx`

### DO NOT COMMIT

- `.env` files or any secrets/API keys
- `node_modules/`, `dist/`, `.vite/`
- IDE-specific files (`.vscode/settings.json`, `.idea/`)
- Large binary files or videos

### Git Workflow

- **Commit messages**: `feat:`, `fix:`, `docs:`, `refactor:`, `style:`, `test:`
- **Atomic commits**: One logical change per commit
- **Test before push**: `npm run dev` and `npm run build` must pass

---

**These rules are mandatory and must be followed by any AI agent or human contributor unless explicitly overridden by the project owner.**

---

**Last Updated**: January 2026  
**Version**: 1.0  
**Project**: MultiLearn E-Learning Platform

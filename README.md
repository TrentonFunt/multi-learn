# MultiLearn - E-Learning Platform

A modern, responsive e-learning platform built with React, TypeScript, and Tailwind CSS. Features Firebase authentication, user management, course enrollment, admin dashboard, and a comprehensive design system with dark/light mode theming.

## 🚀 Features

### 📱 Pages & Navigation
- **Home Page** - Hero section, featured courses, categories, statistics, student feedback, latest articles
- **Course Listing** - Browse and filter courses with advanced search functionality
- **Course Single** - Detailed course pages with curriculum, instructor info, FAQ, and reviews
- **Blog Listing** - Blog posts with categories, tags, and pagination
- **Blog Single** - Individual blog posts with comments, social sharing, and navigation
- **Favorites Page** - User's saved courses and articles with management features
- **Contact Page** - Enhanced contact form with validation, information cards, and interactive map
- **Login/Register** - Firebase authentication with email verification and password reset
- **Account Dashboard** - User profile management, course progress, learning stats, and settings
- **Admin Dashboard** - Complete admin panel for user management, course management, and analytics
- **Email Verification** - Email verification flow with resend functionality
- **Password Reset** - Secure password reset with Firebase integration
- **FAQs** - Accordion-style frequently asked questions
- **Error Page** - Custom 404 error page with error boundaries

### 🎨 Design & Theming
- **Dark/Light Mode** - Complete theme switching with smooth transitions using Tailwind V4
- **Custom Design System** - Indigo/Amber color palette with modern Tailwind classes
- **Responsive Design** - Mobile-first approach, works perfectly on all devices
- **Interactive Navigation** - Hover effects, active states, and smooth transitions
- **Professional UI/UX** - Clean, modern design with accessibility features
- **Interactive Categories** - Enhanced category cards with animations and visual effects

### 🔐 Authentication & User Management
- **Firebase Authentication** - Secure email/password authentication with role-based access
- **User Registration** - Account creation with email verification
- **Email Verification** - Automatic email verification on signup with resend functionality
- **Password Reset** - Secure password reset flow with email links
- **User Profiles** - Complete profile management with avatar upload and settings
- **Role-Based Access** - Admin and user roles with protected routes
- **Session Management** - Persistent authentication state with automatic logout
- **Enhanced Error Messages** - User-friendly authentication error messages
- **Loading States** - Separate loading states for different authentication actions

### 📚 Course Management
- **Course Enrollment** - One-click course enrollment with progress tracking
- **My Courses** - Personal course dashboard with progress visualization
- **Course Access Control** - Authenticated users only for course details
- **Enrollment Management** - Add/remove courses from personal dashboard
- **Progress Tracking** - Visual progress indicators and completion status
- **Favorites System** - Save and manage favorite courses with persistent storage

### ⚡ Performance & Functionality
- **Advanced Search** - Debounced search with real-time feedback and loading states
- **Course Filtering** - Filter by category, level, price, duration, and rating
- **Error Boundaries** - Comprehensive error handling with graceful fallbacks
- **Loading States** - Professional skeleton loaders and loading indicators
- **Form Handling** - Enhanced contact form with real-time validation
- **Newsletter Subscription** - Email subscription with validation and feedback
- **State Management** - Zustand for global state management with persistence
- **Page Transitions** - Smooth animations between routes using Framer Motion
- **Theme Persistence** - User preferences saved in localStorage
- **PWA Support** - Service worker for offline functionality and caching
- **Toast Notifications** - Global toast notification system for user feedback
- **Confirmation Modals** - Reusable confirmation dialogs for important actions

## 🛠️ Tech Stack

### Core Technologies
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS v4 with custom design system and dark mode support
- **Routing**: React Router DOM v7.9.1
- **State Management**: Zustand v5.0.8
- **Build Tool**: Vite v7.1.5
- **Authentication**: Firebase Auth v10.13.2
- **Database**: Firebase Firestore v10.13.2

### UI & Interaction
- **Icons**: React Icons, Lucide React
- **Animations**: Framer Motion v12.23.12
- **Forms**: React Hook Form v7.62.0
- **HTTP Client**: Axios v1.12.2
- **Data Fetching**: TanStack Query v5.87.4

### Development Tools
- **Linting**: ESLint with TypeScript support
- **Formatting**: Prettier
- **Git Hooks**: Husky with lint-staged
- **Testing**: Vitest (configured, ready for use)

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── SkeletonLoader.tsx # Loading skeletons
│   │   ├── ErrorBoundary.tsx  # Error handling
│   │   ├── SearchInput.tsx    # Debounced search
│   │   ├── FavoriteButton.tsx # Favorites toggle
│   │   ├── NewsletterSubscription.tsx # Email signup
│   │   └── ...
│   ├── course/               # Course-related components
│   │   └── CourseCard.tsx    # Enhanced with favorites
│   ├── courses/              # Course listing components
│   │   └── CourseFilters.tsx # Filtering and sorting
│   ├── contact/              # Contact components
│   │   └── ContactForm.tsx   # Enhanced form with validation
│   └── layout/               # Layout components
│       ├── Header.tsx        # Navigation with favorites
│       └── Footer.tsx        # With newsletter signup
├── contexts/                 # React contexts
│   └── LoadingContext.tsx    # Global loading states
├── hooks/                    # Custom hooks
│   └── useDebounce.ts        # Debounced search
├── pages/                    # Page components
│   └── Favorites.tsx         # User favorites page
├── store/                    # State management
│   └── favoritesStore.ts     # Zustand favorites store
└── ...
```

## 📦 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/TrentonFunt/multi-learn.git
cd multi-learn

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚀 Quick Start

### **Development**
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

### **Production Build**
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### **Key Features to Explore**
1. **Dark/Light Mode** - Toggle in header
2. **Search Functionality** - Use header search bar
3. **Favorites System** - Click heart icons on courses
4. **Course Filtering** - Visit /courses page
5. **Contact Form** - Try the enhanced contact form
6. **Newsletter** - Subscribe in footer
7. **Page Transitions** - Navigate between pages
8. **Error Boundaries** - Try navigating to invalid routes

## 🚀 Deployment

This project is ready for deployment on **Vercel** or any static hosting platform:

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Vite configuration
3. Deploy with zero configuration needed

### Manual Deployment
```bash
# Build the project
npm run build

# The dist/ folder contains all static files ready for deployment
```

## 🎨 Design Credits

This project is inspired by the **EduPress UI Kit** from ThimPress.

### Original Design Information:
- **Design Name**: EduPress - UI Kit for Education & Online Learning Website
- **Creator**: ThimPress
- **Website**: https://edupress.thimpress.com
- **LearnPress Plugin**: https://thimpress.com/learnpress/
- **Support**: https://thimpress.com
- **License**: CC BY 4.0
- **Last Updated**: 2 years ago

### Design Features:
- Modern, sleek, and visually appealing design
- **Enhanced Color Palette**: Indigo primary, Amber secondary with comprehensive neutral scale
- **Typography**: Exo (headings) and Jost (body text) from Google Fonts
- **Theme System**: Complete light/dark mode implementation with CSS variables
- Based on LearnPress LMS functionality
- Includes all essential LMS website components

### Pages Included in Original Design:
- Home Page
- Course Listing
- Course Single
- Blog Listing
- Blog Single
- Contact
- FAQs
- Register/Login

## ✨ Key Improvements & Features

### 🎨 Enhanced Design System
- **Tailwind CSS V4**: Latest version with improved dark mode support and custom variants
- **Interactive Elements**: Hover effects, transitions, and smooth animations
- **Responsive Layout**: Mobile-first design with optimized spacing and typography
- **Accessibility**: ARIA attributes, keyboard navigation, and screen reader support
- **Interactive Categories**: Enhanced category cards with gradient overlays and animations

### 🔧 Technical Enhancements
- **TypeScript**: Full type safety with custom interfaces and strict configuration
- **Performance**: Lazy loading, code splitting, optimized bundle size, and debounced search
- **State Management**: Centralized state with Zustand for authentication, courses, and favorites
- **Error Handling**: React Error Boundaries with custom fallback UI and recovery options
- **Loading States**: Professional skeleton components with smooth animations
- **Form Handling**: Enhanced validation with real-time feedback and accessibility features
- **Search & Filtering**: Advanced search with debouncing and comprehensive filtering options
- **User Experience**: Page transitions, smooth animations, and interactive feedback
- **Authentication UX**: Enhanced error messages and separate loading states for better UX
- **Toast System**: Global notification system for user feedback and actions

### 🌙 Theme System
- **Light Mode**: Clean, professional appearance with indigo accents
- **Dark Mode**: Modern dark theme with proper contrast ratios
- **System Preference**: Automatic theme detection based on user's OS settings
- **Persistence**: Theme preference saved in localStorage
- **Tailwind V4 Integration**: Seamless dark mode implementation with custom variants

### 📱 User Experience
- **Interactive Navigation**: Smooth hover effects, active states, and page transitions
- **Advanced Search**: Debounced search with loading states and clear functionality
- **Favorites System**: Save courses and articles with persistent storage and management
- **Course Filtering**: Comprehensive filtering by multiple criteria with sort options
- **Error Recovery**: Graceful error handling with retry mechanisms and fallback UI
- **Form Validation**: Real-time validation with helpful error messages and accessibility
- **Loading States**: Professional skeleton components with smooth animations
- **Newsletter**: Email subscription with validation and success feedback
- **Social Authentication**: Google and Facebook login options (UI ready)

## 🚀 Production-Ready Features

### ✅ **Enhanced User Experience**
- **Skeleton Loading States** - Professional loading animations for all content
- **Error Boundaries** - Graceful error handling with recovery options
- **Page Transitions** - Smooth animations between routes
- **Debounced Search** - Optimized search with 300ms delay for better performance
- **Real-time Validation** - Instant feedback on forms and inputs

### ✅ **Advanced Functionality**
- **Favorites System** - Save courses and articles with persistent storage
- **Course Filtering** - Filter by category, level, price, duration, and rating
- **Newsletter Subscription** - Email collection with validation
- **Enhanced Contact Form** - Comprehensive validation and feedback
- **Mobile-Responsive** - Optimized for all device sizes

### ✅ **Technical Excellence**
- **TypeScript** - Full type safety with strict configuration
- **Error Handling** - Comprehensive error boundaries and fallback UI
- **State Management** - Zustand with persistence for user data
- **Performance** - Optimized bundle size and lazy loading
- **Accessibility** - ARIA attributes and keyboard navigation

### ✅ **Developer Experience**
- **Modern Stack** - React 19, TypeScript, Tailwind CSS, Framer Motion
- **Clean Architecture** - Well-organized components and hooks
- **Easy Deployment** - Ready for Vercel, Netlify, or any static hosting
- **Build Optimization** - Production-ready build with code splitting

## 🚀 Deployment

**Ready for production deployment!** 

### Quick Deploy
- **Vercel**: Connect GitHub repo → Auto-deploy
- **Netlify**: Connect GitHub repo → Auto-deploy  
- **Firebase Hosting**: `npm run build` → `firebase deploy`

### Environment Setup
```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

### Features Included
- ✅ **Firebase Authentication** - Email/password, verification, password reset
- ✅ **User Management** - Registration, login, profile management
- ✅ **Admin Dashboard** - User management, course management, analytics
- ✅ **Email Verification** - Automatic verification emails
- ✅ **Password Reset** - Secure password reset flow
- ✅ **PWA Support** - Service worker, offline functionality
- ✅ **Responsive Design** - Works on all devices
- ✅ **Dark/Light Mode** - Theme switching
- ✅ **Performance Optimized** - Code splitting, lazy loading

**📋 See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.**

## 🚀 Deployment

### Quick Deploy to Vercel

1. **Fork this repository** or clone it to your GitHub account
2. **Set up Firebase project** and get your configuration values
3. **Deploy to Vercel**:
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard:
     ```
     VITE_FIREBASE_API_KEY=your-api-key
     VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
     VITE_FIREBASE_PROJECT_ID=your-project-id
     VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
     VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
     VITE_FIREBASE_APP_ID=your-app-id
     ```
   - Deploy automatically on every push to main branch

### Environment Setup

1. **Copy environment file**:
   ```bash
   cp env.example .env
   ```

2. **Add your Firebase configuration** to `.env`:
   ```env
   VITE_FIREBASE_API_KEY=your-api-key-here
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

3. **Firebase Setup**:
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Set up security rules
   - Configure email templates

### Production Checklist

- ✅ **Environment variables** configured
- ✅ **Firebase project** set up with authentication and Firestore
- ✅ **Build successful** (`npm run build`)
- ✅ **No critical errors** in console
- ✅ **Responsive design** tested on mobile/desktop
- ✅ **Authentication flow** working
- ✅ **Admin access** configured (set user role to 'admin' in Firestore)

## 📄 License

This project is licensed under the MIT License. The original design is licensed under CC BY 4.0.

## 🙏 Acknowledgments

Special thanks to ThimPress for creating the beautiful EduPress UI Kit that inspired this implementation. The design provides an excellent foundation for building modern e-learning platforms.

## 📞 Support

For questions about this implementation, please open an issue in this repository.

For questions about the original design, please contact ThimPress at https://thimpress.com

---

**Note**: This is a frontend implementation showcasing modern web development skills. The design is used for educational and portfolio purposes.# Trigger rebuild Sat, Sep 20, 2025  5:48:12 AM

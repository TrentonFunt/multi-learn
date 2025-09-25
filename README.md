# MultiLearn - Comprehensive E-Learning Platform

A modern, full-featured e-learning platform built with React, TypeScript, and Tailwind CSS. Features Firebase authentication, comprehensive course creation and management, instructor dashboard with video upload capabilities, admin dashboard with full CRUD operations, instructor approval system, and a professional design system with dark/light mode theming.

## 🚀 Features

### 📱 Pages & Navigation
- **Home Page** - Hero section, featured courses, categories, statistics, student feedback, latest articles
- **Course Listing** - Browse and filter courses with advanced search functionality
- **Course Single** - Detailed course pages with curriculum, instructor info, FAQ, and reviews
- **Blog Listing** - Blog posts with categories, tags, and pagination
- **Blog Single** - Individual blog posts with comments, social sharing, and navigation
- **Favorites Page** - User's saved courses and articles with management features
- **Contact Page** - Enhanced contact form with validation, information cards, and interactive map
- **Login/Register** - Firebase authentication with email verification, password reset, and Google sign-in
- **Account Dashboard** - User profile management, course progress, learning stats, and settings
- **Admin Dashboard** - Complete admin panel with full CRUD operations for user management, course management, instructor management, and analytics
- **Instructor Dashboard** - Comprehensive dashboard for approved instructors with full course creation, video management, and student analytics
- **Email Verification** - Email verification flow with resend functionality
- **Password Reset** - Secure password reset with Firebase integration
- **FAQs** - Accordion-style frequently asked questions
- **Error Page** - Custom 404 error page with error boundaries

### 🔐 Authentication & User Management
- **Firebase Authentication** - Secure email/password and Google authentication with role-based access
- **User Registration** - Account creation with email verification and role selection (Student/Instructor)
- **Email Verification** - Automatic email verification on signup with resend functionality
- **Password Reset** - Secure password reset flow with email links
- **User Profiles** - Complete profile management with avatar upload and settings
- **Role-Based Access** - Student, Instructor, and Admin roles with protected routes
- **Instructor Approval System** - Admin approval workflow for instructor applications
- **Session Management** - Persistent authentication state with automatic logout
- **Enhanced Error Messages** - User-friendly authentication error messages
- **Loading States** - Separate loading states for different authentication actions

### 👨‍🏫 Instructor System
- **Instructor Registration** - Enhanced registration form with instructor-specific fields
- **Application Process** - Instructors must be approved by admins before gaining access
- **Instructor Dashboard** - Comprehensive dashboard with full course creation capabilities
- **Course Creation** - Complete course creation system with modules, lessons, and video uploads
- **Video Management** - Upload and manage course videos with duration tracking
- **Module Organization** - Hierarchical course structure with modules and lessons
- **Course Publishing** - Publish/unpublish courses with status management
- **Student Analytics** - Track student enrollment, progress, and engagement
- **Revenue Tracking** - Monitor course earnings and financial analytics
- **Verification Status** - Pending, Approved, and Rejected status tracking
- **Admin Management** - Full CRUD operations for instructor approval/rejection with reasons

### 📚 Course Management
- **Course Enrollment** - One-click course enrollment with progress tracking
- **My Courses** - Personal course dashboard with progress visualization
- **Course Access Control** - Authenticated users only for course details
- **Enrollment Management** - Add/remove courses from personal dashboard
- **Progress Tracking** - Visual progress indicators and completion status
- **Favorites System** - Save and manage favorite courses with persistent storage
- **Course Creation** - Full course creation with modules, lessons, and materials
- **Video Integration** - Video URL input and file upload capabilities
- **Course Publishing** - Draft and published course status management
- **Course Analytics** - Student enrollment, completion rates, and revenue tracking

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
- **Form Validation** - Comprehensive form validation with accessibility features
- **Micro-interactions** - Enhanced animations and hover effects throughout the platform
- **Accessibility** - ARIA attributes, keyboard navigation, and screen reader support
- **Responsive Design** - Fully responsive across all device types including split-screen monitors

### 🎨 Design & Theming
- **Dark/Light Mode** - Complete theme switching with smooth transitions using Tailwind V4
- **Custom Design System** - Orange/Yellow/Green gradient color palette with modern Tailwind classes
- **Responsive Design** - Mobile-first approach, works perfectly on all devices
- **Interactive Navigation** - Hover effects, active states, and smooth transitions
- **Professional UI/UX** - Clean, modern design with accessibility features
- **Interactive Categories** - Enhanced category cards with animations and visual effects
- **Footer Divider** - Clear visual separation with gradient dividers and enhanced styling
- **Admin Navigation** - Quick access to instructor dashboard from admin panel

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

## 🗄️ Database Structure

### Firestore Collections

#### `users`
```typescript
{
  uid: string;
  email: string;
  displayName: string;
  photoURL: string | null;
  emailVerified: boolean;
  role: 'user' | 'instructor' | 'admin';
  createdAt: Date;
  lastLoginAt: Date;
  
  // Instructor-specific fields
  instructorVerificationStatus?: 'pending' | 'approved' | 'rejected';
  instructorVerificationDate?: Date;
  instructorBio?: string;
  instructorSpecialties?: string[];
  instructorExperience?: string;
  instructorEducation?: string;
  instructorCertifications?: string[];
  instructorWebsite?: string;
  instructorLinkedIn?: string;
  instructorTwitter?: string;
  instructorRejectionReason?: string;
}
```

#### `instructorApplications`
```typescript
{
  uid: string;
  name: string;
  email: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedDate: string;
  bio: string;
  specialties: string[];
  experience: string;
  education: string;
  certifications: string[];
  website: string;
  linkedin: string;
  twitter: string;
  verificationDate: string;
  rejectionReason?: string;
}
```

#### `courses`
```typescript
{
  id: string;
  title: string;
  description: string;
  instructor: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  price: number;
  rating: number;
  students: number;
  thumbnail: string;
  curriculum: Array<{
    title: string;
    lessons: Array<{
      title: string;
      duration: string;
      type: 'video' | 'text' | 'quiz';
    }>;
  }>;
  createdAt: Date;
  updatedAt: Date;
}
```

#### `enrollments`
```typescript
{
  userId: string;
  courseId: string;
  enrolledAt: Date;
  progress: number;
  completedLessons: string[];
  status: 'active' | 'completed' | 'paused';
}
```

#### `favorites`
```typescript
{
  userId: string;
  courseId: string;
  addedAt: Date;
}
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── SkeletonLoader.tsx # Loading skeletons
│   │   ├── ErrorBoundary.tsx  # Error handling
│   │   ├── SearchInput.tsx    # Debounced search
│   │   ├── FavoriteButton.tsx # Favorites toggle
│   │   ├── Logo.tsx           # Consistent branding
│   │   └── ...
│   ├── course/               # Course-related components
│   │   ├── CourseCard.tsx    # Enhanced with favorites
│   │   ├── CourseHero.tsx    # Course page hero
│   │   ├── CourseTabs.tsx    # Course content tabs
│   │   └── ...
│   ├── courses/              # Course listing components
│   │   ├── CourseFilters.tsx # Filtering and sorting
│   │   └── LazyCourseFilters.tsx
│   ├── contact/              # Contact components
│   │   ├── ContactForm.tsx   # Enhanced form with validation
│   │   ├── ContactHero.tsx   # Contact page hero
│   │   └── ...
│   ├── admin/                # Admin dashboard components
│   │   ├── Dashboard.tsx     # Admin overview
│   │   ├── UserManagement.tsx # User CRUD operations
│   │   ├── CourseManagement.tsx # Course CRUD operations
│   │   ├── InstructorManagement.tsx # Instructor approval system
│   │   ├── Analytics.tsx     # Analytics dashboard
│   │   └── Settings.tsx      # Admin settings
│   ├── auth/                 # Authentication components
│   │   └── ProtectedRoute.tsx # Route protection
│   └── layout/               # Layout components
│       ├── Header.tsx        # Navigation with search
│       └── Footer.tsx        # With newsletter signup
├── contexts/                 # React contexts
│   ├── AuthContext.tsx       # Authentication state
│   ├── LoadingContext.tsx    # Global loading states
│   ├── ThemeContext.tsx      # Theme management
│   └── ToastContext.tsx      # Toast notifications
├── hooks/                    # Custom hooks
│   ├── useAuth.ts           # Authentication hook
│   ├── useDebounce.ts       # Debounced search
│   └── ...
├── pages/                    # Page components
│   ├── Home.tsx             # Landing page
│   ├── Courses.tsx          # Course listing
│   ├── CourseSingle.tsx     # Individual course
│   ├── Login.tsx            # Login page
│   ├── Register.tsx         # Registration page
│   ├── Admin.tsx            # Admin dashboard
│   ├── InstructorDashboard.tsx # Instructor dashboard
│   └── ...
├── store/                    # State management
│   ├── authStore.ts         # Authentication state
│   ├── courseStore.ts       # Course data
│   ├── enrollmentStore.ts   # Enrollment state
│   └── favoritesStore.ts    # Favorites state
├── types/                    # TypeScript definitions
│   └── index.ts             # Shared interfaces
├── utils/                    # Utility functions
│   ├── authErrors.ts        # Auth error handling
│   ├── validation.ts        # Form validation
│   └── accessibility.ts     # Accessibility helpers
└── config/
    └── firebase.ts          # Firebase configuration
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
9. **Instructor Registration** - Register as an instructor
10. **Admin Dashboard** - Manage users and instructors

## 🚀 Deployment

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

### Deployment Options

#### **Vercel (Recommended)**
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on every push

#### **Netlify**
1. Connect your GitHub repository to Netlify
2. Set environment variables in Netlify dashboard
3. Deploy automatically on every push

#### **Firebase Hosting**
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login and initialize
firebase login
firebase init hosting

# Build and deploy
npm run build
firebase deploy
```

### Firebase Configuration

#### **Authentication Settings**
- **Email/Password**: Enabled ✅
- **Google Sign-In**: Enabled ✅
- **Email verification**: Configured ✅
- **Password reset**: Configured ✅

#### **Firestore Security Rules**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Instructor applications are readable by admins
    match /instructorApplications/{applicationId} {
      allow read, write: if request.auth != null && 
        (get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
    
    // Courses are readable by all authenticated users
    match /courses/{courseId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        (get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'instructor']);
    }
  }
}
```

#### **Authorized Domains**
Add your production domain to Firebase Console:
- Go to **Authentication** → **Settings** → **Authorized domains**
- Add: `your-domain.vercel.app` (or your hosting domain)

### Production Checklist

- ✅ **Environment variables** configured
- ✅ **Firebase project** set up with authentication and Firestore
- ✅ **Build successful** (`npm run build`)
- ✅ **No critical errors** in console
- ✅ **Responsive design** tested on mobile/desktop
- ✅ **Authentication flow** working
- ✅ **Admin access** configured (set user role to 'admin' in Firestore)
- ✅ **Instructor approval system** functional
- ✅ **Email templates** customized in Firebase Console

## 🎨 Design Credits

This project is inspired by the **EduPress UI Kit** from ThimPress.

### Original Design Information:
- **Design Name**: EduPress - UI Kit for Education & Online Learning Website
- **Creator**: ThimPress
- **Website**: https://edupress.thimpress.com
- **LearnPress Plugin**: https://thimpress.com/learnpress/
- **Support**: https://thimpress.com
- **License**: CC BY 4.0

### Design Features:
- Modern, sleek, and visually appealing design
- **Enhanced Color Palette**: Orange/Yellow/Green gradient with comprehensive neutral scale
- **Typography**: Exo (headings) and Jost (body text) from Google Fonts
- **Theme System**: Complete light/dark mode implementation with CSS variables
- Based on LearnPress LMS functionality
- Includes all essential LMS website components

## 🆕 Recent Major Enhancements

### 🎓 **Complete Instructor Dashboard Overhaul**
- **Full Course Creation System** - Comprehensive course creation with modules, lessons, and video uploads
- **Video Management** - Upload and manage course videos with duration tracking
- **Module Organization** - Hierarchical course structure with drag-and-drop organization
- **Course Publishing** - Draft and published course status management
- **Student Analytics** - Track enrollment, progress, and engagement metrics
- **Revenue Tracking** - Monitor course earnings and financial performance

### 🔧 **Admin Dashboard Enhancements**
- **Instructor Dashboard Access** - Admins can now access instructor dashboard for testing and management
- **Quick Navigation** - Direct access to instructor features from admin panel
- **Enhanced UI** - Improved navigation and user experience

### 🎨 **UI/UX Improvements**
- **Footer Design** - Added clear visual dividers and enhanced styling
- **Micro-interactions** - Enhanced animations and hover effects throughout
- **Form Validation** - Comprehensive accessibility features and validation
- **Responsive Design** - Optimized for all screen types including split-screen monitors

### 🐛 **Bug Fixes & Optimizations**
- **Toast Context** - Fixed initialization errors and dependency issues
- **Form Accessibility** - Added proper ARIA attributes and autocomplete
- **TypeScript Safety** - Enhanced type definitions and error handling
- **Performance** - Optimized bundle size and loading performance

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
- **Light Mode**: Clean, professional appearance with orange accents
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
- **Social Authentication**: Google sign-in integration

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
- **Instructor Approval System** - Complete workflow for instructor management

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

## 📄 License

This project is licensed under the MIT License. The original design is licensed under CC BY 4.0.

## 🙏 Acknowledgments

Special thanks to ThimPress for creating the beautiful EduPress UI Kit that inspired this implementation. The design provides an excellent foundation for building modern e-learning platforms.

## 📞 Support

For questions about this implementation, please open an issue in this repository.

For questions about the original design, please contact ThimPress at https://thimpress.com

---

**Note**: This is a frontend implementation showcasing modern web development skills. The design is used for educational and portfolio purposes.
# MultiLearn - E-Learning Platform

A production-ready e-learning platform built with React 19, TypeScript, and Tailwind CSS v4. Features Firebase authentication, role-based access control, course management, instructor dashboards, and admin capabilities.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://multi-learn.vercel.app)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)](https://tailwindcss.com/)


## ✨ Key Features

- **🔐 Authentication** - Firebase Auth with Google sign-in, email verification, and password reset
- **👥 Role-Based Access** - Student, Instructor (approval required), and Admin roles
- **📚 Course Management** - Full CRUD operations with dynamic filtering and search
- **👨‍🏫 Instructor Dashboard** - Course creation with modules, lessons, and analytics
- **⚙️ Admin Panel** - User management, instructor approval system, and platform analytics
- **🌙 Dark Mode** - Complete theme system with Tailwind CSS v4
- **📱 Responsive Design** - Mobile-first approach, optimized for all screen sizes
- **♿ Accessibility** - WCAG AA compliant with keyboard navigation and screen reader support

## 🛠️ Tech Stack

**Frontend**
- React 19 with TypeScript (strict mode)
- Tailwind CSS v4 with custom design system
- React Router DOM v7 for routing
- Framer Motion for animations

**State & Data**
- Zustand for global state management
- TanStack Query for server state
- Firebase Auth & Firestore

**Development**
- Vite v7 for fast builds
- ESLint + TypeScript for code quality
- PWA support with service worker


## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/TrentonFunt/multi-learn.git
cd multi-learn

# Install dependencies
npm install

# Set up environment variables
# Create .env file with Firebase credentials
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-domain.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id

# Start development server
npm run dev

# Build for production
npm run build
```

Visit `http://localhost:5173` to see the app in action.

## 📸 Screenshots

### Home Page
![Home Page - Light Mode](https://via.placeholder.com/800x400?text=Light+Mode+Home)
![Home Page - Dark Mode](https://via.placeholder.com/800x400?text=Dark+Mode+Home)

### Course Management
![Courses Listing](https://via.placeholder.com/800x400?text=Courses+Listing)
![Course Details](https://via.placeholder.com/800x400?text=Course+Details)

### Dashboards
![Admin Dashboard](https://via.placeholder.com/800x400?text=Admin+Dashboard)
![Instructor Dashboard](https://via.placeholder.com/800x400?text=Instructor+Dashboard)

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base components (Button, Input, Modal, etc.)
│   ├── course/         # Course-related components
│   ├── admin/          # Admin dashboard components
│   ├── instructor/     # Instructor dashboard components
│   ├── auth/           # Authentication components
│   └── layout/         # Header, Footer, Layout
├── contexts/           # React Context providers
├── hooks/              # Custom React hooks
├── pages/              # Page components (routes)
├── store/              # Zustand state management
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── config/             # Configuration files
```

## 🎯 User Roles

### Student (Default)
- Browse and search courses
- Enroll in courses and track progress
- Save favorites
- Manage profile

### Instructor (Requires Approval)
- All student capabilities
- Create and publish courses
- Manage course content (modules, lessons)
- View student analytics
- Track revenue

### Admin
- All instructor capabilities
- User management (CRUD)
- Approve/reject instructor applications
- Platform analytics and settings

## 🔑 Key Features Breakdown

### Authentication Flow
1. User registers with email/password or Google
2. Email verification sent automatically
3. Instructors apply through enhanced registration form
4. Admin reviews and approves instructor applications
5. Users gain access based on role

### Course Creation (Instructors)
1. Navigate to Instructor Dashboard
2. Click "Create New Course"
3. Add basic information (title, description, category, price)
4. Create modules and lessons
5. Upload video content
6. Publish course for students

### Admin Management
1. Access Admin Dashboard (admin role required)
2. Manage users (view, edit, delete)
3. Review instructor applications
4. Monitor platform analytics
5. Configure platform settings


## 🚀 Deployment

The project is optimized for deployment on Vercel, Netlify, or Firebase Hosting.

### Environment Variables Required
```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

### Deploy to Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🎨 Design Credits

Design inspired by **EduPress UI Kit** by ThimPress.
- Original Design: [edupress.thimpress.com](https://edupress.thimpress.com)
- License: CC BY 4.0

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './contexts/ThemeContext';
import { LoadingProvider } from './contexts/LoadingContext';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import Layout from './components/layout/Layout';
import PageTransition from './components/ui/PageTransition';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { RouteErrorBoundary } from './components/ui/ErrorBoundary';
import { PageCardSkeleton } from './components/ui/SkeletonLoader';
import useScrollToTop from './hooks/useScrollToTop';

// Lazy load pages for code splitting
const Home = React.lazy(() => import('./pages/Home'));
const Courses = React.lazy(() => import('./pages/Courses'));
const CourseSingle = React.lazy(() => import('./pages/CourseSingle'));
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogSingle = React.lazy(() => import('./pages/BlogSingle'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Favorites = React.lazy(() => import('./pages/Favorites'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const EmailVerification = React.lazy(() => import('./pages/EmailVerification'));
const PasswordReset = React.lazy(() => import('./pages/PasswordReset'));
const Account = React.lazy(() => import('./pages/Account'));
const Admin = React.lazy(() => import('./pages/Admin'));
const Unauthorized = React.lazy(() => import('./pages/Unauthorized'));
const FAQs = React.lazy(() => import('./pages/FAQs'));
const Error = React.lazy(() => import('./pages/Error'));

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

// Component to handle page transitions
const AppRoutes: React.FC = () => {
  const location = useLocation();
  
  // Scroll to top on route change
  useScrollToTop();
  
  return (
    <PageTransition>
      <Suspense fallback={<PageCardSkeleton />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogSingle />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/email-verification" element={<EmailVerification />} />
          <Route path="/password-reset" element={<PasswordReset />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          {/* Protected Routes */}
          <Route 
            path="/courses/:id" 
            element={
              <ProtectedRoute>
                <CourseSingle />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/favorites" 
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/account" 
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <Admin />
              </ProtectedRoute>
            } 
          />
          
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
    </PageTransition>
  );
};

function App() {
  return (
    <ThemeProvider>
      <LoadingProvider>
        <AuthProvider>
          <ToastProvider>
            <QueryClientProvider client={queryClient}>
              <Router>
                <Layout>
                  <RouteErrorBoundary>
                    <AppRoutes />
                  </RouteErrorBoundary>
                </Layout>
              </Router>
            </QueryClientProvider>
          </ToastProvider>
        </AuthProvider>
      </LoadingProvider>
    </ThemeProvider>
  );
}

export default App;

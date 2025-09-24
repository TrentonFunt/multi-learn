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

// Import Home page directly (loads immediately)
import Home from './pages/Home';

// Lazy load all pages except Home (which loads immediately)
const Courses = React.lazy(() => import('./pages/Courses'));
const Blog = React.lazy(() => import('./pages/Blog'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const CourseSingle = React.lazy(() => import('./pages/CourseSingle'));
const BlogSingle = React.lazy(() => import('./pages/BlogSingle'));
const EmailVerification = React.lazy(() => import('./pages/EmailVerification'));
const PasswordReset = React.lazy(() => import('./pages/PasswordReset'));
const Unauthorized = React.lazy(() => import('./pages/Unauthorized'));
const FAQs = React.lazy(() => import('./pages/FAQs'));
const Error = React.lazy(() => import('./pages/Error'));
const Favorites = React.lazy(() => import('./pages/Favorites'));
const Account = React.lazy(() => import('./pages/Account'));
const Admin = React.lazy(() => import('./pages/Admin'));
const InstructorDashboard = React.lazy(() => import('./pages/InstructorDashboard'));

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
      <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={
            <Suspense fallback={<PageCardSkeleton />}>
              <Courses />
            </Suspense>
          } />
          <Route path="/blog" element={
            <Suspense fallback={<PageCardSkeleton />}>
              <Blog />
            </Suspense>
          } />
          <Route path="/blog/:id" element={
            <Suspense fallback={<PageCardSkeleton />}>
              <BlogSingle />
            </Suspense>
          } />
          <Route path="/contact" element={
            <Suspense fallback={<PageCardSkeleton />}>
              <Contact />
            </Suspense>
          } />
          <Route path="/login" element={
            <Suspense fallback={<PageCardSkeleton />}>
              <Login />
            </Suspense>
          } />
          <Route path="/register" element={
            <Suspense fallback={<PageCardSkeleton />}>
              <Register />
            </Suspense>
          } />
          <Route path="/email-verification" element={
            <Suspense fallback={<PageCardSkeleton />}>
              <EmailVerification />
            </Suspense>
          } />
          <Route path="/password-reset" element={
            <Suspense fallback={<PageCardSkeleton />}>
              <PasswordReset />
            </Suspense>
          } />
          <Route path="/faqs" element={
            <Suspense fallback={<PageCardSkeleton />}>
              <FAQs />
            </Suspense>
          } />
          <Route path="/unauthorized" element={
            <Suspense fallback={<PageCardSkeleton />}>
              <Unauthorized />
            </Suspense>
          } />
          
          {/* Protected Routes */}
          <Route 
            path="/courses/:id" 
            element={
              <ProtectedRoute>
                <Suspense fallback={<PageCardSkeleton />}>
                  <CourseSingle />
                </Suspense>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/favorites" 
            element={
              <ProtectedRoute>
                <Suspense fallback={<PageCardSkeleton />}>
                  <Favorites />
                </Suspense>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/account" 
            element={
              <ProtectedRoute>
                <Suspense fallback={<PageCardSkeleton />}>
                  <Account />
                </Suspense>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <Suspense fallback={<PageCardSkeleton />}>
                  <Admin />
                </Suspense>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/instructor" 
            element={
              <ProtectedRoute requireInstructor={true}>
                <Suspense fallback={<PageCardSkeleton />}>
                  <InstructorDashboard />
                </Suspense>
              </ProtectedRoute>
            } 
          />
          
          <Route path="/error" element={
            <Suspense fallback={<PageCardSkeleton />}>
              <Error />
            </Suspense>
          } />
          <Route path="*" element={
            <Suspense fallback={<PageCardSkeleton />}>
              <Error />
            </Suspense>
          } />
      </Routes>
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
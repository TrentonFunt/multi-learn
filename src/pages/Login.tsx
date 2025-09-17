import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Breadcrumb from '../components/ui/Breadcrumb';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  
  const { signIn, resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/';

  const breadcrumbItems = [
    { label: 'Homepage', href: '/' },
    { label: 'Login' }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      navigate(from, { replace: true });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await resetPassword(resetEmail);
      setResetEmailSent(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-secondary">
      {/* Hero Section */}
      <section className="bg-bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-exo font-semibold text-text-primary mb-4">
              Login
            </h1>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Login Form */}
        <div className="max-w-md mx-auto mt-12">
          <div className="bg-bg-primary border border-border-primary rounded-card shadow-card p-8">
            <h2 className="text-2xl font-exo font-semibold text-text-primary mb-6 text-center">
              Welcome Back
            </h2>
            <p className="text-text-secondary text-center mb-8">
              Sign in to your MultiLearn account to continue your learning journey.
            </p>
            
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2"
              >
                <AlertCircle className="h-5 w-5" />
                <span className="text-sm">{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <Input
                label="Email"
                type="email"
                placeholder="Email*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              
              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password*"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-text-secondary hover:text-text-primary transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 text-primary border-border-primary rounded focus:ring-primary"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-text-primary">
                    Remember me
                  </label>
                </div>
                <button 
                  type="button"
                  onClick={() => setShowForgotPassword(!showForgotPassword)}
                  className="text-sm link-primary"
                >
                  Forgot password?
                </button>
              </div>

              <Button 
                type="submit" 
                variant="fill" 
                size="large" 
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            {/* Forgot Password Form */}
            {showForgotPassword && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
              >
                <h3 className="text-lg font-semibold text-text-primary mb-3">Reset Password</h3>
                <p className="text-sm text-text-secondary mb-4">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
                
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>
                  
                  {resetEmailSent ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center"
                    >
                      <div className="flex items-center justify-center space-x-2 text-green-600 mb-2">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">Email Sent!</span>
                      </div>
                      <p className="text-sm text-text-secondary">
                        Check your email for password reset instructions.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setShowForgotPassword(false);
                          setResetEmailSent(false);
                          setResetEmail('');
                          setError('');
                        }}
                        className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mt-2"
                      >
                        Back to Login
                      </button>
                    </motion.div>
                  ) : (
                    <div className="flex space-x-3">
                      <Button
                        type="submit"
                        variant="fill"
                        size="small"
                        disabled={loading || !resetEmail}
                        className="flex-1"
                      >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="small"
                        onClick={() => {
                          setShowForgotPassword(false);
                          setResetEmail('');
                          setError('');
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </form>
              </motion.div>
            )}

            {/* Divider */}
            <div className="my-8">
              <div className="flex items-center">
                <div className="flex-1 border-t border-border-primary"></div>
                <div className="px-4 text-sm text-text-secondary font-medium">Or continue with</div>
                <div className="flex-1 border-t border-border-primary"></div>
              </div>
            </div>

            {/* Social Login */}
            <div className="space-y-3">
              <button 
                type="button" 
                className="w-full flex items-center justify-center space-x-3 px-6 py-2.5 text-button-lg font-medium border border-border-primary text-text-primary bg-bg-primary rounded-lg hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-2"
              >
                <FaGoogle className="w-5 h-5" />
                <span>Continue with Google</span>
              </button>
              <button 
                type="button" 
                className="w-full flex items-center justify-center space-x-3 px-6 py-2.5 text-button-lg font-medium border border-border-primary text-text-primary bg-bg-primary rounded-lg hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2"
              >
                <FaFacebook className="w-5 h-5" />
                <span>Continue with Facebook</span>
              </button>
            </div>

            {/* Register Link */}
            <div className="mt-8 text-center">
              <p className="text-text-secondary">
                Don't have an account?{' '}
                <Link 
                  to="/register" 
                  className="link-primary font-medium"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Breadcrumb from '../components/ui/Breadcrumb';
import { useAuth } from '../hooks/useAuth';

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const breadcrumbItems = [
    { label: 'Homepage', href: '/' },
    { label: 'Register' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      await signUp(formData.email, formData.password, formData.fullName);
      setSuccess(true);
      setTimeout(() => {
        navigate('/email-verification');
      }, 2000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-exo font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Register
            </h1>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Register Form */}
        <div className="max-w-md mx-auto mt-8">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-exo font-semibold text-gray-900 dark:text-gray-100 mb-6 text-center">
              Create Account
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
              Join MultiLearn today and start your learning journey with thousands of courses.
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

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center space-x-2"
              >
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm">Account created successfully! Redirecting...</span>
              </motion.div>
            )}
            
            <form onSubmit={handleRegister} className="space-y-6">
              <Input
                label="Full Name"
                type="text"
                name="fullName"
                placeholder="Enter your full name*"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />

              <Input
                label="Email"
                type="email"
                name="email"
                placeholder="Enter your email*"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              
              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Create a password*"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <div className="relative">
                <Input
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm your password*"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-700 rounded focus:ring-blue-500 mt-1"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-900 dark:text-gray-100">
                  I agree to the{' '}
                  <Link to="/terms" className="link-primary">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="link-primary">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="newsletter"
                  className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-700 rounded focus:ring-blue-500 mt-1"
                />
                <label htmlFor="newsletter" className="text-sm text-gray-900 dark:text-gray-100">
                  I would like to receive updates about new courses and features
                </label>
              </div>

              <Button 
                type="submit" 
                variant="fill" 
                size="large" 
                className="w-full"
                disabled={loading || success}
              >
                {loading ? 'Creating Account...' : success ? 'Account Created!' : 'Create Account'}
              </Button>
            </form>

            {/* Divider */}
            <div className="my-8">
              <div className="flex items-center">
                <div className="flex-1 border-t border-gray-300 dark:border-gray-700"></div>
                <div className="px-4 text-sm text-gray-600 dark:text-gray-400 font-medium">Or sign up with</div>
                <div className="flex-1 border-t border-gray-300 dark:border-gray-700"></div>
              </div>
            </div>

            {/* Social Register */}
            <div className="space-y-3">
              <button 
                type="button" 
                className="w-full flex items-center justify-center space-x-3 px-6 py-2.5 text-lg font-medium border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200 dark:hover:border-red-800 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-2"
              >
                <FaGoogle className="w-5 h-5" />
                <span>Sign up with Google</span>
              </button>
              <button 
                type="button" 
                className="w-full flex items-center justify-center space-x-3 px-6 py-2.5 text-lg font-medium border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 dark:hover:border-blue-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2"
              >
                <FaFacebook className="w-5 h-5" />
                <span>Sign up with Facebook</span>
              </button>
            </div>

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="link-primary font-medium"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

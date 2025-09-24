import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle, CheckCircle, GraduationCap, User } from 'lucide-react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Logo from '../components/ui/Logo';
import { useAuth } from '../hooks/useAuth';
import { type UserRole } from '../contexts/AuthContext';

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('user');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const { signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Handle role parameter from URL
  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam === 'instructor' || roleParam === 'student') {
      setSelectedRole(roleParam === 'instructor' ? 'instructor' : 'user');
    }
  }, [searchParams]);


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
      await signUp(formData.email, formData.password, formData.fullName, selectedRole);
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

  const handleGoogleSignUp = async () => {
    setError('');
    setLoading(true);

    try {
      await signInWithGoogle(selectedRole);
      navigate('/');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred during Google sign-up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-40 left-1/2 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Logo size="sm" showText={true} />
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 via-yellow-600 to-green-600 bg-clip-text text-transparent mb-4">
              Join Our Community
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Start your learning journey or share your expertise with the world
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Register Form */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
              {/* Left Side - Role Selection */}
              <div className="bg-gradient-to-br from-orange-500 to-yellow-500 p-8 flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl font-bold text-white mb-6">Choose Your Path</h2>
                  <p className="text-orange-100 mb-8">How would you like to join MultiLearn?</p>
                  
                  <div className="space-y-4">
                    <motion.button
                      onClick={() => setSelectedRole('user')}
                      className={`w-full p-6 rounded-xl border-2 transition-all duration-300 ${
                        selectedRole === 'user'
                          ? 'bg-white text-orange-600 border-white shadow-lg scale-105'
                          : 'bg-transparent text-white border-white/30 hover:border-white/60 hover:bg-white/10'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg ${
                          selectedRole === 'user' ? 'bg-orange-100' : 'bg-white/20'
                        }`}>
                          <User className={`w-6 h-6 ${
                            selectedRole === 'user' ? 'text-orange-600' : 'text-white'
                          }`} />
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold text-lg">Student</h3>
                          <p className={`text-sm ${
                            selectedRole === 'user' ? 'text-orange-500' : 'text-orange-100'
                          }`}>
                            Learn new skills and advance your career
                          </p>
                        </div>
                      </div>
                    </motion.button>

                    <motion.button
                      onClick={() => setSelectedRole('instructor')}
                      className={`w-full p-6 rounded-xl border-2 transition-all duration-300 ${
                        selectedRole === 'instructor'
                          ? 'bg-white text-orange-600 border-white shadow-lg scale-105'
                          : 'bg-transparent text-white border-white/30 hover:border-white/60 hover:bg-white/10'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg ${
                          selectedRole === 'instructor' ? 'bg-orange-100' : 'bg-white/20'
                        }`}>
                          <GraduationCap className={`w-6 h-6 ${
                            selectedRole === 'instructor' ? 'text-orange-600' : 'text-white'
                          }`} />
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold text-lg">Instructor</h3>
                          <p className={`text-sm ${
                            selectedRole === 'instructor' ? 'text-orange-500' : 'text-orange-100'
                          }`}>
                            Share your expertise and earn money
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  </div>

                  {/* Benefits */}
                  <div className="mt-8 space-y-3">
                    {selectedRole === 'user' ? (
                      <>
                        <div className="flex items-center space-x-3 text-white">
                          <CheckCircle className="w-5 h-5 text-green-300" />
                          <span className="text-sm">Access to 1000+ courses</span>
                        </div>
                        <div className="flex items-center space-x-3 text-white">
                          <CheckCircle className="w-5 h-5 text-green-300" />
                          <span className="text-sm">Certificates of completion</span>
                        </div>
                        <div className="flex items-center space-x-3 text-white">
                          <CheckCircle className="w-5 h-5 text-green-300" />
                          <span className="text-sm">Community support</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center space-x-3 text-white">
                          <CheckCircle className="w-5 h-5 text-green-300" />
                          <span className="text-sm">Create and sell courses</span>
                        </div>
                        <div className="flex items-center space-x-3 text-white">
                          <CheckCircle className="w-5 h-5 text-green-300" />
                          <span className="text-sm">Earn from your expertise</span>
                        </div>
                        <div className="flex items-center space-x-3 text-white">
                          <CheckCircle className="w-5 h-5 text-green-300" />
                          <span className="text-sm">Reach global audience</span>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Right Side - Registration Form */}
              <div className="p-8 flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Create Your Account
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    {selectedRole === 'user' 
                      ? 'Join thousands of learners worldwide' 
                      : 'Start teaching and earning today'
                    }
                  </p>
                  
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2 mb-6"
                    >
                      <AlertCircle className="h-5 w-5" />
                      <span className="text-sm">{error}</span>
                    </motion.div>
                  )}

                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center space-x-2 mb-6"
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
                      autoComplete="name"
                      required
                    />

                    <Input
                      label="Email"
                      type="email"
                      name="email"
                      placeholder="Enter your email*"
                      value={formData.email}
                      onChange={handleInputChange}
                      autoComplete="email"
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
                        autoComplete="new-password"
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
                        autoComplete="new-password"
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
                        className="w-4 h-4 text-orange-600 border-gray-300 dark:border-gray-700 rounded focus:ring-orange-500 mt-1"
                        required
                      />
                      <label htmlFor="terms" className="text-sm text-gray-900 dark:text-gray-100">
                        I agree to the{' '}
                        <Link to="/terms" className="text-orange-600 hover:text-orange-700 font-medium">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy" className="text-orange-600 hover:text-orange-700 font-medium">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>

                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="newsletter"
                        className="w-4 h-4 text-orange-600 border-gray-300 dark:border-gray-700 rounded focus:ring-orange-500 mt-1"
                      />
                      <label htmlFor="newsletter" className="text-sm text-gray-900 dark:text-gray-100">
                        I would like to receive updates about new courses and features
                      </label>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        type="submit" 
                        variant="fill" 
                        size="large" 
                        className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 border-0 text-white font-semibold py-3 rounded-xl shadow-lg"
                        disabled={loading || success}
                      >
                        {loading ? 'Creating Account...' : success ? 'Account Created!' : `Create ${selectedRole === 'instructor' ? 'Instructor' : 'Student'} Account`}
                      </Button>
                    </motion.div>
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
                    <motion.button 
                      type="button" 
                      onClick={handleGoogleSignUp}
                      disabled={loading}
                      className="w-full flex items-center justify-center space-x-3 px-6 py-3 font-medium border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200 dark:hover:border-red-800 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: loading ? 1 : 0.98 }}
                    >
                      <FaGoogle className="w-5 h-5" />
                      <span>{loading ? 'Signing up...' : 'Sign up with Google'}</span>
                    </motion.button>
                    <motion.button 
                      type="button" 
                      className="w-full flex items-center justify-center space-x-3 px-6 py-3 font-medium border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 dark:hover:border-blue-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaFacebook className="w-5 h-5" />
                      <span>Sign up with Facebook</span>
                    </motion.button>
                  </div>

                  {/* Login Link */}
                  <div className="mt-8 text-center">
                    <p className="text-gray-600 dark:text-gray-400">
                      Already have an account?{' '}
                      <Link 
                        to="/login" 
                        className="text-orange-600 hover:text-orange-700 font-medium"
                      >
                        Sign in here
                      </Link>
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

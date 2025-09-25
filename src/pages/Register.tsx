import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle, CheckCircle, GraduationCap, User, Plus, X, Shield } from 'lucide-react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Logo from '../components/ui/Logo';
import { useAuth } from '../hooks/useAuth';
import { type UserRole } from '../contexts/AuthContext';
import { validatePassword, getPasswordStrengthColor, getPasswordStrengthText } from '../utils/passwordValidation';

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
  
  // Instructor-specific form data
  const [instructorData, setInstructorData] = useState({
    specialties: [] as string[],
    experience: '',
    bio: '',
    education: '',
    certifications: [] as string[],
    website: '',
    linkedin: '',
    twitter: ''
  });
  
  const [newSpecialty, setNewSpecialty] = useState('');
  const [newCertification, setNewCertification] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState<{
    isValid: boolean;
    errors: string[];
    strength: 'weak' | 'medium' | 'strong';
  }>({ isValid: false, errors: [], strength: 'weak' });
  
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


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate password in real-time
    if (name === 'password') {
      const validation = validatePassword(value);
      setPasswordValidation(validation);
    }
  };

  const handleInstructorDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInstructorData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addSpecialty = () => {
    if (newSpecialty.trim() && !instructorData.specialties.includes(newSpecialty.trim())) {
      setInstructorData(prev => ({
        ...prev,
        specialties: [...prev.specialties, newSpecialty.trim()]
      }));
      setNewSpecialty('');
    }
  };

  const removeSpecialty = (specialty: string) => {
    setInstructorData(prev => ({
      ...prev,
      specialties: prev.specialties.filter(s => s !== specialty)
    }));
  };

  const addCertification = () => {
    if (newCertification.trim() && !instructorData.certifications.includes(newCertification.trim())) {
      setInstructorData(prev => ({
        ...prev,
        certifications: [...prev.certifications, newCertification.trim()]
      }));
      setNewCertification('');
    }
  };

  const removeCertification = (certification: string) => {
    setInstructorData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(c => c !== certification)
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

    // Use the password validation utility
    if (!passwordValidation.isValid) {
      setError(passwordValidation.errors[0] || 'Password does not meet requirements');
      setLoading(false);
      return;
    }

    // Instructor-specific validation
    if (selectedRole === 'instructor') {
      if (instructorData.specialties.length === 0) {
        setError('Please add at least one specialty');
        setLoading(false);
        return;
      }
      if (!instructorData.experience.trim()) {
        setError('Please provide your experience');
        setLoading(false);
        return;
      }
      if (!instructorData.bio.trim()) {
        setError('Please provide a bio');
        setLoading(false);
        return;
      }
    }

    try {
      // Pass instructor data to signUp function
      await signUp(formData.email, formData.password, formData.fullName, selectedRole, instructorData);
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
                      
                      {/* Password Strength Indicator */}
                      {formData.password && (
                        <div className="mt-2">
                          <div className="flex items-center space-x-2 mb-1">
                            <Shield className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">Password Strength:</span>
                            <span className={`text-sm px-2 py-1 rounded-full ${getPasswordStrengthColor(passwordValidation.strength)}`}>
                              {getPasswordStrengthText(passwordValidation.strength)}
                            </span>
                          </div>
                          
                          {/* Password Requirements */}
                          <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                            <div className={`flex items-center space-x-1 ${passwordValidation.errors.includes('Password must be at least 8 characters long') ? 'text-red-500' : 'text-green-500'}`}>
                              <div className={`w-2 h-2 rounded-full ${passwordValidation.errors.includes('Password must be at least 8 characters long') ? 'bg-red-500' : 'bg-green-500'}`}></div>
                              <span>At least 8 characters</span>
                            </div>
                            <div className={`flex items-center space-x-1 ${passwordValidation.errors.includes('Password must contain at least one uppercase letter') ? 'text-red-500' : 'text-green-500'}`}>
                              <div className={`w-2 h-2 rounded-full ${passwordValidation.errors.includes('Password must contain at least one uppercase letter') ? 'bg-red-500' : 'bg-green-500'}`}></div>
                              <span>One uppercase letter</span>
                            </div>
                            <div className={`flex items-center space-x-1 ${passwordValidation.errors.includes('Password must contain at least one lowercase letter') ? 'text-red-500' : 'text-green-500'}`}>
                              <div className={`w-2 h-2 rounded-full ${passwordValidation.errors.includes('Password must contain at least one lowercase letter') ? 'bg-red-500' : 'bg-green-500'}`}></div>
                              <span>One lowercase letter</span>
                            </div>
                            <div className={`flex items-center space-x-1 ${passwordValidation.errors.includes('Password must contain at least one number') ? 'text-red-500' : 'text-green-500'}`}>
                              <div className={`w-2 h-2 rounded-full ${passwordValidation.errors.includes('Password must contain at least one number') ? 'bg-red-500' : 'bg-green-500'}`}></div>
                              <span>One number</span>
                            </div>
                            <div className={`flex items-center space-x-1 ${passwordValidation.errors.includes('Password must contain at least one special character') ? 'text-red-500' : 'text-green-500'}`}>
                              <div className={`w-2 h-2 rounded-full ${passwordValidation.errors.includes('Password must contain at least one special character') ? 'bg-red-500' : 'bg-green-500'}`}></div>
                              <span>One special character</span>
                            </div>
                          </div>
                        </div>
                      )}
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

                    {/* Instructor-specific fields */}
                    {selectedRole === 'instructor' && (
                      <div className="space-y-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                        <div className="text-center">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            Instructor Information
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Help us learn more about your expertise
                          </p>
                        </div>

                        {/* Specialties */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Specialties *
                          </label>
                          <div className="flex space-x-2 mb-2">
                            <input
                              type="text"
                              placeholder="e.g., React, JavaScript, Python"
                              value={newSpecialty}
                              onChange={(e) => setNewSpecialty(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecialty())}
                              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            />
                            <button
                              type="button"
                              onClick={addSpecialty}
                              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {instructorData.specialties.map((specialty) => (
                              <span
                                key={specialty}
                                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                              >
                                {specialty}
                                <button
                                  type="button"
                                  onClick={() => removeSpecialty(specialty)}
                                  className="ml-2 hover:text-orange-600"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Experience */}
                        <Input
                          label="Experience *"
                          type="text"
                          name="experience"
                          placeholder="e.g., 5+ years in web development"
                          value={instructorData.experience}
                          onChange={handleInstructorDataChange}
                          required
                        />

                        {/* Bio */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Bio *
                          </label>
                          <textarea
                            name="bio"
                            placeholder="Tell us about yourself and your teaching experience..."
                            value={instructorData.bio}
                            onChange={handleInstructorDataChange}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
                            required
                          />
                        </div>

                        {/* Education */}
                        <Input
                          label="Education"
                          type="text"
                          name="education"
                          placeholder="e.g., Bachelor's in Computer Science"
                          value={instructorData.education}
                          onChange={handleInstructorDataChange}
                        />

                        {/* Certifications */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Certifications
                          </label>
                          <div className="flex space-x-2 mb-2">
                            <input
                              type="text"
                              placeholder="e.g., AWS Certified, Google Analytics"
                              value={newCertification}
                              onChange={(e) => setNewCertification(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCertification())}
                              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            />
                            <button
                              type="button"
                              onClick={addCertification}
                              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {instructorData.certifications.map((certification) => (
                              <span
                                key={certification}
                                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              >
                                {certification}
                                <button
                                  type="button"
                                  onClick={() => removeCertification(certification)}
                                  className="ml-2 hover:text-blue-600"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Social Links */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <Input
                            label="Website"
                            type="url"
                            name="website"
                            placeholder="https://yourwebsite.com"
                            value={instructorData.website}
                            onChange={handleInstructorDataChange}
                          />
                          <Input
                            label="LinkedIn"
                            type="url"
                            name="linkedin"
                            placeholder="https://linkedin.com/in/yourprofile"
                            value={instructorData.linkedin}
                            onChange={handleInstructorDataChange}
                          />
                          <Input
                            label="Twitter"
                            type="url"
                            name="twitter"
                            placeholder="https://twitter.com/yourhandle"
                            value={instructorData.twitter}
                            onChange={handleInstructorDataChange}
                          />
                        </div>
                      </div>
                    )}

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

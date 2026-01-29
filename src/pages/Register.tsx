import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Logo from '../components/ui/Logo';
import { useAuth } from '../hooks/useAuth';
import { type UserRole } from '../contexts/AuthContext';
import { validatePassword } from '../utils/passwordValidation';
import {
  AnimatedBackground,
  RoleSelectionPanel,
  PasswordStrengthIndicator,
  InstructorFields,
  SocialAuthButtons,
} from '../components/register';

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
      <AnimatedBackground />

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
              <RoleSelectionPanel 
                selectedRole={selectedRole} 
                onRoleChange={setSelectedRole} 
              />

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
                        <PasswordStrengthIndicator validation={passwordValidation} />
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
                      <InstructorFields
                        instructorData={instructorData}
                        onInstructorDataChange={handleInstructorDataChange}
                        newSpecialty={newSpecialty}
                        setNewSpecialty={setNewSpecialty}
                        onAddSpecialty={addSpecialty}
                        onRemoveSpecialty={removeSpecialty}
                        newCertification={newCertification}
                        setNewCertification={setNewCertification}
                        onAddCertification={addCertification}
                        onRemoveCertification={removeCertification}
                      />
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

                  <SocialAuthButtons onGoogleSignUp={handleGoogleSignUp} loading={loading} />
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

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Breadcrumb from '../components/ui/Breadcrumb';

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const breadcrumbItems = [
    { label: 'Homepage', href: '/' },
    { label: 'Register' }
  ];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register form submitted');
  };

  return (
    <div className="min-h-screen bg-bg-secondary">
      {/* Hero Section */}
      <section className="bg-bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-exo font-semibold text-text-primary mb-4">
              Register
            </h1>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Register Form */}
        <div className="max-w-md mx-auto mt-12">
          <div className="bg-bg-primary border border-border-primary rounded-card shadow-card p-8">
            <h2 className="text-2xl font-exo font-semibold text-text-primary mb-6 text-center">
              Create Account
            </h2>
            <p className="text-text-secondary text-center mb-8">
              Join MultiLearn today and start your learning journey with thousands of courses.
            </p>
            
            <form onSubmit={handleRegister} className="space-y-6">
              <Input
                label="Full Name"
                type="text"
                placeholder="Enter your full name*"
                required
              />

              <Input
                label="Email"
                type="email"
                placeholder="Enter your email*"
                required
              />
              
              <Input
                label="Username"
                type="text"
                placeholder="Choose a username*"
                required
              />
              
              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password*"
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

              <div className="relative">
                <Input
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password*"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-text-secondary hover:text-text-primary transition-colors"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 text-primary border-border-primary rounded focus:ring-primary mt-1"
                  required
                />
                <label htmlFor="terms" className="text-sm text-text-primary">
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
                  className="w-4 h-4 text-primary border-border-primary rounded focus:ring-primary mt-1"
                />
                <label htmlFor="newsletter" className="text-sm text-text-primary">
                  I would like to receive updates about new courses and features
                </label>
              </div>

              <Button type="submit" variant="fill" size="large" className="w-full">
                Create Account
              </Button>
            </form>

            {/* Divider */}
            <div className="my-8">
              <div className="flex items-center">
                <div className="flex-1 border-t border-border-primary"></div>
                <div className="px-4 text-sm text-text-secondary font-medium">Or sign up with</div>
                <div className="flex-1 border-t border-border-primary"></div>
              </div>
            </div>

            {/* Social Register */}
            <div className="space-y-3">
              <button 
                type="button" 
                className="w-full flex items-center justify-center space-x-3 px-6 py-2.5 text-button-lg font-medium border border-border-primary text-text-primary bg-bg-primary rounded-lg hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-2"
              >
                <FaGoogle className="w-5 h-5" />
                <span>Sign up with Google</span>
              </button>
              <button 
                type="button" 
                className="w-full flex items-center justify-center space-x-3 px-6 py-2.5 text-button-lg font-medium border border-border-primary text-text-primary bg-bg-primary rounded-lg hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2"
              >
                <FaFacebook className="w-5 h-5" />
                <span>Sign up with Facebook</span>
              </button>
            </div>

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-text-secondary">
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

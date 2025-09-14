import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Breadcrumb from '../components/ui/Breadcrumb';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const breadcrumbItems = [
    { label: 'Homepage', href: '/' },
    { label: 'Login' }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login form submitted');
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
            
            <form onSubmit={handleLogin} className="space-y-6">
              <Input
                label="Email or username"
                type="email"
                placeholder="Email or username*"
                required
              />
              
              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password*"
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
                <Link 
                  to="/forgot-password" 
                  className="text-sm link-primary"
                >
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" variant="fill" size="large" className="w-full">
                Sign In
              </Button>
            </form>

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

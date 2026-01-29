import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGoogle, FaFacebook } from 'react-icons/fa';

interface SocialAuthButtonsProps {
  onGoogleSignUp: () => void;
  loading: boolean;
}

const SocialAuthButtons: React.FC<SocialAuthButtonsProps> = ({ onGoogleSignUp, loading }) => {
  return (
    <>
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
          onClick={onGoogleSignUp}
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
    </>
  );
};

export default SocialAuthButtons;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, RefreshCw } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import Button from '../components/ui/Button';
import Breadcrumb from '../components/ui/Breadcrumb';

const EmailVerification: React.FC = () => {
  const { user, sendEmailVerification, isEmailVerified } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [isSending, setIsSending] = useState(false);
  const [lastSentTime, setLastSentTime] = useState<Date | null>(null);
  const [canResend, setCanResend] = useState(true);

  const breadcrumbItems = [
    { label: 'Homepage', href: '/' },
    { label: 'Email Verification' }
  ];

  // Check if user is already verified
  useEffect(() => {
    if (isEmailVerified) {
      navigate('/account');
    }
  }, [isEmailVerified, navigate]);

  // Check if user is logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleResendVerification = async () => {
    if (!canResend) return;
    
    setIsSending(true);
    try {
      await sendEmailVerification();
      setLastSentTime(new Date());
      setCanResend(false);
      
      // Allow resend after 60 seconds
      setTimeout(() => {
        setCanResend(true);
      }, 60000);
      
      addToast({
        type: 'success',
        title: 'Verification Email Sent',
        message: 'Please check your email and click the verification link.'
      });
    } catch (error: unknown) {
      addToast({
        type: 'error',
        title: 'Failed to Send Email',
        message: error instanceof Error ? error.message : 'Please try again later.'
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleRefreshStatus = () => {
    // Reload the page to check verification status
    window.location.reload();
  };

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-bg-secondary">
      {/* Hero Section */}
      <section className="bg-bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-exo font-semibold text-text-primary mb-4"
            >
              Verify Your Email
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-text-secondary"
            >
              Please verify your email address to continue
            </motion.p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Verification Card */}
        <div className="max-w-md mx-auto mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-bg-primary border border-border-primary rounded-card shadow-card p-8"
          >
            <div className="text-center">
              {/* Email Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Mail className="h-10 w-10 text-blue-600" />
              </motion.div>

              {/* Status Message */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-6"
              >
                <h2 className="text-2xl font-semibold text-text-primary mb-2">
                  Check Your Email
                </h2>
                <p className="text-text-secondary">
                  We've sent a verification link to:
                </p>
                <p className="font-medium text-text-primary mt-1">
                  {user.email}
                </p>
              </motion.div>

              {/* Instructions */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mb-8"
              >
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                  <h3 className="font-medium text-blue-900 mb-2">Next Steps:</h3>
                  <ol className="text-sm text-blue-800 space-y-1">
                    <li>1. Check your email inbox</li>
                    <li>2. Look for an email from MultiLearn</li>
                    <li>3. Click the verification link</li>
                    <li>4. Return to this page</li>
                  </ol>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="space-y-4"
              >
                <Button
                  variant="fill"
                  onClick={handleResendVerification}
                  disabled={isSending || !canResend}
                  className="w-full"
                >
                  {isSending ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="h-4 w-4 mr-2" />
                      Resend Verification Email
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  onClick={handleRefreshStatus}
                  className="w-full"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  I've Verified My Email
                </Button>

                {lastSentTime && (
                  <p className="text-xs text-text-secondary">
                    Last sent: {lastSentTime.toLocaleTimeString()}
                    {!canResend && (
                      <span className="block text-orange-600">
                        You can resend in {Math.ceil((60000 - (Date.now() - lastSentTime.getTime())) / 1000)}s
                      </span>
                    )}
                  </p>
                )}
              </motion.div>

              {/* Help Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-8 pt-6 border-t border-border-primary"
              >
                <div className="text-left">
                  <h3 className="font-medium text-text-primary mb-2">Need Help?</h3>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Check your spam/junk folder</li>
                    <li>• Make sure you entered the correct email</li>
                    <li>• Contact support if you continue having issues</li>
                  </ul>
                </div>
              </motion.div>

              {/* Back to Login */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-6"
              >
                <Link
                  to="/login"
                  className="text-primary hover:text-primary-hover text-sm font-medium"
                >
                  ← Back to Login
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;

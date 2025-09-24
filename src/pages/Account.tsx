import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  BookOpen, 
  Star, 
  Settings, 
  LogOut,
  Edit3,
  Save,
  X,
  Eye,
  EyeOff,
  Camera,
  Bell,
  Shield,
  Award,
  Clock,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Share2
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useEnrollmentStore } from '../store/enrollmentStore';
// import { useToast } from '../contexts/ToastContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import ProgressVisualization from '../components/ui/ProgressVisualization';

const Account: React.FC = () => {
  const { user, signOut, updateUserProfile, updateUserPassword, sendEmailVerification, isEmailVerified } = useAuth();
  const { enrolledCourses, getLearningStats } = useEnrollmentStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    bio: '',
    location: '',
    website: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [profileImage] = useState<string | null>(null);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
    courseUpdates: true,
    announcements: true
  });
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showCourses: true,
    showProgress: true
  });

  // Get learning stats from enrollment store
  const learningStats = getLearningStats();
  
  // Enhanced progress data for visualization
  const progressData = {
    ...learningStats,
    currentStreak: 7,
    longestStreak: 15,
    certificates: learningStats.completedCourses
  };

  const [recentActivity] = useState([
    { id: 1, type: 'course_completed', title: 'React Fundamentals', time: '2 hours ago', icon: CheckCircle },
    { id: 2, type: 'certificate_earned', title: 'JavaScript Advanced', time: '1 day ago', icon: Award },
    { id: 3, type: 'course_started', title: 'Node.js Backend', time: '3 days ago', icon: BookOpen },
    { id: 4, type: 'achievement', title: '7 Day Streak!', time: '1 week ago', icon: TrendingUp }
  ]);

  // Use enrolled courses from store


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await updateUserProfile({
        displayName: formData.displayName
      });
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    setError('');
    setSuccess('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (formData.newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      await updateUserPassword(formData.newPassword);
      setSuccess('Password updated successfully!');
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleResendVerification = async () => {
    try {
      await sendEmailVerification();
      setSuccess('Verification email sent! Please check your inbox.');
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Failed to send verification email. Please try again.');
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'activity', label: 'Activity', icon: Clock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-700">
      {/* Hero Section */}
      <section className="bg-gray-50 dark:bg-gray-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-exo font-semibold text-gray-900 dark:text-gray-100 mb-4"
            >
              My Account
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600 dark:text-gray-400"
            >
              Manage your profile, courses, and preferences
            </motion.p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-12">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-card shadow-card p-6">
              {/* User Info */}
              <div className="text-center mb-6">
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center overflow-hidden">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User className="h-10 w-10 text-white" />
                    )}
                  </div>
                  <button className="absolute bottom-0 right-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <Camera className="h-3 w-3 text-white" />
                  </button>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {user?.displayName || 'User'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {user?.email}
                </p>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {learningStats.completedCourses} completed
                  </span>
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {learningStats.totalHours}h learned
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                  Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently'}
                </p>
              </div>

              {/* Navigation Tabs */}
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Sign Out Button */}
              <button
                onClick={handleSignOut}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors mt-6"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-card shadow-card p-8">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2 mb-6"
                >
                  <span className="text-sm">{error}</span>
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center space-x-2 mb-6"
                >
                  <span className="text-sm">{success}</span>
                </motion.div>
              )}

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Profile Information</h2>
                    {!isEditing && (
                      <Button
                        variant="outline"
                        size="small"
                        onClick={() => setIsEditing(true)}
                      >
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    )}
                  </div>

                  <div className="space-y-6">
                    {/* Enhanced Learning Progress Visualization */}
                    <ProgressVisualization data={progressData} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                          Full Name
                        </label>
                        {isEditing ? (
                          <Input
                            name="displayName"
                            value={formData.displayName}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                          />
                        ) : (
                          <p className="text-gray-600 dark:text-gray-400 py-2">
                            {user?.displayName || 'Not provided'}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                          Email Address
                        </label>
                        <div className="flex items-center space-x-2">
                          <p className="text-gray-600 dark:text-gray-400 py-2">
                            {user?.email}
                          </p>
                          {isEmailVerified ? (
                            <div className="flex items-center space-x-1 text-green-600">
                              <CheckCircle className="h-4 w-4" />
                              <span className="text-xs font-medium">Verified</span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-1 text-orange-600">
                              <AlertTriangle className="h-4 w-4" />
                              <span className="text-xs font-medium">Unverified</span>
                            </div>
                          )}
                        </div>
                        {!isEmailVerified && (
                          <button
                            onClick={handleResendVerification}
                            className="text-xs text-blue-600 hover:text-blue-700 underline mt-1"
                          >
                            Resend verification email
                          </button>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                          Bio
                        </label>
                        {isEditing ? (
                          <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                            placeholder="Tell us about yourself..."
                            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            rows={3}
                          />
                        ) : (
                          <p className="text-gray-600 dark:text-gray-400 py-2">
                            {formData.bio || 'No bio provided'}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                          Location
                        </label>
                        {isEditing ? (
                          <Input
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="Your location"
                          />
                        ) : (
                          <p className="text-gray-600 dark:text-gray-400 py-2">
                            {formData.location || 'Not specified'}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                          Website
                        </label>
                        {isEditing ? (
                          <Input
                            name="website"
                            value={formData.website}
                            onChange={handleInputChange}
                            placeholder="https://yourwebsite.com"
                          />
                        ) : (
                          <p className="text-gray-600 dark:text-gray-400 py-2">
                            {formData.website || 'Not provided'}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                          Member Since
                        </label>
                        <p className="text-gray-600 dark:text-gray-400 py-2">
                          {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently'}
                        </p>
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex space-x-4">
                        <Button
                          variant="fill"
                          onClick={handleSaveProfile}
                          disabled={loading}
                        >
                          <Save className="h-4 w-4 mr-2" />
                          {loading ? 'Saving...' : 'Save Changes'}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsEditing(false);
                            setFormData(prev => ({
                              ...prev,
                              displayName: user?.displayName || ''
                            }));
                          }}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Account Settings</h2>
                  
                  <div className="space-y-8">
                    {/* Change Password */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <div className="relative">
                          <Input
                            label="New Password"
                            type={showPassword ? 'text' : 'password'}
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            placeholder="Enter new password"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-9 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>

                        <Input
                          label="Confirm New Password"
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          placeholder="Confirm new password"
                        />

                        <Button
                          variant="fill"
                          onClick={handleChangePassword}
                          disabled={loading || !formData.newPassword || !formData.confirmPassword}
                        >
                          {loading ? 'Updating...' : 'Update Password'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* My Courses Tab */}
              {activeTab === 'courses' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">My Courses</h2>
                    <Button variant="outline" size="small">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Browse More
                    </Button>
                  </div>
                  
                  {enrolledCourses.length === 0 ? (
                    <div className="text-center py-12">
                      <BookOpen className="h-16 w-16 text-gray-600 dark:text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">No courses enrolled yet</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">Start your learning journey by enrolling in courses</p>
                      <Button variant="fill" onClick={() => window.location.href = '/courses'}>
                        <BookOpen className="h-4 w-4 mr-2" />
                        Browse Courses
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {enrolledCourses.map((course) => (
                        <motion.div
                          key={course.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-card shadow-card overflow-hidden"
                        >
                          <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                            <div className="absolute inset-0 bg-black/20"></div>
                            <div className="absolute top-4 right-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                course.status === 'completed' ? 'bg-green-100 text-green-800' :
                                course.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {course.status === 'completed' ? 'Completed' :
                                 course.status === 'in_progress' ? 'In Progress' : 'Not Started'}
                              </span>
                            </div>
                          </div>
                          <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{course.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">by {course.instructor}</p>
                            
                            <div className="mb-4">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600 dark:text-gray-400">Progress</span>
                                <span className="text-gray-900 dark:text-gray-100 font-medium">{course.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${course.progress}%` }}
                                ></div>
                              </div>
                              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-1">
                                <span>{course.completedLessons} of {course.totalLessons} lessons</span>
                                <span>{course.estimatedDuration}</span>
                              </div>
                            </div>
                            
                            <div className="flex space-x-2">
                              <Button variant="fill" size="small" className="flex-1">
                                {course.status === 'completed' ? 'View Certificate' : 'Continue'}
                              </Button>
                              <Button variant="outline" size="small">
                                <Share2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              )}


              {/* Activity Tab */}
              {activeTab === 'activity' && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Recent Activity</h2>
                  
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => {
                      const Icon = activity.icon;
                      return (
                        <motion.div
                          key={activity.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex items-center space-x-4"
                        >
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                            <Icon className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-900 dark:text-gray-100 font-medium">{activity.title}</p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{activity.time}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Notification Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Email Notifications</h3>
                      <div className="space-y-4">
                        {Object.entries(notifications).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between">
                            <div>
                              <p className="text-gray-900 dark:text-gray-100 font-medium capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </p>
                              <p className="text-gray-600 dark:text-gray-400 text-sm">
                                {key === 'email' && 'Receive notifications via email'}
                                {key === 'push' && 'Receive push notifications'}
                                {key === 'marketing' && 'Receive marketing emails and promotions'}
                                {key === 'courseUpdates' && 'Get notified about course updates'}
                                {key === 'announcements' && 'Receive platform announcements'}
                              </p>
                            </div>
                            <button
                              onClick={() => setNotifications(prev => ({ ...prev, [key]: !value }))}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                value ? 'bg-blue-600' : 'bg-gray-200'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  value ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Tab */}
              {activeTab === 'privacy' && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Privacy Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Profile Visibility</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                            Profile Visibility
                          </label>
                          <select
                            value={privacy.profileVisibility}
                            onChange={(e) => setPrivacy(prev => ({ ...prev, profileVisibility: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          >
                            <option value="public">Public</option>
                            <option value="friends">Friends Only</option>
                            <option value="private">Private</option>
                          </select>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-gray-900 dark:text-gray-100 font-medium">Show Email Address</p>
                              <p className="text-gray-600 dark:text-gray-400 text-sm">Allow others to see your email</p>
                            </div>
                            <button
                              onClick={() => setPrivacy(prev => ({ ...prev, showEmail: !prev.showEmail }))}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                privacy.showEmail ? 'bg-blue-600' : 'bg-gray-200'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  privacy.showEmail ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-gray-900 dark:text-gray-100 font-medium">Show Enrolled Courses</p>
                              <p className="text-gray-600 dark:text-gray-400 text-sm">Display your course progress to others</p>
                            </div>
                            <button
                              onClick={() => setPrivacy(prev => ({ ...prev, showCourses: !prev.showCourses }))}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                privacy.showCourses ? 'bg-blue-600' : 'bg-gray-200'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  privacy.showCourses ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Account;

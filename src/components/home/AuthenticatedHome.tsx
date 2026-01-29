import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Clock, Star, TrendingUp, Award, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEnrollmentStore } from '../../store/enrollmentStore';
import { type AppUser } from '../../contexts/AuthContext';
import EnrollmentButton from '../course/EnrollmentButton';
import { getFeaturedCourses } from '../../data/courseData';

interface AuthenticatedHomeProps {
  user: AppUser;
}

const AuthenticatedHome: React.FC<AuthenticatedHomeProps> = ({ user }) => {
  const { getLearningStats, getCoursesByStatus } = useEnrollmentStore();
  
  const learningStats = getLearningStats();
  const inProgressCourses = getCoursesByStatus('in_progress');

  // Get featured courses from centralized data
  const recommendedCourses = getFeaturedCourses(3);

  return (
    <>
      {/* Personalized Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 py-20 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                  Welcome back, {user.displayName?.split(' ')[0] || 'Student'}! 👋
                </h1>
                <p className="text-lg sm:text-xl text-blue-100 leading-relaxed">
                  Ready to continue your learning journey? Let's pick up where you left off.
                </p>
              </motion.div>
              
              <motion.div
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">{learningStats.totalCourses}</div>
                  <div className="text-sm text-blue-100">Courses Enrolled</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">{learningStats.completedCourses}</div>
                  <div className="text-sm text-blue-100">Courses Completed</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">{learningStats.totalHours}h</div>
                  <div className="text-sm text-blue-100">Hours Learned</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">{learningStats.averageProgress}%</div>
                  <div className="text-sm text-blue-100">Avg Progress</div>
                </div>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              >
                <Link
                  to="/courses"
                  className="inline-block bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors"
                >
                  Continue Learning
                </Link>
                <Link
                  to="/account"
                  className="inline-block bg-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/30 transition-colors backdrop-blur-sm"
                >
                  View Profile
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              <div className="relative z-10">
                <motion.img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=600&fit=crop&crop=face"
                  alt="Student learning"
                  className="w-full h-auto rounded-lg shadow-2xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <motion.div 
                className="absolute top-10 right-10 text-2xl sm:text-4xl md:text-6xl font-bold text-white opacity-30 z-0 hidden sm:block"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                KEEP LEARNING
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Continue Learning Section */}
      {inProgressCourses.length > 0 && (
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="flex justify-between items-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Continue Learning
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Pick up where you left off
                </p>
              </div>
              <Link
                to="/courses"
                className="group relative bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 active:scale-95 overflow-hidden"
              >
                <span className="relative z-10">View All Courses</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-600"></div>
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {inProgressCourses.slice(0, 3).map((course) => (
                <motion.div 
                  key={course.id}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500/20"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {course.category}
                    </div>
                    <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {course.progress}% Complete
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">by {course.instructor}</p>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">Progress</span>
                        <span className="text-gray-900 dark:text-gray-100 font-medium">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.estimatedDuration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                      </div>
                    </div>

                    <Link
                      to={`/courses/${course.id}`}
                      className="w-full bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-center block"
                    >
                      Continue Course
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recommended Courses Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex justify-between items-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Recommended for You
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Based on your learning interests
              </p>
            </div>
            <Link
              to="/courses"
              className="group relative bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25 active:scale-95 overflow-hidden"
            >
              <span className="relative z-10">Explore All</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-600"></div>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendedCourses.map((course) => (
              <motion.div 
                key={course.id}
                className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500/20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {course.category}
                  </div>
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Recommended
                  </div>
                </div>
                <div className="p-6">
                  <Link to={`/courses/${course.id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 cursor-pointer">
                      {course.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300">by {course.instructor.name}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{course.students} Students</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{course.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">${course.price}</span>
                      {course.originalPrice && (
                        <span className="text-lg text-gray-500 dark:text-gray-500 line-through">${course.originalPrice}</span>
                      )}
                    </div>
                    <EnrollmentButton
                      courseId={course.id}
                      courseTitle={course.title}
                      instructor={course.instructor.name}
                      thumbnail={course.image}
                      totalLessons={course.lessons}
                      estimatedDuration={course.duration}
                      difficulty={course.level}
                      category={course.category}
                      rating={course.rating}
                      description={course.description}
                      variant="card"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Statistics Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Your Learning Journey
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Track your progress and achievements
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { 
                value: learningStats.totalCourses.toString(), 
                label: 'Courses Enrolled',
                icon: BookOpen,
                color: 'text-blue-600'
              },
              { 
                value: learningStats.completedCourses.toString(), 
                label: 'Courses Completed',
                icon: Award,
                color: 'text-green-600'
              },
              { 
                value: learningStats.totalHours.toString() + 'h', 
                label: 'Hours Learned',
                icon: Clock,
                color: 'text-orange-600'
              },
              { 
                value: learningStats.averageProgress.toString() + '%', 
                label: 'Average Progress',
                icon: Target,
                color: 'text-purple-600'
              }
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                className="group text-center p-6 rounded-xl hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 cursor-pointer bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-center mb-4">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                  <span className="inline-block group-hover:animate-pulse">{stat.value}</span>
                </div>
                <div className="text-lg text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300">
                  {stat.label}
                </div>
                <div className="mt-4 mx-auto w-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full group-hover:w-16 transition-all duration-500"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Quick Actions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Access your most important features
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Browse Courses',
                description: 'Explore new learning opportunities',
                icon: BookOpen,
                link: '/courses',
                color: 'from-blue-500 to-cyan-500',
                bgColor: 'bg-blue-50 dark:bg-blue-900/20'
              },
              {
                title: 'My Favorites',
                description: 'View your saved courses and articles',
                icon: Star,
                link: '/favorites',
                color: 'from-yellow-500 to-orange-500',
                bgColor: 'bg-yellow-50 dark:bg-yellow-900/20'
              },
              {
                title: 'Account Settings',
                description: 'Manage your profile and preferences',
                icon: Users,
                link: '/account',
                color: 'from-green-500 to-emerald-500',
                bgColor: 'bg-green-50 dark:bg-green-900/20'
              },
              {
                title: 'Learning Progress',
                description: 'Track your achievements and progress',
                icon: TrendingUp,
                link: '/account?tab=progress',
                color: 'from-purple-500 to-violet-500',
                bgColor: 'bg-purple-50 dark:bg-purple-900/20'
              }
            ].map((action, index) => (
              <motion.div 
                key={index}
                className="group relative bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                <Link to={action.link} className="block">
                  <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  <div className="relative mb-4">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${action.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                      <action.icon className={`w-8 h-8 bg-gradient-to-r ${action.color} bg-clip-text text-transparent`} />
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300">
                    {action.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex justify-between items-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Latest Articles
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Stay updated with learning insights
              </p>
            </div>
            <Link
              to="/blog"
              className="group relative bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25 active:scale-95 overflow-hidden"
            >
              <span className="relative z-10">All Articles</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-600"></div>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                id: "1",
                title: "Best MultiLearn WordPress Theme Collection For 2024",
                date: "Jan 24, 2024",
                description: "Looking for an amazing & well functional MultiLearn WordPress Theme? Here are the best collection of themes for your e-learning platform.",
                image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop"
              },
              {
                id: "2",
                title: "Complete Guide to Building an Online Learning Platform",
                date: "Jan 20, 2024",
                description: "Learn how to create a comprehensive online learning platform with modern features and best practices for student engagement.",
                image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop"
              },
              {
                id: "3",
                title: "Top 10 E-Learning Trends for 2024",
                date: "Jan 18, 2024",
                description: "Discover the latest trends in e-learning that will shape the future of online education and student learning experiences.",
                image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=250&fit=crop"
              }
            ].map((article, index) => (
              <Link key={index} to={`/blog/${article.id}`} className="block">
                <motion.div 
                  className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500/20"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mb-3">{article.date}</p>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300">
                      {article.description}
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AuthenticatedHome;

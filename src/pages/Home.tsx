import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, Users, Clock, Star, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import EnrollmentButton from '../components/course/EnrollmentButton';

const Home: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900">
      <section className="relative bg-gradient-to-r from-yellow-200 via-yellow-100 to-green-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1 
                className="text-4xl md:text-6xl font-bold leading-tight text-gray-900"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                Build Skills With Online Course
              </motion.h1>
              <motion.p 
                className="text-lg text-gray-600 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                We denounce with righteous indignation and dislike men who are so beguiled and demoralized that cannot trouble.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              >
                <Link
                  to="/courses"
                  className="inline-block bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors"
                >
                  Explore Course
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
                className="absolute top-10 right-10 text-6xl font-bold text-white opacity-30 z-0"
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
                ONE SCHOOL
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Top Categories Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex justify-between items-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Top Categories
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Explore our Popular Categories
              </p>
            </motion.div>
            <Link
              to="/categories"
              className="group relative bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-900/25 active:scale-95 overflow-hidden"
            >
              <span className="relative z-10">All Categories</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-600"></div>
            </Link>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              { name: 'Art & Design', icon: '🎨', courses: 38, color: 'from-pink-500 to-rose-500', bgColor: 'bg-pink-50 dark:bg-pink-900/20' },
              { name: 'Development', icon: '⚙️', courses: 42, color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
              { name: 'Communication', icon: '💬', courses: 25, color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-50 dark:bg-green-900/20' },
              { name: 'Videography', icon: '🎥', courses: 18, color: 'from-purple-500 to-violet-500', bgColor: 'bg-purple-50 dark:bg-purple-900/20' },
              { name: 'Photography', icon: '📸', courses: 35, color: 'from-orange-500 to-amber-500', bgColor: 'bg-orange-50 dark:bg-orange-900/20' },
              { name: 'Marketing', icon: '📈', courses: 28, color: 'from-red-500 to-pink-500', bgColor: 'bg-red-50 dark:bg-red-900/20' },
              { name: 'Content Writing', icon: '✍️', courses: 22, color: 'from-indigo-500 to-blue-500', bgColor: 'bg-indigo-50 dark:bg-indigo-900/20' },
              { name: 'Finance', icon: '💰', courses: 31, color: 'from-yellow-500 to-orange-500', bgColor: 'bg-yellow-50 dark:bg-yellow-900/20' },
            ].map((category, index) => (
              <motion.div 
                key={index} 
                className="group relative bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Icon with animated background */}
                <div className="relative mb-4">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${category.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{category.icon}</span>
                  </div>
                  {/* Floating particles effect */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
                </div>
                
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300">
                  {category.courses} Courses
                </p>
                
                {/* Progress bar animation */}
                <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 overflow-hidden">
                  <motion.div 
                    className={`h-1 bg-gradient-to-r ${category.color} rounded-full`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${Math.min((category.courses / 50) * 100, 100)}%` }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                    viewport={{ once: true }}
                  />
                </div>
                
                {/* Hover effect border */}
                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-indigo-500/20 transition-colors duration-300"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Featured Courses
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Explore our Popular Courses
              </p>
            </div>
            <Link
              to="/courses"
              className="group relative bg-text-indigo-600 dark:text-indigo-400 text-white px-6 py-3 rounded-lg font-semibold hover:bg-neutral-800 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-900/25 active:scale-95 overflow-hidden"
            >
              <span className="relative z-10">All Courses</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-600"></div>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                title: 'Create An LMS Website With LearnPress',
                instructor: 'Deemed Partner',
                category: 'Photography',
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop',
                weeks: 5,
                students: 156,
                rating: 4.8,
                price: 200,
                originalPrice: null,
                isFree: true
              },
              {
                id: 2,
                title: 'Complete WordPress Theme Development',
                instructor: 'John Smith',
                category: 'Development',
                image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
                weeks: 8,
                students: 234,
                rating: 4.9,
                price: 49,
                originalPrice: 800,
                isFree: false
              },
              {
                id: 3,
                title: 'Advanced React Development Course',
                instructor: 'Sarah Johnson',
                category: 'Development',
                image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
                weeks: 6,
                students: 189,
                rating: 4.7,
                price: 99,
                originalPrice: 150,
                isFree: false
              },
              {
                id: 4,
                title: 'Digital Marketing Masterclass',
                instructor: 'Mike Chen',
                category: 'Marketing',
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
                weeks: 4,
                students: 312,
                rating: 4.6,
                price: 79,
                originalPrice: 120,
                isFree: false
              },
              {
                id: 5,
                title: 'UI/UX Design Fundamentals',
                instructor: 'Emma Wilson',
                category: 'Art & Design',
                image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=250&fit=crop',
                weeks: 7,
                students: 145,
                rating: 4.8,
                price: 89,
                originalPrice: 130,
                isFree: false
              },
              {
                id: 6,
                title: 'Python Programming for Beginners',
                instructor: 'David Brown',
                category: 'Development',
                image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop',
                weeks: 10,
                students: 456,
                rating: 4.9,
                price: 59,
                originalPrice: 100,
                isFree: false
              }
            ].map((course) => (
              <div key={course.id} className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500/20">
                <div className="relative overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold transition-all duration-300 group-hover:scale-105 group-hover:bg-blue-500">
                    {course.category}
                  </div>
                  {/* Hover overlay with play button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300">by {course.instructor}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.weeks} Weeks</span>
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
                      {course.isFree ? (
                        <span className="text-2xl font-bold text-green-600">Free</span>
                      ) : (
                        <>
                        <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">${course.price}</span>
                        {course.originalPrice && (
                          <span className="text-lg text-gray-500 dark:text-gray-500 line-through">${course.originalPrice}</span>
                        )}
                        </>
                      )}
                    </div>
                    <EnrollmentButton
                      courseId={course.id.toString()}
                      courseTitle={course.title}
                      instructor={course.instructor}
                      thumbnail={course.image}
                      totalLessons={course.weeks * 4} // Estimate 4 lessons per week
                      estimatedDuration={`${course.weeks} weeks`}
                      difficulty="intermediate"
                      category={course.category}
                      rating={course.rating}
                      description=""
                      variant="card"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LearnPress Add-Ons Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">GET MORE POWER FROM</h3>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">MultiLearn Add-Ons</h2>
              </div>
              <p className="text-lg text-blue-100 leading-relaxed">
                The next level of MultiLearn - LMS WordPress Plugin. More Powerful, Flexible and Magical here.
              </p>
              <Link
                to="/addons"
                className="inline-block bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors"
              >
                Explore Course
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: '🛒', name: 'WooCommerce' },
                { icon: '💳', name: 'Stripe' },
                { icon: '💬', name: 'Chat' },
                { icon: '📊', name: 'Analytics' },
                { icon: '🎓', name: 'Certificates' },
                { icon: '📱', name: 'Mobile' },
                { icon: '🔐', name: 'Security' },
                { icon: '⚡', name: 'Performance' }
              ].map((addon, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/20 transition-colors">
                  <div className="text-3xl mb-3">{addon.icon}</div>
                  <p className="font-semibold">{addon.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '25K+', label: 'Active Students' },
              { value: '899', label: 'Total Courses' },
              { value: '158', label: 'Instructor' },
              { value: '100%', label: 'Satisfaction Rate' }
            ].map((stat, index) => (
              <div key={index} className="group text-center p-6 rounded-xl hover:bg-gray-50 dark:bg-gray-700 transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                  <span className="inline-block group-hover:animate-pulse">{stat.value}</span>
                </div>
                <div className="text-lg text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300">
                  {stat.label}
                </div>
                {/* Decorative element */}
                <div className="mt-4 mx-auto w-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full group-hover:w-16 transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grow Your Skill Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                alt="Students learning"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
                Grow Your Skill With MultiLearn LMS
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                We denounce with righteous indignation and dislike men who are so beguiled and demoralized that cannot trouble.
              </p>
              <div className="space-y-4">
                {[
                  'Certification',
                  'Expert Instructors',
                  'Lifetime Access',
                  '24/7 Support',
                  'Mobile Learning'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/courses"
                className="inline-block bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors"
              >
                Explorer Course
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Education WordPress Theme Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">PROVIDING AMAZING</h3>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Education WordPress Theme</h2>
              </div>
              <p className="text-lg text-blue-100 leading-relaxed">
                The next level of LMS WordPress Theme. Learn anytime and anywhere.
              </p>
              <Link
                to="/themes"
                className="inline-block bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors"
              >
                Explorer Course
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
                alt="Education theme showcase"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
              <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-lg font-bold">
                MULTILEARN BEST SELLING
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Feedbacks Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Student Feedbacks
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              What Students Say About MultiLearn LMS
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                feedback: "I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system and expound",
                author: "Roe Smith",
                title: "Designer"
              },
              {
                feedback: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum",
                author: "Jane Doe",
                title: "Developer"
              },
              {
                feedback: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words",
                author: "John Wilson",
                title: "Marketer"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-8">
                <div className="text-4xl text-indigo-600 dark:text-indigo-400 mb-4">"</div>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {testimonial.feedback}
                </p>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">{testimonial.author}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-500">{testimonial.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Let's Start Section */}
      <section className="py-20 bg-gradient-to-r from-purple-500 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-8">
            <GraduationCap className="w-12 h-12 mr-4" />
            <BookOpen className="w-12 h-12" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Let's Start With MultiLearn LMS
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register?role=student"
              className="bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              I'm A Student
            </Link>
            <Link
              to="/register?role=instructor"
              className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors"
            >
              Become An Instructor
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Latest Articles
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Explore our Free Articles
              </p>
            </div>
            <Link
              to="/blog"
              className="group relative bg-text-indigo-600 dark:text-indigo-400 text-white px-6 py-3 rounded-lg font-semibold hover:bg-neutral-800 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-900/25 active:scale-95 overflow-hidden"
            >
              <span className="relative z-10">All Articles</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-600"></div>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Best MultiLearn WordPress Theme Collection For 2024",
                date: "Jan 24, 2024",
                description: "Looking for an amazing & well functional MultiLearn WordPress Theme? Here are the best collection of themes for your e-learning platform.",
                image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop"
              },
              {
                title: "Complete Guide to Building an Online Learning Platform",
                date: "Jan 20, 2024",
                description: "Learn how to create a comprehensive online learning platform with modern features and best practices for student engagement.",
                image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop"
              },
              {
                title: "Top 10 E-Learning Trends for 2024",
                date: "Jan 18, 2024",
                description: "Discover the latest trends in e-learning that will shape the future of online education and student learning experiences.",
                image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=250&fit=crop"
              }
            ].map((article, index) => (
              <div key={index} className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500/20">
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
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

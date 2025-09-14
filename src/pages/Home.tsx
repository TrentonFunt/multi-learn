import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, Users, Clock, Star, CheckCircle } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="bg-bg-primary">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-yellow-200 via-yellow-100 to-green-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
                Build Skills With Online Course
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                We denounce with righteous indignation and dislike men who are so beguiled and demoralized that cannot trouble.
              </p>
              <Link
                to="/courses"
                className="inline-block bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors"
              >
                Explore Course
              </Link>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=600&fit=crop&crop=face"
                  alt="Student learning"
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
              </div>
              <div className="absolute top-10 right-10 text-6xl font-bold text-white opacity-30 z-0">
                ONE SCHOOL
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Categories Section */}
      <section className="py-20 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Top Categories
              </h2>
              <p className="text-lg text-text-secondary">
                Explore our Popular Categories
              </p>
            </div>
            <Link
              to="/categories"
              className="bg-text-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-neutral-800 transition-colors"
            >
              All Categories
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Art & Design', icon: '🎨', courses: 38 },
              { name: 'Development', icon: '⚙️', courses: 42 },
              { name: 'Communication', icon: '💬', courses: 25 },
              { name: 'Videography', icon: '🎥', courses: 18 },
              { name: 'Photography', icon: '📸', courses: 35 },
              { name: 'Marketing', icon: '📈', courses: 28 },
              { name: 'Content Writing', icon: '✍️', courses: 22 },
              { name: 'Finance', icon: '💰', courses: 31 },
            ].map((category, index) => (
              <div key={index} className="bg-bg-secondary rounded-lg p-6 text-center hover:bg-bg-tertiary transition-colors cursor-pointer">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="font-semibold text-text-primary mb-2">{category.name}</h3>
                <p className="text-sm text-text-secondary">{category.courses} Courses</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-20 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Featured Courses
              </h2>
              <p className="text-lg text-text-secondary">
                Explore our Popular Courses
              </p>
            </div>
            <Link
              to="/courses"
              className="bg-text-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-neutral-800 transition-colors"
            >
              All Courses
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
              <div key={course.id} className="bg-bg-primary border border-border-primary rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {course.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-text-secondary mb-4">by {course.instructor}</p>
                  
                  <div className="flex items-center justify-between text-sm text-text-tertiary mb-4">
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
                        <span className="text-2xl font-bold text-text-primary">${course.price}</span>
                        {course.originalPrice && (
                          <span className="text-lg text-text-tertiary line-through">${course.originalPrice}</span>
                        )}
                        </>
                      )}
                    </div>
                    <Link
                      to={`/courses/${course.id}`}
                      className="bg-gray-900 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                    >
                      View More
                    </Link>
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
      <section className="py-20 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '25K+', label: 'Active Students' },
              { value: '899', label: 'Total Courses' },
              { value: '158', label: 'Instructor' },
              { value: '100%', label: 'Satisfaction Rate' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-text-primary mb-2">{stat.value}</div>
                <div className="text-lg text-text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grow Your Skill Section */}
      <section className="py-20 bg-bg-secondary">
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
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
                Grow Your Skill With MultiLearn LMS
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed">
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
      <section className="py-20 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Student Feedbacks
            </h2>
            <p className="text-lg text-text-secondary">
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
              <div key={index} className="bg-bg-primary border border-border-primary rounded-lg shadow-lg p-8">
                <div className="text-4xl text-primary mb-4">"</div>
                <p className="text-text-secondary mb-6 leading-relaxed">
                  {testimonial.feedback}
                </p>
                <div>
                  <h4 className="font-semibold text-text-primary">{testimonial.author}</h4>
                  <p className="text-sm text-text-tertiary">{testimonial.title}</p>
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
              className="bg-bg-primary text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-bg-secondary transition-colors"
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
      <section className="py-20 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Latest Articles
              </h2>
              <p className="text-lg text-text-secondary">
                Explore our Free Articles
              </p>
            </div>
            <Link
              to="/blog"
              className="bg-text-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-neutral-800 transition-colors"
            >
              All Articles
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
              <div key={index} className="bg-bg-primary border border-border-primary rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-text-tertiary mb-3">{article.date}</p>
                  <p className="text-text-secondary leading-relaxed">
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

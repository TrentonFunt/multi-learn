import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import Breadcrumb from '../components/ui/Breadcrumb';

const Error: React.FC = () => {
  const breadcrumbItems = [
    { label: 'Homepage', href: '/' },
    { label: 'Error' }
  ];

  return (
    <div className="min-h-screen bg-neutral-light-grey">
      {/* Hero Section */}
      <section className="bg-neutral-light-grey py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-exo font-semibold text-absolute-black mb-4">
              Error
            </h1>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Error Content */}
        <div className="max-w-6xl mx-auto mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Error Illustration */}
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-card p-8 text-center">
                <div className="relative">
                  {/* Browser Window */}
                  <div className="bg-white rounded-lg shadow-lg p-6 mx-auto max-w-md">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    
                    {/* Large Question Mark */}
                    <div className="text-8xl text-green-500 font-bold mb-4">?</div>
                    
                    {/* Person with magnifying glass */}
                    <div className="flex justify-center">
                      <div className="relative">
                        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                            <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                          </div>
                        </div>
                        {/* Magnifying glass */}
                        <div className="absolute -right-2 -top-2 w-8 h-8 border-4 border-green-500 rounded-full">
                          <div className="absolute bottom-0 right-0 w-2 h-6 bg-green-500 transform rotate-45 origin-bottom"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 w-6 h-6 bg-red-400 rounded-lg transform rotate-45"></div>
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-yellow-400 rounded-full"></div>
                  <div className="absolute top-8 -left-8 w-3 h-3 bg-green-400 rounded-full"></div>
                  
                  {/* Background elements */}
                  <div className="absolute top-4 left-4 w-8 h-8 bg-blue-200 rounded-full opacity-50"></div>
                  <div className="absolute bottom-4 right-4 w-6 h-6 bg-purple-200 rounded-full opacity-50"></div>
                </div>
              </div>
            </div>

            {/* Error Message */}
            <div className="order-1 lg:order-2">
              <div className="text-center lg:text-left">
                <h2 className="text-6xl font-exo font-semibold text-absolute-black mb-4">
                  404
                </h2>
                <h3 className="text-3xl font-exo font-semibold text-neutral-dark-grey mb-6">
                  Page Not Found
                </h3>
                <p className="text-lg text-neutral-grey mb-8 leading-relaxed">
                  Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link to="/">
                    <Button variant="fill" size="large" className="flex items-center space-x-2">
                      <Home className="w-5 h-5" />
                      <span>Go Home</span>
                    </Button>
                  </Link>
                  
                  <Button 
                    variant="outline" 
                    size="large" 
                    className="flex items-center space-x-2"
                    onClick={() => window.history.back()}
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Go Back</span>
                  </Button>
                </div>

                <div className="mt-8 p-6 bg-neutral-white-grey rounded-card">
                  <h4 className="font-exo font-semibold text-neutral-dark-grey mb-3">
                    What can you do?
                  </h4>
                  <ul className="text-neutral-grey space-y-2 text-left">
                    <li>• Check the URL for typos</li>
                    <li>• Go back to the previous page</li>
                    <li>• Visit our homepage</li>
                    <li>• Browse our courses or blog</li>
                    <li>• Contact our support team</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Links */}
        <div className="max-w-6xl mx-auto mt-16">
          <div className="bg-absolute-white rounded-card shadow-card p-8">
            <h3 className="text-2xl font-exo font-semibold text-absolute-black text-center mb-8">
              Popular Pages
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link 
                to="/courses" 
                className="p-6 border border-neutral-white-grey rounded-card hover:border-primary hover:shadow-card transition-all group"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-700 transition-colors">
                    <span className="text-white text-xl">📚</span>
                  </div>
                  <h4 className="font-medium text-neutral-dark-grey group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Browse Courses
                  </h4>
                  <p className="text-sm text-neutral-grey mt-2">
                    Explore our wide range of courses
                  </p>
                </div>
              </Link>

              <Link 
                to="/blog" 
                className="p-6 border border-neutral-white-grey rounded-card hover:border-primary hover:shadow-card transition-all group"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-700 transition-colors">
                    <span className="text-white text-xl">📝</span>
                  </div>
                  <h4 className="font-medium text-neutral-dark-grey group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Read Blog
                  </h4>
                  <p className="text-sm text-neutral-grey mt-2">
                    Check out our latest articles
                  </p>
                </div>
              </Link>

              <Link 
                to="/contact" 
                className="p-6 border border-neutral-white-grey rounded-card hover:border-primary hover:shadow-card transition-all group"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-700 transition-colors">
                    <span className="text-white text-xl">💬</span>
                  </div>
                  <h4 className="font-medium text-neutral-dark-grey group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Contact Us
                  </h4>
                  <p className="text-sm text-neutral-grey mt-2">
                    Get help from our support team
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;

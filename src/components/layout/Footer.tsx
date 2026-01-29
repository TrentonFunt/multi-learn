import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaArrowUp } from 'react-icons/fa';
import { Mail, Phone, MapPin } from 'lucide-react';
import Logo from '../ui/Logo';
import NewsletterSubscription from '../ui/NewsletterSubscription';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Footer Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent shadow-sm"></div>
      
      <footer className="bg-gray-900 text-white relative border-t-2 border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <Logo size="md" />
              <p className="text-gray-400 text-sm leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>

            {/* Get Help */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">GET HELP</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-orange-400 transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-gray-400 hover:text-orange-400 transition-colors">
                    Latest Articles
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-gray-400 hover:text-orange-400 transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/languages" className="text-gray-400 hover:text-orange-400 transition-colors">
                    Languages
                  </Link>
                </li>
              </ul>
            </div>

            {/* Programs */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">PROGRAMS</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/categories/art-design" className="text-gray-400 hover:text-orange-400 transition-colors">
                    Art & Design
                  </Link>
                </li>
                <li>
                  <Link to="/categories/business" className="text-gray-400 hover:text-orange-400 transition-colors">
                    Business
                  </Link>
                </li>
                <li>
                  <Link to="/categories/it-software" className="text-gray-400 hover:text-orange-400 transition-colors">
                    IT & Software
                  </Link>
                </li>
                <li>
                  <Link to="/categories/languages" className="text-gray-400 hover:text-orange-400 transition-colors">
                    Languages
                  </Link>
                </li>
                <li>
                  <Link to="/categories/programming" className="text-gray-400 hover:text-orange-400 transition-colors">
                    Programming
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Us */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">CONTACT US</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-orange-400 mt-0.5" />
                  <span className="text-gray-400 text-sm">
                    Address: 2321 New Design Str, Lorem Ipsum 10 Hudson Yards, USA
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-orange-400" />
                  <span className="text-gray-400 text-sm">Tel: +(123) 2300 567 8988</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-orange-400" />
                  <span className="text-gray-400 text-sm">Mail: support@gmail.com</span>
                </div>
              </div>
              <div className="flex space-x-4 pt-4">
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                  <FaFacebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                  <FaTwitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                  <FaLinkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Stay Updated</h3>
              <NewsletterSubscription
                title=""
                description="Get the latest courses and updates delivered to your inbox."
                placeholder="Enter your email"
                buttonText="Subscribe"
                className="bg-gray-800 border-gray-700"
              />
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              Copyright © 2025 MultiLearn | All rights reserved
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition-colors z-50"
      >
        <FaArrowUp className="w-6 h-6" />
      </button>
    </>
  );
};

export default Footer;

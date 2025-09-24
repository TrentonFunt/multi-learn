import React from 'react';
import ContactHero from '../components/contact/ContactHero';
import ContactInfo from '../components/contact/ContactInfo';
import ContactMap from '../components/contact/ContactMap';
import LazyContactForm from '../components/contact/LazyContactForm';

const Contact: React.FC = () => {

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ContactHero />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Contact Information and Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <ContactInfo />
          <ContactMap />
        </div>

        {/* Contact Form Section */}
        <div className="max-w-4xl mx-auto">
            <LazyContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;

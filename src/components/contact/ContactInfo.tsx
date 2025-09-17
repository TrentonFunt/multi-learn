import React from 'react';
import { Phone, Mail } from 'lucide-react';

const ContactInfo: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Need A Direct Line?</h2>
      
      <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
        Cras massa et odio donec faucibus in. Vitae pretium massa dolor ullamcorper lectus elit quam.
      </p>

      <div className="space-y-6">
        {/* Phone */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-12 h-12 bg-orange-500 text-white rounded-lg">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Phone</h3>
            <p className="text-gray-600 dark:text-gray-400">(123) 456 7890</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-12 h-12 bg-orange-500 text-white rounded-lg">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Email</h3>
            <p className="text-gray-600 dark:text-gray-400">contact@thimpress.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;

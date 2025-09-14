import React from 'react';
import { Phone, Mail } from 'lucide-react';

const ContactInfo: React.FC = () => {
  return (
    <div className="bg-bg-primary border border-border-primary rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold text-text-primary mb-6">Need A Direct Line?</h2>
      
      <p className="text-text-secondary mb-8 leading-relaxed">
        Cras massa et odio donec faucibus in. Vitae pretium massa dolor ullamcorper lectus elit quam.
      </p>

      <div className="space-y-6">
        {/* Phone */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-12 h-12 bg-orange-500 text-white rounded-lg">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Phone</h3>
            <p className="text-text-secondary">(123) 456 7890</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-12 h-12 bg-orange-500 text-white rounded-lg">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Email</h3>
            <p className="text-text-secondary">contact@thimpress.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;

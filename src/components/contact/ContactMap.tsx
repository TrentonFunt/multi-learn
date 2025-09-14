import React from 'react';

const ContactMap: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="h-96 bg-gray-200 flex items-center justify-center">
        {/* Embedded Map - Using a placeholder for now */}
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Interactive Map</h3>
          <p className="text-gray-500 text-sm">Location: 2321 New Design Str, Lorem Ipsum 10 Hudson Yards, USA</p>
        </div>
      </div>
    </div>
  );
};

export default ContactMap;

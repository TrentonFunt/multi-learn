import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

interface Instructor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  bio: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

interface InstructorTabProps {
  instructor: Instructor;
}

const InstructorTab: React.FC<InstructorTabProps> = ({ instructor }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-start space-x-6">
        <div className="w-24 h-24 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-white text-2xl font-bold">
            {instructor.name.charAt(0)}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{instructor.name}</h3>
          <p className="text-lg text-gray-600 mb-4">{instructor.title}</p>
          <p className="text-gray-700 leading-relaxed mb-6">
            {instructor.bio}
          </p>
          <div className="flex space-x-4">
            {instructor.socialLinks.facebook && (
              <a href={instructor.socialLinks.facebook} className="text-gray-400 hover:text-blue-600 transition-colors">
                <FaFacebook className="w-6 h-6" />
              </a>
            )}
            {instructor.socialLinks.twitter && (
              <a href={instructor.socialLinks.twitter} className="text-gray-400 hover:text-blue-400 transition-colors">
                <FaTwitter className="w-6 h-6" />
              </a>
            )}
            {instructor.socialLinks.instagram && (
              <a href={instructor.socialLinks.instagram} className="text-gray-400 hover:text-pink-600 transition-colors">
                <FaInstagram className="w-6 h-6" />
              </a>
            )}
            {instructor.socialLinks.linkedin && (
              <a href={instructor.socialLinks.linkedin} className="text-gray-400 hover:text-blue-700 transition-colors">
                <FaLinkedin className="w-6 h-6" />
              </a>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4">About the Instructor</h4>
        <p className="text-gray-700 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  );
};

export default InstructorTab;

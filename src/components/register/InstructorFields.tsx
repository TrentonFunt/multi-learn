import React from 'react';
import { Plus, X } from 'lucide-react';
import Input from '../ui/Input';

interface InstructorData {
  specialties: string[];
  experience: string;
  bio: string;
  education: string;
  certifications: string[];
  website: string;
  linkedin: string;
  twitter: string;
}

interface InstructorFieldsProps {
  instructorData: InstructorData;
  onInstructorDataChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  newSpecialty: string;
  setNewSpecialty: (value: string) => void;
  onAddSpecialty: () => void;
  onRemoveSpecialty: (specialty: string) => void;
  newCertification: string;
  setNewCertification: (value: string) => void;
  onAddCertification: () => void;
  onRemoveCertification: (certification: string) => void;
}

const InstructorFields: React.FC<InstructorFieldsProps> = ({
  instructorData,
  onInstructorDataChange,
  newSpecialty,
  setNewSpecialty,
  onAddSpecialty,
  onRemoveSpecialty,
  newCertification,
  setNewCertification,
  onAddCertification,
  onRemoveCertification,
}) => {
  return (
    <div className="space-y-6 border-t border-gray-200 dark:border-gray-700 pt-6">
      <div className="text-center">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Instructor Information
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Help us learn more about your expertise
        </p>
      </div>

      {/* Specialties */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Specialties *
        </label>
        <div className="flex space-x-2 mb-2">
          <input
            type="text"
            placeholder="e.g., React, JavaScript, Python"
            value={newSpecialty}
            onChange={(e) => setNewSpecialty(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), onAddSpecialty())}
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
          <button
            type="button"
            onClick={onAddSpecialty}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {instructorData.specialties.map((specialty) => (
            <span
              key={specialty}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
            >
              {specialty}
              <button
                type="button"
                onClick={() => onRemoveSpecialty(specialty)}
                className="ml-2 hover:text-orange-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Experience */}
      <Input
        label="Experience *"
        type="text"
        name="experience"
        placeholder="e.g., 5+ years in web development"
        value={instructorData.experience}
        onChange={onInstructorDataChange}
        required
      />

      {/* Bio */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Bio *
        </label>
        <textarea
          name="bio"
          placeholder="Tell us about yourself and your teaching experience..."
          value={instructorData.bio}
          onChange={onInstructorDataChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
          required
        />
      </div>

      {/* Education */}
      <Input
        label="Education"
        type="text"
        name="education"
        placeholder="e.g., Bachelor's in Computer Science"
        value={instructorData.education}
        onChange={onInstructorDataChange}
      />

      {/* Certifications */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Certifications
        </label>
        <div className="flex space-x-2 mb-2">
          <input
            type="text"
            placeholder="e.g., AWS Certified, Google Analytics"
            value={newCertification}
            onChange={(e) => setNewCertification(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), onAddCertification())}
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
          <button
            type="button"
            onClick={onAddCertification}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {instructorData.certifications.map((certification) => (
            <span
              key={certification}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            >
              {certification}
              <button
                type="button"
                onClick={() => onRemoveCertification(certification)}
                className="ml-2 hover:text-blue-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Input
          label="Website"
          type="url"
          name="website"
          placeholder="https://yourwebsite.com"
          value={instructorData.website}
          onChange={onInstructorDataChange}
        />
        <Input
          label="LinkedIn"
          type="url"
          name="linkedin"
          placeholder="https://linkedin.com/in/yourprofile"
          value={instructorData.linkedin}
          onChange={onInstructorDataChange}
        />
        <Input
          label="Twitter"
          type="url"
          name="twitter"
          placeholder="https://twitter.com/yourhandle"
          value={instructorData.twitter}
          onChange={onInstructorDataChange}
        />
      </div>
    </div>
  );
};

export default InstructorFields;

import React, { useState } from 'react';

interface CommentSectionProps {
  onSubmitComment: (comment: { name: string; email: string; comment: string }) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ onSubmitComment }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: ''
  });

  // Generate unique IDs for this component instance
  const fieldIds = {
    name: `course-comment-name-${Date.now()}`,
    email: `course-comment-email-${Date.now()}`,
    comment: `course-comment-comment-${Date.now()}`
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.comment) {
      onSubmitComment(formData);
      setFormData({ name: '', email: '', comment: '' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Leave a Comment</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor={fieldIds.name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Name *
            </label>
            <input
              type="text"
              id={fieldIds.name}
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="name"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-200 hover:border-orange-300 focus:scale-[1.02]"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor={fieldIds.email} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email *
            </label>
            <input
              type="email"
              id={fieldIds.email}
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-200 hover:border-orange-300 focus:scale-[1.02]"
              placeholder="Your email"
            />
          </div>
        </div>
        <div>
          <label htmlFor={fieldIds.comment} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Comment *
          </label>
          <textarea
            id={fieldIds.comment}
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            required
            rows={6}
            autoComplete="off"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-200 hover:border-orange-300 focus:scale-[1.01] resize-vertical"
            placeholder="Write your comment here..."
          />
        </div>
        <button
          type="submit"
          className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
};

export default CommentSection;

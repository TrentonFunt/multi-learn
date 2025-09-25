import React, { useState, useEffect } from 'react';
import { addComment, type Comment } from '../../utils/commentStorage';
import { useToast } from '../../contexts/ToastContext';

interface CommentFormProps {
  postId: string;
  onSubmitComment: (comment: Comment) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId, onSubmitComment }) => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: '',
    saveInfo: false
  });
  const [loading, setLoading] = useState(false);

  // Load saved user info on component mount
  useEffect(() => {
    const savedInfo = localStorage.getItem('multilearn_user_info');
    if (savedInfo) {
      try {
        const { name, email } = JSON.parse(savedInfo);
        setFormData(prev => ({ ...prev, name, email }));
      } catch (error) {
        console.error('Error loading saved user info:', error);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.comment) {
      addToast({
        type: 'error',
        title: 'Missing Information',
        message: 'Please fill in all required fields.'
      });
      return;
    }

    setLoading(true);
    try {
      const newComment = addComment(
        postId,
        { name: formData.name, email: formData.email },
        formData.comment
      );
      
      onSubmitComment(newComment);
      
      // Save user info if requested
      if (formData.saveInfo) {
        localStorage.setItem('multilearn_user_info', JSON.stringify({
          name: formData.name,
          email: formData.email
        }));
      }
      
      // Load saved info if not saving
      if (!formData.saveInfo) {
        const savedInfo = localStorage.getItem('multilearn_user_info');
        if (savedInfo) {
          const { name, email } = JSON.parse(savedInfo);
          setFormData(prev => ({ ...prev, name, email }));
        }
      }
      
      setFormData({ name: '', email: '', comment: '', saveInfo: false });
      
      addToast({
        type: 'success',
        title: 'Comment Posted',
        message: 'Your comment has been successfully posted!'
      });
    } catch {
      addToast({
        type: 'error',
        title: 'Error',
        message: 'Failed to post comment. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Leave A Comment</h2>
      
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Your email address will not be published. Required fields are marked *
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Name *
            </label>
          <input
            type="text"
            id="name"
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
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email *
            </label>
          <input
            type="email"
            id="email"
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
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Comment *
          </label>
          <textarea
            id="comment"
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
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="saveInfo"
            name="saveInfo"
            checked={formData.saveInfo}
            onChange={handleChange}
            className="w-4 h-4 text-orange-600 border-gray-300 dark:border-gray-600 rounded focus:ring-orange-500 bg-white dark:bg-gray-700"
          />
          <label htmlFor="saveInfo" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            Save my name, email in this browser for the next time I comment
          </label>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:shadow-lg active:scale-95"
        >
          {loading ? 'Posting Comment...' : 'Post Comment'}
        </button>
      </form>
    </div>
  );
};

export default CommentForm;

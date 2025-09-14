import React from 'react';
import { MessageCircle, Reply } from 'lucide-react';

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  content: string;
}

interface CommentsSectionProps {
  comments: Comment[];
  totalComments: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({
  comments,
  totalComments,
  currentPage,
  totalPages,
  onPageChange
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
      <div className="flex items-center space-x-2 mb-6">
        <MessageCircle className="w-6 h-6 text-gray-600" />
        <h2 className="text-2xl font-bold text-gray-900">Comments</h2>
        <span className="text-gray-600">({totalComments})</span>
      </div>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-4 pb-6 border-b border-gray-200 last:border-b-0">
            <img
              src={comment.author.avatar}
              alt={comment.author.name}
              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{comment.author.name}</h4>
                <span className="text-sm text-gray-500">{comment.date}</span>
              </div>
              <p className="text-gray-700 leading-relaxed mb-3">
                {comment.content}
              </p>
              <a
                href="#"
                className="inline-flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                <Reply className="w-4 h-4" />
                <span>Reply</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Comments Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span className="text-gray-600">&lt;</span>
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                page === currentPage
                  ? 'bg-blue-600 text-white'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span className="text-gray-600">&gt;</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentsSection;

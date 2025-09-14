import React from 'react';
import { Calendar, User, MessageCircle } from 'lucide-react';

interface BlogContentProps {
  title: string;
  author: string;
  date: string;
  commentsCount: number;
  featuredImage: string;
  content: string;
  tags: string[];
}

const BlogContent: React.FC<BlogContentProps> = ({
  title,
  author,
  date,
  commentsCount,
  featuredImage,
  content,
  tags
}) => {
  return (
    <article className="bg-white rounded-lg shadow-lg p-8">
      {/* Blog Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
        {title}
      </h1>

      {/* Meta Information */}
      <div className="flex items-center space-x-6 text-gray-600 mb-8">
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4" />
          <span>{author}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>{date}</span>
        </div>
        <div className="flex items-center space-x-2">
          <MessageCircle className="w-4 h-4" />
          <span>{commentsCount} Comments</span>
        </div>
      </div>

      {/* Featured Image */}
      <div className="mb-8">
        <img
          src={featuredImage}
          alt={title}
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>

      {/* Blog Content */}
      <div className="prose max-w-none mb-8">
        <p className="text-gray-700 leading-relaxed mb-6">
          {content}
        </p>
        <p className="text-gray-700 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
      </div>

      {/* Tags */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags:</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <a
              key={index}
              href="#"
              className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors"
            >
              {tag}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
};

export default BlogContent;

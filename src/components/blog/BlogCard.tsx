import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author?: string;
  category?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  title,
  excerpt,
  image,
  date,
  author,
  category
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3">
          <img
            src={image}
            alt={title}
            className="w-full h-48 md:h-full object-cover"
          />
        </div>
        <div className="md:w-2/3 p-6">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
            {author && (
              <>
                <span>•</span>
                <span>by {author}</span>
              </>
            )}
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
            <Link 
              to={`/blog/${id}`}
              className="hover:text-blue-600 transition-colors"
            >
              {title}
            </Link>
          </h3>
          
          <p className="text-gray-600 leading-relaxed line-clamp-3">
            {excerpt}
          </p>
          
          {category && (
            <div className="mt-4">
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {category}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

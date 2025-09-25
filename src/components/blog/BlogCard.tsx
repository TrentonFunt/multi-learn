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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group hover:scale-[1.02] hover:-translate-y-1">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-48 md:h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
          
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2">
            <Link 
              to={`/blog/${id}`}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 group-hover:translate-x-1 inline-block"
            >
              {title}
            </Link>
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
            {excerpt}
          </p>
          
          {category && (
            <div className="mt-4">
              <span className="inline-block bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs px-2 py-1 rounded-full transition-colors duration-200 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/30">
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

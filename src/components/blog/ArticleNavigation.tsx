import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ArticleNavigationProps {
  previousArticle?: {
    id: string;
    title: string;
  };
  nextArticle?: {
    id: string;
    title: string;
  };
}

const ArticleNavigation: React.FC<ArticleNavigationProps> = ({
  previousArticle,
  nextArticle
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Previous Article */}
      <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-all duration-200 ${
        previousArticle 
          ? 'hover:shadow-xl hover:scale-[1.02] cursor-pointer group hover:border-orange-300 dark:hover:border-orange-600' 
          : 'opacity-60'
      }`}>
        {previousArticle ? (
          <Link 
            to={`/blog/${previousArticle.id}`} 
            className="block w-full h-full"
            aria-label={`Go to previous article: ${previousArticle.title}`}
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center group-hover:bg-orange-200 dark:group-hover:bg-orange-900/30 transition-all duration-200 group-hover:scale-110">
                <ChevronLeft className="w-5 h-5 text-orange-600 dark:text-orange-400 group-hover:translate-x-[-2px] transition-transform duration-200" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-orange-600 dark:text-orange-400 font-medium mb-2">Previous Article</p>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-200">
                  {previousArticle.title}
                </h3>
              </div>
            </div>
          </Link>
        ) : (
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <ChevronLeft className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-2">Previous Article</p>
              <span className="text-gray-400 dark:text-gray-500">No previous article</span>
            </div>
          </div>
        )}
      </div>

      {/* Next Article */}
      <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-all duration-200 ${
        nextArticle 
          ? 'hover:shadow-xl hover:scale-[1.02] cursor-pointer group hover:border-orange-300 dark:hover:border-orange-600' 
          : 'opacity-60'
      }`}>
        {nextArticle ? (
          <Link 
            to={`/blog/${nextArticle.id}`} 
            className="block w-full h-full"
            aria-label={`Go to next article: ${nextArticle.title}`}
          >
            <div className="flex items-center space-x-4">
              <div className="flex-1 min-w-0 text-right">
                <p className="text-sm text-orange-600 dark:text-orange-400 font-medium mb-2">Next Article</p>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-200">
                  {nextArticle.title}
                </h3>
              </div>
              <div className="flex-shrink-0 w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center group-hover:bg-orange-200 dark:group-hover:bg-orange-900/30 transition-all duration-200 group-hover:scale-110">
                <ChevronRight className="w-5 h-5 text-orange-600 dark:text-orange-400 group-hover:translate-x-[2px] transition-transform duration-200" />
              </div>
            </div>
          </Link>
        ) : (
          <div className="flex items-center space-x-4">
            <div className="flex-1 min-w-0 text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-2">Next Article</p>
              <span className="text-gray-400 dark:text-gray-500">No next article</span>
            </div>
            <div className="flex-shrink-0 w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleNavigation;

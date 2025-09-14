import React from 'react';
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
      <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
        <div className="flex items-center space-x-3">
          <ChevronLeft className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500 mb-1">Prev Articles</p>
            <h3 className="font-semibold text-gray-900 line-clamp-2">
              {previousArticle ? (
                <a href={`/blog/${previousArticle.id}`} className="hover:text-blue-600 transition-colors">
                  {previousArticle.title}
                </a>
              ) : (
                <span className="text-gray-400">No previous article</span>
              )}
            </h3>
          </div>
        </div>
      </div>

      {/* Next Article */}
      <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
        <div className="flex items-center space-x-3">
          <div className="text-right flex-1">
            <p className="text-sm text-gray-500 mb-1">Next Articles</p>
            <h3 className="font-semibold text-gray-900 line-clamp-2">
              {nextArticle ? (
                <a href={`/blog/${nextArticle.id}`} className="hover:text-blue-600 transition-colors">
                  {nextArticle.title}
                </a>
              ) : (
                <span className="text-gray-400">No next article</span>
              )}
            </h3>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default ArticleNavigation;

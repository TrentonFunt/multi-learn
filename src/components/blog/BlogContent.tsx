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
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Featured Image */}
      <div className="relative overflow-hidden">
        <img
          src={featuredImage}
          alt={title}
          className="w-full h-64 md:h-80 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
            {title}
          </h1>
          
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-white/90 text-sm md:text-base">
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
              <User className="w-4 h-4" />
              <span>{author}</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
              <Calendar className="w-4 h-4" />
              <span>{date}</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
              <MessageCircle className="w-4 h-4" />
              <span>{commentsCount} Comments</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 lg:p-12">

      {/* Blog Content */}
      <div className="prose prose-lg max-w-none mb-8 dark:prose-invert prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-blockquote:border-l-4 prose-blockquote:border-orange-500 prose-blockquote:bg-orange-50 dark:prose-blockquote:bg-orange-900/20 prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:italic prose-a:text-orange-600 dark:prose-a:text-orange-400 prose-a:no-underline hover:prose-a:underline prose-code:bg-gray-100 dark:prose-code:bg-gray-700 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-pre:bg-gray-900 dark:prose-pre:bg-gray-800 prose-pre:text-gray-100">
        <div 
          className="leading-relaxed [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:text-gray-900 [&>h1]:dark:text-gray-100 [&>h1]:mb-6 [&>h1]:mt-8 [&>h1]:first:mt-0 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:dark:text-gray-100 [&>h2]:mb-4 [&>h2]:mt-8 [&>h2]:border-b [&>h2]:border-gray-200 [&>h2]:dark:border-gray-600 [&>h2]:pb-2 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-gray-900 [&>h3]:dark:text-gray-100 [&>h3]:mb-3 [&>h3]:mt-6 [&>h4]:text-lg [&>h4]:font-semibold [&>h4]:text-gray-900 [&>h4]:dark:text-gray-100 [&>h4]:mb-2 [&>h4]:mt-4 [&>p]:mb-4 [&>p]:leading-7 [&>p]:text-gray-700 [&>p]:dark:text-gray-300 [&>ul]:mb-4 [&>ul]:pl-6 [&>li]:mb-2 [&>li]:leading-6 [&>ol]:mb-4 [&>ol]:pl-6 [&>ol>li]:mb-2 [&>ol>li]:leading-6 [&>blockquote]:border-l-4 [&>blockquote]:border-orange-500 [&>blockquote]:bg-orange-50 [&>blockquote]:dark:bg-orange-900/20 [&>blockquote]:pl-6 [&>blockquote]:py-4 [&>blockquote]:my-6 [&>blockquote]:italic [&>blockquote]:rounded-r-lg [&>blockquote]:shadow-sm [&>blockquote]:text-gray-700 [&>blockquote]:dark:text-gray-300 [&>strong]:font-bold [&>strong]:text-gray-900 [&>strong]:dark:text-gray-100 [&>em]:italic [&>code]:bg-gray-100 [&>code]:dark:bg-gray-700 [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>code]:text-sm [&>code]:font-mono [&>pre]:bg-gray-900 [&>pre]:dark:bg-gray-800 [&>pre]:text-gray-100 [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto [&>pre]:my-6 [&>pre]:shadow-lg [&>a]:text-orange-600 [&>a]:dark:text-orange-400 [&>a]:no-underline [&>a:hover]:underline [&>a:hover]:text-orange-700 [&>a:hover]:dark:text-orange-300 [&>img]:rounded-lg [&>img]:shadow-lg [&>img]:my-6 [&>table]:w-full [&>table]:border-collapse [&>table]:border [&>table]:border-gray-300 [&>table]:dark:border-gray-600 [&>table]:my-6 [&>th]:bg-gray-50 [&>th]:dark:bg-gray-700 [&>th]:border [&>th]:border-gray-300 [&>th]:dark:border-gray-600 [&>th]:px-4 [&>th]:py-2 [&>th]:text-left [&>th]:font-semibold [&>td]:border [&>td]:border-gray-300 [&>td]:dark:border-gray-600 [&>td]:px-4 [&>td]:py-2"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Tags:</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-300 dark:from-gray-600 to-transparent"></div>
          </div>
          <div className="flex flex-wrap gap-3">
            {tags.map((tag, index) => (
              <a
                key={index}
                href="#"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-100 to-orange-50 dark:from-orange-900/30 dark:to-orange-800/30 text-orange-700 dark:text-orange-300 text-sm font-medium rounded-full border border-orange-200 dark:border-orange-700 hover:from-orange-200 hover:to-orange-100 dark:hover:from-orange-800/50 dark:hover:to-orange-700/50 hover:text-orange-800 dark:hover:text-orange-200 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                #{tag}
              </a>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogContent;

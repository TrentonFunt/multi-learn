import React from 'react';
import { Link } from 'react-router-dom';

interface Category {
  name: string;
  count: number;
}

interface RecentPost {
  id: string;
  title: string;
  image: string;
  date: string;
}

interface BlogSidebarProps {
  categories: Category[];
  recentPosts: RecentPost[];
}

const BlogSidebar: React.FC<BlogSidebarProps> = ({
  categories,
  recentPosts
}) => {

  return (
    <div className="space-y-8">

      {/* Categories */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Category</h3>
        <ul className="space-y-3">
          {categories.map((category, index) => (
            <li key={index}>
              <Link
                to={`/blog?category=${encodeURIComponent(category.name.toLowerCase())}`}
                className="flex items-center justify-between text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 p-2 rounded-lg transition-all duration-200 group"
              >
                <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">{category.name}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full group-hover:bg-blue-100 dark:group-hover:bg-blue-800/30 transition-colors duration-200">({category.count})</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Posts */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Recent Posts</h3>
        <div className="space-y-5">
          {recentPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className="flex space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group"
            >
              <div className="relative overflow-hidden rounded-lg flex-shrink-0">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-16 h-16 object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {post.title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">{post.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
};

export default BlogSidebar;

import React, { useState } from 'react';
import { Search, Grid, List } from 'lucide-react';

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
  tags: string[];
  onSearch: (query: string) => void;
  onViewModeChange: (mode: 'grid' | 'list') => void;
  viewMode: 'grid' | 'list';
}

const BlogSidebar: React.FC<BlogSidebarProps> = ({
  categories,
  recentPosts,
  tags,
  onSearch,
  onViewModeChange,
  viewMode
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="space-y-8">
      {/* Search and View Toggle */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <form onSubmit={handleSearchSubmit} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Category</h3>
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <li key={index}>
              <a
                href="#"
                className="flex items-center justify-between text-gray-700 hover:text-blue-600 transition-colors"
              >
                <span>{category.name}</span>
                <span className="text-sm text-gray-500">({category.count})</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Posts */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Posts</h3>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <div key={post.id} className="flex space-x-3">
              <img
                src={post.image}
                alt={post.title}
                className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    {post.title}
                  </a>
                </h4>
                <p className="text-xs text-gray-500">{post.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
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
    </div>
  );
};

export default BlogSidebar;

import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, BookOpen, FileText, Clock } from 'lucide-react';
import { useFavoritesStore } from '../store/favoritesStore';
import Breadcrumb from '../components/ui/Breadcrumb';

const Favorites: React.FC = () => {
  const { favorites, removeFromFavorites } = useFavoritesStore();
  
  const breadcrumbItems = [
    { label: 'Homepage', href: '/' },
    { label: 'My Favorites' }
  ];

  const handleRemoveFavorite = (id: string) => {
    removeFromFavorites(id);
  };

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={breadcrumbItems} />
          
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">No Favorites Yet</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Start exploring our courses and articles to build your personalized learning collection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/courses"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <BookOpen className="w-5 h-5" />
                Browse Courses
              </Link>
              <Link
                to="/blog"
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
              >
                <FileText className="w-5 h-5" />
                Read Articles
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">My Favorites</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your saved courses and articles ({favorites.length} items)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 group"
            >
              <div className="relative">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => handleRemoveFavorite(item.id)}
                    className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
                    aria-label={`Remove ${item.title} from favorites`}
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    item.type === 'course' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-amber-600 text-white'
                  }`}>
                    {item.type === 'course' ? 'Course' : 'Article'}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
                  {item.title}
                </h3>
                
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Saved {new Date(item.addedAt).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center justify-between">
                  <Link
                    to={item.type === 'course' ? `/courses/${item.id}` : `/blog/${item.id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                  >
                    {item.type === 'course' ? 'View Course' : 'Read Article'}
                  </Link>
                  
                  <button
                    onClick={() => handleRemoveFavorite(item.id)}
                    className="text-gray-600 dark:text-gray-400 hover:text-red-600 transition-colors text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;

import React from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFavoritesStore } from '../../store/favoritesStore';

interface FavoriteButtonProps {
  id: string;
  type: 'course' | 'article';
  title: string;
  image?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  id,
  type,
  title,
  image,
  size = 'md',
  showText = false,
  className = ""
}) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavoritesStore();
  
  const isItemFavorite = isFavorite(id);
  
  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isItemFavorite) {
      removeFromFavorites(id);
    } else {
      addToFavorites({
        id,
        type,
        title,
        image
      });
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-6 h-6';
      case 'lg':
        return 'w-8 h-8';
      default:
        return 'w-7 h-7';
    }
  };

  const getTextSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'text-sm';
      case 'lg':
        return 'text-base';
      default:
        return 'text-sm';
    }
  };

  return (
    <motion.button
      onClick={handleToggle}
      className={`group flex items-center gap-2 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isItemFavorite ? `Remove ${title} from favorites` : `Add ${title} to favorites`}
    >
      <motion.div
        className={`${getSizeClasses()} flex items-center justify-center rounded-full transition-colors duration-200 ${
          isItemFavorite
            ? 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30'
            : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400'
        }`}
        animate={{
          scale: isItemFavorite ? [1, 1.2, 1] : 1
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
      >
        <Heart
          className={`${getSizeClasses()} transition-colors duration-200 ${
            isItemFavorite ? 'fill-current' : ''
          }`}
        />
      </motion.div>
      
      {showText && (
        <span className={`${getTextSizeClasses()} font-medium transition-colors duration-200 ${
          isItemFavorite
            ? 'text-red-600 dark:text-red-400'
            : 'text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400'
        }`}>
          {isItemFavorite ? 'Saved' : 'Save'}
        </span>
      )}
    </motion.button>
  );
};

export default FavoriteButton;

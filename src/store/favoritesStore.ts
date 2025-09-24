import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoriteItem {
  id: string;
  type: 'course' | 'article';
  title: string;
  image?: string;
  addedAt: number;
}

interface FavoritesStore {
  favorites: FavoriteItem[];
  addToFavorites: (item: Omit<FavoriteItem, 'addedAt'>) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
  getFavoritesByType: (type: 'course' | 'article') => FavoriteItem[];
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],

            addToFavorites: (item) => {
              const { id } = item;
              const { favorites, isFavorite } = get();
              
              if (!isFavorite(id)) {
                const newFavorite = { ...item, addedAt: Date.now() };
                set({
                  favorites: [...favorites, newFavorite]
                });
              }
            },

      removeFromFavorites: (id) => {
        set({
          favorites: get().favorites.filter(item => item.id !== id)
        });
      },

      isFavorite: (id) => {
        return get().favorites.some(item => item.id === id);
      },

      clearFavorites: () => {
        set({ favorites: [] });
      },

      getFavoritesByType: (type) => {
        return get().favorites.filter(item => item.type === type);
      }
    }),
    {
      name: 'multilearn-favorites',
      partialize: (state) => ({ favorites: state.favorites })
    }
  )
);

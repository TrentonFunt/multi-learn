import { create } from 'zustand';
import type { Course, CourseFilters, SortOption, Enrollment } from '../types';

interface CourseState {
  courses: Course[];
  featuredCourses: Course[];
  userCourses: Course[];
  currentCourse: Course | null;
  enrollments: Enrollment[];
  filters: CourseFilters;
  sortOption: SortOption;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchCourses: (filters?: CourseFilters) => Promise<void>;
  fetchFeaturedCourses: () => Promise<void>;
  fetchUserCourses: () => Promise<void>;
  fetchCourseById: (id: string) => Promise<void>;
  enrollInCourse: (courseId: string) => Promise<void>;
  updateProgress: (courseId: string, lessonId: string, progress: number) => Promise<void>;
  setFilters: (filters: CourseFilters) => void;
  setSortOption: (sortOption: SortOption) => void;
  clearError: () => void;
}

export const useCourseStore = create<CourseState>((set, get) => ({
  courses: [],
  featuredCourses: [],
  userCourses: [],
  currentCourse: null,
  enrollments: [],
  filters: {},
  sortOption: { field: 'createdAt', direction: 'desc' },
  isLoading: false,
  error: null,

  fetchCourses: async (filters?: CourseFilters) => {
    set({ isLoading: true, error: null });
    
    try {
      // TODO: Replace with actual API call
      // const response = await courseApi.getCourses(filters);
      console.log('Fetching courses with filters:', filters);
      
      // Mock courses data for now
      const mockCourses: Course[] = [
        {
          id: '1',
          title: 'Complete React Development Course',
          description: 'Learn React from scratch with modern practices and build real-world applications.',
          thumbnail: '/api/placeholder/400/300',
          instructor: {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            role: 'instructor',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          price: 99.99,
          duration: 1200,
          level: 'beginner',
          category: 'Web Development',
          tags: ['React', 'JavaScript', 'Frontend'],
          isPublished: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          lessons: [],
          enrolledStudents: 1250,
          rating: 4.8,
          totalRatings: 156,
        },
        {
          id: '2',
          title: 'Advanced TypeScript Patterns',
          description: 'Master advanced TypeScript concepts and design patterns for scalable applications.',
          thumbnail: '/api/placeholder/400/300',
          instructor: {
            id: '2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            role: 'instructor',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          price: 149.99,
          duration: 900,
          level: 'advanced',
          category: 'Web Development',
          tags: ['TypeScript', 'Design Patterns', 'Advanced'],
          isPublished: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          lessons: [],
          enrolledStudents: 890,
          rating: 4.9,
          totalRatings: 98,
        },
      ];

      set({
        courses: mockCourses,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch courses',
        isLoading: false,
      });
    }
  },

  fetchFeaturedCourses: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // TODO: Replace with actual API call
      // const response = await courseApi.getFeaturedCourses();
      
      // Mock featured courses data
      const mockFeaturedCourses: Course[] = [
        {
          id: '3',
          title: 'Full-Stack JavaScript Development',
          description: 'Build complete web applications with JavaScript, Node.js, and modern frameworks.',
          thumbnail: '/api/placeholder/400/300',
          instructor: {
            id: '3',
            name: 'Mike Johnson',
            email: 'mike@example.com',
            role: 'instructor',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          price: 199.99,
          duration: 1800,
          level: 'intermediate',
          category: 'Web Development',
          tags: ['JavaScript', 'Node.js', 'Full-Stack'],
          isPublished: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          lessons: [],
          enrolledStudents: 2100,
          rating: 4.7,
          totalRatings: 234,
        },
      ];

      set({
        featuredCourses: mockFeaturedCourses,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch featured courses',
        isLoading: false,
      });
    }
  },

  fetchUserCourses: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // TODO: Replace with actual API call
      // const response = await courseApi.getUserCourses();
      
      set({
        userCourses: [],
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch user courses',
        isLoading: false,
      });
    }
  },

  fetchCourseById: async (id: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // TODO: Replace with actual API call
      // const response = await courseApi.getCourseById(id);
      
      const course = get().courses.find(c => c.id === id);
      set({
        currentCourse: course || null,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch course',
        isLoading: false,
      });
    }
  },

  enrollInCourse: async (courseId: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // TODO: Replace with actual API call
      // const response = await courseApi.enrollInCourse(courseId);
      
      const enrollment: Enrollment = {
        id: Date.now().toString(),
        userId: '1', // TODO: Get from auth store
        courseId,
        enrolledAt: new Date().toISOString(),
        progress: 0,
        completed: false,
      };

      set(state => ({
        enrollments: [...state.enrollments, enrollment],
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to enroll in course',
        isLoading: false,
      });
    }
  },

  updateProgress: async (courseId: string, _lessonId: string, progress: number) => {
    set({ isLoading: true, error: null });
    
    try {
      // TODO: Replace with actual API call
      // const response = await courseApi.updateProgress(courseId, lessonId, progress);
      
      set(state => ({
        enrollments: state.enrollments.map(enrollment =>
          enrollment.courseId === courseId
            ? { ...enrollment, progress }
            : enrollment
        ),
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update progress',
        isLoading: false,
      });
    }
  },

  setFilters: (filters: CourseFilters) => {
    set({ filters });
  },

  setSortOption: (sortOption: SortOption) => {
    set({ sortOption });
  },

  clearError: () => {
    set({ error: null });
  },
}));

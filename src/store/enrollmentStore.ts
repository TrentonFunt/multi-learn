import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface EnrolledCourse {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  progress: number;
  status: 'not_started' | 'in_progress' | 'completed';
  enrolledAt: Date;
  lastAccessed?: Date;
  totalLessons: number;
  completedLessons: number;
  estimatedDuration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  rating: number;
  description: string;
}

interface EnrollmentState {
  enrolledCourses: EnrolledCourse[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  enrollInCourse: (course: Omit<EnrolledCourse, 'progress' | 'status' | 'enrolledAt' | 'lastAccessed' | 'completedLessons'>) => void;
  unenrollFromCourse: (courseId: string) => void;
  updateCourseProgress: (courseId: string, progress: number, completedLessons: number) => void;
  markCourseCompleted: (courseId: string) => void;
  getEnrolledCourse: (courseId: string) => EnrolledCourse | undefined;
  isEnrolled: (courseId: string) => boolean;
  getCoursesByStatus: (status: EnrolledCourse['status']) => EnrolledCourse[];
  getTotalProgress: () => number;
  getLearningStats: () => {
    totalCourses: number;
    completedCourses: number;
    inProgressCourses: number;
    totalHours: number;
    averageProgress: number;
  };
}

export const useEnrollmentStore = create<EnrollmentState>()(
  persist(
    (set, get) => ({
      enrolledCourses: [],
      isLoading: false,
      error: null,

      enrollInCourse: (course) => {
        const { enrolledCourses } = get();
        
        // Check if already enrolled
        if (enrolledCourses.some(c => c.id === course.id)) {
          set({ error: 'You are already enrolled in this course' });
          return;
        }

        const newEnrolledCourse: EnrolledCourse = {
          ...course,
          progress: 0,
          status: 'not_started',
          enrolledAt: new Date(),
          completedLessons: 0
        };

        set({
          enrolledCourses: [...enrolledCourses, newEnrolledCourse],
          error: null
        });
      },

      unenrollFromCourse: (courseId) => {
        const { enrolledCourses } = get();
        set({
          enrolledCourses: enrolledCourses.filter(course => course.id !== courseId),
          error: null
        });
      },

      updateCourseProgress: (courseId, progress, completedLessons) => {
        const { enrolledCourses } = get();
        const updatedCourses = enrolledCourses.map(course => {
          if (course.id === courseId) {
            const newStatus: EnrolledCourse['status'] = 
              progress === 100 ? 'completed' : 
              progress > 0 ? 'in_progress' : 'not_started';
            
            return {
              ...course,
              progress,
              completedLessons,
              status: newStatus,
              lastAccessed: new Date()
            };
          }
          return course;
        });

        set({ enrolledCourses: updatedCourses });
      },

      markCourseCompleted: (courseId) => {
        const { enrolledCourses } = get();
        const updatedCourses = enrolledCourses.map(course => {
          if (course.id === courseId) {
            return {
              ...course,
              progress: 100,
              status: 'completed' as const,
              completedLessons: course.totalLessons,
              lastAccessed: new Date()
            };
          }
          return course;
        });

        set({ enrolledCourses: updatedCourses });
      },

      getEnrolledCourse: (courseId) => {
        const { enrolledCourses } = get();
        return enrolledCourses.find(course => course.id === courseId);
      },

      isEnrolled: (courseId) => {
        const { enrolledCourses } = get();
        return enrolledCourses.some(course => course.id === courseId);
      },

      getCoursesByStatus: (status) => {
        const { enrolledCourses } = get();
        return enrolledCourses.filter(course => course.status === status);
      },

      getTotalProgress: () => {
        const { enrolledCourses } = get();
        if (enrolledCourses.length === 0) return 0;
        
        const totalProgress = enrolledCourses.reduce((sum, course) => sum + course.progress, 0);
        return Math.round(totalProgress / enrolledCourses.length);
      },

      getLearningStats: () => {
        const { enrolledCourses } = get();
        
        const completedCourses = enrolledCourses.filter(c => c.status === 'completed').length;
        const inProgressCourses = enrolledCourses.filter(c => c.status === 'in_progress').length;
        const totalCourses = enrolledCourses.length;
        
        const totalHours = enrolledCourses.reduce((sum, course) => {
          // Extract hours from estimated duration (e.g., "5 hours" -> 5)
          const hours = parseInt(course.estimatedDuration.match(/\d+/)?.[0] || '0');
          return sum + hours;
        }, 0);

        const averageProgress = totalCourses > 0 
          ? Math.round(enrolledCourses.reduce((sum, course) => sum + course.progress, 0) / totalCourses)
          : 0;

        return {
          totalCourses,
          completedCourses,
          inProgressCourses,
          totalHours,
          averageProgress
        };
      }
    }),
    {
      name: 'enrollment-storage',
      partialize: (state) => ({ enrolledCourses: state.enrolledCourses })
    }
  )
);

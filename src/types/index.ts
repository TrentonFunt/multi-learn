// User types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'student' | 'instructor' | 'admin';
  createdAt: string;
  updatedAt: string;
  // Instructor-specific fields
  instructorVerificationStatus?: 'pending' | 'approved' | 'rejected';
  instructorVerificationDate?: string;
  instructorBio?: string;
  instructorSpecialties?: string[];
  instructorExperience?: string;
  instructorEducation?: string;
  instructorCertifications?: string[];
  instructorWebsite?: string;
  instructorLinkedIn?: string;
  instructorTwitter?: string;
  instructorRejectionReason?: string;
}

// Course types
export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: User;
  price: number;
  duration: number; // in minutes
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  tags: string[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  lessons: Lesson[];
  enrolledStudents: number;
  rating: number;
  totalRatings: number;
}

// Lesson types
export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  content: string;
  videoUrl?: string;
  duration: number; // in minutes
  order: number;
  isPreview: boolean;
  resources: Resource[];
  createdAt: string;
  updatedAt: string;
}

// Resource types
export interface Resource {
  id: string;
  lessonId: string;
  title: string;
  type: 'pdf' | 'video' | 'audio' | 'document' | 'link';
  url: string;
  size?: number;
  createdAt: string;
}

// Progress types
export interface Progress {
  id: string;
  userId: string;
  courseId: string;
  lessonId: string;
  completed: boolean;
  progress: number; // 0-100
  timeSpent: number; // in minutes
  lastAccessed: string;
  completedAt?: string;
}

// Enrollment types
export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  progress: number; // 0-100
  completed: boolean;
  completedAt?: string;
}

// Category types
export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  courseCount: number;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface CourseForm {
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  thumbnail: File | null;
}

// Search and filter types
export interface CourseFilters {
  category?: string;
  level?: string;
  priceRange?: [number, number];
  rating?: number;
  duration?: [number, number];
  search?: string;
}

export interface SortOption {
  field: 'title' | 'price' | 'rating' | 'createdAt' | 'enrolledStudents';
  direction: 'asc' | 'desc';
}

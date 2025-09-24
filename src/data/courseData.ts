export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: {
    id: string;
    name: string;
    avatar: string;
    bio: string;
    rating: number;
    totalStudents: number;
    totalCourses: number;
    title?: string;
    socialLinks?: {
      facebook?: string;
      twitter?: string;
      instagram?: string;
      linkedin?: string;
    };
  };
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  estimatedDuration: string;
  price: number;
  originalPrice?: number;
  isFree?: boolean;
  rating: number;
  averageRating?: number;
  totalReviews: number;
  students: number;
  lessons: number;
  image: string;
  thumbnail: string;
  heroImage: string;
  slug: string;
  tags: string[];
  modules: CourseModule[];
  reviews: CourseReview[];
  faqs: CourseFAQ[];
  ratingBreakdown: {
    [key: number]: number;
  };
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  lessons: CourseLesson[];
  duration: string;
  isExpanded?: boolean;
}

export interface CourseLesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'video' | 'text' | 'quiz' | 'assignment';
  isPreview: boolean;
  isCompleted?: boolean;
}

export interface CourseReview {
  id: string;
  user?: {
    name: string;
    avatar: string;
  };
  author?: {
    name: string;
    avatar: string;
  };
  rating: number;
  date: string;
  comment?: string;
  content?: string;
  helpful?: number;
}

export interface CourseFAQ {
  id: string;
  question: string;
  answer: string;
}

// Comprehensive course data
export const courses: Course[] = [
  {
    id: '1',
    title: 'The Ultimate Guide To The Best WordPress LMS Plugin',
    description: 'Learn how to create a comprehensive learning management system using WordPress and the best LMS plugins available. This course covers everything from basic setup to advanced customization, user management, course creation, and monetization strategies.',
    instructor: {
      id: '1',
      name: 'John Smith',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      bio: 'John is a WordPress expert with over 10 years of experience in web development and e-learning solutions. He has helped thousands of students create successful online learning platforms.',
      rating: 4.9,
      totalStudents: 15420,
      totalCourses: 12,
    },
    category: 'Development',
    level: 'intermediate',
    duration: '8 weeks',
    estimatedDuration: '6-8 hours per week',
    price: 89,
    originalPrice: 149,
    rating: 4.8,
    totalReviews: 324,
    students: 1250,
    lessons: 45,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
    slug: 'ultimate-guide-wordpress-lms-plugin',
    tags: ['WordPress', 'LMS', 'Plugin', 'E-Learning', 'Web Development'],
    modules: [
      {
        id: '1',
        title: 'Introduction to WordPress LMS',
        description: 'Get started with learning management systems in WordPress',
        duration: '2 hours',
        lessons: [
          {
            id: '1',
            title: 'What is an LMS?',
            description: 'Understanding learning management systems',
            duration: '15 min',
            type: 'video',
            isPreview: true
          },
          {
            id: '2',
            title: 'WordPress LMS Overview',
            description: 'Exploring WordPress LMS capabilities',
            duration: '20 min',
            type: 'video',
            isPreview: false
          }
        ]
      }
    ],
    reviews: [
      {
        id: '1',
        author: {
          name: 'Sarah Johnson',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
        },
        rating: 5,
        date: '2024-01-15',
        content: 'Excellent course! John explains everything clearly and the practical examples are very helpful.',
        helpful: 24
      }
    ],
    faqs: [
      {
        id: '1',
        question: 'Do I need coding experience?',
        answer: 'Basic HTML/CSS knowledge is helpful but not required. The course covers everything from basics to advanced topics.'
      }
    ],
    ratingBreakdown: {
      5: 280,
      4: 35,
      3: 7,
      2: 2,
      1: 0
    }
  },
  {
    id: '2',
    title: 'Complete Web Development Bootcamp',
    description: 'Master modern web development with HTML, CSS, JavaScript, React, Node.js, and more. Build real-world projects and start your career as a web developer.',
    instructor: {
      id: '2',
      name: 'Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      bio: 'Sarah is a senior full-stack developer with 8 years of experience. She has worked with major tech companies and loves teaching coding.',
      rating: 4.8,
      totalStudents: 8930,
      totalCourses: 8
    },
    category: 'Development',
    level: 'beginner',
    duration: '12 weeks',
    estimatedDuration: '10-15 hours per week',
    price: 199,
    originalPrice: 299,
    rating: 4.9,
    totalReviews: 567,
    students: 2890,
    lessons: 120,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
    slug: 'complete-web-development-bootcamp',
    tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Web Development'],
    modules: [],
    reviews: [],
    faqs: [],
    ratingBreakdown: {
      5: 520,
      4: 40,
      3: 5,
      2: 2,
      1: 0
    }
  },
  {
    id: '3',
    title: 'Digital Marketing Mastery',
    description: 'Learn comprehensive digital marketing strategies including SEO, social media marketing, email marketing, and analytics to grow your business online.',
    instructor: {
      id: '3',
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      bio: 'Mike is a digital marketing strategist with 12 years of experience helping businesses grow their online presence.',
      rating: 4.7,
      totalStudents: 6750,
      totalCourses: 6
    },
    category: 'Marketing',
    level: 'intermediate',
    duration: '6 weeks',
    estimatedDuration: '5-8 hours per week',
    price: 149,
    originalPrice: 199,
    rating: 4.6,
    totalReviews: 234,
    students: 1560,
    lessons: 35,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    slug: 'digital-marketing-mastery',
    tags: ['SEO', 'Social Media', 'Email Marketing', 'Analytics', 'Marketing'],
    modules: [],
    reviews: [],
    faqs: [],
    ratingBreakdown: {
      5: 180,
      4: 45,
      3: 7,
      2: 2,
      1: 0
    }
  },
  {
    id: '4',
    title: 'UI/UX Design Fundamentals',
    description: 'Master the principles of user interface and user experience design. Learn to create beautiful, functional designs that users love.',
    instructor: {
      id: '4',
      name: 'Emma Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      bio: 'Emma is a senior UX designer at a leading tech company with 10 years of experience in creating user-centered designs.',
      rating: 4.9,
      totalStudents: 4320,
      totalCourses: 5
    },
    category: 'Art & Design',
    level: 'beginner',
    duration: '8 weeks',
    estimatedDuration: '6-10 hours per week',
    price: 129,
    originalPrice: 179,
    rating: 4.8,
    totalReviews: 189,
    students: 980,
    lessons: 40,
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=250&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=300&h=200&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=400&fit=crop',
    slug: 'ui-ux-design-fundamentals',
    tags: ['UI Design', 'UX Design', 'Figma', 'Design Thinking', 'Prototyping'],
    modules: [],
    reviews: [],
    faqs: [],
    ratingBreakdown: {
      5: 160,
      4: 25,
      3: 3,
      2: 1,
      1: 0
    }
  },
  {
    id: '5',
    title: 'Photography Masterclass',
    description: 'Learn professional photography techniques from composition to post-processing. Master both technical skills and artistic vision.',
    instructor: {
      id: '5',
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      bio: 'David is a professional photographer with 15 years of experience, published in major magazines worldwide.',
      rating: 4.8,
      totalStudents: 2890,
      totalCourses: 4
    },
    category: 'Photography',
    level: 'intermediate',
    duration: '10 weeks',
    estimatedDuration: '4-6 hours per week',
    price: 179,
    originalPrice: 249,
    rating: 4.7,
    totalReviews: 156,
    students: 720,
    lessons: 50,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=250&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=200&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=400&fit=crop',
    slug: 'photography-masterclass',
    tags: ['Photography', 'Lighting', 'Composition', 'Photoshop', 'Lightroom'],
    modules: [],
    reviews: [],
    faqs: [],
    ratingBreakdown: {
      5: 120,
      4: 30,
      3: 5,
      2: 1,
      1: 0
    }
  },
  {
    id: '6',
    title: 'Video Production & Editing',
    description: 'Create professional videos from planning to post-production. Learn cinematography, editing, and storytelling techniques.',
    instructor: {
      id: '6',
      name: 'Lisa Wang',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      bio: 'Lisa is an award-winning filmmaker and video editor with 12 years of experience in commercial and creative video production.',
      rating: 4.9,
      totalStudents: 1980,
      totalCourses: 3
    },
    category: 'Videography',
    level: 'intermediate',
    duration: '12 weeks',
    estimatedDuration: '8-12 hours per week',
    price: 219,
    originalPrice: 299,
    rating: 4.8,
    totalReviews: 89,
    students: 450,
    lessons: 60,
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=250&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=300&h=200&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=400&fit=crop',
    slug: 'video-production-editing',
    tags: ['Video Production', 'Cinematography', 'Editing', 'Premiere Pro', 'After Effects'],
    modules: [],
    reviews: [],
    faqs: [],
    ratingBreakdown: {
      5: 75,
      4: 12,
      3: 2,
      2: 0,
      1: 0
    }
  },
  {
    id: '7',
    title: 'Content Writing & Copywriting',
    description: 'Master the art of persuasive writing for digital platforms. Learn to create engaging content that converts readers into customers.',
    instructor: {
      id: '7',
      name: 'Alex Thompson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      bio: 'Alex is a successful content strategist and copywriter with 10 years of experience helping businesses grow through compelling content.',
      rating: 4.7,
      totalStudents: 3420,
      totalCourses: 4
    },
    category: 'Content Writing',
    level: 'beginner',
    duration: '6 weeks',
    estimatedDuration: '4-6 hours per week',
    price: 99,
    originalPrice: 149,
    rating: 4.6,
    totalReviews: 178,
    students: 890,
    lessons: 30,
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=250&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=300&h=200&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=400&fit=crop',
    slug: 'content-writing-copywriting',
    tags: ['Content Writing', 'Copywriting', 'SEO Writing', 'Marketing', 'Storytelling'],
    modules: [],
    reviews: [],
    faqs: [],
    ratingBreakdown: {
      5: 140,
      4: 32,
      3: 5,
      2: 1,
      1: 0
    }
  },
  {
    id: '8',
    title: 'Financial Planning & Investment',
    description: 'Learn personal finance management, investment strategies, and wealth building techniques from financial experts.',
    instructor: {
      id: '8',
      name: 'Robert Johnson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      bio: 'Robert is a certified financial planner with 20 years of experience helping individuals and families achieve their financial goals.',
      rating: 4.8,
      totalStudents: 5670,
      totalCourses: 7
    },
    category: 'Finance',
    level: 'beginner',
    duration: '8 weeks',
    estimatedDuration: '3-5 hours per week',
    price: 159,
    originalPrice: 199,
    rating: 4.7,
    totalReviews: 267,
    students: 1230,
    lessons: 35,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop',
    slug: 'financial-planning-investment',
    tags: ['Finance', 'Investment', 'Retirement Planning', 'Budgeting', 'Wealth Building'],
    modules: [],
    reviews: [],
    faqs: [],
    ratingBreakdown: {
      5: 210,
      4: 45,
      3: 10,
      2: 2,
      1: 0
    }
  },
  {
    id: '9',
    title: 'Communication Skills Mastery',
    description: 'Develop essential communication skills for professional and personal success. Learn public speaking, negotiation, and interpersonal communication.',
    instructor: {
      id: '9',
      name: 'Maria Garcia',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      bio: 'Maria is a communication coach and former corporate trainer with 15 years of experience helping professionals improve their communication skills.',
      rating: 4.9,
      totalStudents: 2340,
      totalCourses: 3
    },
    category: 'Communication',
    level: 'intermediate',
    duration: '6 weeks',
    estimatedDuration: '3-4 hours per week',
    price: 119,
    originalPrice: 169,
    rating: 4.8,
    totalReviews: 134,
    students: 670,
    lessons: 25,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop',
    slug: 'communication-skills-mastery',
    tags: ['Communication', 'Public Speaking', 'Negotiation', 'Leadership', 'Soft Skills'],
    modules: [],
    reviews: [],
    faqs: [],
    ratingBreakdown: {
      5: 110,
      4: 20,
      3: 3,
      2: 1,
      1: 0
    }
  },
  {
    id: '10',
    title: 'Advanced Digital Marketing Strategies',
    description: 'Take your digital marketing skills to the next level with advanced strategies for SEO, PPC, social media advertising, and conversion optimization.',
    instructor: {
      id: '10',
      name: 'Jennifer Martinez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      bio: 'Jennifer is a digital marketing strategist with 8 years of experience helping businesses scale their online presence through data-driven marketing campaigns.',
      rating: 4.8,
      totalStudents: 3200,
      totalCourses: 5
    },
    category: 'Marketing',
    level: 'advanced',
    duration: '10 weeks',
    estimatedDuration: '6-8 hours per week',
    price: 179,
    originalPrice: 229,
    rating: 4.7,
    totalReviews: 145,
    students: 890,
    lessons: 45,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
    slug: 'advanced-digital-marketing-strategies',
    tags: ['SEO', 'PPC', 'Social Media Ads', 'Analytics', 'Conversion Optimization'],
    modules: [],
    reviews: [],
    faqs: [],
    ratingBreakdown: {
      5: 125,
      4: 18,
      3: 2,
      2: 0,
      1: 0
    }
  },
  {
    id: '11',
    title: 'Advanced UI/UX Design Systems',
    description: 'Master the creation of comprehensive design systems and advanced UX methodologies for large-scale applications and products.',
    instructor: {
      id: '11',
      name: 'Carlos Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      bio: 'Carlos is a senior UX designer with 12 years of experience at leading tech companies, specializing in design systems and user research.',
      rating: 4.9,
      totalStudents: 2800,
      totalCourses: 4
    },
    category: 'Art & Design',
    level: 'advanced',
    duration: '12 weeks',
    estimatedDuration: '8-10 hours per week',
    price: 199,
    originalPrice: 279,
    rating: 4.8,
    totalReviews: 112,
    students: 650,
    lessons: 55,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
    slug: 'advanced-ui-ux-design-systems',
    tags: ['Design Systems', 'User Research', 'Prototyping', 'Accessibility', 'Design Thinking'],
    modules: [],
    reviews: [],
    faqs: [],
    ratingBreakdown: {
      5: 95,
      4: 15,
      3: 2,
      2: 0,
      1: 0
    }
  },
  {
    id: '12',
    title: 'Advanced Photography Techniques',
    description: 'Explore advanced photography techniques including studio lighting, macro photography, night photography, and post-processing mastery.',
    instructor: {
      id: '12',
      name: 'Anna Kowalski',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      bio: 'Anna is an award-winning photographer with 15 years of experience, specializing in commercial and fine art photography.',
      rating: 4.8,
      totalStudents: 2100,
      totalCourses: 6
    },
    category: 'Photography',
    level: 'advanced',
    duration: '14 weeks',
    estimatedDuration: '5-7 hours per week',
    price: 219,
    originalPrice: 299,
    rating: 4.9,
    totalReviews: 98,
    students: 520,
    lessons: 60,
    image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=250&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=300&h=200&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=400&fit=crop',
    slug: 'advanced-photography-techniques',
    tags: ['Studio Lighting', 'Macro Photography', 'Night Photography', 'Post-Processing', 'Fine Art'],
    modules: [],
    reviews: [],
    faqs: [],
    ratingBreakdown: {
      5: 85,
      4: 12,
      3: 1,
      2: 0,
      1: 0
    }
  },
  {
    id: '13',
    title: 'Cinematic Video Production',
    description: 'Learn to create cinematic videos with professional techniques for storytelling, color grading, sound design, and post-production workflows.',
    instructor: {
      id: '13',
      name: 'Marcus Thompson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      bio: 'Marcus is a professional filmmaker and cinematographer with 10 years of experience in commercial and narrative film production.',
      rating: 4.9,
      totalStudents: 1650,
      totalCourses: 3
    },
    category: 'Videography',
    level: 'advanced',
    duration: '16 weeks',
    estimatedDuration: '10-12 hours per week',
    price: 279,
    originalPrice: 349,
    rating: 4.8,
    totalReviews: 76,
    students: 380,
    lessons: 70,
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=250&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=300&h=200&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=400&fit=crop',
    slug: 'cinematic-video-production',
    tags: ['Cinematography', 'Color Grading', 'Sound Design', 'Storytelling', 'Post-Production'],
    modules: [],
    reviews: [],
    faqs: [],
    ratingBreakdown: {
      5: 68,
      4: 7,
      3: 1,
      2: 0,
      1: 0
    }
  },
  {
    id: '14',
    title: 'Technical Writing & Documentation',
    description: 'Master the art of technical writing for software documentation, user guides, API documentation, and technical communication.',
    instructor: {
      id: '14',
      name: 'Dr. Patricia Lee',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      bio: 'Dr. Lee is a technical writing expert with 12 years of experience in software documentation and technical communication.',
      rating: 4.7,
      totalStudents: 2800,
      totalCourses: 4
    },
    category: 'Content Writing',
    level: 'intermediate',
    duration: '8 weeks',
    estimatedDuration: '4-6 hours per week',
    price: 139,
    originalPrice: 189,
    rating: 4.6,
    totalReviews: 156,
    students: 780,
    lessons: 32,
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=250&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=300&h=200&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=400&fit=crop',
    slug: 'technical-writing-documentation',
    tags: ['Technical Writing', 'API Documentation', 'User Guides', 'Software Documentation', 'Communication'],
    modules: [],
    reviews: [],
    faqs: [],
    ratingBreakdown: {
      5: 125,
      4: 25,
      3: 5,
      2: 1,
      1: 0
    }
  },
  {
    id: '15',
    title: 'Investment Portfolio Management',
    description: 'Learn advanced portfolio management strategies, risk assessment, asset allocation, and investment analysis for long-term wealth building.',
    instructor: {
      id: '15',
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      bio: 'Michael is a certified financial analyst with 15 years of experience in portfolio management and investment advisory services.',
      rating: 4.9,
      totalStudents: 4200,
      totalCourses: 5
    },
    category: 'Finance',
    level: 'advanced',
    duration: '10 weeks',
    estimatedDuration: '6-8 hours per week',
    price: 199,
    originalPrice: 249,
    rating: 4.8,
    totalReviews: 189,
    students: 980,
    lessons: 42,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop',
    slug: 'investment-portfolio-management',
    tags: ['Portfolio Management', 'Risk Assessment', 'Asset Allocation', 'Investment Analysis', 'Wealth Building'],
    modules: [],
    reviews: [],
    faqs: [],
    ratingBreakdown: {
      5: 160,
      4: 25,
      3: 3,
      2: 1,
      1: 0
    }
  },
  {
    id: '16',
    title: 'Public Speaking & Presentation Skills',
    description: 'Develop confident public speaking skills, presentation techniques, and persuasive communication for professional and personal success.',
    instructor: {
      id: '16',
      name: 'Dr. Rebecca Foster',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      bio: 'Dr. Foster is a communication coach and former corporate trainer with 18 years of experience helping professionals master public speaking.',
      rating: 4.8,
      totalStudents: 3100,
      totalCourses: 4
    },
    category: 'Communication',
    level: 'intermediate',
    duration: '8 weeks',
    estimatedDuration: '3-4 hours per week',
    price: 149,
    originalPrice: 199,
    rating: 4.7,
    totalReviews: 178,
    students: 920,
    lessons: 28,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop',
    slug: 'public-speaking-presentation-skills',
    tags: ['Public Speaking', 'Presentation Skills', 'Persuasion', 'Confidence Building', 'Leadership'],
    modules: [],
    reviews: [],
    faqs: [],
    ratingBreakdown: {
      5: 145,
      4: 28,
      3: 4,
      2: 1,
      1: 0
    }
  }
];

// Helper functions
export const getCourseById = (id: string): Course | undefined => {
  return courses.find(course => course.id === id);
};

export const getCourseBySlug = (slug: string): Course | undefined => {
  return courses.find(course => course.slug === slug);
};

export const getCoursesByCategory = (category: string): Course[] => {
  return courses.filter(course => course.category.toLowerCase() === category.toLowerCase());
};

export const getRelatedCourses = (currentCourseId: string, limit: number = 4): Course[] => {
  const currentCourse = getCourseById(currentCourseId);
  if (!currentCourse) return [];
  
  return courses
    .filter(course => course.id !== currentCourseId && course.category === currentCourse.category)
    .slice(0, limit);
};

export const searchCourses = (query: string): Course[] => {
  const lowercaseQuery = query.toLowerCase();
  return courses.filter(course => 
    course.title.toLowerCase().includes(lowercaseQuery) ||
    course.description.toLowerCase().includes(lowercaseQuery) ||
    course.instructor.name.toLowerCase().includes(lowercaseQuery) ||
    course.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    course.category.toLowerCase().includes(lowercaseQuery)
  );
};

export const getFeaturedCourses = (limit: number = 6): Course[] => {
  return courses.filter(course => course.rating >= 4.5).slice(0, limit);
};

export const getPopularCourses = (limit: number = 6): Course[] => {
  return [...courses]
    .sort((a, b) => b.students - a.students)
    .slice(0, limit);
};

// Course categories for filtering
export const courseCategories = [
  'Development',
  'Marketing', 
  'Art & Design',
  'Photography',
  'Videography',
  'Communication',
  'Content Writing',
  'Finance'
];

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CourseHero from '../components/course/CourseHero';
import CourseTabs from '../components/course/CourseTabs';
import OverviewTab from '../components/course/tabs/OverviewTab';
import CurriculumTab from '../components/course/tabs/CurriculumTab';
import InstructorTab from '../components/course/tabs/InstructorTab';
import FAQTab from '../components/course/tabs/FAQTab';
import ReviewsTab from '../components/course/tabs/ReviewsTab';
import CommentSection from '../components/course/CommentSection';
import useScrollToTop from '../hooks/useScrollToTop';
// import { useEnrollmentStore } from '../store/enrollmentStore';

interface Course {
  id: string;
  title: string;
  description: string;
  heroImage: string;
  instructor: {
    id: string;
    name: string;
    title: string;
    avatar: string;
    bio: string;
    socialLinks: {
      facebook?: string;
      twitter?: string;
      instagram?: string;
      linkedin?: string;
    };
  };
  modules: Array<{
    id: string;
    title: string;
    isExpanded: boolean;
    lessons: Array<{
      id: string;
      title: string;
      type: 'video' | 'document' | 'quiz';
      duration: string;
      isPreview: boolean;
      isCompleted: boolean;
    }>;
  }>;
  faqs: Array<{
    id: string;
    question: string;
    answer: string;
  }>;
  reviews: Array<{
    id: string;
    user: {
      name: string;
      avatar: string;
    };
    rating: number;
    date: string;
    comment: string;
  }>;
  averageRating: number;
  totalReviews: number;
  ratingBreakdown: {
    [key: number]: number;
  };
}

const CourseSingle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  // Enrollment store for future use
  // const { getEnrolledCourse, updateCourseProgress } = useEnrollmentStore();

  // Ensure page scrolls to top
  useScrollToTop();

  // Dummy course data
  const course: Course = {
    id: id || '1',
    title: 'The Ultimate Guide To The Best WordPress LMS Plugin',
    description: 'Learn how to create a comprehensive learning management system using WordPress and the best LMS plugins available. This course covers everything from basic setup to advanced customization.',
    heroImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
    instructor: {
      id: '1',
      name: 'John Smith',
      title: 'WordPress Expert & LMS Specialist',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      bio: 'John is a seasoned WordPress developer with over 10 years of experience in creating educational platforms and learning management systems.',
      socialLinks: {
        twitter: '#',
        linkedin: '#',
        facebook: '#'
      }
    },
    modules: [
      {
        id: '1',
        title: 'Introduction to WordPress LMS',
        isExpanded: false,
        lessons: [
          {
            id: '1',
            title: 'What is WordPress LMS?',
            type: 'video',
            duration: '5:30',
            isPreview: true,
            isCompleted: false
          },
          {
            id: '2',
            title: 'Setting up your first course',
            type: 'video',
            duration: '8:15',
            isPreview: false,
            isCompleted: false
          },
          {
            id: '3',
            title: 'Course structure and organization',
            type: 'document',
            duration: '10 min read',
            isPreview: false,
            isCompleted: false
          }
        ]
      },
      {
        id: '2',
        title: 'Advanced LMS Features',
        isExpanded: false,
        lessons: [
          {
            id: '4',
            title: 'User management and roles',
            type: 'video',
            duration: '12:45',
            isPreview: false,
            isCompleted: false
          },
          {
            id: '5',
            title: 'Payment integration',
            type: 'video',
            duration: '15:20',
            isPreview: false,
            isCompleted: false
          },
          {
            id: '6',
            title: 'Quiz and assessment tools',
            type: 'video',
            duration: '18:30',
            isPreview: false,
            isCompleted: false
          }
        ]
      }
    ],
    faqs: [
      {
        id: '1',
        question: 'What is WordPress LMS?',
        answer: 'WordPress LMS (Learning Management System) is a plugin that transforms your WordPress website into a comprehensive online learning platform where you can create, manage, and sell courses.'
      },
      {
        id: '2',
        question: 'Do I need coding experience to use this course?',
        answer: 'No coding experience is required. This course is designed for beginners and covers everything step by step, from basic setup to advanced features.'
      },
      {
        id: '3',
        question: 'How long does it take to complete this course?',
        answer: 'The course is designed to be completed in 2-3 weeks with 2-3 hours of study per week. However, you can learn at your own pace.'
      },
      {
        id: '4',
        question: 'Will I get a certificate after completion?',
        answer: 'Yes, you will receive a certificate of completion that you can download and share on your professional profiles.'
      }
    ],
    reviews: [
      {
        id: '1',
        user: {
          name: 'Luis Pablo',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
        },
        rating: 5,
        date: '2 days ago',
        comment: 'Excellent course! The instructor explains everything clearly and the step-by-step approach makes it easy to follow along. Highly recommended for anyone looking to create an LMS.'
      },
      {
        id: '2',
        user: {
          name: 'Sarah Johnson',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
        },
        rating: 4,
        date: '1 week ago',
        comment: 'Great content and well-structured lessons. The practical examples really help understand the concepts better. Would love to see more advanced topics covered.'
      },
      {
        id: '3',
        user: {
          name: 'Mike Chen',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
        },
        rating: 5,
        date: '2 weeks ago',
        comment: 'Perfect for beginners! The instructor takes time to explain each concept thoroughly. The course materials are comprehensive and easy to understand.'
      }
    ],
    averageRating: 4.0,
    totalReviews: 1025,
    ratingBreakdown: {
      5: 512,
      4: 256,
      3: 128,
      2: 64,
      1: 65
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', active: activeTab === 'overview' },
    { id: 'curriculum', label: 'Curriculum', active: activeTab === 'curriculum' },
    { id: 'instructor', label: 'Instructor', active: activeTab === 'instructor' },
    { id: 'faq', label: 'FAQ', active: activeTab === 'faq' },
    { id: 'reviews', label: 'Reviews', active: activeTab === 'reviews' }
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleCommentSubmit = (comment: { name: string; email: string; comment: string }) => {
    console.log('New comment:', comment);
    // Here you would typically send the comment to your backend
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab description={course.description} />;
      case 'curriculum':
        return <CurriculumTab modules={course.modules} />;
      case 'instructor':
        return <InstructorTab instructor={course.instructor} />;
      case 'faq':
        return <FAQTab faqs={course.faqs} />;
      case 'reviews':
        return (
          <ReviewsTab
            reviews={course.reviews}
            averageRating={course.averageRating}
            totalReviews={course.totalReviews}
            ratingBreakdown={course.ratingBreakdown}
          />
        );
      default:
        return <OverviewTab description={course.description} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <CourseHero 
        title={course.title} 
        image={course.heroImage}
        instructor={course.instructor.name}
        category="Web Development"
        duration="10 hours"
        students={1234}
        rating={course.averageRating}
        lessons={course.modules.reduce((total, module) => total + module.lessons.length, 0)}
        description={course.description}
        courseId={course.id}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CourseTabs tabs={tabs} onTabChange={handleTabChange} />
        
        <div className="mt-8">
          {renderTabContent()}
        </div>
        
        <CommentSection onSubmitComment={handleCommentSubmit} />
      </div>
    </div>
  );
};

export default CourseSingle;

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import CourseHero from '../components/course/CourseHero';
import CourseTabs from '../components/course/CourseTabs';
import OverviewTab from '../components/course/tabs/OverviewTab';
import CurriculumTab from '../components/course/tabs/CurriculumTab';
import InstructorTab from '../components/course/tabs/InstructorTab';
import FAQTab from '../components/course/tabs/FAQTab';
import ReviewsTab from '../components/course/tabs/ReviewsTab';
import CommentSection from '../components/course/CommentSection';
import useScrollToTop from '../hooks/useScrollToTop';
import { getCourseById, getRelatedCourses } from '../data/courseData';
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

  // Get course data from centralized store
  const course = getCourseById(id || '1');
  
  // If course not found, show error or redirect
  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Course Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The course you're looking for doesn't exist.</p>
          <Link
            to="/courses"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  // Get related courses
  const relatedCourses = getRelatedCourses(course.id);

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
        return <CurriculumTab modules={course.modules.map(module => ({ 
          ...module, 
          isExpanded: false,
          lessons: module.lessons.map(lesson => ({
            ...lesson,
            type: lesson.type === 'text' ? 'document' as const : lesson.type === 'assignment' ? 'quiz' as const : lesson.type,
            isCompleted: lesson.isCompleted || false
          }))
        }))} />;
      case 'instructor':
        return <InstructorTab instructor={{
          ...course.instructor,
          title: course.instructor.title || 'Course Instructor',
          socialLinks: course.instructor.socialLinks || {}
        }} />;
      case 'faq':
        return <FAQTab faqs={course.faqs} />;
      case 'reviews':
        return (
          <ReviewsTab
            reviews={course.reviews.map(review => ({
              ...review,
              user: review.user || review.author || { name: 'Anonymous', avatar: '' },
              comment: review.comment || review.content || ''
            }))}
            averageRating={course.averageRating || course.rating}
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
        rating={course.averageRating || course.rating}
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

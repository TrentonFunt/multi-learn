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
import RelatedCourses from '../components/course/RelatedCourses';
import useScrollToTop from '../hooks/useScrollToTop';
import { getCourseById, getRelatedCourses } from '../data/courseData';
// import { useEnrollmentStore } from '../store/enrollmentStore';


const CourseSingle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  // Enrollment store for course management (for future use)
  // const { getEnrolledCourse, isEnrolled, enrollInCourse, updateCourseProgress } = useEnrollmentStore();

  // Ensure page scrolls to top
  useScrollToTop();

  // Get course data from centralized store
  const course = getCourseById(id || '1');
  
  // Get related courses (only if course exists)
  const relatedCourses = course ? getRelatedCourses(course.id, 4) : [];
  
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

  const handleCommentSubmit = () => {
    // Here you would typically send the comment to your backend
    // For now, comments are handled by the CommentSection component
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
    <div className="min-h-screen bg-white dark:bg-gray-900">
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
        
        {/* Related Courses */}
        <RelatedCourses courses={relatedCourses} />
      </div>
    </div>
  );
};

export default CourseSingle;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Trash2, Loader2 } from 'lucide-react';
import { useEnrollmentStore } from '../../store/enrollmentStore';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../contexts/ToastContext';
import Button from '../ui/Button';
import ConfirmationModal from '../ui/ConfirmationModal';

interface EnrollmentButtonProps {
  courseId: string;
  courseTitle: string;
  instructor: string;
  thumbnail: string;
  totalLessons: number;
  estimatedDuration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  rating: number;
  description: string;
  variant?: 'card' | 'page';
  onEnroll?: () => void;
  onUnenroll?: () => void;
}

const EnrollmentButton: React.FC<EnrollmentButtonProps> = ({
  courseId,
  courseTitle,
  instructor,
  thumbnail,
  totalLessons,
  estimatedDuration,
  difficulty,
  category,
  rating,
  description,
  variant = 'card',
  onEnroll,
  onUnenroll
}) => {
  const { user } = useAuth();
  const { isEnrolled, enrollInCourse, unenrollFromCourse, getEnrolledCourse } = useEnrollmentStore();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showUnenrollModal, setShowUnenrollModal] = useState(false);

  const enrolled = isEnrolled(courseId);
  const enrolledCourse = getEnrolledCourse(courseId);

  const handleContinueCourse = () => {
    navigate(`/courses/${courseId}`);
  };

  const handleEnroll = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      enrollInCourse({
        id: courseId,
        title: courseTitle,
        instructor,
        thumbnail,
        totalLessons,
        estimatedDuration,
        difficulty,
        category,
        rating,
        description
      });
      
      addToast({
        type: 'success',
        title: 'Successfully Enrolled!',
        message: `You've been enrolled in "${courseTitle}"`,
        action: {
          label: 'View Course',
          onClick: () => window.location.href = `/courses/${courseId}`
        }
      });
      
      onEnroll?.();
    } catch {
      addToast({
        type: 'error',
        title: 'Enrollment Failed',
        message: 'There was an error enrolling in this course. Please try again.'
      });
      // Error enrolling in course
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnenroll = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      unenrollFromCourse(courseId);
      
      addToast({
        type: 'info',
        title: 'Course Removed',
        message: `"${courseTitle}" has been removed from your courses`
      });
      
      setShowUnenrollModal(false);
      onUnenroll?.();
    } catch {
      addToast({
        type: 'error',
        title: 'Removal Failed',
        message: 'There was an error removing this course. Please try again.'
      });
      // Error unenrolling from course
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <Button 
        variant="fill" 
        size={variant === 'page' ? 'large' : 'small'}
        className={variant === 'card' ? 'w-auto px-6' : 'w-full'}
        onClick={() => window.location.href = '/login'}
      >
        <BookOpen className="h-4 w-4 mr-2" />
        Login to Enroll
      </Button>
    );
  }

  if (enrolled) {
    return (
      <>
        <div className="space-y-2">
          {enrolledCourse && (
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">Progress</span>
                <span className="text-gray-900 dark:text-gray-100 font-medium">{enrolledCourse.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${enrolledCourse.progress}%` }}
                ></div>
              </div>
            </div>
          )}
          
          <div className="flex space-x-2">
            <Button 
              variant="fill" 
              size={variant === 'page' ? 'large' : 'small'}
              className={variant === 'card' ? 'flex-1' : 'flex-1'}
              onClick={handleContinueCourse}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <BookOpen className="h-4 w-4 mr-2" />
              )}
              {enrolledCourse?.status === 'completed' ? 'View Certificate' : 'Continue Course'}
            </Button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowUnenrollModal(true)}
              disabled={isLoading}
              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
              title="Remove from my courses"
            >
              <Trash2 className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
        
        <ConfirmationModal
          isOpen={showUnenrollModal}
          onClose={() => setShowUnenrollModal(false)}
          onConfirm={handleUnenroll}
          title="Remove Course"
          message={`Are you sure you want to remove "${courseTitle}" from your enrolled courses? This action cannot be undone.`}
          confirmText="Remove Course"
          cancelText="Keep Course"
          type="danger"
          isLoading={isLoading}
        />
      </>
    );
  }

  return (
    <Button 
      variant="fill" 
      size={variant === 'page' ? 'large' : 'small'}
      className={variant === 'card' ? 'w-auto px-6' : 'w-full'}
      onClick={handleEnroll}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        <BookOpen className="h-4 w-4 mr-2" />
      )}
      Enroll Now
    </Button>
  );
};

export default EnrollmentButton;

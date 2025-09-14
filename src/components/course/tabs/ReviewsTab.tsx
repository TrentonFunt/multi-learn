import React from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface Review {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  rating: number;
  date: string;
  comment: string;
}

interface ReviewsTabProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  ratingBreakdown: {
    [key: number]: number; // rating: count
  };
}

const ReviewsTab: React.FC<ReviewsTabProps> = ({ 
  reviews, 
  averageRating, 
  totalReviews, 
  ratingBreakdown 
}) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getPercentage = (count: number) => {
    return (count / totalReviews) * 100;
  };

  return (
    <div className="space-y-8">
      {/* Rating Overview */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex justify-center mb-2">
              {renderStars(Math.round(averageRating))}
            </div>
            <p className="text-gray-600">Based on {totalReviews} reviews</p>
          </div>
          
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-3">
                <span className="text-sm text-gray-600 w-8">{rating} star</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: `${getPercentage(ratingBreakdown[rating] || 0)}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-12">
                  {ratingBreakdown[rating] || 0}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-900">Student Reviews</h3>
        {reviews.map((review) => (
          <div key={review.id} className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <img
                src={review.user.avatar}
                alt={review.user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{review.user.name}</h4>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <div className="flex items-center space-x-1 mb-3">
                  {renderStars(review.rating)}
                </div>
                <p className="text-gray-700 leading-relaxed">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-2">
        <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold">1</button>
        <button className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">2</button>
        <button className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">3</button>
        <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ReviewsTab;

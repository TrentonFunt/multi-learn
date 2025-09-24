import React, { useState, useEffect } from 'react';
import { Search, Grid, List } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import CourseCard from '../components/course/CourseCard';
import FilterSidebar from '../components/course/FilterSidebar';
import Pagination from '../components/ui/Pagination';
import { courses, searchCourses } from '../data/courseData';

interface FilterOption {
  label: string;
  count: number;
  checked: boolean;
}

interface FilterSection {
  title: string;
  options: FilterOption[];
}

const Courses: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Get category from URL parameters
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
      // Also update the filter state to reflect the URL parameter
      setFilters(prevFilters => 
        prevFilters.map(section => 
          section.title === 'Course Category'
            ? {
                ...section,
                options: section.options.map(option => ({
                  ...option,
                  checked: option.label === categoryParam
                }))
              }
            : section
        )
      );
    } else {
      setSelectedCategory('');
    }
  }, [searchParams]);
  const [filters, setFilters] = useState<FilterSection[]>([
    {
      title: 'Course Category',
      options: [
        { label: 'Development', count: 5, checked: false },
        { label: 'Marketing', count: 1, checked: false },
        { label: 'Art & Design', count: 1, checked: false },
        { label: 'Photography', count: 1, checked: false },
        { label: 'Videography', count: 1, checked: false },
        { label: 'Communication', count: 1, checked: false },
        { label: 'Content Writing', count: 1, checked: false },
        { label: 'Finance', count: 0, checked: false },
      ]
    },
    {
      title: 'Instructors',
      options: [
        { label: 'Kenny White', count: 15, checked: false },
        { label: 'John Doe', count: 15, checked: false },
      ]
    },
    {
      title: 'Price',
      options: [
        { label: 'All', count: 15, checked: true },
        { label: 'Free', count: 15, checked: false },
        { label: 'Paid', count: 15, checked: false },
      ]
    },
    {
      title: 'Review',
      options: [
        { label: '5 stars', count: 1025, checked: false },
        { label: '4 stars', count: 1025, checked: false },
        { label: '3 stars', count: 1025, checked: false },
        { label: '2 stars', count: 1025, checked: false },
        { label: '1 star', count: 1025, checked: false },
      ]
    },
    {
      title: 'Level',
      options: [
        { label: 'All levels', count: 15, checked: true },
        { label: 'Beginner', count: 15, checked: false },
        { label: 'Intermediate', count: 15, checked: false },
        { label: 'Expert', count: 15, checked: false },
      ]
    }
  ]);

  // Use centralized course data

  const handleFilterChange = (sectionTitle: string, optionLabel: string, checked: boolean) => {
    setFilters(prevFilters => 
      prevFilters.map(section => 
        section.title === sectionTitle
          ? {
              ...section,
              options: section.options.map(option =>
                option.label === optionLabel
                  ? { ...option, checked }
                  : option
              )
            }
          : section
      )
    );

    // Handle category filtering
    if (sectionTitle === 'Course Category') {
      setSelectedCategories(prev => {
        if (checked) {
          return [...prev, optionLabel];
        } else {
          return prev.filter(cat => cat !== optionLabel);
        }
      });
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Filter courses using centralized search function and additional filters
  let filteredCourses = searchTerm ? searchCourses(searchTerm) : courses;
  
  // Apply additional filters
  filteredCourses = filteredCourses.filter(course => {
    // Filter by URL category parameter if selected
    if (selectedCategory && course.category !== selectedCategory) {
      return false;
    }

    // Filter by selected categories from filter sidebar
    if (selectedCategories.length > 0 && !selectedCategories.includes(course.category)) {
      return false;
    }

    return true;
  });

  const coursesPerPage = 6;
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const paginatedCourses = filteredCourses.slice(startIndex, startIndex + coursesPerPage);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            {selectedCategory ? `${selectedCategory} Courses` : 
             selectedCategories.length > 0 ? `${selectedCategories.join(', ')} Courses` : 
             'All Courses'}
          </h1>
          <div className="mb-4 flex items-center justify-between">
            <div className="text-gray-600 dark:text-gray-400">
              {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
            </div>
            {(selectedCategory || selectedCategories.length > 0) && (
              <button
                onClick={() => {
                  setSelectedCategory('');
                  setSelectedCategories([]);
                  setSearchParams({});
                  // Reset filter checkboxes
                  setFilters(prevFilters => 
                    prevFilters.map(section => 
                      section.title === 'Course Category'
                        ? {
                            ...section,
                            options: section.options.map(option => ({ ...option, checked: false }))
                          }
                        : section
                    )
                  );
                }}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                ← Clear All Filters
              </button>
            )}
          </div>
          
          {/* Search and View Toggle */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-500 w-5 h-5" />
              <input
                id="course-search"
                name="course-search"
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoComplete="off"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Course Listings */}
          <div className="lg:col-span-3">
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2' 
                : 'grid-cols-1'
            }`}>
              {paginatedCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  instructor={course.instructor.name}
                  category={course.category}
                  image={course.image}
                  duration={course.duration}
                  students={course.students}
                  level={course.level}
                  lessons={course.lessons}
                  price={course.price}
                  originalPrice={course.originalPrice}
                  isFree={course.isFree}
                  rating={course.rating}
                  description={course.description}
                />
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>

          {/* Filter Sidebar */}
          <div className="lg:col-span-1">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;

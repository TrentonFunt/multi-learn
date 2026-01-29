import React, { useState, useEffect, useRef, useMemo } from 'react';
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

// Helper function to get unique values and counts from courses
const getCategoryCounts = (courseList: typeof courses) => {
  const counts: Record<string, number> = {};
  courseList.forEach(course => {
    counts[course.category] = (counts[course.category] || 0) + 1;
  });
  return counts;
};

const getInstructorCounts = (courseList: typeof courses) => {
  const counts: Record<string, number> = {};
  courseList.forEach(course => {
    counts[course.instructor.name] = (counts[course.instructor.name] || 0) + 1;
  });
  return counts;
};

const getLevelCounts = (courseList: typeof courses) => {
  const counts: Record<string, number> = {
    'All levels': courseList.length,
    'Beginner': 0,
    'Intermediate': 0,
    'Advanced': 0
  };
  courseList.forEach(course => {
    const level = course.level.charAt(0).toUpperCase() + course.level.slice(1);
    counts[level] = (counts[level] || 0) + 1;
  });
  return counts;
};

const getPriceCounts = (courseList: typeof courses) => {
  const free = courseList.filter(c => c.isFree || c.price === 0).length;
  const paid = courseList.filter(c => !c.isFree && c.price > 0).length;
  return {
    'All': courseList.length,
    'Free': free,
    'Paid': paid
  };
};

const getRatingCounts = (courseList: typeof courses) => {
  const counts: Record<string, number> = {
    '5 stars': 0,
    '4 stars & up': 0,
    '3 stars & up': 0,
    '2 stars & up': 0,
    '1 star & up': 0
  };
  courseList.forEach(course => {
    if (course.rating >= 5) counts['5 stars']++;
    if (course.rating >= 4) counts['4 stars & up']++;
    if (course.rating >= 3) counts['3 stars & up']++;
    if (course.rating >= 2) counts['2 stars & up']++;
    if (course.rating >= 1) counts['1 star & up']++;
  });
  return counts;
};

const Courses: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedInstructors, setSelectedInstructors] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All levels');
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const hasProcessedInitialSearch = useRef(false);

  // Build filter sections with real data
  const [filters, setFilters] = useState<FilterSection[]>(() => {
    const categoryCounts = getCategoryCounts(courses);
    const instructorCounts = getInstructorCounts(courses);
    const levelCounts = getLevelCounts(courses);
    const priceCounts = getPriceCounts(courses);
    const ratingCounts = getRatingCounts(courses);

    return [
      {
        title: 'Course Category',
        options: Object.entries(categoryCounts)
          .sort((a, b) => b[1] - a[1])
          .map(([label, count]) => ({ label, count, checked: false }))
      },
      {
        title: 'Instructors',
        options: Object.entries(instructorCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10) // Show top 10 instructors
          .map(([label, count]) => ({ label, count, checked: false }))
      },
      {
        title: 'Price',
        options: Object.entries(priceCounts)
          .map(([label, count]) => ({ label, count, checked: label === 'All' }))
      },
      {
        title: 'Rating',
        options: Object.entries(ratingCounts)
          .map(([label, count]) => ({ label, count, checked: false }))
      },
      {
        title: 'Level',
        options: Object.entries(levelCounts)
          .map(([label, count]) => ({ label, count, checked: label === 'All levels' }))
      }
    ];
  });

  // Get category from URL parameters
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
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

  // Handle search parameter from URL only on initial load
  useEffect(() => {
    if (!hasProcessedInitialSearch.current) {
      const searchParam = searchParams.get('search');
      if (searchParam) {
        setSearchTerm(decodeURIComponent(searchParam));
      }
      hasProcessedInitialSearch.current = true;
    }
  }, [searchParams]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategories, selectedInstructors, selectedPrice, selectedLevel, selectedRating]);

  const handleFilterChange = (sectionTitle: string, optionLabel: string, checked: boolean) => {
    setFilters(prevFilters => 
      prevFilters.map(section => {
        if (section.title !== sectionTitle) return section;
        
        // For Price and Level, only one option can be selected (radio-like behavior)
        if (sectionTitle === 'Price' || sectionTitle === 'Level') {
          return {
            ...section,
            options: section.options.map(option => ({
              ...option,
              checked: option.label === optionLabel
            }))
          };
        }
        
        // For Rating, selecting one clears others (single select)
        if (sectionTitle === 'Rating') {
          return {
            ...section,
            options: section.options.map(option => ({
              ...option,
              checked: option.label === optionLabel ? checked : false
            }))
          };
        }
        
        // For categories and instructors, allow multiple selection
        return {
          ...section,
          options: section.options.map(option =>
            option.label === optionLabel
              ? { ...option, checked }
              : option
          )
        };
      })
    );

    // Update selection states based on filter type
    if (sectionTitle === 'Course Category') {
      setSelectedCategories(prev => 
        checked ? [...prev, optionLabel] : prev.filter(cat => cat !== optionLabel)
      );
    } else if (sectionTitle === 'Instructors') {
      setSelectedInstructors(prev => 
        checked ? [...prev, optionLabel] : prev.filter(inst => inst !== optionLabel)
      );
    } else if (sectionTitle === 'Price') {
      setSelectedPrice(optionLabel);
    } else if (sectionTitle === 'Level') {
      setSelectedLevel(optionLabel);
    } else if (sectionTitle === 'Rating') {
      if (checked) {
        // Extract minimum rating from label
        const match = optionLabel.match(/(\d)/);
        setSelectedRating(match ? parseInt(match[1]) : 0);
      } else {
        setSelectedRating(0);
      }
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Filter courses using centralized search function and additional filters
  const filteredCourses = useMemo(() => {
    let result = searchTerm ? searchCourses(searchTerm) : [...courses];
    
    // Filter by URL category parameter if selected
    if (selectedCategory) {
      result = result.filter(course => course.category === selectedCategory);
    }

    // Filter by selected categories from filter sidebar
    if (selectedCategories.length > 0) {
      result = result.filter(course => selectedCategories.includes(course.category));
    }

    // Filter by instructors
    if (selectedInstructors.length > 0) {
      result = result.filter(course => selectedInstructors.includes(course.instructor.name));
    }

    // Filter by price
    if (selectedPrice === 'Free') {
      result = result.filter(course => course.isFree || course.price === 0);
    } else if (selectedPrice === 'Paid') {
      result = result.filter(course => !course.isFree && course.price > 0);
    }

    // Filter by level
    if (selectedLevel !== 'All levels') {
      result = result.filter(course => 
        course.level.toLowerCase() === selectedLevel.toLowerCase()
      );
    }

    // Filter by rating
    if (selectedRating > 0) {
      result = result.filter(course => course.rating >= selectedRating);
    }

    return result;
  }, [searchTerm, selectedCategory, selectedCategories, selectedInstructors, selectedPrice, selectedLevel, selectedRating]);

  const coursesPerPage = 6;
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const paginatedCourses = filteredCourses.slice(startIndex, startIndex + coursesPerPage);

  // Check if any filters are active
  const hasActiveFilters = selectedCategory || selectedCategories.length > 0 || 
    selectedInstructors.length > 0 || selectedPrice !== 'All' || 
    selectedLevel !== 'All levels' || selectedRating > 0;

  const clearAllFilters = () => {
    setSelectedCategory('');
    setSelectedCategories([]);
    setSelectedInstructors([]);
    setSelectedPrice('All');
    setSelectedLevel('All levels');
    setSelectedRating(0);
    setSearchParams({});
    
    // Reset all filter checkboxes
    setFilters(prevFilters => 
      prevFilters.map(section => ({
        ...section,
        options: section.options.map(option => ({
          ...option,
          checked: (section.title === 'Price' && option.label === 'All') ||
                   (section.title === 'Level' && option.label === 'All levels')
        }))
      }))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            {selectedCategory ? `${selectedCategory} Courses` : 
             selectedCategories.length > 0 ? `${selectedCategories.join(', ')} Courses` : 
             'All Courses'}
          </h1>
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="text-gray-600 dark:text-gray-400">
              {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors"
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
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                autoComplete="off"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Filter Sidebar - appears first in DOM for mobile, positioned right on desktop */}
          <div className="order-first lg:order-last lg:col-span-1">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Course Listings */}
          <div className="order-last lg:order-first lg:col-span-3">
            <div className={`grid gap-4 sm:gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
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
        </div>
      </div>
    </div>
  );
};

export default Courses;

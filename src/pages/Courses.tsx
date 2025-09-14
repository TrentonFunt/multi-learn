import React, { useState } from 'react';
import { Search, Grid, List } from 'lucide-react';
import CourseCard from '../components/course/CourseCard';
import FilterSidebar from '../components/course/FilterSidebar';
import Pagination from '../components/ui/Pagination';

interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  image: string;
  duration: string;
  students: number;
  level: string;
  lessons: number;
  price: number;
  originalPrice?: number;
  isFree?: boolean;
  rating?: number;
}

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
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<FilterSection[]>([
    {
      title: 'Course Category',
      options: [
        { label: 'Commercial', count: 15, checked: false },
        { label: 'Office', count: 15, checked: false },
        { label: 'Shop', count: 15, checked: false },
        { label: 'Educate', count: 15, checked: false },
        { label: 'Academy', count: 15, checked: false },
        { label: 'Single family home', count: 15, checked: false },
        { label: 'Studio', count: 15, checked: false },
        { label: 'University', count: 15, checked: false },
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

  // Dummy course data
  const courses: Course[] = [
    {
      id: '1',
      title: 'Create An LMS Website With LearnPress',
      instructor: 'Determined Poitras',
      category: 'Photography',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop',
      duration: '2 Weeks',
      students: 156,
      level: 'All levels',
      lessons: 20,
      price: 29,
      isFree: true,
      rating: 4.8
    },
    {
      id: '2',
      title: 'Complete WordPress Theme Development',
      instructor: 'Determined Poitras',
      category: 'Photography',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
      duration: '3 Weeks',
      students: 234,
      level: 'All levels',
      lessons: 25,
      price: 49,
      originalPrice: 80,
      rating: 4.9
    },
    {
      id: '3',
      title: 'Advanced React Development Course',
      instructor: 'Determined Poitras',
      category: 'Photography',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
      duration: '4 Weeks',
      students: 189,
      level: 'All levels',
      lessons: 30,
      price: 99,
      originalPrice: 150,
      rating: 4.7
    },
    {
      id: '4',
      title: 'Digital Marketing Masterclass',
      instructor: 'Determined Poitras',
      category: 'Photography',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
      duration: '2 Weeks',
      students: 312,
      level: 'All levels',
      lessons: 18,
      price: 79,
      originalPrice: 120,
      rating: 4.6
    },
    {
      id: '5',
      title: 'UI/UX Design Fundamentals',
      instructor: 'Determined Poitras',
      category: 'Photography',
      image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=250&fit=crop',
      duration: '3 Weeks',
      students: 145,
      level: 'All levels',
      lessons: 22,
      price: 89,
      originalPrice: 130,
      rating: 4.8
    },
    {
      id: '6',
      title: 'Python Programming for Beginners',
      instructor: 'Determined Poitras',
      category: 'Photography',
      image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop',
      duration: '5 Weeks',
      students: 456,
      level: 'All levels',
      lessons: 35,
      price: 59,
      originalPrice: 100,
      rating: 4.9
    },
    {
      id: '7',
      title: 'JavaScript ES6+ Mastery',
      instructor: 'Determined Poitras',
      category: 'Photography',
      image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop',
      duration: '3 Weeks',
      students: 278,
      level: 'All levels',
      lessons: 28,
      price: 69,
      originalPrice: 110,
      rating: 4.7
    },
    {
      id: '8',
      title: 'Node.js Backend Development',
      instructor: 'Determined Poitras',
      category: 'Photography',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop',
      duration: '4 Weeks',
      students: 198,
      level: 'All levels',
      lessons: 32,
      price: 89,
      originalPrice: 140,
      rating: 4.8
    }
  ];

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
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredCourses = courses.filter(course => {
    if (searchTerm && !course.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  const coursesPerPage = 6;
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const paginatedCourses = filteredCourses.slice(startIndex, startIndex + coursesPerPage);

  return (
    <div className="min-h-screen bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-6">All Courses</h1>
          
          {/* Search and View Toggle */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary w-5 h-5" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border-primary bg-bg-primary text-text-primary rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-primary text-white' 
                    : 'bg-bg-primary text-text-secondary hover:bg-bg-secondary'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-primary text-white' 
                    : 'bg-bg-primary text-text-secondary hover:bg-bg-secondary'
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
                  {...course}
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

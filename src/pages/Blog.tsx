import React, { useState } from 'react';
import BlogCard from '../components/blog/BlogCard';
import BlogSidebar from '../components/blog/BlogSidebar';
import Breadcrumb from '../components/ui/Breadcrumb';
import Pagination from '../components/ui/Pagination';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string;
}

interface Category {
  name: string;
  count: number;
}

interface RecentPost {
  id: string;
  title: string;
  image: string;
  date: string;
}

const Blog: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy blog posts data
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Best LearnPress WordPress Theme Collection For 2023',
      excerpt: 'Looking for an amazing & well-functional LearnPress WordPress Theme? Online education has become increasingly popular, and having the right theme for your learning management system is crucial for success.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop',
      date: 'Jan 24, 2023',
      author: 'John Doe',
      category: 'WordPress'
    },
    {
      id: '2',
      title: 'Complete Guide to Building an Online Learning Platform',
      excerpt: 'Learn how to create a comprehensive online learning platform with modern features and best practices for student engagement and course management.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop',
      date: 'Jan 20, 2023',
      author: 'Sarah Johnson',
      category: 'E-Learning'
    },
    {
      id: '3',
      title: 'Top 10 E-Learning Trends for 2023',
      excerpt: 'Discover the latest trends in e-learning that will shape the future of online education and student learning experiences.',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=250&fit=crop',
      date: 'Jan 18, 2023',
      author: 'Mike Chen',
      category: 'Trends'
    },
    {
      id: '4',
      title: 'How to Create Engaging Online Courses',
      excerpt: 'Master the art of creating compelling and interactive online courses that keep students engaged and motivated throughout their learning journey.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop',
      date: 'Jan 15, 2023',
      author: 'Emma Wilson',
      category: 'Course Creation'
    },
    {
      id: '5',
      title: 'WordPress LMS Plugin Comparison 2023',
      excerpt: 'Compare the best WordPress LMS plugins available in 2023, including features, pricing, and user reviews to help you choose the right one.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
      date: 'Jan 12, 2023',
      author: 'David Brown',
      category: 'WordPress'
    },
    {
      id: '6',
      title: 'Building a Successful Online Education Business',
      excerpt: 'Learn the essential strategies and tactics for building a profitable online education business from scratch.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
      date: 'Jan 10, 2023',
      author: 'Lisa Garcia',
      category: 'Business'
    },
    {
      id: '7',
      title: 'Student Engagement Strategies for Online Learning',
      excerpt: 'Discover proven methods to increase student engagement and participation in your online courses and learning programs.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop',
      date: 'Jan 8, 2023',
      author: 'Alex Thompson',
      category: 'Teaching'
    }
  ];

  const categories: Category[] = [
    { name: 'Commercial', count: 15 },
    { name: 'Office', count: 15 },
    { name: 'Shop', count: 15 },
    { name: 'Educate', count: 15 },
    { name: 'Academy', count: 15 },
    { name: 'Single family home', count: 15 }
  ];

  const recentPosts: RecentPost[] = [
    {
      id: '1',
      title: 'Best LearnPress WordPress Theme Collection For 2023',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=100&h=100&fit=crop',
      date: 'Jan 24, 2023'
    },
    {
      id: '2',
      title: 'Complete Guide to Building an Online Learning Platform',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=100&h=100&fit=crop',
      date: 'Jan 20, 2023'
    },
    {
      id: '3',
      title: 'Top 10 E-Learning Trends for 2023',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=100&h=100&fit=crop',
      date: 'Jan 18, 2023'
    }
  ];

  const tags = [
    'Free courses',
    'Marketing',
    'Idea',
    'LMS',
    'LearnPress',
    'Instructor'
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Filter posts based on search query
  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const postsPerPage = 6;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  const breadcrumbItems = [
    { label: 'Blog' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">All Articles</h1>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Blog Posts */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {paginatedPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  {...post}
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

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BlogSidebar
              categories={categories}
              recentPosts={recentPosts}
              tags={tags}
              onSearch={handleSearch}
              onViewModeChange={setViewMode}
              viewMode={viewMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;

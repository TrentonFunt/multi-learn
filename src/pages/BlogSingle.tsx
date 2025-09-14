import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import BlogHero from '../components/blog/BlogHero';
import BlogContent from '../components/blog/BlogContent';
import SocialShare from '../components/blog/SocialShare';
import ArticleNavigation from '../components/blog/ArticleNavigation';
import CommentsSection from '../components/blog/CommentsSection';
import CommentForm from '../components/blog/CommentForm';
import BlogSidebar from '../components/blog/BlogSidebar';
import Breadcrumb from '../components/ui/Breadcrumb';

interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  commentsCount: number;
  featuredImage: string;
  content: string;
  tags: string[];
}

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  content: string;
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

const BlogSingle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [commentsPage, setCommentsPage] = useState(1);

  // Dummy blog post data
  const blogPost: BlogPost = {
    id: id || '1',
    title: 'Best LearnPress WordPress Theme Collection For 2023',
    author: 'Determined-poitras',
    date: 'Jan 24, 2023',
    commentsCount: 20,
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
    content: 'Looking for an amazing & well-functional LearnPress WordPress Theme? Online education has become increasingly popular, and having the right theme for your learning management system is crucial for success. In this comprehensive guide, we\'ll explore the best LearnPress themes available in 2023.',
    tags: ['Free courses', 'Marketing', 'Idea', 'LMS', 'LearnPress', 'Instructor']
  };

  // Dummy comments data
  const comments: Comment[] = [
    {
      id: '1',
      author: {
        name: 'Laura Hipster',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
      },
      date: 'October 03, 2022',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'
    },
    {
      id: '2',
      author: {
        name: 'Laura Hipster',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
      },
      date: 'October 03, 2022',
      content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      id: '3',
      author: {
        name: 'Laura Hipster',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
      },
      date: 'October 03, 2022',
      content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
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
    console.log('Search query:', query);
  };

  const handleViewModeChange = (mode: 'grid' | 'list') => {
    console.log('View mode changed to:', mode);
  };

  const handleCommentsPageChange = (page: number) => {
    setCommentsPage(page);
  };

  const handleCommentSubmit = (comment: { name: string; email: string; comment: string; saveInfo: boolean }) => {
    console.log('New comment:', comment);
  };

  const breadcrumbItems = [
    { label: 'Blog', href: '/blog' },
    { label: blogPost.title }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <BlogHero />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Blog Content */}
          <div className="lg:col-span-3">
            <BlogContent
              title={blogPost.title}
              author={blogPost.author}
              date={blogPost.date}
              commentsCount={blogPost.commentsCount}
              featuredImage={blogPost.featuredImage}
              content={blogPost.content}
              tags={blogPost.tags}
            />

            <SocialShare />

            <ArticleNavigation
              previousArticle={{
                id: '2',
                title: 'Complete Guide to Building an Online Learning Platform'
              }}
              nextArticle={{
                id: '3',
                title: 'Top 10 E-Learning Trends for 2023'
              }}
            />

            <CommentsSection
              comments={comments}
              totalComments={20}
              currentPage={commentsPage}
              totalPages={3}
              onPageChange={handleCommentsPageChange}
            />

            <CommentForm onSubmitComment={handleCommentSubmit} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BlogSidebar
              categories={categories}
              recentPosts={recentPosts}
              tags={tags}
              onSearch={handleSearch}
              onViewModeChange={handleViewModeChange}
              viewMode="list"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSingle;

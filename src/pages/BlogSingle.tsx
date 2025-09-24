import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import BlogHero from '../components/blog/BlogHero';
import BlogContent from '../components/blog/BlogContent';
import SocialShare from '../components/blog/SocialShare';
import ArticleNavigation from '../components/blog/ArticleNavigation';
import CommentsSection from '../components/blog/CommentsSection';
import CommentForm from '../components/blog/CommentForm';
import BlogSidebar from '../components/blog/BlogSidebar';
import Breadcrumb from '../components/ui/Breadcrumb';
import { getBlogPostById, getRelatedPosts, blogCategories, recentPosts, blogTags } from '../data/blogData';

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  content: string;
}

const BlogSingle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [commentsPage, setCommentsPage] = useState(1);

  // Get blog post data from centralized store
  const blogPost = getBlogPostById(id || '1');
  
  // If post not found, show error or redirect
  if (!blogPost) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Article Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The article you're looking for doesn't exist.</p>
          <Link
            to="/blog"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

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

  // Get related posts
  const relatedPosts = getRelatedPosts(blogPost.id);

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
              previousArticle={relatedPosts[0] ? {
                id: relatedPosts[0].id,
                title: relatedPosts[0].title
              } : undefined}
              nextArticle={relatedPosts[1] ? {
                id: relatedPosts[1].id,
                title: relatedPosts[1].title
              } : undefined}
            />

            <CommentsSection
              comments={comments}
              totalComments={blogPost.commentsCount}
              currentPage={commentsPage}
              totalPages={3}
              onPageChange={handleCommentsPageChange}
            />

            <CommentForm onSubmitComment={handleCommentSubmit} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BlogSidebar
              categories={blogCategories}
              recentPosts={recentPosts}
              tags={blogTags}
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

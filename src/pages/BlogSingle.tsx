import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import BlogContent from '../components/blog/BlogContent';
import SocialShare from '../components/blog/SocialShare';
import ArticleNavigation from '../components/blog/ArticleNavigation';
import CommentsSection from '../components/blog/CommentsSection';
import CommentForm from '../components/blog/CommentForm';
import BlogSidebar from '../components/blog/BlogSidebar';
import Breadcrumb from '../components/ui/Breadcrumb';
import { getBlogPostById, getPreviousArticle, getNextArticle, blogCategories, recentPosts } from '../data/blogData';
import { getComments, type Comment } from '../utils/commentStorage';

const BlogSingle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [commentsPage, setCommentsPage] = useState(1);
  const [comments, setComments] = useState<Comment[]>([]);

  // Get blog post data from centralized store
  const blogPost = getBlogPostById(id || '1');
  
  // Load comments from localStorage
  useEffect(() => {
    if (blogPost) {
      const storedComments = getComments(blogPost.id);
      setComments(storedComments);
    }
  }, [blogPost]);

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

  // Get navigation articles
  const previousArticle = getPreviousArticle(blogPost.id);
  const nextArticle = getNextArticle(blogPost.id);


  const handleCommentsPageChange = (page: number) => {
    setCommentsPage(page);
  };

  const handleCommentSubmit = (comment: Comment) => {
    setComments(prev => [comment, ...prev]);
  };

  const handleCommentDeleted = (commentId: string) => {
    setComments(prev => prev.filter(comment => comment.id !== commentId));
  };

  const breadcrumbItems = [
    { label: 'Blog', href: '/blog' },
    { label: blogPost.title }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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
              previousArticle={previousArticle ? {
                id: previousArticle.id,
                title: previousArticle.title
              } : undefined}
              nextArticle={nextArticle ? {
                id: nextArticle.id,
                title: nextArticle.title
              } : undefined}
            />

            <CommentsSection
              comments={comments}
              totalComments={comments.length}
              currentPage={commentsPage}
              totalPages={Math.ceil(comments.length / 5)}
              onPageChange={handleCommentsPageChange}
              onCommentDeleted={handleCommentDeleted}
            />

            <CommentForm 
              postId={blogPost.id}
              onSubmitComment={handleCommentSubmit} 
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BlogSidebar
              categories={blogCategories}
              recentPosts={recentPosts}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSingle;

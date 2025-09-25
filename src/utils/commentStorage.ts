export interface Comment {
  id: string;
  postId: string;
  author: {
    name: string;
    email: string;
  };
  content: string;
  date: string;
  timestamp: number;
}

const COMMENTS_STORAGE_KEY = 'multilearn_comments';

export const getComments = (postId: string): Comment[] => {
  try {
    const stored = localStorage.getItem(COMMENTS_STORAGE_KEY);
    if (!stored) return [];
    
    const allComments: Comment[] = JSON.parse(stored);
    return allComments.filter(comment => comment.postId === postId);
  } catch (error) {
    console.error('Error loading comments:', error);
    return [];
  }
};

export const addComment = (postId: string, author: { name: string; email: string }, content: string): Comment => {
  try {
    const stored = localStorage.getItem(COMMENTS_STORAGE_KEY);
    const allComments: Comment[] = stored ? JSON.parse(stored) : [];
    
    const newComment: Comment = {
      id: `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      postId,
      author,
      content,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      timestamp: Date.now()
    };
    
    allComments.push(newComment);
    localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(allComments));
    
    return newComment;
  } catch (error) {
    console.error('Error saving comment:', error);
    throw new Error('Failed to save comment');
  }
};

export const deleteComment = (commentId: string): void => {
  try {
    const stored = localStorage.getItem(COMMENTS_STORAGE_KEY);
    if (!stored) return;
    
    const allComments: Comment[] = JSON.parse(stored);
    const filteredComments = allComments.filter(comment => comment.id !== commentId);
    localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(filteredComments));
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw new Error('Failed to delete comment');
  }
};

export const getAllComments = (): Comment[] => {
  try {
    const stored = localStorage.getItem(COMMENTS_STORAGE_KEY);
    if (!stored) return [];
    
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading all comments:', error);
    return [];
  }
};

export const clearAllComments = (): void => {
  try {
    localStorage.removeItem(COMMENTS_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing comments:', error);
  }
};

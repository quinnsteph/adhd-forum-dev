import { Thread, Comment, User } from '../types';
import { mockThreads, mockComments } from '../data/mockData';

const STORAGE_KEYS = {
  THREADS: 'adhd-forum-threads',
  COMMENTS: 'adhd-forum-comments',
  USERS: 'adhd-forum-users',
  USER: 'adhd-forum-user',
} as const;

// Initialize default data if not present
export function initializeStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.THREADS)) {
    localStorage.setItem(STORAGE_KEYS.THREADS, JSON.stringify(mockThreads));
  }
  if (!localStorage.getItem(STORAGE_KEYS.COMMENTS)) {
    localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(mockComments));
  }
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([]));
  }
}

// Thread functions
export function getThreads(): Thread[] {
  const threads = localStorage.getItem(STORAGE_KEYS.THREADS);
  return threads ? JSON.parse(threads) : [];
}

export function getThread(id: string): Thread | null {
  const threads = getThreads();
  return threads.find(thread => thread.id === id) || null;
}

export function createThread(threadData: Omit<Thread, 'id' | 'createdAt' | 'updatedAt' | 'likes' | 'commentCount' | 'isLiked'>): Thread {
  const threads = getThreads();
  const newThread: Thread = {
    ...threadData,
    id: Date.now().toString(),
    createdAt: new Date(),
    updatedAt: new Date(),
    likes: 0,
    commentCount: 0,
    isLiked: false,
  };
  
  threads.unshift(newThread); // Add to beginning
  localStorage.setItem(STORAGE_KEYS.THREADS, JSON.stringify(threads));
  return newThread;
}

export function updateThread(id: string, updates: Partial<Thread>): Thread | null {
  const threads = getThreads();
  const index = threads.findIndex(thread => thread.id === id);
  
  if (index === -1) return null;
  
  threads[index] = { ...threads[index], ...updates, updatedAt: new Date() };
  localStorage.setItem(STORAGE_KEYS.THREADS, JSON.stringify(threads));
  return threads[index];
}

export function toggleThreadLike(threadId: string): boolean {
  const threads = getThreads();
  const thread = threads.find(t => t.id === threadId);
  
  if (!thread) return false;
  
  const isLiked = !thread.isLiked;
  thread.isLiked = isLiked;
  thread.likes += isLiked ? 1 : -1;
  thread.updatedAt = new Date();
  
  localStorage.setItem(STORAGE_KEYS.THREADS, JSON.stringify(threads));
  return isLiked;
}

// Comment functions
export function getComments(threadId?: string): Comment[] {
  const comments = localStorage.getItem(STORAGE_KEYS.COMMENTS);
  const allComments = comments ? JSON.parse(comments) : [];
  
  if (threadId) {
    return allComments.filter((comment: Comment) => comment.threadId === threadId);
  }
  
  return allComments;
}

export function createComment(commentData: Omit<Comment, 'id' | 'createdAt' | 'likes' | 'isLiked'>): Comment {
  const comments = getComments();
  const threads = getThreads();
  
  const newComment: Comment = {
    ...commentData,
    id: Date.now().toString(),
    createdAt: new Date(),
    likes: 0,
    isLiked: false,
  };
  
  comments.push(newComment);
  localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(comments));
  
  // Update thread comment count
  const thread = threads.find(t => t.id === commentData.threadId);
  if (thread) {
    thread.commentCount += 1;
    thread.updatedAt = new Date();
    localStorage.setItem(STORAGE_KEYS.THREADS, JSON.stringify(threads));
  }
  
  return newComment;
}

export function toggleCommentLike(commentId: string): boolean {
  const comments = getComments();
  const comment = comments.find(c => c.id === commentId);
  
  if (!comment) return false;
  
  const isLiked = !comment.isLiked;
  comment.isLiked = isLiked;
  comment.likes += isLiked ? 1 : -1;
  
  localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(comments));
  return isLiked;
}

// User functions
export function getStoredUsers(): Array<{ id: string; username: string; email: string; password: string }> {
  const users = localStorage.getItem(STORAGE_KEYS.USERS);
  return users ? JSON.parse(users) : [];
}

export function getCurrentUser(): User | null {
  const user = localStorage.getItem(STORAGE_KEYS.USER);
  return user ? JSON.parse(user) : null;
}

// Utility function to clear all data (for testing)
export function clearAllData() {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
}
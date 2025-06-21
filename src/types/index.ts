export interface User {
  id: string;
  username: string;
  avatar?: string;
  bio?: string;
  adhdType?: string;
  joinedAt: Date;
  isOnline?: boolean;
  role?: 'member' | 'moderator' | 'admin';
  isVerified?: boolean;
}

export interface Thread {
  id: string;
  title: string;
  content: string;
  author: User;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  likes: number;
  commentCount: number;
  isLiked?: boolean;
  isPinned?: boolean;
  isPublic: boolean; // New field for public/private threads
  category: 'public' | 'members-only' | 'support-groups';
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: Date;
  likes: number;
  isLiked?: boolean;
  replies?: Comment[];
  threadId: string;
  parentId?: string;
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  color: string;
  threadCount: number;
  isPublic: boolean; // New field for public/private topics
  requiresAuth?: boolean;
}

export interface ForumSection {
  id: string;
  name: string;
  description: string;
  icon: string;
  isPublic: boolean;
  threadCount: number;
  color: string;
}
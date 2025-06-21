import { User, Thread, Comment, Topic, ForumSection } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'SarahM',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Parent of two amazing ADHD kids. Learning every day!',
    adhdType: 'Combined Type',
    joinedAt: new Date('2023-06-15'),
    isOnline: true,
    role: 'member',
    isVerified: true,
  },
  {
    id: '2',
    username: 'FocusedMike',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Software developer with ADHD. Sharing productivity tips!',
    adhdType: 'Inattentive',
    joinedAt: new Date('2023-05-20'),
    isOnline: false,
    role: 'moderator',
    isVerified: true,
  },
  {
    id: '3',
    username: 'ZenLily',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'ADHD coach helping others find their rhythm ✨',
    adhdType: 'Hyperactive-Impulsive',
    joinedAt: new Date('2023-07-10'),
    isOnline: true,
    role: 'member',
    isVerified: true,
  },
];

export const forumSections: ForumSection[] = [
  {
    id: 'public-discussions',
    name: 'Public Discussions',
    description: 'Open conversations about ADHD awareness, tips, and general support',
    icon: 'Globe',
    isPublic: true,
    threadCount: 156,
    color: 'bg-primary-100 text-primary-700',
  },
  {
    id: 'getting-started',
    name: 'Getting Started',
    description: 'New to ADHD? Start here for basics and community guidelines',
    icon: 'BookOpen',
    isPublic: true,
    threadCount: 89,
    color: 'bg-accent-100 text-accent-700',
  },
  {
    id: 'members-lounge',
    name: 'Members Lounge',
    description: 'Private space for deeper discussions and personal sharing',
    icon: 'Users',
    isPublic: false,
    threadCount: 234,
    color: 'bg-secondary-100 text-secondary-700',
  },
  {
    id: 'support-groups',
    name: 'Support Groups',
    description: 'Intimate groups for specific challenges and peer support',
    icon: 'Heart',
    isPublic: false,
    threadCount: 67,
    color: 'bg-coral/20 text-red-700',
  },
  {
    id: 'resources',
    name: 'Resources & Tools',
    description: 'Helpful resources, apps, and tools for managing ADHD',
    icon: 'Bookmark',
    isPublic: true,
    threadCount: 123,
    color: 'bg-warm/30 text-yellow-700',
  },
];

export const mockTopics: Topic[] = [
  {
    id: '1',
    name: 'Focus & Productivity',
    description: 'Tips and strategies for staying focused',
    color: 'bg-primary-100 text-primary-700',
    threadCount: 245,
    isPublic: true,
  },
  {
    id: '2',
    name: 'Time Management',
    description: 'Overcoming time blindness and scheduling',
    color: 'bg-secondary-100 text-secondary-700',
    threadCount: 189,
    isPublic: true,
  },
  {
    id: '3',
    name: 'Parenting',
    description: 'Supporting ADHD children and families',
    color: 'bg-accent-100 text-accent-700',
    threadCount: 156,
    isPublic: false,
    requiresAuth: true,
  },
  {
    id: '4',
    name: 'Personal Struggles',
    description: 'Safe space for sharing personal challenges',
    color: 'bg-coral/20 text-red-700',
    threadCount: 134,
    isPublic: false,
    requiresAuth: true,
  },
  {
    id: '5',
    name: 'Medication & Treatment',
    description: 'Discussing treatment options and experiences',
    color: 'bg-purple-100 text-purple-700',
    threadCount: 98,
    isPublic: false,
    requiresAuth: true,
  },
];

export const mockThreads: Thread[] = [
  {
    id: '1',
    title: 'How do you handle overwhelming to-do lists?',
    content: `I always start my day with the best intentions, making detailed to-do lists. But by noon, I'm completely overwhelmed and end up doing nothing productive. 

Does anyone have strategies that actually work? I've tried apps, paper planners, sticky notes... but nothing seems to stick.

Would love to hear what's worked for others! 💙`,
    author: mockUsers[0],
    createdAt: new Date('2024-01-15T10:30:00'),
    updatedAt: new Date('2024-01-15T10:30:00'),
    tags: ['Focus', 'Productivity', 'Time Management'],
    likes: 23,
    commentCount: 8,
    isLiked: false,
    isPinned: false,
    isPublic: true,
    category: 'public',
  },
  {
    id: '2',
    title: 'Celebrating small wins: Finished a project today! 🎉',
    content: `After weeks of procrastination, I finally completed that work project that's been hanging over me. 

For anyone struggling: I broke it into tiny 15-minute chunks and used the Pomodoro Technique. Also, I told my partner about my deadline so I had some accountability.

Sometimes we need to celebrate the "normal" things that feel huge to us. What small wins are you celebrating today?`,
    author: mockUsers[1],
    createdAt: new Date('2024-01-14T16:45:00'),
    updatedAt: new Date('2024-01-14T16:45:00'),
    tags: ['Success', 'Motivation', 'Productivity'],
    likes: 47,
    commentCount: 12,
    isLiked: true,
    isPinned: true,
    isPublic: true,
    category: 'public',
  },
  {
    id: '3',
    title: 'ADHD-friendly meal prep ideas?',
    content: `I know meal prep is supposed to help, but I get overwhelmed by all the planning and prep work. By Wednesday, I'm back to ordering takeout.

Looking for super simple meal prep ideas that don't require lots of ingredients or complicated steps. Bonus points if they're freezer-friendly!

What are your go-to easy meals?`,
    author: mockUsers[2],
    createdAt: new Date('2024-01-13T12:20:00'),
    updatedAt: new Date('2024-01-13T12:20:00'),
    tags: ['Self-Care', 'Daily Life', 'Executive Function'],
    likes: 19,
    commentCount: 15,
    isLiked: false,
    isPinned: false,
    isPublic: true,
    category: 'public',
  },
  {
    id: '4',
    title: 'Struggling with rejection sensitivity today',
    content: `Had a tough interaction with my boss today and I can't stop replaying it. The rejection sensitive dysphoria is hitting hard and I feel like I'm spiraling.

Anyone else deal with this? How do you cope when the RSD kicks in? I know logically it's not as bad as my brain is making it, but the feelings are so intense.

Could really use some support right now. 💜`,
    author: mockUsers[0],
    createdAt: new Date('2024-01-12T14:30:00'),
    updatedAt: new Date('2024-01-12T14:30:00'),
    tags: ['RSD', 'Emotional Regulation', 'Support'],
    likes: 31,
    commentCount: 18,
    isLiked: false,
    isPinned: false,
    isPublic: false,
    category: 'members-only',
  },
  {
    id: '5',
    title: 'Medication adjustment anxiety',
    content: `My psychiatrist wants to adjust my medication dosage and I'm feeling really anxious about it. The current dose isn't perfect but I'm scared of side effects or it not working at all.

Has anyone been through medication changes? How did you handle the anxiety around it? Any tips for tracking symptoms during the transition?

This feels like such a vulnerable topic but I know this community gets it.`,
    author: mockUsers[2],
    createdAt: new Date('2024-01-11T09:15:00'),
    updatedAt: new Date('2024-01-11T09:15:00'),
    tags: ['Medication', 'Anxiety', 'Treatment'],
    likes: 24,
    commentCount: 22,
    isLiked: false,
    isPinned: false,
    isPublic: false,
    category: 'support-groups',
  },
];

export const mockComments: Comment[] = [
  {
    id: '1',
    content: 'I use the "Rule of 3" - I only put 3 things on my daily list. Game changer!',
    author: mockUsers[1],
    createdAt: new Date('2024-01-15T11:15:00'),
    likes: 5,
    isLiked: true,
    threadId: '1',
  },
  {
    id: '2',
    content: 'Have you tried breaking tasks into smaller steps? Sometimes my "clean kitchen" becomes "put dishes in dishwasher" and that feels more manageable.',
    author: mockUsers[2],
    createdAt: new Date('2024-01-15T12:30:00'),
    likes: 8,
    isLiked: false,
    threadId: '1',
  },
];
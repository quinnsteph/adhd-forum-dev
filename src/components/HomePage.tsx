import React, { useState, useEffect } from 'react';
import { Plus, Globe, Users } from 'lucide-react';
import ThreadCard from './Thread/ThreadCard';
import TopicsSidebar from './Sidebar/TopicsSidebar';
import ForumSectionCard from './Forum/ForumSectionCard';
import { useAuth } from '../contexts/AuthContext';
import { getThreads, toggleThreadLike } from '../utils/storage';
import { forumSections } from '../data/mockData';
import { Thread } from '../types';

interface HomePageProps {
  focusMode?: boolean;
}

export default function HomePage({ focusMode = false }: HomePageProps) {
  const { isAuthenticated } = useAuth();
  const [threads, setThreads] = useState<Thread[]>([]);
  const [filter, setFilter] = useState<'all' | 'public' | 'members'>('all');

  useEffect(() => {
    try {
      setThreads(getThreads());
    } catch (error) {
      console.error('Error loading threads:', error);
      setThreads([]);
    }
  }, []);

  const handleLike = (threadId: string) => {
    if (!isAuthenticated) return;
    
    try {
      toggleThreadLike(threadId);
      setThreads(getThreads());
    } catch (error) {
      console.error('Error toggling thread like:', error);
    }
  };

  const filteredThreads = threads.filter(thread => {
    if (filter === 'public') return thread.isPublic;
    if (filter === 'members') return !thread.isPublic && isAuthenticated;
    return thread.isPublic || isAuthenticated;
  }).sort((a, b) => {
    try {
      const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt);
      const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt);
      return dateB.getTime() - dateA.getTime();
    } catch (error) {
      console.error('Error sorting threads:', error);
      return 0;
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl text-white p-8 mb-8">
            <h1 className="text-3xl font-display font-bold mb-4">
              Welcome to your ADHD community 💙
            </h1>
            <p className="text-primary-100 text-lg leading-relaxed mb-6">
              A safe, supportive space where you can share experiences, find resources, 
              and connect with others who understand your journey. Join our public discussions 
              or become a member for deeper community support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/new-thread"
                className="bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors inline-flex items-center justify-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Share Your Story
              </a>
              {!isAuthenticated && (
                <a
                  href="/signup"
                  className="bg-secondary-600 bg-opacity-20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-opacity-30 transition-colors inline-flex items-center justify-center border border-secondary-300"
                >
                  Join Our Community
                </a>
              )}
            </div>
          </div>

          {/* Forum Sections */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Forum Sections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {forumSections.map((section) => (
                <ForumSectionCard
                  key={section.id}
                  section={section}
                  isAuthenticated={isAuthenticated}
                />
              ))}
            </div>
          </div>

          {/* Recent Discussions */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Recent Discussions</h2>
              
              {/* Filter Tabs */}
              <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
                {[
                  { key: 'all', label: 'All', icon: null },
                  { key: 'public', label: 'Public', icon: Globe },
                  ...(isAuthenticated ? [{ key: 'members', label: 'Members', icon: Users }] : []),
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setFilter(key as 'all' | 'public' | 'members')}
                    className={`flex items-center space-x-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                      filter === key
                        ? 'bg-white text-primary-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Authentication Notice for Members Filter */}
            {filter === 'members' && !isAuthenticated && (
              <div className="bg-secondary-50 border border-secondary-200 rounded-xl p-6 mb-6">
                <div className="flex items-center space-x-3">
                  <Users className="w-6 h-6 text-secondary-600" />
                  <div>
                    <h3 className="font-semibold text-secondary-900">Members-Only Discussions</h3>
                    <p className="text-secondary-700 mt-1">
                      Join our community to access private discussions, support groups, and deeper conversations.
                    </p>
                    <a
                      href="/signup"
                      className="inline-block mt-3 bg-secondary-500 text-white px-4 py-2 rounded-lg hover:bg-secondary-600 transition-colors font-medium"
                    >
                      Become a Member
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Thread Feed */}
          <div className="space-y-6">
            {filteredThreads.map((thread) => (
              <ThreadCard
                key={thread.id}
                thread={thread}
                onLike={handleLike}
                isAuthenticated={isAuthenticated}
              />
            ))}
          </div>

          {/* Load More */}
          <div className="mt-8 text-center">
            <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors font-medium">
              Load More Threads
            </button>
          </div>
        </main>

        {/* Sidebar */}
        <TopicsSidebar isVisible={!focusMode} isAuthenticated={isAuthenticated} />
      </div>
    </div>
  );
}
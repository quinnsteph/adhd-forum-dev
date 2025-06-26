import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Globe, Lock, Users } from 'lucide-react';
import ThreadCard from './Thread/ThreadCard';
import TopicsSidebar from './Sidebar/TopicsSidebar';
import { useAuth } from '../contexts/AuthContext';
import { getThreads, toggleThreadLike } from '../utils/storage';
import { forumSections } from '../data/mockData';
import { Thread } from '../types';

interface SectionViewProps {
  sectionId: string;
}

export default function SectionView({ sectionId }: SectionViewProps) {
  const { isAuthenticated } = useAuth();
  const [threads, setThreads] = useState<Thread[]>([]);
  
  // Find the section data
  const section = forumSections.find(s => s.id === sectionId);
  
  // Check if user can access this section
  const canAccess = section?.isPublic || isAuthenticated;

  useEffect(() => {
    if (!section || !canAccess) return;
    
    try {
      const allThreads = getThreads();
      
      // Filter threads based on section type
      let filteredThreads: Thread[] = [];
      
      switch (sectionId) {
        case 'public-discussions':
          filteredThreads = allThreads.filter(t => t.isPublic && t.category === 'public');
          break;
        case 'getting-started':
          filteredThreads = allThreads.filter(t => 
            t.isPublic && t.tags.some(tag => 
              ['Getting Started', 'Basics', 'New Member', 'Introduction'].includes(tag)
            )
          );
          break;
        case 'members-lounge':
          filteredThreads = allThreads.filter(t => 
            !t.isPublic && t.category === 'members-only'
          );
          break;
        case 'support-groups':
          filteredThreads = allThreads.filter(t => 
            !t.isPublic && t.category === 'support-groups'
          );
          break;
        case 'resources':
          filteredThreads = allThreads.filter(t => 
            t.isPublic && t.tags.some(tag => 
              ['Resources', 'Tools', 'Apps', 'Helpful'].includes(tag)
            )
          );
          break;
        default:
          filteredThreads = allThreads.filter(t => 
            section?.isPublic ? t.isPublic : (!t.isPublic && isAuthenticated)
          );
      }
      
      // Sort by creation date (newest first)
      filteredThreads.sort((a, b) => {
        const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt);
        const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });
      
      setThreads(filteredThreads);
    } catch (error) {
      console.error('Error loading section threads:', error);
      setThreads([]);
    }
  }, [sectionId, section, canAccess, isAuthenticated]);

  const handleLike = (threadId: string) => {
    if (!isAuthenticated) return;
    
    try {
      toggleThreadLike(threadId);
      // Refresh threads after like toggle
      const allThreads = getThreads();
      let filteredThreads: Thread[] = [];
      
      switch (sectionId) {
        case 'public-discussions':
          filteredThreads = allThreads.filter(t => t.isPublic && t.category === 'public');
          break;
        case 'getting-started':
          filteredThreads = allThreads.filter(t => 
            t.isPublic && t.tags.some(tag => 
              ['Getting Started', 'Basics', 'New Member', 'Introduction'].includes(tag)
            )
          );
          break;
        case 'members-lounge':
          filteredThreads = allThreads.filter(t => 
            !t.isPublic && t.category === 'members-only'
          );
          break;
        case 'support-groups':
          filteredThreads = allThreads.filter(t => 
            !t.isPublic && t.category === 'support-groups'
          );
          break;
        case 'resources':
          filteredThreads = allThreads.filter(t => 
            t.isPublic && t.tags.some(tag => 
              ['Resources', 'Tools', 'Apps', 'Helpful'].includes(tag)
            )
          );
          break;
        default:
          filteredThreads = allThreads.filter(t => 
            section?.isPublic ? t.isPublic : (!t.isPublic && isAuthenticated)
          );
      }
      
      filteredThreads.sort((a, b) => {
        const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt);
        const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });
      
      setThreads(filteredThreads);
    } catch (error) {
      console.error('Error toggling thread like:', error);
    }
  };

  // If section doesn't exist
  if (!section) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Section Not Found</h1>
          <p className="text-gray-600 mb-6">The section you're looking for doesn't exist.</p>
          <a
            href="/"
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </a>
        </div>
      </div>
    );
  }

  // If user can't access this section
  if (!canAccess) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-secondary-50 border border-secondary-200 rounded-2xl p-8 text-center">
          <Lock className="w-12 h-12 text-secondary-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-secondary-900 mb-4">{section.name}</h1>
          <p className="text-secondary-700 mb-6">{section.description}</p>
          <p className="text-secondary-600 mb-6">
            This section is for members only. Join our community to access private discussions and deeper conversations.
          </p>
          <div className="space-y-4">
            <a
              href="/signup"
              className="inline-block bg-secondary-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-secondary-600 transition-colors"
            >
              Join Our Community
            </a>
            <div>
              <a
                href="/"
                className="inline-flex items-center space-x-2 text-secondary-600 hover:text-secondary-700 font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const iconMap = {
    'Globe': Globe,
    'Users': Users,
    'Lock': Lock,
  };

  const IconComponent = iconMap[section.icon as keyof typeof iconMap] || Globe;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* Section Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <a
                href="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </a>
            </div>
            
            <div className={`${section.color} rounded-2xl p-6 mb-6`}>
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                  <IconComponent className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{section.name}</h1>
                  <p className="text-lg opacity-90 mt-1">{section.description}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-white bg-opacity-20 px-3 py-1 rounded-lg">
                    <span className="font-medium">{section.threadCount} threads</span>
                  </div>
                  {section.isPublic ? (
                    <div className="flex items-center space-x-1">
                      <Globe className="w-4 h-4" />
                      <span>Public</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1">
                      <Lock className="w-4 h-4" />
                      <span>Members Only</span>
                    </div>
                  )}
                </div>
                
                <a
                  href="/new-thread"
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg font-medium transition-colors inline-flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Thread</span>
                </a>
              </div>
            </div>
          </div>

          {/* Threads */}
          <div className="space-y-6">
            {threads.length > 0 ? (
              threads.map((thread) => (
                <ThreadCard
                  key={thread.id}
                  thread={thread}
                  onLike={handleLike}
                  isAuthenticated={isAuthenticated}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="bg-gray-50 rounded-2xl p-8">
                  <IconComponent className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No threads yet</h3>
                  <p className="text-gray-600 mb-4">
                    Be the first to start a conversation in {section.name}!
                  </p>
                  <a
                    href="/new-thread"
                    className="inline-flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Start Discussion</span>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Load More */}
          {threads.length > 0 && (
            <div className="mt-8 text-center">
              <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors font-medium">
                Load More Threads
              </button>
            </div>
          )}
        </main>

        {/* Sidebar */}
        <TopicsSidebar isVisible={true} isAuthenticated={isAuthenticated} />
      </div>
    </div>
  );
}
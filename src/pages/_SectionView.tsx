import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import ThreadCard from '../components/Thread/ThreadCard';
import TopicsSidebar from '../components/Sidebar/TopicsSidebar';
import { useAuth } from '../contexts/AuthContext';
import { getThreads, toggleThreadLike } from '../utils/storage';
import { forumSections } from '../data/mockData';
import { Thread } from '../types';

export default function SectionView() {
  const { sectionId } = useParams();
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
              ['Resources', 'Tools', 'Apps', 'Tips', 'Guides'].includes(tag)
            )
          );
          break;
        default:
          filteredThreads = allThreads.filter(t => t.isPublic);
      }
      
      // Sort by most recent
      filteredThreads.sort((a, b) => {
        try {
          const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt);
          const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt);
          return dateB.getTime() - dateA.getTime();
        } catch (error) {
          console.error('Error sorting threads:', error);
          return 0;
        }
      });
      
      setThreads(filteredThreads);
    } catch (error) {
      console.error('Error loading section threads:', error);
      setThreads([]);
    }
  }, [sectionId, section, canAccess]);

  const handleLike = (threadId: string) => {
    if (!isAuthenticated) return;
    
    try {
      const wasLiked = threads.find(t => t.id === threadId)?.isLiked || false;
      toggleThreadLike(threadId);
      
      
      // Refresh the filtered threads
      const allThreads = getThreads();
      const filteredThreads = threads.map(thread => 
        allThreads.find(t => t.id === thread.id) || thread
      );
      setThreads(filteredThreads);
    } catch (error) {
      console.error('Error toggling thread like:', error);
    }
  };

  // Redirect to login if user can't access private section
  if (!section) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Section not found</h1>
          <Link to="/" className="text-primary-600 hover:text-primary-700 font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!canAccess) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* Back Navigation */}
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          {/* Section Header */}
          <div className={`rounded-2xl text-white p-8 mb-8 ${
            section.isPublic 
              ? 'bg-gradient-to-r from-primary-500 to-accent-500' 
              : 'bg-gradient-to-r from-secondary-500 to-purple-500'
          }`}>
            <h1 className="text-3xl font-display font-bold mb-4">
              {section.name}
            </h1>
            <p className="text-primary-100 text-lg leading-relaxed mb-6">
              {section.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6 text-primary-100">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold">{threads.length}</span>
                  <span>threads</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    section.isPublic ? 'bg-green-400' : 'bg-secondary-300'
                  }`}></div>
                  <span>{section.isPublic ? 'Public' : 'Members Only'}</span>
                </div>
              </div>
              
              {isAuthenticated && (
                <Link
                  to="/new-thread"
                  className="bg-white bg-opacity-20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-opacity-30 transition-colors inline-flex items-center space-x-2 border border-white border-opacity-30"
                >
                  <Plus className="w-5 h-5" />
                  <span>New Thread</span>
                </Link>
              )}
            </div>
          </div>

          {/* Threads List */}
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
                <div className="text-gray-400 mb-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">💭</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No threads yet in this section
                </h3>
                <p className="text-gray-600 mb-6">
                  Be the first to start a conversation in {section.name.toLowerCase()}!
                </p>
                {isAuthenticated && (
                  <Link
                    to="/new-thread"
                    className="bg-primary-500 text-white px-6 py-3 rounded-xl hover:bg-primary-600 transition-colors font-medium inline-flex items-center space-x-2"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Start a Thread</span>
                  </Link>
                )}
              </div>
            )}
          </div>
        </main>

        {/* Sidebar */}
        <TopicsSidebar isVisible={true} isAuthenticated={isAuthenticated} />
      </div>
    </div>
  );
}
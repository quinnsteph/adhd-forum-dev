import React, { useState } from 'react';
import { Users, Heart, Shield, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThreadCard from '../components/Thread/ThreadCard';
import { mockThreads } from '../data/mockData';

export default function MembersArea() {
  const [threads, setThreads] = useState(mockThreads.filter(t => !t.isPublic));
  const [activeTab, setActiveTab] = useState<'all' | 'support' | 'personal'>('all');

  const handleLike = (threadId: string) => {
    setThreads(threads.map(thread => 
      thread.id === threadId 
        ? { 
            ...thread, 
            isLiked: !thread.isLiked,
            likes: thread.isLiked ? thread.likes - 1 : thread.likes + 1
          }
        : thread
    ));
  };

  const filteredThreads = threads.filter(thread => {
    if (activeTab === 'support') return thread.category === 'support-groups';
    if (activeTab === 'personal') return thread.tags.some(tag => 
      ['RSD', 'Personal', 'Struggles', 'Medication', 'Therapy'].includes(tag)
    );
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-secondary-500 to-accent-500 rounded-2xl text-white p-8 mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Users className="w-8 h-8" />
          <h1 className="text-3xl font-display font-bold">Members Area</h1>
        </div>
        <p className="text-secondary-100 text-lg leading-relaxed mb-6">
          Welcome to our private community space. Here you can share more personal experiences, 
          access support groups, and connect deeply with fellow community members.
        </p>
        <div className="flex items-center space-x-6 text-secondary-100">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Safe & Private</span>
          </div>
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5" />
            <span>Supportive Community</span>
          </div>
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5" />
            <span>Deeper Conversations</span>
          </div>
        </div>
      </div>

      {/* Community Guidelines */}
      <div className="bg-accent-50 border border-accent-200 rounded-xl p-6 mb-8">
        <h2 className="font-semibold text-accent-900 mb-3">Members Area Guidelines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-accent-800">
          <div className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-accent-500 rounded-full mt-2"></div>
            <p>Respect privacy - what's shared here stays here</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-accent-500 rounded-full mt-2"></div>
            <p>Use content warnings for sensitive topics</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-accent-500 rounded-full mt-2"></div>
            <p>Share experiences, not medical advice</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-accent-500 rounded-full mt-2"></div>
            <p>Support each other with kindness and empathy</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
          {[
            { key: 'all', label: 'All Discussions' },
            { key: 'support', label: 'Support Groups' },
            { key: 'personal', label: 'Personal Sharing' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === key
                  ? 'bg-white text-secondary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <Link
          to="/new-thread"
          className="bg-secondary-500 text-white px-4 py-2 rounded-lg hover:bg-secondary-600 transition-colors font-medium"
        >
          New Private Thread
        </Link>
      </div>

      {/* Thread Feed */}
      <div className="space-y-6">
        {filteredThreads.map((thread) => (
          <ThreadCard
            key={thread.id}
            thread={thread}
            onLike={handleLike}
            isAuthenticated={true}
          />
        ))}
      </div>

      {/* Support Resources */}
      <div className="mt-12 bg-gradient-to-r from-coral/10 to-warm/20 rounded-2xl p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Need Additional Support?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4">
            <h4 className="font-medium text-gray-900 mb-2">Crisis Resources</h4>
            <p className="text-sm text-gray-600 mb-3">
              If you're in crisis, please reach out for professional help immediately.
            </p>
            <a href="#" className="text-coral hover:text-red-600 font-medium text-sm">
              Crisis Hotlines →
            </a>
          </div>
          <div className="bg-white rounded-xl p-4">
            <h4 className="font-medium text-gray-900 mb-2">Find a Therapist</h4>
            <p className="text-sm text-gray-600 mb-3">
              Directory of ADHD-friendly mental health professionals.
            </p>
            <a href="#" className="text-secondary-600 hover:text-secondary-700 font-medium text-sm">
              Search Directory →
            </a>
          </div>
          <div className="bg-white rounded-xl p-4">
            <h4 className="font-medium text-gray-900 mb-2">ADHD Resources</h4>
            <p className="text-sm text-gray-600 mb-3">
              Evidence-based resources and tools for managing ADHD.
            </p>
            <a href="#" className="text-accent-600 hover:text-accent-700 font-medium text-sm">
              Browse Resources →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
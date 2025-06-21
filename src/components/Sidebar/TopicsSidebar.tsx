import React from 'react';
import { TrendingUp, Users, Lightbulb, Lock } from 'lucide-react';
import { mockTopics } from '../../data/mockData';

interface TopicsSidebarProps {
  isVisible: boolean;
  isAuthenticated?: boolean;
}

export default function TopicsSidebar({ isVisible, isAuthenticated = false }: TopicsSidebarProps) {
  if (!isVisible) return null;

  const motivationalQuotes = [
    "Your ADHD brain is not broken. It's different, and different can be wonderful.",
    "Progress, not perfection. Every small step counts.",
    "You belong here. This is your safe space.",
  ];

  const todaysTips = [
    "Try the 2-minute rule: If it takes less than 2 minutes, do it now.",
    "Use body doubling - work alongside someone else virtually or in person.",
    "Set a timer for 15 minutes and tackle one small task.",
  ];

  const visibleTopics = mockTopics.filter(topic => topic.isPublic || isAuthenticated);

  return (
    <aside className="w-80 space-y-6">
      {/* Popular Topics */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary-600" />
          <h2 className="font-semibold text-gray-900">Popular Topics</h2>
        </div>
        <div className="space-y-3">
          {visibleTopics.slice(0, 4).map((topic) => (
            <div key={topic.id} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${topic.color} inline-flex items-center space-x-1`}>
                    <span>{topic.name}</span>
                    {!topic.isPublic && <Lock className="w-3 h-3" />}
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{topic.description}</p>
              </div>
              <span className="text-sm text-gray-400 ml-2">{topic.threadCount}</span>
            </div>
          ))}
        </div>
        
        {!isAuthenticated && mockTopics.some(t => !t.isPublic) && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-2">
              Join to access {mockTopics.filter(t => !t.isPublic).length} more private topics
            </p>
            <a href="/signup" className="text-secondary-600 hover:text-secondary-700 font-medium text-sm">
              Become a member →
            </a>
          </div>
        )}
      </div>

      {/* Daily Motivation */}
      <div className="bg-gradient-to-br from-secondary-50 to-primary-50 rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Lightbulb className="w-5 h-5 text-secondary-600" />
          <h2 className="font-semibold text-gray-900">Daily Motivation</h2>
        </div>
        <blockquote className="text-gray-700 italic leading-relaxed">
          "{motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]}"
        </blockquote>
      </div>

      {/* ADHD Tips */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Users className="w-5 h-5 text-accent-600" />
          <h2 className="font-semibold text-gray-900">Today's Tips</h2>
        </div>
        <div className="space-y-3">
          {todaysTips.map((tip, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-accent-100 text-accent-700 rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                {index + 1}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Community Stats */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Community</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Active Members</span>
            <span className="font-semibold text-primary-600">2,847</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Online Now</span>
            <span className="font-semibold text-green-600">142</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Public Threads</span>
            <span className="font-semibold text-accent-600">156</span>
          </div>
          {isAuthenticated && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Private Discussions</span>
              <span className="font-semibold text-secondary-600">89</span>
            </div>
          )}
        </div>
      </div>

      {/* Member Benefits */}
      {!isAuthenticated && (
        <div className="bg-gradient-to-br from-secondary-50 to-accent-50 rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Join Our Community</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-secondary-500 rounded-full mt-2"></div>
              <p className="text-gray-700">Access private support groups</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-secondary-500 rounded-full mt-2"></div>
              <p className="text-gray-700">Share personal experiences safely</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-secondary-500 rounded-full mt-2"></div>
              <p className="text-gray-700">Connect with verified community members</p>
            </div>
          </div>
          <a
            href="/signup"
            className="block w-full bg-secondary-500 text-white text-center py-2 px-4 rounded-lg hover:bg-secondary-600 transition-colors font-medium mt-4"
          >
            Join Today
          </a>
        </div>
      )}
    </aside>
  );
}
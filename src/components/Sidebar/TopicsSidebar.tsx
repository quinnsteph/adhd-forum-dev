import React, { useState, useEffect, useMemo } from 'react';
import { TrendingUp, Users, Lightbulb, Lock } from 'lucide-react';
import { mockTopics, mockUsers } from '../../data/mockData';

interface TopicsSidebarProps {
  isVisible: boolean;
  isAuthenticated?: boolean;
}

// Generate additional random members for online list
const additionalMembers = [
    {
      id: 'member1',
      username: 'ADHDWarrior',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      adhdType: 'Combined Type',
      joinedAt: new Date('2023-08-15'),
      isOnline: true,
      role: 'member' as const,
    },
    {
      id: 'member2', 
      username: 'QuietFocus',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      adhdType: 'Inattentive',
      joinedAt: new Date('2023-09-01'),
      isOnline: true,
      role: 'member' as const,
    },
    {
      id: 'member3',
      username: 'EnergyBurst',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      adhdType: 'Hyperactive-Impulsive',
      joinedAt: new Date('2023-07-20'),
      isOnline: true,
      role: 'member' as const,
    },
    {
      id: 'member4',
      username: 'MindfulMoments',
      avatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      adhdType: 'Combined Type',
      joinedAt: new Date('2023-06-10'),
      isOnline: true,
      role: 'member' as const,
    },
    {
      id: 'member5',
      username: 'TaskMaster',
      avatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      adhdType: 'Inattentive',
      joinedAt: new Date('2023-05-05'),
      isOnline: true,
      role: 'member' as const,
    },
  ];

export default function TopicsSidebar({ isVisible, isAuthenticated = false }: TopicsSidebarProps) {
  const [onlineMembers, setOnlineMembers] = useState<typeof mockUsers>([]);

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

  const allMembers = useMemo(() => [...mockUsers, ...additionalMembers], []);

  // Randomize online members every component mount and periodically
  useEffect(() => {
    const updateOnlineMembers = () => {
      const shuffled = [...allMembers].sort(() => Math.random() - 0.5);
      const randomCount = Math.floor(Math.random() * 3) + 3; // 3-5 members online
      const newOnlineMembers = shuffled.slice(0, randomCount);
      setOnlineMembers(newOnlineMembers);
      
    };

    updateOnlineMembers();
    
    // Set up random intervals between 15-30 minutes to simulate realistic member activity
    const scheduleNextUpdate = () => {
      const randomDelay = Math.floor(Math.random() * 900000) + 900000; // 15-30 minutes in milliseconds
      setTimeout(() => {
        updateOnlineMembers();
        scheduleNextUpdate(); // Schedule the next random update
      }, randomDelay);
    };
    
    scheduleNextUpdate();
    
    // No need to return cleanup since we're using setTimeout instead of setInterval
  }, [allMembers]);

  const visibleTopics = mockTopics.filter(topic => topic.isPublic || isAuthenticated);

  if (!isVisible) return null;

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

      {/* Members Online */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <h2 className="font-semibold text-gray-900">Members Online</h2>
          </div>
          <span className="text-sm text-green-600 font-medium">{onlineMembers.length}</span>
        </div>
        <div className="space-y-3">
          {onlineMembers.map((member) => (
            <div key={member.id} className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={member.avatar}
                  alt={member.username}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900 truncate">
                    {member.username}
                  </span>
                  {member.role === 'moderator' && (
                    <div className="w-4 h-4 bg-primary-100 text-primary-600 rounded text-xs flex items-center justify-center font-bold">
                      M
                    </div>
                  )}
                  {member.isVerified && (
                    <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
                {member.adhdType && (
                  <p className="text-xs text-gray-500 truncate">{member.adhdType}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {onlineMembers.length > 5 && (
          <div className="mt-3 pt-3 border-t border-gray-100 text-center">
            <span className="text-xs text-gray-500">
              +{Math.floor(Math.random() * 20) + 10} more members online
            </span>
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
            <span className="font-semibold text-green-600">{Math.floor(Math.random() * 50) + 120}</span>
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
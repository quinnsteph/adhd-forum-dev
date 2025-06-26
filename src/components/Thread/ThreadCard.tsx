import React from 'react';
import { Heart, MessageCircle, Pin, Clock, Lock, Globe } from 'lucide-react';
import { Thread } from '../../types';

interface ThreadCardProps {
  thread: Thread;
  onLike?: (threadId: string) => void;
  isAuthenticated?: boolean;
}

export default function ThreadCard({ thread, onLike, isAuthenticated = false }: ThreadCardProps) {
  
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const canAccess = thread.isPublic || isAuthenticated;

  const handleLikeClick = () => {
    if (canAccess && onLike) {
      onLike(thread.id);
    }
  };



  return (
    <div className={`bg-white rounded-2xl border border-gray-100 hover:border-primary-200 transition-all duration-200 hover:shadow-md ${!canAccess ? 'opacity-60' : ''}`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={thread.author.avatar}
              alt={thread.author.username}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-900">{thread.author.username}</span>
                {thread.author.isOnline && (
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                )}
                {thread.author.role === 'moderator' && (
                  <span className="text-xs bg-accent-100 text-accent-700 px-2 py-0.5 rounded-full font-medium">
                    Mod
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Clock className="w-3 h-3" />
                <span>{formatTimeAgo(thread.createdAt)}</span>
                {thread.author.adhdType && (
                  <>
                    <span>•</span>
                    <span className="text-primary-600">{thread.author.adhdType}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {thread.isPinned && (
              <div className="flex items-center space-x-1 text-secondary-600 bg-secondary-50 px-2 py-1 rounded-lg">
                <Pin className="w-4 h-4" />
                <span className="text-xs font-medium">Pinned</span>
              </div>
            )}
            {thread.isPublic ? (
              <div className="flex items-center space-x-1 text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                <Globe className="w-3 h-3" />
                <span className="text-xs font-medium">Public</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1 text-secondary-600 bg-secondary-50 px-2 py-1 rounded-lg">
                <Lock className="w-3 h-3" />
                <span className="text-xs font-medium">Members</span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        {canAccess ? (
          <a href={`/thread/${thread.id}`} className="block group">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
              {thread.title}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
              {thread.content}
            </p>
          </a>
        ) : (
          <div className="group">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
              {thread.title}
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-2 text-gray-500">
                <Lock className="w-5 h-5" />
                <span className="font-medium">Members-only content</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Join our community to access this discussion and connect with others who understand your journey.
              </p>
              <a
                href="/signup"
                className="inline-block mt-3 text-secondary-600 hover:text-secondary-700 font-medium text-sm"
              >
                Join the community →
              </a>
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {thread.tags.slice(0, canAccess ? thread.tags.length : 2).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
          {!canAccess && thread.tags.length > 2 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-500 text-sm rounded-full font-medium">
              +{thread.tags.length - 2} more
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-6">
            <button
              onClick={handleLikeClick}
              disabled={!canAccess}
              className={`flex items-center space-x-2 transition-colors ${
                canAccess
                  ? thread.isLiked
                    ? 'text-coral hover:text-red-500'
                    : 'text-gray-500 hover:text-coral'
                  : 'text-gray-400 cursor-not-allowed'
              }`}
            >
              <Heart className={`w-5 h-5 ${thread.isLiked && canAccess ? 'fill-current' : ''}`} />
              <span className="font-medium">{thread.likes}</span>
            </button>
            
            <div className="flex items-center space-x-2 text-gray-500">
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">{canAccess ? thread.commentCount : '?'}</span>
            </div>
          </div>

          {canAccess ? (
            <a
              href={`/thread/${thread.id}`}
              className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
            >
              Read more →
            </a>
          ) : (
            <a
              href="/signup"
              className="text-secondary-600 hover:text-secondary-700 font-medium text-sm transition-colors"
            >
              Join to read →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
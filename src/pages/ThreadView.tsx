import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, MessageCircle, Share2, Flag, Clock } from 'lucide-react';
import { getThread, getComments, createComment, toggleThreadLike, toggleCommentLike } from '../utils/storage';
import { useAuth } from '../contexts/AuthContext';
import { Comment } from '../types';

export default function ThreadView() {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const [thread, setThread] = useState(getThread(id!));
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (id) {
      setComments(getComments(id));
    }
  }, [id]);

  if (!thread) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Thread not found</h1>
          <Link to="/" className="text-primary-600 hover:text-primary-700 font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleLike = () => {
    if (!isAuthenticated || !id) return;
    toggleThreadLike(id);
    setThread(getThread(id));
  };

  const handleCommentLike = (commentId: string) => {
    if (!isAuthenticated) return;
    toggleCommentLike(commentId);
    setComments(getComments(id!));
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user || !id) return;

    createComment({
      content: newComment,
      author: user,
      threadId: id,
    });

    setComments(getComments(id));
    setNewComment('');
    setThread(getThread(id)); // Update thread to refresh comment count
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link 
        to="/" 
        className="inline-flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Threads</span>
      </Link>

      {/* Thread Content */}
      <article className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              <img
                src={thread.author.avatar}
                alt={thread.author.username}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-gray-900">{thread.author.username}</h3>
                  {thread.author.isOnline && (
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
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
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                <Flag className="w-5 h-5" />
              </button>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
            {thread.title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-4">
            {thread.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {thread.content}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-6 mt-6 pt-6 border-t border-gray-100">
            <button
              onClick={handleLike}
              disabled={!isAuthenticated}
              className={`flex items-center space-x-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                thread.isLiked
                  ? 'text-coral hover:text-red-500'
                  : 'text-gray-500 hover:text-coral'
              }`}
            >
              <Heart className={`w-5 h-5 ${thread.isLiked ? 'fill-current' : ''}`} />
              <span className="font-medium">{thread.likes}</span>
            </button>
            
            <div className="flex items-center space-x-2 text-gray-500">
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">{comments.length}</span>
            </div>
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Comments ({comments.length})
        </h2>

        {/* Add Comment Form */}
        {isAuthenticated ? (
          <form onSubmit={handleSubmitComment} className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
            <div className="flex items-start space-x-4">
              <img
                src={user?.avatar || "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"}
                alt="Your avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts or experiences..."
                className="w-full p-4 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                rows={4}
              />
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Post Comment
                </button>
              </div>
            </div>
          </div>
        </form>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 text-center">
            <p className="text-gray-600 mb-4">Join the conversation! Sign in to post a comment.</p>
            <Link 
              to="/login" 
              className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors font-medium"
            >
              Sign In
            </Link>
          </div>
        )}

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-start space-x-4">
                <img
                  src={comment.author.avatar}
                  alt={comment.author.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium text-gray-900">{comment.author.username}</span>
                    <span className="text-sm text-gray-500">{formatTimeAgo(comment.createdAt)}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    {comment.content}
                  </p>
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => handleCommentLike(comment.id)}
                      disabled={!isAuthenticated}
                      className={`flex items-center space-x-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                        comment.isLiked 
                          ? 'text-coral hover:text-red-500' 
                          : 'text-gray-500 hover:text-coral'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${comment.isLiked ? 'fill-current' : ''}`} />
                      <span className="text-sm font-medium">{comment.likes}</span>
                    </button>
                    <button className="text-sm text-gray-500 hover:text-primary-600 transition-colors font-medium">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Helpful Resources */}
      <div className="mt-12 bg-gradient-to-r from-accent-50 to-primary-50 rounded-2xl p-6">
        <h3 className="font-semibold text-gray-900 mb-3">Related Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="#" className="block p-4 bg-white rounded-xl hover:shadow-md transition-shadow">
            <h4 className="font-medium text-gray-900 mb-1">ADHD & Time Management</h4>
            <p className="text-sm text-gray-600">Tips and strategies for managing time with ADHD</p>
          </a>
          <a href="#" className="block p-4 bg-white rounded-xl hover:shadow-md transition-shadow">
            <h4 className="font-medium text-gray-900 mb-1">Executive Function Tools</h4>
            <p className="text-sm text-gray-600">Practical tools to support daily functioning</p>
          </a>
        </div>
      </div>
    </div>
  );
}
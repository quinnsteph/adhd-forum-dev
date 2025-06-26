import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Tag, Eye, Send } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { createThread } from '../utils/storage';

export default function NewThread() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: [] as string[],
    isPublic: true,
  });
  const [isPreview, setIsPreview] = useState(false);

  const availableTags = [
    'Focus', 'Productivity', 'Time Management', 'Self-Care', 'Parenting',
    'Work', 'Study', 'Medication', 'Therapy', 'Routine', 'Organization',
    'Relationships', 'Success', 'Struggles', 'Tips', 'Question', 'Support'
  ];

  const handleTagToggle = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    const thread = createThread({
      title: formData.title,
      content: formData.content,
      author: user,
      tags: formData.tags,
      isPublic: formData.isPublic,
      category: formData.isPublic ? 'public' : 'members-only',
      isPinned: false,
    });
    
    
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Link 
            to="/" 
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Share Your Story</h1>
            <p className="text-gray-600">Connect with the community through your experience</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              isPreview 
                ? 'bg-secondary-100 text-secondary-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Preview</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              {!isPreview ? (
                <>
                  {/* Title */}
                  <div className="mb-6">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                      Thread Title
                    </label>
                    <input
                      id="title"
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-lg"
                      placeholder="What's on your mind? (e.g., 'How do you handle overwhelming to-do lists?')"
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Story
                    </label>
                    <textarea
                      id="content"
                      required
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={12}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                      placeholder="Share your experience, ask questions, or offer support. This is a safe space where your story matters.

Feel free to include:
• What you're struggling with
• Strategies that have worked for you
• Questions for the community
• Encouragement for others

Remember: There's no judgment here – we're all learning together! 💙"
                    />
                  </div>
                </>
              ) : (
                /* Preview Mode */
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {formData.title || 'Thread Title Preview'}
                  </h2>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {formData.content || 'Your content will appear here...'}
                    </p>
                  </div>
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-100">
                      {formData.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Visibility Settings */}
            {!isPreview && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Thread Visibility</h3>
                <div className="space-y-3">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="visibility"
                      checked={formData.isPublic}
                      onChange={() => setFormData({ ...formData, isPublic: true })}
                      className="mt-1 text-primary-600 focus:ring-primary-500"
                    />
                    <div>
                      <div className="font-medium text-gray-900">Public Discussion</div>
                      <div className="text-sm text-gray-600">Visible to everyone, including visitors</div>
                    </div>
                  </label>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="visibility"
                      checked={!formData.isPublic}
                      onChange={() => setFormData({ ...formData, isPublic: false })}
                      className="mt-1 text-secondary-600 focus:ring-secondary-500"
                    />
                    <div>
                      <div className="font-medium text-gray-900">Members Only</div>
                      <div className="text-sm text-gray-600">Only visible to registered members</div>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Tags Selection */}
            {!isPreview && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Tag className="w-5 h-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">Add Tags</h3>
                  <span className="text-sm text-gray-500">({formData.tags.length}/5)</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Help others find your thread by adding relevant tags (maximum 5)
                </p>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleTagToggle(tag)}
                      disabled={!formData.tags.includes(tag) && formData.tags.length >= 5}
                      className={`px-3 py-2 rounded-full text-sm font-medium transition-colors border ${
                        formData.tags.includes(tag)
                          ? 'bg-primary-100 text-primary-700 border-primary-200'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Link
                to="/"
                className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors font-medium"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={!formData.title.trim() || !formData.content.trim()}
                className="flex items-center space-x-2 bg-primary-500 text-white px-8 py-3 rounded-xl hover:bg-primary-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                <span>Post Thread</span>
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Guidelines */}
          <div className="bg-gradient-to-br from-accent-50 to-primary-50 rounded-2xl p-6 border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">Community Guidelines</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-accent-500 rounded-full mt-2"></div>
                <p className="text-gray-700">Be kind and respectful to all community members</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-accent-500 rounded-full mt-2"></div>
                <p className="text-gray-700">Share personal experiences, not medical advice</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-accent-500 rounded-full mt-2"></div>
                <p className="text-gray-700">Use content warnings for sensitive topics</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-accent-500 rounded-full mt-2"></div>
                <p className="text-gray-700">Keep discussions supportive and constructive</p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Tips for Great Threads</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <p>• Use a clear, descriptive title</p>
              <p>• Share specific examples when possible</p>
              <p>• Ask questions to encourage discussion</p>
              <p>• Include what you've already tried</p>
              <p>• End with an open question</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
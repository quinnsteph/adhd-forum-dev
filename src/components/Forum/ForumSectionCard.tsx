import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Users, Heart, BookOpen, Bookmark, Lock } from 'lucide-react';
import { ForumSection } from '../../types';

interface ForumSectionCardProps {
  section: ForumSection;
  isAuthenticated?: boolean;
}

const iconMap = {
  Globe,
  Users,
  Heart,
  BookOpen,
  Bookmark,
  Lock,
};

export default function ForumSectionCard({ section, isAuthenticated = false }: ForumSectionCardProps) {
  const IconComponent = iconMap[section.icon as keyof typeof iconMap] || Globe;
  const canAccess = section.isPublic || isAuthenticated;

  return (
    <div className={`bg-white rounded-2xl border border-gray-100 hover:border-primary-200 transition-all duration-200 hover:shadow-md ${!canAccess ? 'opacity-60' : ''}`}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-xl ${section.color}`}>
              <IconComponent className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-semibold text-gray-900">{section.name}</h3>
                {!section.isPublic && (
                  <Lock className="w-4 h-4 text-gray-400" />
                )}
              </div>
              <p className="text-gray-600 text-sm mt-1">{section.description}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary-600">{section.threadCount}</div>
            <div className="text-xs text-gray-500">threads</div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {section.isPublic ? (
              <div className="flex items-center space-x-1 text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                <Globe className="w-3 h-3" />
                <span className="text-xs font-medium">Public</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1 text-secondary-600 bg-secondary-50 px-2 py-1 rounded-lg">
                <Lock className="w-3 h-3" />
                <span className="text-xs font-medium">Members Only</span>
              </div>
            )}
          </div>

          {canAccess ? (
            <Link
              to={`/section/${section.id}`}
              className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
            >
              Browse →
            </Link>
          ) : (
            <Link
              to="/signup"
              className="text-secondary-600 hover:text-secondary-700 font-medium text-sm transition-colors"
            >
              Join to Access →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
import { useCallback } from 'react';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

interface UserProperties {
  user_id?: string;
  username?: string;
  adhd_type?: string;
  user_role?: string;
  member_since?: string;
  is_authenticated?: boolean;
}

export function useAnalytics() {
  const trackEvent = useCallback((event: AnalyticsEvent) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        ...event.custom_parameters,
      });
    }
  }, []);

  const setUserProperties = useCallback((properties: UserProperties) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-41H7F89296', {
        user_id: properties.user_id,
        custom_map: {
          adhd_type: 'adhd_type',
          user_role: 'user_role',
          member_since: 'member_since',
        },
      });

      // Set custom dimensions
      window.gtag('event', 'user_engagement', {
        adhd_type: properties.adhd_type,
        user_role: properties.user_role,
        member_since: properties.member_since,
        is_authenticated: properties.is_authenticated,
      });
    }
  }, []);

  const trackPageView = useCallback((page_title: string, page_location?: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-41H7F89296', {
        page_title,
        page_location: page_location || window.location.href,
      });
    }
  }, []);

  // Authentication Events
  const trackAuth = {
    login: (method: string, success: boolean, adhd_type?: string) => {
      trackEvent({
        action: success ? 'login' : 'login_failed',
        category: 'authentication',
        label: method,
        custom_parameters: {
          method,
          adhd_type,
        },
      });
    },

    signup: (success: boolean, adhd_type?: string, method: string = 'email') => {
      trackEvent({
        action: success ? 'sign_up' : 'sign_up_failed',
        category: 'authentication',
        label: method,
        custom_parameters: {
          method,
          adhd_type,
        },
      });
    },

    logout: () => {
      trackEvent({
        action: 'logout',
        category: 'authentication',
      });
    },
  };

  // Thread Events
  const trackThread = {
    view: (thread_id: string, thread_title: string, is_public: boolean, category: string, tags: string[]) => {
      trackEvent({
        action: 'view_item',
        category: 'content',
        label: 'thread',
        custom_parameters: {
          item_id: thread_id,
          item_name: thread_title,
          item_category: category,
          content_type: 'thread',
          is_public,
          tags: tags.join(','),
        },
      });
    },

    create: (thread_id: string, is_public: boolean, category: string, tags: string[]) => {
      trackEvent({
        action: 'create_content',
        category: 'engagement',
        label: 'thread',
        custom_parameters: {
          content_type: 'thread',
          content_id: thread_id,
          is_public,
          category,
          tags: tags.join(','),
        },
      });
    },

    like: (thread_id: string, is_liked: boolean) => {
      trackEvent({
        action: is_liked ? 'like' : 'unlike',
        category: 'engagement',
        label: 'thread',
        custom_parameters: {
          content_type: 'thread',
          content_id: thread_id,
        },
      });
    },

    comment: (thread_id: string, comment_id: string) => {
      trackEvent({
        action: 'create_content',
        category: 'engagement',
        label: 'comment',
        custom_parameters: {
          content_type: 'comment',
          content_id: comment_id,
          parent_id: thread_id,
        },
      });
    },
  };

  // Navigation Events
  const trackNavigation = {
    section: (section_id: string, section_name: string, is_public: boolean) => {
      trackEvent({
        action: 'view_section',
        category: 'navigation',
        label: section_name,
        custom_parameters: {
          section_id,
          section_name,
          is_public,
        },
      });
    },

    search: (query: string, results_count?: number) => {
      trackEvent({
        action: 'search',
        category: 'navigation',
        label: query,
        custom_parameters: {
          search_term: query,
          results_count,
        },
      });
    },
  };

  // Community Features
  const trackFeature = {
    focusMode: (enabled: boolean) => {
      trackEvent({
        action: enabled ? 'enable_focus_mode' : 'disable_focus_mode',
        category: 'accessibility',
        label: 'focus_mode',
        custom_parameters: {
          focus_mode_enabled: enabled,
        },
      });
    },

    membersOnline: (members_count: number) => {
      trackEvent({
        action: 'view_members_online',
        category: 'community',
        label: 'sidebar',
        value: members_count,
        custom_parameters: {
          members_online_count: members_count,
        },
      });
    },

    joinCommunity: (source: string) => {
      trackEvent({
        action: 'join_community_cta',
        category: 'conversion',
        label: source,
        custom_parameters: {
          cta_source: source,
        },
      });
    },
  };

  // Error Tracking
  const trackError = useCallback((error_type: string, error_message: string, page: string) => {
    trackEvent({
      action: 'error',
      category: 'technical',
      label: error_type,
      custom_parameters: {
        error_message,
        page,
        error_type,
      },
    });
  }, [trackEvent]);

  return {
    trackEvent,
    setUserProperties,
    trackPageView,
    trackAuth,
    trackThread,
    trackNavigation,
    trackFeature,
    trackError,
  };
}
# ADHD Forum Analytics Implementation Guide

## Overview
This document outlines the comprehensive Google Analytics 4 (GA4) tracking implementation for the ADHD Forum application. The tracking captures user behavior, community engagement, and ADHD-specific metrics to provide insights into how users interact with the platform.

## Architecture

### Analytics Hook (`src/hooks/useAnalytics.ts`)
Central analytics hook that provides consistent tracking across all components. Uses the dataLayer to send events to Google Tag Manager (GTM), which then forwards them to GA4.

### Google Tag Manager Integration
- **Container ID**: GTM-W6DB5SQX
- **GA4 Measurement ID**: G-41H7F89296
- **Implementation**: Script tags in `index.html` (head and noscript fallback)

## Tracked Events

### 1. Authentication Events
**Purpose**: Monitor user onboarding and retention

| Event Name | Trigger | Parameters |
|------------|---------|------------|
| `login` | Successful login | `method`, `adhd_type` |
| `login_failed` | Failed login attempt | `method` |
| `sign_up` | Successful registration | `method`, `adhd_type` |
| `sign_up_failed` | Failed registration | `method`, `adhd_type` |
| `logout` | User logs out | None |

**Implementation**: `src/contexts/AuthContext.tsx`

### 2. Content Engagement Events
**Purpose**: Understand content creation and interaction patterns

| Event Name | Trigger | Parameters |
|------------|---------|------------|
| `view_item` | Thread viewed | `item_id`, `item_name`, `item_category`, `content_type`, `is_public`, `tags` |
| `create_content` | Thread/comment created | `content_type`, `content_id`, `is_public`, `category`, `tags` |
| `like` | Content liked | `content_type`, `content_id` |
| `unlike` | Content unliked | `content_type`, `content_id` |

**Implementation**: 
- `src/components/Thread/ThreadCard.tsx`
- `src/pages/NewThread.tsx`
- `src/pages/SectionView.tsx`

### 3. Navigation Events
**Purpose**: Track user journey and section popularity

| Event Name | Trigger | Parameters |
|------------|---------|------------|
| `view_section` | Forum section accessed | `section_id`, `section_name`, `is_public` |
| `search` | Search performed | `search_term`, `results_count` |

**Implementation**: 
- `src/components/Layout/Header.tsx`
- `src/pages/SectionView.tsx`

### 4. Community Feature Events
**Purpose**: Monitor accessibility features and community engagement

| Event Name | Trigger | Parameters |
|------------|---------|------------|
| `enable_focus_mode` | Focus mode activated | `focus_mode_enabled: true` |
| `disable_focus_mode` | Focus mode deactivated | `focus_mode_enabled: false` |
| `view_members_online` | Members online sidebar viewed | `members_online_count` |
| `join_community_cta` | Join community CTA clicked | `cta_source` |

**Implementation**: 
- `src/components/Layout/Header.tsx`
- `src/components/Sidebar/TopicsSidebar.tsx`
- `src/components/Thread/ThreadCard.tsx`

## Custom Dimensions

### GA4 Custom Dimensions Setup
Configure these in GA4 Admin > Data display > Custom definitions:

| Dimension Name | Parameter Name | Scope | Description |
|----------------|----------------|-------|-------------|
| ADHD Type | `adhd_type` | User | User's ADHD diagnosis type |
| User Role | `user_role` | User | member/moderator/admin |
| Authentication Status | `is_authenticated` | Event | Whether user is logged in |
| Content Type | `content_type` | Event | thread/comment/section |
| Content Visibility | `is_public` | Event | Public vs private content |

## GTM Container Configuration

### Import Instructions
1. Download `gtm-container-adhd-forum.json`
2. In GTM, go to Admin > Import Container
3. Select the JSON file
4. Choose "Merge" and "Overwrite conflicting tags"
5. Submit and publish

### Container Includes
- **5 GA4 Event Tags**: Authentication, Content, Navigation, Community, Configuration
- **6 Triggers**: Event-based triggers for different event categories
- **12 Variables**: DataLayer variables for event parameters
- **Built-in Variables**: Page URL, Path, Hostname, Referrer

## Key Metrics to Monitor

### User Engagement
- **Authentication funnel**: Sign-up → Login → Active usage
- **Content creation rate**: Threads/comments per user
- **Community participation**: Public vs private content engagement

### ADHD-Specific Insights
- **ADHD type distribution**: Inattentive, Hyperactive, Combined
- **Focus mode usage**: Accessibility feature adoption
- **Support group engagement**: Private vs public discussion preferences

### Content Performance
- **Thread popularity**: Views, likes, comments by category
- **Tag effectiveness**: Most used and engaging tags
- **Section usage**: Public discussions vs members-only content

### Community Health
- **Member retention**: Login frequency and duration
- **Content moderation needs**: Failed authentication attempts
- **Feature adoption**: Focus mode, members online interactions

## Privacy & Compliance

### Data Collection
- **No PII collected**: Only behavioral and category data
- **Anonymized user IDs**: Generated unique identifiers
- **Consent-aware**: Respects user privacy preferences
- **ADHD-sensitive**: Appropriate handling of health-related categories

### Data Retention
- Follow GA4 default retention (14 months)
- Configure shorter retention if required by local regulations
- Regular data review and cleanup procedures

## Testing & Validation

### Development Testing
1. Use GTM Preview mode
2. Verify dataLayer events in browser console
3. Check GA4 DebugView for real-time events
4. Validate custom dimensions appear correctly

### Production Monitoring
- Set up custom alerts for tracking failures
- Monitor data quality and completeness
- Regular review of conversion funnels
- A/B testing setup for community features

## Troubleshooting

### Common Issues
1. **Events not firing**: Check useAnalytics hook implementation
2. **Missing parameters**: Verify dataLayer structure
3. **GTM container errors**: Validate JSON import format
4. **GA4 data delays**: Allow 24-48 hours for full processing

### Debug Tools
- Browser Developer Tools > Console (dataLayer events)
- GTM Preview & Debug mode
- GA4 DebugView (real-time events)
- GA4 Realtime reports

## Future Enhancements

### Planned Additions
- **Conversion goals**: Member sign-up, first post, engagement milestones
- **Enhanced ecommerce**: Thread creation funnel tracking
- **Cohort analysis**: User retention and engagement patterns
- **Accessibility metrics**: Screen reader usage, keyboard navigation

### Advanced Features
- **Cross-device tracking**: User journey across devices
- **Offline event tracking**: PWA engagement metrics
- **Custom audiences**: ADHD type-based user segments
- **Integration APIs**: Connect with other analytics tools

---

## Quick Start Checklist

- [ ] GTM container imported and published
- [ ] GA4 property connected (G-41H7F89296)
- [ ] Custom dimensions configured in GA4
- [ ] Test events firing in GTM Preview
- [ ] Verify data appearing in GA4 DebugView
- [ ] Set up custom reports and dashboards
- [ ] Configure alerts for tracking issues

For support with analytics implementation, refer to the Google Analytics 4 documentation or the GTM help center.
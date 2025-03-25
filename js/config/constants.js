// Animation durations
export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500
};

// Theme settings
export const THEME = {
  LIGHT: 'light',
  DARK: 'dark'
};

// Share options
export const SHARE_PLATFORMS = {
  FACEBOOK: 'facebook',
  TWITTER: 'twitter',
  INSTAGRAM: 'instagram',
  TIKTOK: 'tiktok',
  EMAIL: 'email'
};

// Experience types
export const EXPERIENCE_TYPE = {
  IMAGE: 'image',
  TIMELINE: 'timeline',
  GAUSSIAN_SPLAT: 'gaussian-splat',
  STORIES: 'stories',
  IMPACT: 'impact',
  PREVENTION: 'prevention',
  MEMORIAL: 'memorial'
};

// Timeline day labels
export const TIMELINE_DAYS = [
  'Day 1: Ignition',
  'Day 2: Initial Spread',
  'Day 3: Evacuation Orders',
  'Day 4: Containment Efforts',
  'Day 5: Major Wind Event',
  'Day 6: Additional Resources',
  'Day 7: Containment'
];

// Error messages
export const ERROR_MESSAGES = {
  EXPERIENCE_LOAD: 'Failed to load experience',
  SHARE_FAILED: 'Failed to share content',
  TRIBUTE_SUBMIT: 'Failed to submit tribute',
  GENERAL: 'Something went wrong'
};

// CSS classes
export const CSS_CLASSES = {
  ACTIVE: 'active',
  ANIMATED: 'animated',
  ERROR: 'error',
  SUCCESS: 'success'
};

// Local storage keys
export const STORAGE_KEYS = {
  THEME: 'theme',
  USER_PREFERENCES: 'userPreferences'
};

// API endpoints (to be used when backend is ready)
export const API_ENDPOINTS = {
  SUBMIT_TRIBUTE: '/api/tributes',
  GET_STORIES: '/api/stories',
  GET_IMPACT_DATA: '/api/impact'
}; 
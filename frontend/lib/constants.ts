// Design tokens and constants from Figma design

export const COLORS = {
  // Primary colors
  primary: {
    50: '#F5F3FF',
    100: '#EDE9FE',
    200: '#DDD6FE',
    300: '#C4B5FD',
    400: '#A78BFA',
    500: '#8B5CF6',
    600: '#7C3AED',
    700: '#6D28D9',
    800: '#5B21B6',
    900: '#4C1D95',
  },
  // Blue accent color
  accent: '#4A4AEF',
  // Text colors
  text: {
    primary: '#1E1B4B',
    secondary: '#6B7280',
    light: '#9CA3AF',
  },
  // Background colors
  background: {
    white: '#FFFFFF',
    light: '#F9FAFB',
    dark: '#1F2937',
  },
} as const;

export const CATEGORIES = [
  { id: 'design', name: 'Design', icon: 'design', jobs: 235 },
  { id: 'sales', name: 'Sales', icon: 'sales', jobs: 756 },
  { id: 'marketing', name: 'Marketing', icon: 'marketing', jobs: 140 },
  { id: 'finance', name: 'Finance', icon: 'finance', jobs: 325 },
  { id: 'technology', name: 'Technology', icon: 'technology', jobs: 436 },
  { id: 'engineering', name: 'Engineering', icon: 'engineering', jobs: 542 },
  { id: 'business', name: 'Business', icon: 'business', jobs: 211 },
  { id: 'hr', name: 'Human Resource', icon: 'hr', jobs: 346 },
] as const;

export const COMPANIES = [
  { id: 'vodafone', name: 'Vodafone' },
  { id: 'intel', name: 'Intel' },
  { id: 'tesla', name: 'Tesla' },
  { id: 'amd', name: 'AMD' },
  { id: 'talkkit', name: 'Talkkit' },
] as const;


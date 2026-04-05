// ===== ROUTE PATHS =====
export const ROUTES = {
  LANDING: '/',
  DASHBOARD: '/dashboard',
  ARENA: '/arena',
};

// ===== MOCK USER DATA =====
export const USER_PROFILE = {
  id: 'usr_001',
  username: 'CyberSentinel',
  avatar: null,
  level: 7,
  rank: 'Global Elite',
  xp: 2450,
  xpToNext: 3000,
  creditScore: 742,
  completedMissions: 23,
  streak: 5,
  joinDate: '2025-12-01',
  skills: {
    phishing: 78,
    vishing: 45,
    socialEngineering: 62,
    smishing: 55,
    ransomware: 38,
  },
};

// ===== LEADERBOARD =====
export const LEADERBOARD_DATA = [
  { rank: 1, username: 'PhishSlayer', score: 980, level: 15, avatar: '🛡️' },
  { rank: 2, username: 'ZeroDay_Wolf', score: 945, level: 14, avatar: '🐺' },
  { rank: 3, username: 'FirewallFox', score: 912, level: 13, avatar: '🦊' },
  { rank: 4, username: 'CryptoGuard', score: 878, level: 12, avatar: '🔐' },
  { rank: 5, username: 'NullByte', score: 845, level: 11, avatar: '💀' },
  { rank: 6, username: 'ProxyPhantom', score: 810, level: 10, avatar: '👻' },
  { rank: 7, username: 'CyberSentinel', score: 742, level: 7, avatar: '⚔️', isCurrentUser: true },
  { rank: 8, username: 'NetNinja', score: 698, level: 6, avatar: '🥷' },
  { rank: 9, username: 'DataDragon', score: 655, level: 5, avatar: '🐉' },
  { rank: 10, username: 'BitShield', score: 620, level: 4, avatar: '🔰' },
];

// ===== DAILY MISSIONS =====
export const DAILY_MISSIONS = [
  {
    id: 'dm_001',
    title: 'Spot the Phishing URL',
    description: 'Identify the malicious URL hidden among 5 legitimate links.',
    xpReward: 150,
    category: 'Phishing',
    difficulty: 'Medium',
    timeLimit: 120,
  },
  {
    id: 'dm_002',
    title: 'Suspicious Caller',
    description: 'Listen to a voice recording and determine if the caller is legitimate.',
    xpReward: 200,
    category: 'Vishing',
    difficulty: 'Hard',
    timeLimit: 180,
  },
  {
    id: 'dm_003',
    title: 'Social Media Trap',
    description: 'A "friend" sent you a link via DM. Verify their identity before clicking.',
    xpReward: 100,
    category: 'Social Engineering',
    difficulty: 'Easy',
    timeLimit: 90,
  },
  {
    id: 'dm_004',
    title: 'SMS Scam Alert',
    description: 'Analyze an incoming SMS and determine if it\'s a smishing attempt.',
    xpReward: 120,
    category: 'Smishing',
    difficulty: 'Medium',
    timeLimit: 60,
  },
];

// ===== THREAT CATEGORIES =====
export const THREAT_CATEGORIES = [
  {
    id: 'phishing',
    name: 'Phishing',
    icon: 'Mail',
    description: 'Deceptive emails designed to steal your credentials and personal data.',
    difficulty: 'Beginner',
    missions: 12,
    completedMissions: 8,
    color: '#2D5BFF',
  },
  {
    id: 'vishing',
    name: 'Vishing',
    icon: 'Phone',
    description: 'Voice-based social engineering attacks over phone calls.',
    difficulty: 'Intermediate',
    missions: 8,
    completedMissions: 3,
    color: '#7C3AED',
  },
  {
    id: 'social-engineering',
    name: 'Social Engineering',
    icon: 'Users',
    description: 'Manipulation tactics exploiting human psychology and trust.',
    difficulty: 'Advanced',
    missions: 10,
    completedMissions: 5,
    color: '#F59E0B',
  },
  {
    id: 'smishing',
    name: 'Smishing',
    icon: 'MessageSquare',
    description: 'SMS-based phishing attacks targeting mobile users.',
    difficulty: 'Beginner',
    missions: 6,
    completedMissions: 4,
    color: '#22C55E',
  },
  {
    id: 'ransomware',
    name: 'Ransomware',
    icon: 'Lock',
    description: 'Malware that encrypts systems and demands payment for data release.',
    difficulty: 'Expert',
    missions: 5,
    completedMissions: 1,
    color: '#EF4444',
  },
];

// ===== MINI GAME EMAIL =====
export const MINI_GAME_EMAIL = {
  sender: 'security@amaz0n-alerts.com',
  senderDisplay: 'Amazon Security Team',
  subject: '⚠️ Action Required: Unusual sign-in activity detected',
  body: `Dear Valued Customer,

We detected an unauthorized sign-in attempt on your account from an unrecognized device in Moscow, Russia.

If this wasn't you, please verify your identity immediately by clicking the secure link below:

→ Verify Your Account Now

Failure to verify within 24 hours will result in permanent account suspension.

Best regards,
Amazon Security Team`,
  isPhish: true,
  redFlags: [
    { text: 'amaz0n-alerts.com', hint: 'Spoofed domain — uses "0" instead of "o" and adds "-alerts"' },
    { text: 'Moscow, Russia', hint: 'Fear tactic — creating urgency with a scary location' },
    { text: 'Verify Your Account Now', hint: 'Suspicious CTA — legitimate services never ask to "verify" via email links' },
    { text: '24 hours', hint: 'Artificial urgency — pressuring immediate action before you can think' },
    { text: 'permanent account suspension', hint: 'Threat escalation — real companies don\'t threaten permanent closure via email' },
  ],
};

// ===== STATS =====
export const PLATFORM_STATS = [
  { label: 'Threats Neutralized', value: 12847, suffix: '+' },
  { label: 'Active Defenders', value: 3421, suffix: '+' },
  { label: 'Simulations Run', value: 48293, suffix: '+' },
  { label: 'Avg. Detection Time', value: 4.2, suffix: 's' },
];

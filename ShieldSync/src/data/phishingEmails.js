// =========================================================================
// PHISHING EMAIL DATABASE
// A pool of 24 realistic corporate emails — 10 malicious, 14 benign.
// Each session randomly selects a subset to keep training fresh.
// =========================================================================

export const EMAIL_POOL = [

  // ========== MALICIOUS EMAILS ==========

  {
    id: 'm1',
    sender: 'Amazon Security Team',
    senderEmail: 'security@amaz0n-alerts.com',
    subject: '⚠️ Action Required: Unusual sign-in activity detected',
    time: '9:14 AM',
    read: false,
    isThreat: true,
    body: [
      'Dear Valued Customer,',
      '',
      'We detected an unauthorized sign-in attempt on your account from an unrecognized device in Moscow, Russia.',
      '',
      'If this wasn\'t you, please verify your identity immediately by clicking the secure link below:',
      '',
      '→ VERIFY YOUR ACCOUNT NOW',
      '',
      'Failure to verify within 24 hours will result in permanent account suspension.',
      '',
      'Best regards,',
      'Amazon Security Team'
    ],
    trapLine: 'VERIFY YOUR ACCOUNT NOW',
    redFlags: [
      { text: 'amaz0n-alerts.com', hint: 'Spoofed domain — uses "0" instead of "o" and adds "-alerts"' },
      { text: 'Moscow, Russia', hint: 'Fear tactic — creating urgency with a scary foreign location' },
      { text: 'VERIFY YOUR ACCOUNT NOW', hint: 'Suspicious CTA — legitimate services never ask to "verify" via email links' },
      { text: '24 hours', hint: 'Artificial urgency — pressuring immediate action before you can think' },
      { text: 'permanent account suspension', hint: 'Threat escalation — real companies don\'t threaten permanent closure via email' }
    ]
  },

  {
    id: 'm2',
    sender: 'IT HelpDesk',
    senderEmail: 'admin@1t-helpdesk-corp.net',
    subject: '🔒 Mandatory Password Reset — Expires in 2 Hours',
    time: '8:32 AM',
    read: false,
    isThreat: true,
    body: [
      'Hi Team,',
      '',
      'As part of our quarterly security audit, all employees must reset their network credentials within the next 2 hours.',
      '',
      'Please use the secure portal below to update your password:',
      '',
      '→ RESET PASSWORD NOW',
      '',
      'Accounts that are not updated in time will be temporarily locked pending review by the security team.',
      '',
      'Thank you for your cooperation,',
      'IT HelpDesk — Infrastructure Security'
    ],
    trapLine: 'RESET PASSWORD NOW',
    redFlags: [
      { text: '1t-helpdesk-corp.net', hint: 'Spoofed domain — "1t" (number one) instead of "IT", and unrecognized domain' },
      { text: '2 hours', hint: 'Artificial urgency — real IT departments provide reasonable timeframes' },
      { text: 'temporarily locked', hint: 'Scare tactic — designed to pressure hasty action' },
      { text: 'RESET PASSWORD NOW', hint: 'Suspicious button — legitimate resets go through official SSO portals, not email links' }
    ]
  },

  {
    id: 'm3',
    sender: 'DocuSign',
    senderEmail: 'noreply@docusign-notifications.info',
    subject: 'Contract Ready for Your Signature — Q2 Vendor Agreement',
    time: '10:05 AM',
    read: false,
    isThreat: true,
    body: [
      'Hello,',
      '',
      'A document has been sent to you for electronic signature by your manager, David Chen.',
      '',
      'Document: Q2 Vendor Services Agreement',
      'Sender: David Chen (d.chen@yourcompany.com)',
      '',
      'Please review and sign the document by EOD today:',
      '',
      '→ REVIEW DOCUMENT',
      '',
      'This message was sent via DocuSign Electronic Signature Service.'
    ],
    trapLine: 'REVIEW DOCUMENT',
    redFlags: [
      { text: 'docusign-notifications.info', hint: 'Fake domain — real DocuSign emails come from @docusign.com or @docusign.net' },
      { text: 'EOD today', hint: 'Urgency tactic — pressures you to act without verifying with David directly' },
      { text: 'REVIEW DOCUMENT', hint: 'Malicious link — always verify DocuSign requests through the official app or website' }
    ]
  },

  {
    id: 'm4',
    sender: 'PayPal Support',
    senderEmail: 'support@paypa1-secure.com',
    subject: 'Your account has been limited — Verify Now',
    time: '11:22 AM',
    read: false,
    isThreat: true,
    body: [
      'Dear PayPal User,',
      '',
      'We\'ve noticed unusual activity on your account. As a security measure, we have temporarily limited what you can do with your account.',
      '',
      'To continue using PayPal without interruption, you must verify your identity within 12 hours.',
      '',
      '→ RESTORE ACCOUNT ACCESS',
      '',
      'Warning: Failure to verify will result in permanent restrictions to your account.',
      '',
      'PayPal Security Team'
    ],
    trapLine: 'RESTORE ACCOUNT ACCESS',
    redFlags: [
      { text: 'paypa1-secure.com', hint: 'Spoofed domain — uses "1" (number one) instead of "l" (letter L)' },
      { text: '12 hours', hint: 'Artificial deadline — real PayPal gives you days, not hours' },
      { text: 'permanent restrictions', hint: 'Threat escalation — designed to prevent rational thinking' },
      { text: 'RESTORE ACCOUNT ACCESS', hint: 'Credential harvesting link — always log in directly at paypal.com' }
    ]
  },

  {
    id: 'm5',
    sender: 'Netflix Protocol',
    senderEmail: 'billing@netf1ix-support.com',
    subject: 'Immediate action: Payment authentication required',
    time: '7:48 AM',
    read: false,
    isThreat: true,
    body: [
      'Dear Netflix Member,',
      '',
      'We were unable to validate your billing information for your next payment cycle. Your premium membership will be cancelled unless you update your payment method within 48 hours.',
      '',
      'To avoid service interruption:',
      '',
      '→ UPDATE PAYMENT METHOD',
      '',
      'If you believe this is an error, please update your billing info to avoid losing access to your account and viewing history.',
      '',
      'Netflix Billing Department'
    ],
    trapLine: 'UPDATE PAYMENT METHOD',
    redFlags: [
      { text: 'netf1ix-support.com', hint: 'Spoofed domain — "1" instead of "l", and -support.com is not Netflix\'s domain' },
      { text: '48 hours', hint: 'Creates false urgency to rush you into clicking' },
      { text: 'UPDATE PAYMENT METHOD', hint: 'Credential harvesting — Netflix would direct you to your account settings, not an email link' },
      { text: 'losing access to your account and viewing history', hint: 'Exaggerated threat — Netflix doesn\'t delete viewing history over billing issues' }
    ]
  },

  {
    id: 'm6',
    sender: 'HR Department',
    senderEmail: 'hr-notifications@frontier-hr.co',
    subject: '📋 Updated Employee Benefits Package — Action Required',
    time: '2:15 PM',
    read: false,
    isThreat: true,
    body: [
      'Dear Employee,',
      '',
      'The annual benefits enrollment window is now open. As part of this year\'s updates, all employees must re-confirm their benefits selections and update banking details for HSA contributions.',
      '',
      'Please complete the enrollment form using the secure link below before Friday:',
      '',
      '→ COMPLETE ENROLLMENT',
      '',
      'Employees who do not complete enrollment by the deadline will be defaulted to the basic plan with no dental or vision coverage.',
      '',
      'Human Resources Department'
    ],
    trapLine: 'COMPLETE ENROLLMENT',
    redFlags: [
      { text: 'frontier-hr.co', hint: 'Unknown domain — your company\'s HR system would use your corporate domain, not a generic .co address' },
      { text: 'update banking details', hint: 'Red flag — legitimate HR portals never ask for banking info via email links' },
      { text: 'Dear Employee', hint: 'Generic greeting — real HR emails address you by your actual name' },
      { text: 'COMPLETE ENROLLMENT', hint: 'Suspicious link — always go directly to your company\'s HR portal' }
    ]
  },

  {
    id: 'm7',
    sender: 'Microsoft 365',
    senderEmail: 'no-reply@microsoft365-auth.org',
    subject: '⚙️ Your mailbox storage is 95% full — Upgrade Now',
    time: '3:40 PM',
    read: false,
    isThreat: true,
    body: [
      'Dear User,',
      '',
      'Your Microsoft 365 mailbox has reached 95% of its storage quota. Incoming emails may be rejected if no action is taken.',
      '',
      'To avoid losing important emails, please upgrade your storage plan or clean up your mailbox:',
      '',
      '→ MANAGE STORAGE',
      '',
      'This is an automated notification from your Microsoft 365 administrator.',
      '',
      'Microsoft Corporation'
    ],
    trapLine: 'MANAGE STORAGE',
    redFlags: [
      { text: 'microsoft365-auth.org', hint: 'Fake domain — Microsoft uses @microsoft.com for official communications' },
      { text: 'Dear User', hint: 'Generic greeting — Microsoft always uses your registered name or email' },
      { text: 'MANAGE STORAGE', hint: 'Malicious link — real storage warnings come from within Outlook, not external emails' }
    ]
  },

  {
    id: 'm8',
    sender: 'FedEx Delivery',
    senderEmail: 'tracking@fedex-deliverynotice.com',
    subject: '📦 Delivery Failed: Package returned to facility',
    time: '12:10 PM',
    read: false,
    isThreat: true,
    body: [
      'Dear Customer,',
      '',
      'We attempted to deliver your package today but were unable to complete the delivery. Your package has been returned to our regional facility.',
      '',
      'Tracking Number: FX-8847291035',
      'Scheduled Delivery: Today',
      '',
      'To reschedule your delivery or update your address, please click below:',
      '',
      '→ RESCHEDULE DELIVERY',
      '',
      'If not rescheduled within 3 business days, the package will be returned to sender.',
      '',
      'FedEx Customer Service'
    ],
    trapLine: 'RESCHEDULE DELIVERY',
    redFlags: [
      { text: 'fedex-deliverynotice.com', hint: 'Fake domain — real FedEx emails come from @fedex.com' },
      { text: 'RESCHEDULE DELIVERY', hint: 'Phishing link — always track packages directly on fedex.com' },
      { text: '3 business days', hint: 'Urgency tactic — designed to make you act before verifying' }
    ]
  },

  {
    id: 'm9',
    sender: 'Zoom Meetings',
    senderEmail: 'calendar@zoom-enterprise.net',
    subject: 'You missed a scheduled meeting — Recording Available',
    time: '4:55 PM',
    read: false,
    isThreat: true,
    body: [
      'Hi there,',
      '',
      'You missed a meeting scheduled by your manager at 3:00 PM today.',
      '',
      'Meeting: Q2 Strategy Review',
      'Host: Director of Operations',
      '',
      'A recording of the meeting is available. Click below to watch:',
      '',
      '→ VIEW RECORDING',
      '',
      'This recording will expire in 24 hours.',
      '',
      'Zoom Video Communications'
    ],
    trapLine: 'VIEW RECORDING',
    redFlags: [
      { text: 'zoom-enterprise.net', hint: 'Spoofed domain — real Zoom emails come from @zoom.us' },
      { text: 'You missed a meeting', hint: 'Social engineering — creates anxiety and urgency to click without thinking' },
      { text: 'VIEW RECORDING', hint: 'Malicious link — always access recordings from the Zoom app directly' },
      { text: 'expire in 24 hours', hint: 'False urgency — Zoom recordings don\'t expire in 24 hours' }
    ]
  },

  {
    id: 'm10',
    sender: 'Slack Workspace',
    senderEmail: 'notifications@slack-workspace-alerts.com',
    subject: '🔔 New message from CEO in #leadership channel',
    time: '1:30 PM',
    read: false,
    isThreat: true,
    body: [
      'Hi,',
      '',
      'You have a new direct message from the CEO in the #leadership channel that requires your immediate attention.',
      '',
      'Message preview: "I need you to handle something confidential for me today. Please review the attached document ASAP."',
      '',
      '→ OPEN IN SLACK',
      '',
      'You are receiving this email because you have enabled notifications for direct messages.',
      '',
      'Slack Technologies'
    ],
    trapLine: 'OPEN IN SLACK',
    redFlags: [
      { text: 'slack-workspace-alerts.com', hint: 'Spoofed domain — real Slack emails come from @slack.com' },
      { text: 'CEO', hint: 'Authority manipulation — using executive names to create pressure to comply' },
      { text: 'confidential', hint: 'Social engineering — "confidential" request discourages you from verifying with others' },
      { text: 'OPEN IN SLACK', hint: 'Malicious link — always open Slack directly from the app, not email links' }
    ]
  },

  // ========== SAFE EMAILS ==========

  {
    id: 's1',
    sender: 'Alice Chen [Design]',
    senderEmail: 'alice.chen@frontier.io',
    subject: 'Final design assets for v2 launch 🎨',
    time: '9:30 AM',
    read: true,
    isThreat: false,
    body: [
      'Hey team!',
      '',
      'I just uploaded the final design assets for the v2 launch to our shared Figma workspace. Everything is organized by component — buttons, cards, modals, and the new dashboard layout.',
      '',
      'Let me know if you have any questions or need any adjustments before the dev handoff tomorrow.',
      '',
      'Cheers,',
      'Alice'
    ]
  },

  {
    id: 's2',
    sender: 'GitHub',
    senderEmail: 'noreply@github.com',
    subject: 'Your monthly billing statement is ready',
    time: '6:00 AM',
    read: true,
    isThreat: false,
    body: [
      'Hi CyberSentinel,',
      '',
      'Your GitHub billing statement for March 2026 is now available.',
      '',
      'You can view your billing details in your account settings under Billing & Plans.',
      '',
      'Thanks,',
      'The GitHub Team'
    ]
  },

  {
    id: 's3',
    sender: 'LinkNet Security',
    senderEmail: 'security@linknet.io',
    subject: 'New login detected from 192.168.1.104',
    time: '8:15 AM',
    read: true,
    isThreat: false,
    body: [
      'Hi,',
      '',
      'A new login to your LinkNet account was detected from IP address 192.168.1.104 (your office network).',
      '',
      'If this was you, no action is needed. If you don\'t recognize this activity, please change your password from your account settings.',
      '',
      'LinkNet Security Team'
    ]
  },

  {
    id: 's4',
    sender: 'Medium Daily Digest',
    senderEmail: 'newsletter@medium.com',
    subject: 'Today\'s top stories for you',
    time: '7:00 AM',
    read: true,
    isThreat: false,
    body: [
      'Good morning!',
      '',
      'Here are today\'s recommended reads based on your interests:',
      '',
      '1. The Future of Cybersecurity Training',
      '2. Understanding Zero-Trust Architecture',
      '3. How AI is Changing Threat Detection',
      '',
      'Happy reading!'
    ]
  },

  {
    id: 's5',
    sender: 'Mark Rivera [Engineering]',
    senderEmail: 'mark.rivera@frontier.io',
    subject: 'Re: Sprint retrospective notes',
    time: '10:45 AM',
    read: true,
    isThreat: false,
    body: [
      'Hey everyone,',
      '',
      'Thanks for the great retro session yesterday. I\'ve compiled the notes and action items in Confluence.',
      '',
      'Key takeaways:',
      '• Improve PR review turnaround time',
      '• Add more integration tests for the auth module',
      '• Schedule a tech debt spike for next sprint',
      '',
      'Let me know if I missed anything!',
      '',
      'Mark'
    ]
  },

  {
    id: 's6',
    sender: 'Jira',
    senderEmail: 'notifications@atlassian.com',
    subject: '[SHIELD-342] Bug: Dashboard chart not rendering on Safari',
    time: '11:00 AM',
    read: false,
    isThreat: false,
    body: [
      'Mark Rivera assigned you a ticket:',
      '',
      'SHIELD-342: Bug — Dashboard chart not rendering on Safari',
      'Priority: Medium',
      'Sprint: Sprint 14',
      '',
      'Description: The threat detection chart on the dashboard page fails to render on Safari 17+. Appears to be a Canvas API compatibility issue.',
      '',
      'View this issue in Jira.'
    ]
  },

  {
    id: 's7',
    sender: 'Priya Patel [HR]',
    senderEmail: 'priya.patel@frontier.io',
    subject: 'Team outing next Friday — Please RSVP 🎉',
    time: '2:30 PM',
    read: false,
    isThreat: false,
    body: [
      'Hi everyone!',
      '',
      'We\'re organizing a team outing next Friday at Lakeside Escape Rooms from 4–7 PM. Pizza and drinks will be provided afterwards.',
      '',
      'Please RSVP by Wednesday so I can finalize the headcount.',
      '',
      'Looking forward to it!',
      'Priya'
    ]
  },

  {
    id: 's8',
    sender: 'Google Calendar',
    senderEmail: 'calendar-notification@google.com',
    subject: 'Reminder: 1:1 with Manager tomorrow at 10:00 AM',
    time: '5:00 PM',
    read: true,
    isThreat: false,
    body: [
      'This is a reminder for your upcoming event:',
      '',
      '1:1 with Manager',
      'When: Tomorrow at 10:00 AM — 10:30 AM',
      'Where: Meeting Room B (2nd Floor)',
      '',
      'Google Calendar'
    ]
  },

  {
    id: 's9',
    sender: 'Confluence',
    senderEmail: 'notifications@atlassian.com',
    subject: 'Sarah Kim edited "API Documentation v3"',
    time: '3:15 PM',
    read: true,
    isThreat: false,
    body: [
      'Sarah Kim made changes to the page "API Documentation v3" in the Engineering space.',
      '',
      'Changes: Updated authentication endpoint examples, added rate limiting section.',
      '',
      'View the page in Confluence.'
    ]
  },

  {
    id: 's10',
    sender: 'David Chen [VP Eng]',
    senderEmail: 'david.chen@frontier.io',
    subject: 'Great work on the security audit! 🏆',
    time: '4:20 PM',
    read: false,
    isThreat: false,
    body: [
      'Team,',
      '',
      'Just wanted to say a huge congratulations on passing the external security audit with zero critical findings. This is a testament to the hard work everyone has put in over the past quarter.',
      '',
      'Drinks are on me at the next team outing.',
      '',
      'David'
    ]
  },

  {
    id: 's11',
    sender: 'AWS Notifications',
    senderEmail: 'no-reply@sns.amazonaws.com',
    subject: 'AWS Budget Alert: 80% of monthly budget reached',
    time: '6:30 AM',
    read: true,
    isThreat: false,
    body: [
      'AWS Budgets Notification',
      '',
      'Your AWS account (ID: ****4821) has exceeded 80% of the monthly budget threshold you set.',
      '',
      'Current spend: $3,240.00',
      'Budget limit: $4,000.00',
      '',
      'You can review your usage in the AWS Billing console.',
      '',
      'Amazon Web Services'
    ]
  },

  {
    id: 's12',
    sender: 'Lisa Wang [Product]',
    senderEmail: 'lisa.wang@frontier.io',
    subject: 'Feature spec for threat timeline — Draft for review',
    time: '1:10 PM',
    read: false,
    isThreat: false,
    body: [
      'Hey,',
      '',
      'I\'ve drafted the product spec for the new threat timeline feature we discussed in last week\'s planning session. It\'s in Google Docs — I\'ve shared it with the eng team.',
      '',
      'Would love your feedback before we kick off the design sprint next week.',
      '',
      'Thanks!',
      'Lisa'
    ]
  },

  {
    id: 's13',
    sender: 'Slack',
    senderEmail: 'feedback@slack.com',
    subject: 'How\'s your Slack experience? Quick 2-min survey',
    time: '12:00 PM',
    read: true,
    isThreat: false,
    body: [
      'Hi there,',
      '',
      'We\'d love to hear how your team\'s experience with Slack has been. This short 2-minute survey helps us improve the product for teams like yours.',
      '',
      'Your feedback matters!',
      '',
      'The Slack Team'
    ]
  },

  {
    id: 's14',
    sender: 'Ops Monitoring',
    senderEmail: 'alerts@monitoring.frontier.io',
    subject: '✅ Resolved: API latency spike on us-east-1',
    time: '8:50 AM',
    read: true,
    isThreat: false,
    body: [
      'Incident Report — Resolved',
      '',
      'Issue: API latency exceeded 500ms threshold on us-east-1 cluster.',
      'Duration: 12 minutes (08:35 — 08:47 AM)',
      'Root Cause: Temporary database connection pool exhaustion.',
      'Status: Resolved — auto-scaling corrected the issue.',
      '',
      'No customer impact was detected.',
      '',
      'Ops Monitoring — Frontier Systems'
    ]
  },
];

/**
 * Generates a randomized inbox for a sandbox session.
 * Selects all malicious emails and a random subset of safe emails,
 * then shuffles them together.
 * @param {number} totalEmails - Total number of emails to show in inbox (default 8)
 * @returns {{ emails: Array, totalThreats: number }}
 */
export function generateSessionInbox(totalEmails = 8) {
  const malicious = EMAIL_POOL.filter(e => e.isThreat);
  const safe = EMAIL_POOL.filter(e => !e.isThreat);

  // Shuffle both pools
  const shuffledMalicious = [...malicious].sort(() => Math.random() - 0.5);
  const shuffledSafe = [...safe].sort(() => Math.random() - 0.5);

  // Pick 3-4 malicious emails and fill the rest with safe ones
  const threatCount = Math.min(3 + Math.floor(Math.random() * 2), shuffledMalicious.length); // 3 or 4
  const safeCount = totalEmails - threatCount;

  const selectedMalicious = shuffledMalicious.slice(0, threatCount);
  const selectedSafe = shuffledSafe.slice(0, safeCount);

  // Combine and shuffle final inbox
  const inbox = [...selectedMalicious, ...selectedSafe].sort(() => Math.random() - 0.5);

  // Assign read state: first 2-3 emails unread, rest read
  const unreadCount = 2 + Math.floor(Math.random() * 2);
  inbox.forEach((email, i) => {
    email.read = i >= unreadCount;
  });

  return {
    emails: inbox,
    totalThreats: threatCount
  };
}

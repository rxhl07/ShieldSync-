// =========================================================================
// PHISHING EMAIL DATABASE
// A pool of 38 realistic corporate emails — 16 malicious, 22 benign.
// Includes link-based phishing, social-engineering-only phishing,
// safe emails without links, AND safe emails with legitimate links.
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

  // ========== COMPLEX SAFE EMAILS WITH LINKS ==========

  {
    id: 's15',
    sender: 'Zoom',
    senderEmail: 'no-reply@zoom.us',
    subject: 'Your Zoom meeting recording is ready',
    time: '3:45 PM',
    read: false,
    isThreat: false,
    body: [
      'Hi there,',
      '',
      'Your cloud recording for "Sprint Planning — Week 14" is now available.',
      '',
      'Meeting: Sprint Planning — Week 14',
      'Date: Today at 2:00 PM',
      'Duration: 45 minutes',
      '',
      'You can access this recording from your Zoom account dashboard under Recordings.',
      '',
      'Best,',
      'Zoom Video Communications'
    ]
  },

  {
    id: 's16',
    sender: 'Google Drive',
    senderEmail: 'drive-shares-dm-noreply@google.com',
    subject: 'Lisa Wang shared "Q2 Roadmap" with you',
    time: '11:30 AM',
    read: false,
    isThreat: false,
    body: [
      'Lisa Wang (lisa.wang@frontier.io) has shared a document with you:',
      '',
      'Q2 Roadmap — Engineering Priorities',
      '',
      'Lisa says: "Here\'s the updated roadmap with the threat timeline feature added. Let me know your estimate."',
      '',
      'You can open the document from your Google Drive.',
      '',
      'Google Drive'
    ]
  },

  {
    id: 's17',
    sender: 'Notion',
    senderEmail: 'notify@mail.notion.so',
    subject: 'You were mentioned in "Architecture Decision Records"',
    time: '10:15 AM',
    read: false,
    isThreat: false,
    body: [
      'Mark Rivera mentioned you in a comment:',
      '',
      '"@you Can you review the proposed caching strategy in ADR-047? I think we should go with Redis over Memcached for the threat intel module."',
      '',
      'Page: Architecture Decision Records',
      'Workspace: Frontier Engineering',
      '',
      'View the page in Notion.',
      '',
      'Notion'
    ]
  },

  {
    id: 's18',
    sender: 'Linear',
    senderEmail: 'notifications@linear.app',
    subject: 'SHIELD-518: Implement WebSocket reconnection logic',
    time: '9:00 AM',
    read: false,
    isThreat: false,
    body: [
      'David Chen assigned you a new issue:',
      '',
      'SHIELD-518: Implement WebSocket reconnection logic',
      'Priority: High',
      'Cycle: Sprint 15',
      '',
      'Description: The real-time threat feed drops when the WebSocket connection is interrupted. Implement an exponential backoff reconnection strategy.',
      '',
      'View in Linear.'
    ]
  },

  {
    id: 's19',
    sender: 'Vercel',
    senderEmail: 'notifications@vercel.com',
    subject: '✅ Deployment succeeded for shieldsync-app',
    time: '4:10 PM',
    read: true,
    isThreat: false,
    body: [
      'Deployment Summary',
      '',
      'Project: shieldsync-app',
      'Branch: main',
      'Commit: fix(dashboard): resolve chart rendering on Safari',
      'Status: Ready',
      '',
      'Preview URL: shieldsync-app-git-main.vercel.app',
      '',
      'Vercel'
    ]
  },

  {
    id: 's20',
    sender: 'Sentry',
    senderEmail: 'noreply@md.getsentry.com',
    subject: '⚠️ New issue: TypeError in ThreatTimeline.jsx',
    time: '2:50 PM',
    read: false,
    isThreat: false,
    body: [
      'New issue in shieldsync-frontend:',
      '',
      'TypeError: Cannot read properties of undefined (reading \'map\')',
      'File: src/components/ThreatTimeline.jsx, line 42',
      'First seen: 2 minutes ago',
      'Events: 3',
      '',
      'This error is affecting 2 users.',
      '',
      'View issue in Sentry.'
    ]
  },

  {
    id: 's21',
    sender: 'DocuSign',
    senderEmail: 'dse_na4@docusign.net',
    subject: 'Completed: NDA — Frontier Systems x CloudVault',
    time: '1:20 PM',
    read: true,
    isThreat: false,
    body: [
      'All parties have signed the document.',
      '',
      'Document: Non-Disclosure Agreement — Frontier Systems x CloudVault Inc.',
      'Completed: Today',
      '',
      'A copy has been sent to all signers. You can download it from your DocuSign account.',
      '',
      'DocuSign Electronic Signature Service'
    ]
  },

  {
    id: 's22',
    sender: 'PagerDuty',
    senderEmail: 'no-reply@pagerduty.com',
    subject: '🔔 Incident #4021 acknowledged by on-call engineer',
    time: '7:15 AM',
    read: true,
    isThreat: false,
    body: [
      'Incident Report',
      '',
      'Incident: #4021 — Elevated error rate on /api/scan endpoint',
      'Severity: P3',
      'Status: Acknowledged by Sarah Kim',
      '',
      'Sarah is investigating. ETA for resolution: ~ 30 minutes.',
      '',
      'PagerDuty'
    ]
  },

  // ========== COMPLEX PHISHING (Social Engineering without links) ==========

  {
    id: 'm11',
    sender: 'CFO Michael Torres',
    senderEmail: 'michael.torres@fr0ntier-exec.com',
    subject: '🔴 Urgent — Wire Transfer Needed Today',
    time: '8:45 AM',
    read: false,
    isThreat: true,
    body: [
      'Hi,',
      '',
      'I\'m in a meeting and can\'t talk right now. We need to process an urgent wire transfer of $24,500 to a new vendor before 3 PM today to avoid a contract penalty.',
      '',
      'Please reply with your authorization and I\'ll send you the banking details. Keep this confidential — the board hasn\'t approved the vendor publicly yet.',
      '',
      'Thanks for handling this quickly.',
      '',
      'Michael Torres',
      'Chief Financial Officer'
    ],
    trapLine: null,
    redFlags: [
      { text: 'fr0ntier-exec.com', hint: 'Spoofed domain — uses "0" instead of "o" and adds "-exec"' },
      { text: '$24,500', hint: 'Unusual financial request via email — legitimate wire transfers go through formal approval processes' },
      { text: 'Keep this confidential', hint: 'Social engineering — secrecy prevents you from verifying with others' },
      { text: 'can\'t talk right now', hint: 'Excuse to avoid voice verification — a classic BEC (Business Email Compromise) tactic' },
      { text: 'contract penalty', hint: 'Artificial urgency — pressuring immediate action to bypass normal procedures' }
    ]
  },

  {
    id: 'm12',
    sender: 'Legal Department',
    senderEmail: 'legal-notices@fronti3r-legal.com',
    subject: '⚖️ Confidential: Legal Hold Notice — Do Not Delete Any Files',
    time: '7:30 AM',
    read: false,
    isThreat: true,
    body: [
      'CONFIDENTIAL — ATTORNEY-CLIENT PRIVILEGED',
      '',
      'You are hereby notified that Frontier Systems is subject to a legal hold regarding pending litigation. Effective immediately, you must preserve all electronic communications, documents, and data.',
      '',
      'Please reply to this email confirming receipt and provide the following:',
      '• Your employee ID number',
      '• Your department and direct manager name',
      '• A list of projects you have worked on in the past 6 months',
      '',
      'Failure to comply may result in legal sanctions.',
      '',
      'Frontier Legal Department'
    ],
    trapLine: null,
    redFlags: [
      { text: 'fronti3r-legal.com', hint: 'Spoofed domain — "3" instead of "e", and not your company\'s actual domain' },
      { text: 'employee ID number', hint: 'Data harvesting — legal holds never request personal identifiers via email' },
      { text: 'CONFIDENTIAL — ATTORNEY-CLIENT PRIVILEGED', hint: 'Intimidation tactic — abusing legal terminology to prevent you from asking questions' },
      { text: 'legal sanctions', hint: 'Threat escalation — designed to frighten you into immediate compliance' }
    ]
  },

  {
    id: 'm13',
    sender: 'CEO Rebecca Lin',
    senderEmail: 'rebecca.lin@frontiersystems-ceo.com',
    subject: 'Quick favor — Need gift cards for client appreciation',
    time: '11:45 AM',
    read: false,
    isThreat: true,
    body: [
      'Hi,',
      '',
      'I need your help with something time-sensitive. Can you purchase 5 Amazon gift cards ($100 each) for a last-minute client appreciation event this afternoon?',
      '',
      'Please buy them online and send me the redemption codes via email. I\'ll reimburse you through expense reports.',
      '',
      'Thanks — I really appreciate it.',
      '',
      'Rebecca Lin',
      'CEO, Frontier Systems'
    ],
    trapLine: null,
    redFlags: [
      { text: 'frontiersystems-ceo.com', hint: 'Spoofed domain — not your company\'s real domain, adds "-ceo" suffix' },
      { text: 'gift cards', hint: 'Classic scam indicator — executives never ask employees to buy gift cards via email' },
      { text: 'send me the redemption codes', hint: 'Gift card fraud — once codes are shared, the money is untraceable and gone' },
      { text: 'time-sensitive', hint: 'Urgency tactic — prevents you from verifying with the real CEO' }
    ]
  },

  {
    id: 'm14',
    sender: 'Accounts Payable',
    senderEmail: 'ap-team@frontier-finance.co',
    subject: '📎 Updated Invoice — Please Confirm Banking Details',
    time: '10:30 AM',
    read: false,
    isThreat: true,
    body: [
      'Hello,',
      '',
      'We are updating our vendor payment records for Q2. Your account shows a pending payment of $8,750.00.',
      '',
      'To ensure timely processing, please reply with:',
      '• Account holder name',
      '• Bank name and routing number',
      '• Account number',
      '',
      'If we don\'t receive confirmation by end of business today, we will have to delay your payment to next cycle.',
      '',
      'Best regards,',
      'Accounts Payable Team'
    ],
    trapLine: null,
    redFlags: [
      { text: 'frontier-finance.co', hint: 'Unknown domain — your company\'s finance team would use the corporate domain' },
      { text: 'Bank name and routing number', hint: 'Banking data harvesting — never share financial details via email' },
      { text: 'Account number', hint: 'Sensitive data request — legitimate AP teams already have your payment details on file' },
      { text: 'delay your payment', hint: 'Financial pressure tactic — creates urgency around money to override caution' }
    ]
  },

  {
    id: 'm15',
    sender: 'Tech Recruiter',
    senderEmail: 'sarah@talent-frontier-hr.com',
    subject: '💼 Exciting opportunity — Senior Engineer at top company',
    time: '9:20 AM',
    read: false,
    isThreat: true,
    body: [
      'Hi there,',
      '',
      'I came across your profile and think you\'d be a great fit for a Senior Security Engineer role at a Fortune 500 company. Base salary: $220K-$280K + equity.',
      '',
      'To proceed with the application, please reply with:',
      '• Updated resume (PDF)',
      '• Phone number for scheduling',
      '• Current employer and salary (for calibration)',
      '',
      'This is a confidential search, so please do not share externally.',
      '',
      'Sarah Miller',
      'Senior Technical Recruiter'
    ],
    trapLine: null,
    redFlags: [
      { text: 'talent-frontier-hr.com', hint: 'Suspicious domain — mimics your company name to build false trust' },
      { text: 'Current employer and salary', hint: 'Social engineering — harvesting employment data for identity theft or corporate espionage' },
      { text: 'confidential search', hint: 'Secrecy tactic — discourages you from verifying the recruiter\'s legitimacy' },
      { text: '$220K-$280K', hint: 'Baiting with unrealistic salary — designed to cloud your judgment with greed' }
    ]
  },

  {
    id: 'm16',
    sender: 'IT Security Audit',
    senderEmail: 'audit@it-security-frontier.org',
    subject: '🛡️ Mandatory Security Compliance Check — Response Required',
    time: '8:00 AM',
    read: false,
    isThreat: true,
    body: [
      'Dear Employee,',
      '',
      'As part of our annual SOC 2 compliance audit, we need to verify your workstation configuration. Please reply with the following information within 24 hours:',
      '',
      '• Operating system version',
      '• VPN client version',
      '• Last 4 digits of your employee badge number',
      '• Whether you use a personal device for work email',
      '',
      'This data is required by our external auditors. Non-compliance will be reported to management.',
      '',
      'IT Security Compliance Team'
    ],
    trapLine: null,
    redFlags: [
      { text: 'it-security-frontier.org', hint: 'Fake domain — real internal IT would use your company\'s domain, not a .org address' },
      { text: 'employee badge number', hint: 'Social engineering — collecting seemingly harmless data that can be used for impersonation' },
      { text: 'external auditors', hint: 'Authority tactic — invoking auditors to pressure compliance without verification' },
      { text: 'reported to management', hint: 'Threat of consequences — designed to make you comply through fear' },
      { text: 'Dear Employee', hint: 'Generic greeting — real IT teams address you by name' }
    ]
  },
];

/**
 * Generates a randomized inbox for a sandbox session.
 * Selects a mix of malicious and safe emails with varied complexity,
 * then shuffles them together.
 * @param {number} totalEmails - Total number of emails to show in inbox (default 10)
 * @returns {{ emails: Array, totalThreats: number }}
 */
export function generateSessionInbox(totalEmails = 10) {
  const malicious = EMAIL_POOL.filter(e => e.isThreat);
  const safe = EMAIL_POOL.filter(e => !e.isThreat);

  // Shuffle both pools
  const shuffledMalicious = [...malicious].sort(() => Math.random() - 0.5);
  const shuffledSafe = [...safe].sort(() => Math.random() - 0.5);

  // Pick 4-5 malicious emails and fill the rest with safe ones
  const threatCount = Math.min(4 + Math.floor(Math.random() * 2), shuffledMalicious.length); // 4 or 5
  const safeCount = totalEmails - threatCount;

  const selectedMalicious = shuffledMalicious.slice(0, threatCount);
  const selectedSafe = shuffledSafe.slice(0, safeCount);

  // Combine and shuffle final inbox
  const inbox = [...selectedMalicious, ...selectedSafe].sort(() => Math.random() - 0.5);

  // All emails start as unread — read state is tracked locally in the FullScreenSyncMail component
  inbox.forEach((email) => {
    email.read = false;
  });

  return {
    emails: inbox,
    totalThreats: threatCount
  };
}


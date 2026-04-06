// This file represents the JSON Schema-driven Simulation Engine.
// In a full backend environment, this data would be fetched from MongoDB.

export const SIMULATION_DATABASE = {
  "phishing": {
    id: "phishing_01",
    category: "phishing",
    concept: {
      title: "PHISHING",
      description: "Phishing is a form of cyberattack where threat actors craft deceptive emails impersonating trusted brands, colleagues, or institutions—to trick targets into clicking malicious links, revealing credentials, or downloading malware.",
      videoUrl: "component:PhishingAnimation"
    },
    title: "OPERATION: PHANTOM AUTH",
    briefing: "This module simulates a highly sophisticated credential harvesting attack disguised as an urgent IT protocol. You will face dynamic sender spoofing and psychological urgency triggers.",
    flags: [
      { text: 'Sender domain spoofing checks', color: 'red-500' },
      { text: 'Urgency psychological analysis', color: 'amber-500' },
      { text: 'Hidden link inspection manual', color: 'accent' },
      { text: 'Credential harvest mitigation', color: 'green-500' }
    ],
    payload: {
      type: "email",
      inbox: [
        { id: 1, sender: "Netflix Protocol", subject: "Immediate action: Payment authentication required", read: false },
        { 
          id: 2, 
          sender: "Amazon Security Team", 
          spoofedEmail: "security@amaz0n-alerts.com",
          subject: "⚠️ Action Required: Unusual sign-in activity detected", 
          read: false, 
          isThreat: true,
          body: [
            "Dear Valued Customer,",
            "",
            "We detected an unauthorized sign-in attempt on your account from an unrecognized device in Moscow, Russia.",
            "",
            "If this wasn't you, please verify your identity immediately by clicking the secure link below:",
            "",
            "→ Verify Your Account Now",
            "",
            "Failure to verify within 24 hours will result in permanent account suspension.",
            "",
            "Best regards,",
            "Amazon Security Team"
          ],
          redFlags: [
            { text: 'amaz0n-alerts.com', hint: 'Spoofed domain — uses "0" instead of "o" and adds "-alerts"' },
            { text: 'Moscow, Russia', hint: 'Fear tactic — creating urgency with a scary location' },
            { text: 'Verify Your Account Now', hint: 'Suspicious CTA — legitimate services never ask to "verify" via email links' },
            { text: '24 hours', hint: 'Artificial urgency — pressuring immediate action before you can think' },
            { text: 'permanent account suspension', hint: 'Threat escalation — real companies don\'t threaten permanent closure via email' }
          ]
        },
        { id: 3, sender: "LinkNet Security", subject: "New login detected from 192.168.1.104", read: true },
        { id: 4, sender: "Alice [Admin]", subject: "Final project assets for v2 launch", read: true }
      ]
    }
  },
  "vishing": {
    id: "vishing_01",
    category: "vishing",
    concept: {
      title: "VISHING",
      description: "Vishing (Voice Phishing) is a form of cyberattack where threat actors use phone calls or voice messages—increasingly utilizing AI voice cloning—to trick targets into revealing sensitive data like 2FA tokens, passwords, or financial details.",
      videoUrl: "component:VishingAnimation"
    },
    title: "OPERATION: VOICE CLONE",
    briefing: "An incoming call from 'Bank Support' requesting your 2FA token. This simulation models AI-generated voice cloning (Deepfake) combined with Caller ID spoofing.",
    flags: [
      { text: 'Caller ID Verification', color: 'red-500' },
      { text: 'Protocol Departure', color: 'amber-500' },
      { text: 'Urgency & Authority', color: 'accent' },
      { text: 'Token Protection', color: 'green-500' }
    ],
    payload: {
      type: "audio_call",
      calls: [
        {
          id: 1,
          callerName: "Bank Fraud Dept",
          callerNumber: "+1 (800) 555-0199",
          isThreat: true,
          audioSequence: [
            "Hello! This is Chase Fraud Support. We've detected a $400 charge in Ohio.",
            "To freeze this transaction, I just sent a 6-digit cancellation code to your phone.",
            "Can you read that code back to me for verification?"
          ],
          redFlags: [
            { text: 'read that code back to me', hint: 'Banks will never call you and ask for a 2FA or SMS code. Codes are for YOU to enter online only.' },
            { text: 'Chase Fraud Support', hint: 'Caller ID is easily spoofed. Always hang up and call the number on the back of your card.' }
          ],
          actionSafe: "Hang Up",
          actionThreat: "Provide Code"
        },
        {
          id: 2,
          callerName: "IT Operations",
          callerNumber: "Internal Ext. 4022",
          isThreat: false,
          audioSequence: [
            "Hey, this is Mark from internal IT.",
            "We're doing a mandatory database migration today and services might be slow.",
            "You don't need to do anything or give me any info, just please wait before submitting large queries. Thanks!"
          ],
          redFlags: [],
          actionSafe: "Acknowledge & Hang Up",
          actionThreat: "Offer Credentials"
        },
        {
          id: 3,
          callerName: "Payroll Dept",
          callerNumber: "+1 (888) 220-4100",
          isThreat: true,
          audioSequence: [
            "Hi, this is David from corporate payroll.",
            "There is a matching discrepancy on your W-2 tax forms for this quarter.",
            "To avoid a delay on this week's paycheck, please confirm your Social Security Number now."
          ],
          redFlags: [
            { text: 'confirm your Social Security Number', hint: 'Payroll already has your SSN and will never ask to urgently confirm it over the phone.' },
            { text: 'delay on this week\'s paycheck', hint: 'Artificial urgency targeting your financial security.' }
          ],
          actionSafe: "Hang Up",
          actionThreat: "Provide SSN"
        }
      ]
    }
  },
  "soc-eng": {
    id: "soc-eng_01",
    category: "soc-eng",
    title: "OPERATION: TRUST EXPLOIT",
    briefing: "A direct message from a trusted contact requesting you click an external link. This simulates account hijacking and OSINT-driven pretexting attacks.",
    flags: [
      { text: 'Communication Pattern', color: 'red-500' },
      { text: 'Link Masking Checks', color: 'amber-500' },
      { text: 'Profile Integrity', color: 'accent' },
      { text: 'Session hijacking', color: 'green-500' }
    ],
    payload: {
      type: "social_dm",
      platform: "InstaLink",
      conversations: [
        {
          id: 1,
          friendName: "Sarah Jenkins",
          friendHandle: "@sarah.j.dev",
          friendAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
          messages: [
            { sender: "friend", time: "10:42 AM", text: "Hey! It's been a while 👋" },
            { sender: "friend", time: "10:43 AM", text: "I found this old photo of us from the retreat, I can't believe we looked like that 😂" },
            { sender: "friend", time: "10:43 AM", text: "http://bit.ly/retreat_photo_archive", isTrapLink: true }
          ],
          profile: {
            posts: 0,
            followers: "12.4k",
            following: "4",
            bio: "Crypto enthusiast 🚀 | Link to free money below 👇",
            isCompromised: true,
            feed: [
              { date: "1h ago", text: "Crypto is the future! 🚀 Buy the dip now or regret later." },
              { date: "Yesterday", text: "Just joined the Alpha Protocol, amazing returns so far!" }
            ]
          },
          isThreat: true,
          unread: true,
          redFlags: [
            { text: 'http://bit.ly/retreat_photo_archive', hint: 'Shortened URLs easily hide malicious payloads like session hijackers.' },
            { text: 'profile bio and stats', hint: 'The account was taken over. Zero posts but 12k followers and crypto scams in the bio are a dead giveaway.' }
          ]
        },
        {
          id: 2,
          friendName: "IT Support",
          friendHandle: "@instalink_it_desk",
          friendAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=IT",
          messages: [
            { sender: "friend", time: "1:15 PM", text: "URGENT: Your account has been flagged for unusual activity." },
            { sender: "friend", time: "1:16 PM", text: "Please verify your credentials immediately to avoid suspension." },
            { sender: "friend", time: "1:16 PM", text: "https://instalink.support-verification.com/login", isTrapLink: true }
          ],
          profile: {
            posts: 2,
            followers: "14",
            following: "1",
            bio: "Official InstaLink Support Helpdesk.",
            isCompromised: true,
            feed: [
              { date: "2d ago", text: "System maintenance scheduled for Friday." },
              { date: "5d ago", text: "Please update your security questions." }
            ]
          },
          isThreat: true,
          unread: true,
          redFlags: [
            { text: 'support-verification.com', hint: 'Official support will not use a strange external domain.' },
            { text: '14 followers', hint: 'A real support account would have thousands or millions of followers.' }
          ]
        },
        {
          id: 3,
          friendName: "HR Dept",
          friendHandle: "@hr_payroll_updates",
          friendAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=HR",
          messages: [
            { sender: "friend", time: "09:00 AM", text: "Hello, we are updating our direct deposit system." },
            { sender: "friend", time: "09:01 AM", text: "Please confirm your current banking details using the secure portal." },
            { sender: "friend", time: "09:01 AM", text: "http://payroll-update-secure.com/auth", isTrapLink: true }
          ],
          profile: {
            posts: 0,
            followers: "2",
            following: "0",
            bio: "Human Resources Portal",
            isCompromised: true,
            feed: [
              { date: "1w ago", text: "Open enrollment for Q3 benefits starts now." },
              { date: "2w ago", text: "Check the internal portal for holiday updates." }
            ]
          },
          isThreat: true,
          unread: true,
          redFlags: [
            { text: 'payroll-update-secure.com', hint: 'Generic external domain used for phishing.' },
            { text: '2 followers', hint: 'A brand new account trying to impersonate HR.' }
          ]
        },
        {
          id: 4,
          friendName: "Marcus Tyrell",
          friendHandle: "@marcus_t",
          friendAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
          messages: [
            { sender: "friend", time: "Yesterday", text: "Are we still on for lunch tomorrow?" },
            { sender: "friend", time: "09:00 AM", text: "Hey I'm running like 10 mins late just fyi!" },
            { sender: "friend", time: "09:02 AM", text: "If you get there first can you grab us a table by the window?" }
          ],
          profile: {
            posts: 120,
            followers: "450",
            following: "380",
            bio: "Software engineer. Coffee addict. Living in Austin.",
            isCompromised: false,
            feed: [
              { date: "3h ago", text: "That burger was amazing 🍔" },
              { date: "Yesterday", text: "Long day at the office, ready for the weekend!" }
            ]
          },
          isThreat: false,
          unread: true,
          redFlags: []
        },
        {
          id: 5,
          friendName: "Design Team",
          friendHandle: "@ui_ux_wizards",
          friendAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Design",
          messages: [
            { sender: "friend", time: "11:30 AM", text: "New wireframes are ready for review." },
            { sender: "friend", time: "11:31 AM", text: "Please use the official Figma link below:" },
            { sender: "friend", time: "11:31 AM", text: "https://www.figma.com/file/mock-project-xyz?node-id=0", isTrapLink: false }
          ],
          profile: {
            posts: 42,
            followers: "1.2k",
            following: "50",
            bio: "Official channel for all ShieldSync design updates.",
            isCompromised: false,
            feed: [
              { date: "12h ago", text: "New Figma features are 🔥" },
              { date: "2d ago", text: "Check out the new design system docs." }
            ]
          },
          isThreat: false,
          unread: true,
          redFlags: []
        },
        {
          id: 6,
          friendName: "Jane Doe (IT Help)",
          friendHandle: "@instalink_it_jane",
          friendAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane&backgroundColor=b6e3f4",
          messages: [
            { sender: "friend", time: "01:15 PM", text: "Hey, I noticed your network speed is heavily throttled today." },
            { sender: "friend", time: "01:16 PM", text: "I can run a diagnostic if you download this VPN profile patch." },
            { sender: "friend", time: "01:16 PM", text: "http://vpn-patch-instalink.net/download", isTrapLink: true }
          ],
          profile: {
            posts: 1,
            followers: "12",
            following: "0",
            bio: "InstaLink Tier 1 Support. DM for help.",
            isCompromised: false,
            feed: [
              { date: "Yesterday", text: "Available for help with VPN issues." },
              { date: "3d ago", text: "Update: Tier 1 support is currently at full capacity." }
            ]
          },
          isThreat: true,
          unread: true,
          redFlags: [
            { text: 'vpn-patch-instalink.net', hint: 'Unofficial payload domain for a VPN profile.' },
            { text: '12 Followers', hint: 'Official IT help desks usually have corporate followings or are verified.' }
          ]
        },
        {
          id: 7,
          friendName: "Cryptoking",
          friendHandle: "@wealth_guru_99",
          friendAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Crypto",
          messages: [
            { sender: "friend", time: "Monday", text: "Hey, I've been watching your profile, you have great energy! 🚀" },
            { sender: "friend", time: "Yesterday", text: "I just made a 400% return on the new Alpha protocol." },
            { sender: "friend", time: "02:00 PM", text: "Check out the dashboard, you can connect your wallet safely:" },
            { sender: "friend", time: "02:01 PM", text: "http://alpha-protocol-defi.app/connect", isTrapLink: true }
          ],
          profile: {
            posts: 420,
            followers: "12.5k",
            following: "9000",
            bio: "Entrepreneur. Crypto. Success. DM me to learn how to make 10k/month.",
            isCompromised: false,
            feed: [
              { date: "2h ago", text: "Success is a mindset. 🧠" },
              { date: "Yesterday", text: "Wealth doesn't wait. DM to join the Alpha group." }
            ]
          },
          isThreat: true,
          unread: true,
          redFlags: [
            { text: 'Unsolicited investment advice', hint: 'A classic pig-butchering romance/crypto scam opener.' },
            { text: 'alpha-protocol-defi.app', hint: 'Phishing domain designed to drain crypto wallets.' }
          ]
        },
        {
          id: 8,
          friendName: "David (Manager)",
          friendHandle: "@david_ops",
          friendAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
          messages: [
            { sender: "friend", time: "08:00 AM", text: "Can you review the Q3 draft when you have a minute?" },
            { sender: "friend", time: "08:10 AM", text: "I put it in the shared drive." },
            { sender: "friend", time: "08:10 AM", text: "https://docs.google.com/document/d/1a2b3c4d5e/edit", isTrapLink: false }
          ],
          profile: {
            posts: 89,
            followers: "240",
            following: "150",
            bio: "Operations Manager. Outdoors enthusiast.",
            isCompromised: false,
            feed: [
              { date: "1d ago", text: "Reviewing Q3 goals with the team." },
              { date: "4d ago", text: "The new office layout is great." }
            ]
          },
          isThreat: false,
          unread: true,
          redFlags: []
        },
        {
          id: 9,
          friendName: "Acme Vendors",
          friendHandle: "@acme_supplies",
          friendAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Acme",
          messages: [
            { sender: "friend", time: "Last week", text: "Your recent order has been shipped." },
            { sender: "friend", time: "10:30 AM", text: "We have received your latest invoice payment." },
            { sender: "friend", time: "10:30 AM", text: "Thank you for doing business with us." }
          ],
          profile: {
            posts: 540,
            followers: "3.4k",
            following: "2",
            bio: "Official supplier of office equipment.",
            isCompromised: false,
            feed: [
              { date: "Last month", text: "Happy New Year! 🎉" },
              { date: "Yesterday", text: "Your January order has been fulfilled." }
            ]
          },
          isThreat: false,
          unread: true,
          redFlags: []
        }
      ]
    }
  }
};

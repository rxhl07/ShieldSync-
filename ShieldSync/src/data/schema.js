// This file represents the JSON Schema-driven Simulation Engine.
// In a full backend environment, this data would be fetched from MongoDB.

export const SIMULATION_DATABASE = {
  "phishing": {
    id: "phishing_01",
    category: "phishing",
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
      callerName: "Bank Fraud Dept",
      callerNumber: "+1 (800) 555-0199",
      audioSequence: [
        "Hello! This is Chase Fraud Support. We've detected a $400 charge in Ohio.",
        "To freeze this transaction, I just sent a 6-digit cancellation code to your phone.",
        "Can you read that code back to me for verification?"
      ],
      isThreat: true,
      redFlags: [
        { text: 'read that code back to me', hint: 'Banks will never call you and ask for a 2FA or SMS code. Codes are for YOU to enter online only.' },
        { text: 'Chase Fraud Support', hint: 'Caller ID is easily spoofed. Always hang up and call the number on the back of your card.' }
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
        isCompromised: true
      },
      isThreat: true,
      redFlags: [
        { text: 'http://bit.ly/retreat_photo_archive', hint: 'Shortened URLs easily hide malicious payloads like session hijackers.' },
        { text: 'profile bio and stats', hint: 'The account was taken over. Zero posts but 12k followers and crypto scams in the bio are a dead giveaway.' }
      ]
    }
  }
};

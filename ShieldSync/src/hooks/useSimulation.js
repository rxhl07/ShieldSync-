import { useState, useCallback, useRef } from 'react';
import { generateSessionInbox } from '../data/phishingEmails';
import { SIMULATION_DATABASE } from '../data/schema';

export function useSimulation() {
  const [inSandbox, setInSandbox] = useState(false);
  const [glitchTriggered, setGlitchTriggered] = useState(false);
  const [xRayMode, setXRayMode] = useState(false);
  const [simulationStatus, setSimulationStatus] = useState('idle'); // idle | active | feedback_success | feedback_fail | feedback_false_alarm | completed
  const [lastActionEmail, setLastActionEmail] = useState(null); // tracks the email that was just acted on for the review screen
  const [metrics, setMetrics] = useState({ startTime: null, hovers: 0, safeItemsOpened: 0 });

  // Hacker Tab State
  const [attackConfig, setAttackConfig] = useState({});
  const [hackerStatus, setHackerStatus] = useState('idle'); // idle | initializing | active

  // Game loop state
  const [detectedThreats, setDetectedThreats] = useState([]);
  const [totalThreats, setTotalThreats] = useState(0);
  const [wrongClicks, setWrongClicks] = useState(0);

  // Session inbox — generated once per simulation start
  const [sessionInbox, setSessionInbox] = useState(null);

  const startSimulation = useCallback((category, config = null) => {
    let threatCount = 0;
    let inbox = null;
    let customConfig = config || attackConfig;

    if (category === 'phishing') {
      const session = generateSessionInbox(8);
      inbox = session.emails;
      
      if (customConfig?.template) {
         const customThreat = {
            id: 'custom_phish_1',
            sender: `${customConfig.template} Security`,
            subject: `Action Required: ${customConfig.template} Account Alert`,
            read: false,
            isThreat: true,
            body: [
              `Dear ${customConfig.template} Customer,`,
              `We detected an unauthorized sign-in attempt on your ${customConfig.template} account.`,
              `Please verify your identity immediately by clicking the secure ${customConfig.payloadType?.toLowerCase() || 'link'} below:`,
              `http://verify-${customConfig.template.toLowerCase()}-security.com/auth`
            ],
            redFlags: [
              { text: `verify-${customConfig.template.toLowerCase()}-security.com`, hint: 'Spoofed external domain.' }
            ]
         };
         // Override the first threat in the generated inbox
         const threatIndex = inbox.findIndex(e => e.isThreat);
         if (threatIndex >= 0) inbox[threatIndex] = customThreat;
         else inbox.unshift(customThreat);
      }
      
      threatCount = inbox.filter(e => e.isThreat).length;
    } else if (category === 'soc-eng') {
      threatCount = SIMULATION_DATABASE['soc-eng'].payload.conversations.filter(c => c.isThreat).length;
      // We could selectively override soc-eng conversations here too based on customConfig.targetPersona
    } else if (category === 'vishing') {
      threatCount = SIMULATION_DATABASE['vishing'].payload.calls.filter(c => c.isThreat).length;
    }

    setSessionInbox(inbox);
    setInSandbox(true);
    setSimulationStatus('active');
    setGlitchTriggered(false);
    setXRayMode(false);
    setDetectedThreats([]);
    setTotalThreats(threatCount);
    setWrongClicks(0);
    setMetrics({ startTime: Date.now(), hovers: 0, safeItemsOpened: 0 });
  }, []);

  const trackHover = useCallback(() => {
    setMetrics(m => ({ ...m, hovers: m.hovers + 1 }));
  }, []);

  const trackSafeItemOpen = useCallback(() => {
    setMetrics(m => ({ ...m, safeItemsOpened: m.safeItemsOpened + 1 }));
  }, []);

  const logMetrics = useCallback((status) => {
    setMetrics(m => {
      const timeElapsed = ((Date.now() - m.startTime) / 1000).toFixed(2);
      const report = {
        status,
        timeElapsedSeconds: timeElapsed,
        linkHovers: m.hovers,
        safeItemsOpened: m.safeItemsOpened,
        timestamp: new Date().toISOString()
      };
      console.log("[SHIELDSYNC] Behavioral Metrics Logged:", report);

      const history = JSON.parse(localStorage.getItem('shieldsync_metrics') || '[]');
      history.push(report);
      localStorage.setItem('shieldsync_metrics', JSON.stringify(history));

      return m;
    });
  }, []);

  // Called when user correctly reports a phishing email
  const reportThreatSuccess = useCallback((emailId, email) => {
    setLastActionEmail(email || null);
    setSimulationStatus('feedback_success');
    setDetectedThreats(prev => [...prev, emailId]);
  }, []);

  // Called when user falls for a trap (clicks malicious link)
  const reportThreatFail = useCallback((email) => {
    setLastActionEmail(email || null);
    setSimulationStatus('feedback_fail');
    setGlitchTriggered(true);
    setWrongClicks(prev => prev + 1);
    setTimeout(() => {
      setGlitchTriggered(false);
    }, 2000);
  }, []);

  // Called when user incorrectly reports a safe email as a threat (false alarm)
  const reportFalsePositive = useCallback((email) => {
    setLastActionEmail(email || null);
    setSimulationStatus('feedback_false_alarm');
    setWrongClicks(prev => prev + 1);
  }, []);

  // User dismisses the feedback popup — returns to sandbox
  const dismissFeedback = useCallback(() => {
    setSimulationStatus('active');
  }, []);

  // Check if game is complete (all threats found)
  const checkCompletion = useCallback(() => {
    setDetectedThreats(prev => {
      if (prev.length >= totalThreats && totalThreats > 0) {
        setTimeout(() => {
          setSimulationStatus('completed');
          logMetrics('completed');
        }, 300);
      }
      return prev;
    });
  }, [totalThreats, logMetrics]);

  // Legacy — kept for backward compat with vishing/social modules
  const failSimulation = useCallback(() => {
    setSimulationStatus('feedback_fail');
    setGlitchTriggered(true);
    logMetrics('failed');
    setTimeout(() => {
      setGlitchTriggered(false);
    }, 2000);
  }, [logMetrics]);

  const succeedSimulation = useCallback(() => {
    setSimulationStatus('feedback_success');
    logMetrics('success');
  }, [logMetrics]);

  const dismissOverlay = useCallback(() => {
    setSimulationStatus('active');
  }, []);

  const exitSimulation = useCallback(() => {
    setInSandbox(false);
    setSimulationStatus('idle');
    setXRayMode(false);
    setGlitchTriggered(false);
    setDetectedThreats([]);
    setTotalThreats(0);
    setWrongClicks(0);
    setSessionInbox(null);
    setLastActionEmail(null);
  }, []);

  return {
    inSandbox,
    glitchTriggered,
    xRayMode,
    simulationStatus,
    attackConfig,
    setAttackConfig,
    hackerStatus,
    setHackerStatus,
    startSimulation,
    failSimulation,
    succeedSimulation,
    exitSimulation,
    trackHover,
    trackSafeItemOpen,
    dismissOverlay,
    // Game loop
    detectedThreats,
    totalThreats,
    wrongClicks,
    sessionInbox,
    reportThreatSuccess,
    reportThreatFail,
    reportFalsePositive,
    lastActionEmail,
    dismissFeedback,
    checkCompletion,
    metrics,
    setSimulationStatus,
  };
}

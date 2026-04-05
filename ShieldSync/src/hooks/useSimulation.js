import { useState, useCallback, useRef } from 'react';
import { generateSessionInbox } from '../data/phishingEmails';

export function useSimulation() {
  const [inSandbox, setInSandbox] = useState(false);
  const [glitchTriggered, setGlitchTriggered] = useState(false);
  const [xRayMode, setXRayMode] = useState(false);
  const [simulationStatus, setSimulationStatus] = useState('idle'); // idle | active | feedback_success | feedback_fail | completed
  const [metrics, setMetrics] = useState({ startTime: null, hovers: 0, safeItemsOpened: 0 });

  // Game loop state
  const [detectedThreats, setDetectedThreats] = useState([]);
  const [totalThreats, setTotalThreats] = useState(0);
  const [wrongClicks, setWrongClicks] = useState(0);
  
  // Session inbox — generated once per simulation start
  const [sessionInbox, setSessionInbox] = useState(null);

  const startSimulation = useCallback((category) => {
    let threatCount = 0;
    let inbox = null;

    if (category === 'phishing') {
      const session = generateSessionInbox(8);
      threatCount = session.totalThreats;
      inbox = session.emails;
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
  const reportThreatSuccess = useCallback((emailId) => {
    setSimulationStatus('feedback_success');
    setDetectedThreats(prev => [...prev, emailId]);
  }, []);

  // Called when user falls for a trap (clicks malicious link or reports a safe email)
  const reportThreatFail = useCallback(() => {
    setSimulationStatus('feedback_fail');
    setGlitchTriggered(true);
    setWrongClicks(prev => prev + 1);
    setTimeout(() => {
      setGlitchTriggered(false);
    }, 2000);
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
      setXRayMode(true);
    }, 2000);
  }, [logMetrics]);

  const succeedSimulation = useCallback(() => {
    setSimulationStatus('feedback_success');
    setXRayMode(true);
    logMetrics('success');
  }, [logMetrics]);

  const exitSimulation = useCallback(() => {
    setInSandbox(false);
    setSimulationStatus('idle');
    setXRayMode(false);
    setGlitchTriggered(false);
    setDetectedThreats([]);
    setTotalThreats(0);
    setWrongClicks(0);
    setSessionInbox(null);
  }, []);

  return {
    inSandbox,
    glitchTriggered,
    xRayMode,
    simulationStatus,
    startSimulation,
    failSimulation,
    succeedSimulation,
    exitSimulation,
    trackHover,
    trackSafeItemOpen,
    // Game loop
    detectedThreats,
    totalThreats,
    wrongClicks,
    sessionInbox,
    reportThreatSuccess,
    reportThreatFail,
    dismissFeedback,
    checkCompletion,
    metrics,
    setSimulationStatus,
  };
}

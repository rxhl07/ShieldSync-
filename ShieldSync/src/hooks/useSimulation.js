import { useState, useCallback, useEffect } from 'react';

export function useSimulation() {
  const [inSandbox, setInSandbox] = useState(false);
  const [glitchTriggered, setGlitchTriggered] = useState(false);
  const [xRayMode, setXRayMode] = useState(false);
  const [simulationStatus, setSimulationStatus] = useState('idle'); // idle | active | failed | success
  const [metrics, setMetrics] = useState({ startTime: null, hovers: 0, safeItemsOpened: 0 });

  const startSimulation = useCallback(() => {
    setInSandbox(true);
    setSimulationStatus('active');
    setGlitchTriggered(false);
    setXRayMode(false);
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

  const failSimulation = useCallback(() => {
    setSimulationStatus('failed');
    setGlitchTriggered(true);
    logMetrics('failed');
    
    // Stop glitch and show X-ray after 2s
    setTimeout(() => {
      setGlitchTriggered(false);
      setXRayMode(true);
    }, 2000);
  }, [logMetrics]);

  const succeedSimulation = useCallback(() => {
    setSimulationStatus('success');
    setXRayMode(true);
    logMetrics('success');
  }, [logMetrics]);

  const exitSimulation = useCallback(() => {
    setInSandbox(false);
    setSimulationStatus('idle');
    setXRayMode(false);
    setGlitchTriggered(false);
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
    trackSafeItemOpen
  };
}

import { useState, useCallback, useEffect } from 'react';

export function useSimulation() {
  const [inSandbox, setInSandbox] = useState(false);
  const [glitchTriggered, setGlitchTriggered] = useState(false);
  const [xRayMode, setXRayMode] = useState(false);
  const [simulationStatus, setSimulationStatus] = useState('idle'); // idle | active | failed | success

  const startSimulation = useCallback(() => {
    setInSandbox(true);
    setSimulationStatus('active');
    setGlitchTriggered(false);
    setXRayMode(false);
  }, []);

  const failSimulation = useCallback(() => {
    setSimulationStatus('failed');
    setGlitchTriggered(true);
    
    // Stop glitch and show X-ray after 2s
    setTimeout(() => {
      setGlitchTriggered(false);
      setXRayMode(true);
    }, 2000);
  }, []);

  const succeedSimulation = useCallback(() => {
    setSimulationStatus('success');
    setXRayMode(true);
  }, []);

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
    exitSimulation
  };
}

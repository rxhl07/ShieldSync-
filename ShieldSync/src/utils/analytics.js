/**
 * Analytics utility — tracks behavioral metrics during simulations.
 * Time-to-detect, hover checks, click patterns etc.
 */

export function startTimer() {
  return performance.now();
}

export function getElapsedTime(startTime) {
  return ((performance.now() - startTime) / 1000).toFixed(1);
}

export function calculateCyberScore(metrics) {
  const {
    correctIdentifications = 0,
    totalAttempts = 1,
    avgTimeToDetect = 10,
    hoveredBeforeClick = false,
  } = metrics;

  let score = 0;
  
  // Accuracy component (0-400)
  score += (correctIdentifications / totalAttempts) * 400;
  
  // Speed component (0-300) — faster = better, cap at 2s
  const speedScore = Math.max(0, 300 - (avgTimeToDetect * 30));
  score += speedScore;
  
  // Behavior bonus (0-200) — did user check URLs before clicking?
  if (hoveredBeforeClick) score += 200;
  
  // Streak bonus (0-100)
  score += Math.min(100, (correctIdentifications * 20));

  return Math.min(1000, Math.round(score));
}

export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function getScoreColor(score) {
  if (score >= 800) return '#22C55E';
  if (score >= 600) return '#F59E0B';
  if (score >= 400) return '#FB923C';
  return '#EF4444';
}

export function getScoreLabel(score) {
  if (score >= 800) return 'Excellent';
  if (score >= 600) return 'Good';
  if (score >= 400) return 'Needs Improvement';
  return 'At Risk';
}

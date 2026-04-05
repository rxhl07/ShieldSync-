import { useEffect, useRef } from 'react';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { useTheme } from '../../contexts/ThemeContext';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

export default function RadarChart({ skills = {} }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const chartRef = useRef(null);

  const data = {
    labels: ['Phishing', 'Vishing', 'Social Eng.', 'Smishing', 'Ransomware'],
    datasets: [
      {
        label: 'Proficiency',
        data: [
          skills.phishing || 75,
          skills.vishing || 62,
          skills.socialEngineering || 88,
          skills.smishing || 45,
          skills.ransomware || 70,
        ],
        backgroundColor: isDark ? 'rgba(45, 91, 255, 0.15)' : 'rgba(45, 91, 255, 0.1)',
        borderColor: '#2D5BFF',
        borderWidth: 3,
        pointBackgroundColor: '#2D5BFF',
        pointBorderColor: isDark ? '#0A0A0B' : '#FFFFFF',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 25,
          display: false,
        },
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
          lineWidth: 1,
        },
        angleLines: {
          color: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
          lineWidth: 1,
        },
        pointLabels: {
          color: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(15, 23, 42, 0.6)',
          font: {
            family: 'var(--font-body)',
            size: 10,
            weight: '700',
          },
          padding: 15,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: isDark ? '#141418' : '#FFFFFF',
        titleColor: isDark ? '#FFFFFF' : '#0F172A',
        bodyColor: isDark ? '#A0A0A8' : '#475569',
        titleFont: { family: 'var(--font-heading)', size: 12, weight: '700' },
        bodyFont: { family: 'var(--font-mono)', size: 11 },
        borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        cornerRadius: 12,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}%`,
        },
      },
    },
  };

  return (
    <div className="w-full h-full flex flex-col justify-center">
      <div className="relative max-w-[280px] mx-auto w-full">
        <Radar ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
}

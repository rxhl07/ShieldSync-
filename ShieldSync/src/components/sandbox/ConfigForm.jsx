import React from 'react';

const OPTIONS = {
  phishing: {
    template: ['Netflix', 'HR', 'Bank'],
    payloadType: ['Link', 'Attachment']
  },
  vishing: {
    voiceProfile: ['Male', 'Female', 'Robotic'],
    backgroundNoise: ['Office', 'Static', 'Cafe']
  },
  'soc-eng': {
    targetPersona: ['Junior Dev', 'HR Manager', 'Sales Lead'],
    attackAngle: ['Authority', 'Trust', 'Fear']
  }
};

export default function ConfigForm({ vector, config, onChange, disabled }) {
  const currentOptions = OPTIONS[vector];

  if (!currentOptions) return null;

  const handleChange = (key, value) => {
    onChange({ ...config, [key]: value });
  };

  return (
    <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 mb-6">
      <h3 className="text-red-500 font-bold text-xs uppercase tracking-widest mb-6">Attack Configuration</h3>
      <div className="grid grid-cols-2 gap-6">
        {Object.entries(currentOptions).map(([key, optionsList]) => (
          <div key={key} className="flex flex-col gap-2">
            <label className="text-red-400/70 text-[10px] uppercase font-bold tracking-wider">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </label>
            <select
              disabled={disabled}
              value={config[key] || optionsList[0]}
              onChange={(e) => handleChange(key, e.target.value)}
              className="bg-black/40 border border-red-500/30 rounded-lg px-4 py-2.5 text-sm font-mono text-red-500 focus:outline-none focus:border-red-500/80 transition-colors appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {optionsList.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

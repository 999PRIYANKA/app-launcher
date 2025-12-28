import React, { useState } from 'react';

const dispositions = [
  'Left voicemail',
  'Meaningful contact',
  'Not interested',
  'Follow up with me',
  'Schedule a follow-up appointment',
];

const WrapUpModal = ({ onComplete }) => {
  const [selectedDisposition, setSelectedDisposition] = useState(null);

  const handleSave = () => {
    if (selectedDisposition) {
      onComplete(selectedDisposition);
    }
  };

  return (
    <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center p-8 z-20">
      <div className="bg-zinc-800 rounded-2xl p-6 w-full max-w-sm text-white animate-fade-in-up">
        <h2 className="text-xl font-semibold text-center mb-6">Call Wrap-up</h2>
        <div className="space-y-3">
          {dispositions.map((disposition) => (
            <button
              key={disposition}
              onClick={() => setSelectedDisposition(disposition)}
              className={`w-full text-left p-3 rounded-lg transition-colors text-lg ${
                selectedDisposition === disposition
                  ? 'bg-blue-500 text-white'
                  : 'bg-zinc-700 hover:bg-zinc-600'
              }`}
            >
              {disposition}
            </button>
          ))}
        </div>
        <button
          onClick={handleSave}
          disabled={!selectedDisposition}
          className="w-full bg-blue-600 disabled:bg-zinc-600 text-white font-bold py-3 rounded-lg mt-8 transition-colors"
        >
          Save & Close
        </button>
      </div>
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default WrapUpModal;


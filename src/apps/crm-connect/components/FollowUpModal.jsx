import React, { useState } from 'react';

const FollowUpModal = ({ onSchedule, onCancel }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  const handleSchedule = () => {
    onSchedule({ date, time, notes });
  };

  return (
    <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center p-8 z-30">
      <div className="bg-zinc-800 rounded-2xl p-6 w-full max-w-sm text-white animate-fade-in-up">
        <h2 className="text-xl font-semibold text-center mb-6">Schedule Follow-up</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="follow-up-date" className="block text-sm font-medium text-gray-400 mb-1">Date</label>
            <input
              type="date"
              id="follow-up-date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-zinc-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="follow-up-time" className="block text-sm font-medium text-gray-400 mb-1">Time</label>
            <input
              type="time"
              id="follow-up-time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full bg-zinc-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="follow-up-notes" className="block text-sm font-medium text-gray-400 mb-1">Notes</label>
            <textarea
              id="follow-up-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full bg-zinc-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Add a note..."
            />
          </div>
        </div>
        <div className="mt-8 flex space-x-4">
          <button
            onClick={onCancel}
            className="w-full bg-zinc-600 text-white font-bold py-3 rounded-lg transition-colors hover:bg-zinc-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSchedule}
            disabled={!date || !time}
            className="w-full bg-blue-600 disabled:bg-zinc-600 text-white font-bold py-3 rounded-lg transition-colors"
          >
            Schedule
          </button>
        </div>
      </div>
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
        input[type="date"]::-webkit-calendar-picker-indicator {
            filter: invert(1);
        }
        input[type="time"]::-webkit-calendar-picker-indicator {
            filter: invert(1);
        }
      `}</style>
    </div>
  );
};

export default FollowUpModal;


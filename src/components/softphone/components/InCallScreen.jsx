import React, { useState } from 'react';
import { useCallTimer } from '../hooks/useCallTimer';
import { MuteIcon, KeypadIcon, SpeakerIcon, PhoneIcon } from '../../../constants/icons';

const ActionButton = ({ label, icon, isActive = false, onClick }) => (
  <div className="flex flex-col items-center space-y-4">
    <button
      onClick={onClick}
      className={`rounded-full w-16 h-16 flex items-center justify-center transition-colors focus:outline-none ${
        isActive ? 'bg-white text-black' : 'bg-zinc-800 text-white'
      }`}
    >
      {icon}
    </button>
    <span className="text-white text-lg">{label}</span>
  </div>
);

const InCallScreen = ({ number, callState, onEndCall }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const { formattedTime } = useCallTimer(callState === 'connected');

  const getStatusText = () => {
    switch (callState) {
      case 'calling':
        return 'calling...';
      case 'connected':
        return formattedTime;
      case 'ended':
      case 'wrapup':
        return 'Call Ended';
      default:
        return '';
    }
  };

  const isCallActive = callState === 'calling' || callState === 'connected';

  return (
    <div className="bg-zinc-900 text-white h-full flex flex-col justify-between p-15">
      <div className="h-1/4 flex flex-col justify-end items-center space-y-4">
        <p className="text-5xl font-light text-center leading-tight">{number}</p>
        <p className="text-gray-400 text-3xl">{getStatusText()}</p>
      </div>

      <div className="flex-grow flex items-center justify-center">
        {isCallActive && (
          <div className="grid grid-cols-3 gap-x-12 gap-y-8">
            <ActionButton 
                label="mute" 
                icon={<MuteIcon className="w-12 h-12" />} 
                isActive={isMuted}
                onClick={() => setIsMuted(!isMuted)} />
            <ActionButton 
                label="keypad" 
                icon={<KeypadIcon className="w-12 h-12" />} 
                onClick={() => alert("Keypad Toggled")} />
            <ActionButton 
                label="speaker" 
                icon={<SpeakerIcon className="w-12 h-12" />} 
                isActive={isSpeaker}
                onClick={() => setIsSpeaker(!isSpeaker)} />
          </div>
        )}
      </div>

      <div className="h-1/4 flex items-center justify-center">
        {isCallActive && (
          <button
            onClick={onEndCall}
            className="bg-red-500 text-white rounded-full w-20 h-20 flex items-center justify-center transition-colors focus:outline-none hover:bg-red-600"
          >
            <PhoneIcon className="w-14 h-14 transform rotate-[135deg]" />
          </button>
        )}
      </div>
    </div>
  );
};

export default InCallScreen;


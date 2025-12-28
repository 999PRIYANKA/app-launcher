import React, { useState } from 'react';
import DialPad from './DialPad';
import { BackspaceIcon, PhoneIcon } from '../../../constants/icons';

const DialerScreen = ({ onInitiateCall, lastDialedNumber }) => {
  const [dialedNumber, setDialedNumber] = useState('');

  const handleKeyPress = (key) => {
    setDialedNumber((prev) => prev + key);
  };

  const handleBackspace = () => {
    setDialedNumber((prev) => prev.slice(0, -1));
  };

  const handleCall = () => {
    if (dialedNumber) {
      onInitiateCall(dialedNumber);
    } else if (lastDialedNumber) {
      onInitiateCall(lastDialedNumber);
    }
  };

  return (
    <div className="h-full flex flex-col justify-between pb-12 bg-white">
      {/* Input Area */}
      <div className="h-1/3 flex flex-col justify-center items-center px-10">
        <div className="relative w-full flex justify-center">
            {dialedNumber ? (
                <span className="text-6xl font-normal text-slate-900 tracking-wider">
                    {dialedNumber}
                </span>
            ) : (
                <span className="text-5xl text-gray-300 font-light">
                    Enter number
                </span>
            )}
            
            {dialedNumber && (
                <button onClick={handleBackspace} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                    <BackspaceIcon className="w-12 h-12" />
                </button>
            )}
        </div>
      </div>

      {/* Dial Pad */}
      <div className="flex-grow flex flex-col items-center justify-start pt-8">
        <DialPad onKeyPress={handleKeyPress} />
      </div>

      {/* Call Button */}
      <div className="flex items-center justify-center pt-10">
        <button
          onClick={handleCall}
          disabled={!dialedNumber && !lastDialedNumber}
          className="bg-green-400 hover:bg-green-500 active:bg-green-600 disabled:bg-gray-200 text-white rounded-full w-28 h-28 flex items-center justify-center transition-all shadow-lg focus:outline-none transform active:scale-95"
        >
          <PhoneIcon className="w-14 h-14" />
        </button>
      </div>
    </div>
  );
};

export default DialerScreen;


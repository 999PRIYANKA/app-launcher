import React, { useState, useEffect } from 'react';
import DialPad from './DialPad';

const DialerScreen = ({ onInitiateCall, lastDialedNumber }) => {
  const [dialedNumber, setDialedNumber] = useState('');

  useEffect(() => {
    if (lastDialedNumber) {
      setDialedNumber(lastDialedNumber);
    }
  }, [lastDialedNumber]);

  const handleCall = () => {
    if (dialedNumber) {
      onInitiateCall(dialedNumber);
    } else if (lastDialedNumber) {
      onInitiateCall(lastDialedNumber);
    }
  };

  return (
    <div className="flex-1 overflow-hidden relative">
      <DialPad 
        number={dialedNumber} 
        setNumber={setDialedNumber} 
        onCall={handleCall} 
      />
    </div>
  );
};

export default DialerScreen;


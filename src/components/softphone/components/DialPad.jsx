import React from 'react';
import * as Icons from '../../../constants/icons';

const keys = [
  { number: '1', letters: '' },
  { number: '2', letters: 'ABC' },
  { number: '3', letters: 'DEF' },
  { number: '4', letters: 'GHI' },
  { number: '5', letters: 'JKL' },
  { number: '6', letters: 'MNO' },
  { number: '7', letters: 'PQRS' },
  { number: '8', letters: 'TUV' },
  { number: '9', letters: 'WXYZ' },
  { number: '*', letters: '' },
  { number: '0', letters: '+' },
  { number: '#', letters: '' },
];

const DialPad = ({ number = '', setNumber, onCall }) => {
  const handleDigit = (digit) => setNumber(prev => (prev || '') + digit);
  const handleBackspace = () => setNumber(prev => (prev || '').slice(0, -1));
  const currentNumber = number || '';

  return (
    <div className="flex flex-col h-full">
      {/* Number Display */}
      <div className="px-6 py-8 flex items-center justify-between border-b border-gray-100">
        <input 
          type="text" 
          value={currentNumber}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Enter number"
          className="w-full text-4xl font-light text-center text-gray-800 bg-transparent outline-none placeholder-gray-300"
        />
        {currentNumber.length > 0 && (
          <button onClick={handleBackspace} className="text-gray-400 hover:text-gray-600">
            <Icons.BackspaceIcon className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Grid */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-2">
        <div className="grid grid-cols-3 gap-x-14 gap-y-4">
          {keys.map((key) => (
            <button
              key={key.number}
              onClick={() => handleDigit(key.number)}
              className="flex flex-col items-center justify-center w-16 h-16 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors focus:outline-none"
            >
              <span className="text-3xl font-semibold text-gray-800">{key.number}</span>
              {key.letters && (
                <span className="text-[10px] text-gray-500 uppercase tracking-widest">
                  {key.letters}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Call Button */}
      <div className="p-4 flex justify-center">
        <button 
          onClick={onCall}
          disabled={currentNumber.length === 0}
          className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-transform active:scale-95"
        >
          <Icons.PhoneIcon className="w-8 h-8" filled />
        </button>
      </div>
    </div>
  );
};

export default DialPad;

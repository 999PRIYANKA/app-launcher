import React from 'react';

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

const DialPad = ({ onKeyPress }) => {
  return (
    <div className="grid grid-cols-3 gap-x-14 gap-y-8">
      {keys.map((key) => (
        <button
          key={key.number}
          onClick={() => onKeyPress(key.number)}
          className="w-24 h-24 rounded-full text-slate-900 hover:bg-gray-100 active:bg-gray-200 transition-colors flex flex-col items-center justify-center focus:outline-none"
        >
            <span className="text-6xl font-normal leading-none mb-1">{key.number}</span>
            {key.letters && (
                <span className="text-sm font-bold tracking-[2px] text-gray-400 leading-none mt-1">
                    {key.letters}
                </span>
            )}
        </button>
      ))}
    </div>
  );
};

export default DialPad;


import React from 'react';
import { useCRMConnect } from '../../../contexts/CRMConnectContext';

const FavoritesScreen = ({ onCall }) => {
  const { favorites } = useCRMConnect();

  // Mock data if favorites are empty
  const mockFavorites = favorites.length > 0 ? favorites : [
    { id: '1', name: 'Alice J.', number: '555-111-2222' },
    { id: '3', name: 'Charlie B.', number: '555-555-6666' },
    { id: '5', name: 'Emily D.', number: '555-999-0000' },
    { id: '7', name: 'Grace L.', number: '555-444-5555' },
    { id: '2', name: 'Bob W.', number: '555-333-4444' },
  ];

  return (
    <div className="p-8 text-white h-full bg-zinc-900">
      <h1 className="text-6xl font-bold mb-12 px-2">Favorites</h1>
      <div className="grid grid-cols-3 gap-x-10 gap-y-12 px-2">
        {mockFavorites.map(fav => (
            <div key={fav.id} className="flex flex-col items-center">
                <button 
                  onClick={() => onCall(fav.number)} 
                  className="w-28 h-28 bg-zinc-800 rounded-full flex items-center justify-center mb-4 text-5xl font-light active:bg-zinc-700 transition-colors"
                  aria-label={`Call ${fav.name}`}
                >
                    {fav.name.charAt(0)}
                </button>
                <p className="text-center text-xl font-medium">{fav.name}</p>
            </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesScreen;


import React, { useState } from 'react';
import ListingsList from '../components/listings/ListingsList';
import ListingDetailView from '../components/listings/ListingDetailView';

const ListingsPage = ({ properties = [] }) => {
  const [listings, setListings] = useState([
    {
      id: '1',
      property: '3809 Billingsley Street # a',
      price: 1800,
      listedDate: '2025-01-15',
      status: 'Active',
      headline: 'Charming Bungalow in Houston Heights',
      imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: '2',
      property: 'test Property 123',
      price: 1200,
      listedDate: '2024-12-01',
      status: 'Off-market',
      imageUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    }
  ]);
  const [selectedListing, setSelectedListing] = useState(null);

  const handleCreateListing = () => {
      const newListing = {
          id: `new-${Math.random().toString(36).substr(2, 9)}`,
          property: '',
          price: 0,
          listedDate: new Date().toISOString().split('T')[0],
          status: 'Draft',
          headline: '',
          description: '',
          imageUrl: ''
      };
      setSelectedListing(newListing);
  };

  return (
    <div className="relative h-full">
        <ListingsList 
            listings={listings} 
            onAddListingClick={handleCreateListing} 
            onSelectListing={setSelectedListing}
        />
        {selectedListing && (
            <ListingDetailView 
                listing={selectedListing}
                properties={properties}
                onBack={() => setSelectedListing(null)}
                onSave={(updatedListing) => {
                    if (updatedListing.id.startsWith('new-')) {
                        setListings([...listings, { ...updatedListing, id: Math.random().toString(36).substr(2, 9) }]);
                    } else {
                        setListings(listings.map(l => l.id === updatedListing.id ? updatedListing : l));
                    }
                    setSelectedListing(null);
                }}
            />
        )}
    </div>
  );
};

export default ListingsPage;


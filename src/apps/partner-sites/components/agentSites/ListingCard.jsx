import React from 'react';

const ListingCard = ({ listing, variant = 'minimal' }) => {
  if (!listing) return null;

  const formatPrice = (price) => {
    if (!price) return 'Price on Request';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (variant === 'minimal') {
    return (
      <div className="group bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <div className="aspect-video bg-gray-200 relative overflow-hidden">
          {listing.imageUrl ? (
            <img
              src={listing.imageUrl}
              alt={listing.address || 'Property'}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>
        <div className="p-4">
          <h4 className="font-semibold text-gray-900 mb-1 line-clamp-1">
            {listing.address || 'Address Not Available'}
          </h4>
          <p className="text-sm text-gray-600 mb-2">
            {listing.city && listing.state ? `${listing.city}, ${listing.state}` : listing.city || listing.state || 'Location TBD'}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-brand-600">
              {formatPrice(listing.price)}
            </span>
            {(listing.bedrooms || listing.bathrooms) && (
              <span className="text-sm text-gray-500">
                {listing.bedrooms || 0} bed • {listing.bathrooms || 0} bath
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Detailed variant
  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:shadow-xl transition-all">
      <div className="aspect-video bg-gray-200 relative overflow-hidden">
        {listing.imageUrl ? (
          <img
            src={listing.imageUrl}
            alt={listing.address || 'Property'}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
        {listing.status && (
          <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-gray-800">
            {listing.status}
          </span>
        )}
      </div>
      <div className="p-5">
        <h4 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">
          {listing.address || 'Address Not Available'}
        </h4>
        <p className="text-sm text-gray-600 mb-3">
          {listing.city && listing.state ? `${listing.city}, ${listing.state}` : listing.city || listing.state || 'Location TBD'}
        </p>
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-brand-600">
            {formatPrice(listing.price)}
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600 border-t border-gray-100 pt-3">
          {listing.bedrooms && (
            <span>{listing.bedrooms} bed</span>
          )}
          {listing.bathrooms && (
            <span>{listing.bathrooms} bath</span>
          )}
          {listing.squareFootage && (
            <span>{listing.squareFootage.toLocaleString()} sqft</span>
          )}
        </div>
        {listing.description && (
          <p className="text-sm text-gray-600 mt-3 line-clamp-2">
            {listing.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default ListingCard;


import React from 'react';
import { Phone, Mail, Instagram, Linkedin, ArrowLeft } from 'lucide-react';
import CustomButton from '../../../../components/common/CustomButton';
import ListingCard from './ListingCard';

const AgentTemplateA = ({ agent, listings = [], onBack }) => {
  if (!agent) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">No agent data available</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-brand-100">
      {onBack && (
        <button 
          onClick={onBack}
          className="fixed top-4 left-4 z-[100] flex items-center justify-center w-10 h-10 bg-white/90 text-gray-700 rounded-full shadow-md border border-gray-200 hover:bg-gray-100 hover:text-gray-900 hover:scale-110 transition-all"
          title="Back to Dashboard"
        >
          <ArrowLeft size={20} />
        </button>
      )}
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 ml-10 md:ml-0">
            <div className="w-10 h-10 bg-brand-600 text-white rounded-full flex items-center justify-center font-bold font-serif text-xl">
              {agent.firstName?.[0] || 'A'}
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">
                {agent.firstName || ''} {agent.lastName || ''}
              </h1>
              <p className="text-xs text-gray-500 tracking-wide uppercase">
                {agent.brokerage || 'Real Estate Professional'}
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            {agent.phone && (
              <a 
                href={`tel:${agent.phone}`} 
                className="flex items-center gap-2 text-sm font-medium hover:text-brand-600 transition-colors"
              >
                <Phone size={16} /> {agent.phone}
              </a>
            )}
            <CustomButton
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              label="Contact Me"
              variant="primary"
              size="small"
              icon={false}
              className="bg-brand-900 hover:bg-brand-800"
              style={{ backgroundColor: '#1e293b' }}
            />
          </div>
        </div>
      </header>

      {/* Hero Section - Split Layout */}
      <section className="relative overflow-hidden bg-brand-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[600px] py-12">
            <div className="order-2 lg:order-1 space-y-8">
              <div className="inline-block px-3 py-1 bg-white border border-brand-100 rounded-full text-brand-600 text-xs font-bold tracking-wider uppercase mb-2">
                Premier Agent
              </div>
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 leading-tight">
                Your Partner in <br/>
                <span className="text-brand-600">Exceptional</span> Living
              </h2>
              <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                {agent.bio || 'Dedicated real estate professional committed to helping you find your perfect home.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <CustomButton
                  onClick={() => {
                    document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  label="View Listings"
                  variant="primary"
                  size="large"
                  icon={false}
                  className="shadow-lg"
                  style={{ backgroundColor: '#2563eb', boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.2)' }}
                />
                <CustomButton
                  onClick={() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  label="Schedule Consultation"
                  variant="outline"
                  size="large"
                  icon={false}
                />
              </div>
              
              <div className="flex gap-4 pt-8 border-t border-brand-100">
                {agent.socials?.instagram && (
                  <a href={agent.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-600 transition-colors">
                    <Instagram size={20} />
                  </a>
                )}
                {agent.socials?.linkedin && (
                  <a href={agent.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-600 transition-colors">
                    <Linkedin size={20} />
                  </a>
                )}
                {agent.email && (
                  <a href={`mailto:${agent.email}`} className="text-gray-400 hover:text-brand-600 transition-colors">
                    <Mail size={20} />
                  </a>
                )}
              </div>
            </div>
            <div className="order-1 lg:order-2 relative h-full flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md aspect-[3/4]">
                <div className="absolute inset-0 bg-brand-200 rounded-2xl transform rotate-3 translate-x-2 translate-y-2"></div>
                <img 
                  src={agent.photoUrl || 'https://via.placeholder.com/400x600?text=Agent+Photo'} 
                  alt={`${agent.firstName || ''} ${agent.lastName || ''}`}
                  className="relative w-full h-full object-cover rounded-2xl shadow-2xl z-10"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x600?text=Agent+Photo';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Listings Section */}
      <section id="listings" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h3 className="text-3xl font-serif font-bold text-gray-900 mb-2">Current Listings</h3>
              <p className="text-gray-500">
                Discover properties currently represented by {agent.firstName || 'our team'}
              </p>
            </div>
            <div className="hidden md:block">
              <span className="text-brand-600 font-medium">{listings.length} Properties Available</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map(listing => (
              <ListingCard key={listing.id || Math.random()} listing={listing} variant="minimal" />
            ))}
            {listings.length === 0 && (
              <div className="col-span-full py-12 text-center text-gray-500 bg-gray-50 rounded-lg">
                No active listings found at the moment. Please contact for off-market opportunities.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Simple Contact Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h4 className="text-xl font-serif font-bold">
              {agent.firstName || ''} {agent.lastName || ''}
            </h4>
            <p className="text-gray-400 text-sm mt-1">
              {agent.title || 'Real Estate Professional'} at {agent.brokerage || 'Real Estate Agency'}
            </p>
          </div>
          <div className="flex gap-8 text-sm text-gray-300">
            {agent.phone && (
              <span className="flex items-center gap-2">
                <Phone size={16}/> {agent.phone}
              </span>
            )}
            {agent.email && (
              <span className="flex items-center gap-2">
                <Mail size={16}/> {agent.email}
              </span>
            )}
          </div>
          <p className="text-gray-500 text-xs">© 2024 OpenHouse Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AgentTemplateA;


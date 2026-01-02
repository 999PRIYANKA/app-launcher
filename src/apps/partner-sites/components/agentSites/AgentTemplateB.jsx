import React from 'react';
import { Phone, Mail, MapPin, Award, Home, Users, Star, Send, ArrowLeft } from 'lucide-react';
import CustomButton from '../../../../components/common/CustomButton';
import EditableTextInput from '../../../../components/common/EditableTextInput';
import LabeledTextarea from '../../../../components/common/LabeledTextarea';
import ListingCard from './ListingCard';

const AgentTemplateB = ({ agent, listings = [], onBack }) => {
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!agent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">No agent data available</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 font-sans">
      {onBack && (
        <button 
          onClick={onBack}
          className="fixed top-4 left-4 z-[100] flex items-center justify-center w-10 h-10 bg-white/90 text-gray-700 rounded-full shadow-md border border-gray-200 hover:bg-gray-100 hover:text-gray-900 hover:scale-110 transition-all"
          title="Back to Dashboard"
        >
          <ArrowLeft size={20} />
        </button>
      )}
      
      {/* Navigation Overlay */}
      <nav className="absolute top-0 left-0 w-full z-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="text-white ml-10 md:ml-0">
            <span className="text-2xl font-serif font-bold tracking-tight">
              {agent.brokerage || 'Real Estate Agency'}
            </span>
          </div>
          <div className="hidden md:flex gap-8 text-white/90 text-sm font-medium tracking-wide">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#listings" className="hover:text-white transition-colors">Listings</a>
            {agent.testimonials && agent.testimonials.length > 0 && (
              <a href="#testimonials" className="hover:text-white transition-colors">Stories</a>
            )}
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
          <CustomButton
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            label="Get in Touch"
            variant="primary"
            size="small"
            icon={false}
            className="bg-white text-slate-900 hover:bg-gray-100"
            style={{ backgroundColor: 'white', color: '#0f172a' }}
          />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/luxuryhome/1920/1080" 
            alt="Luxury Home Background" 
            className="w-full h-full object-cover opacity-60"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/30"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <p className="text-brand-400 font-bold tracking-[0.2em] uppercase mb-4 text-sm">
            {agent.title || 'Real Estate Professional'}
          </p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
            Curating Exceptional <br/> Real Estate Experiences
          </h1>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto font-light">
            Guiding you home with integrity, expertise, and a personal touch in the {listings?.[0]?.city || 'local'} area.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <CustomButton
              onClick={() => {
                document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' });
              }}
              label="Explore Portfolio"
              variant="primary"
              size="large"
              icon={false}
              className="bg-brand-600 hover:bg-brand-500"
              style={{ backgroundColor: '#2563eb' }}
            />
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white py-12 border-b border-gray-100 relative z-20 -mt-20 mx-4 md:mx-12 lg:mx-24 rounded-lg shadow-xl grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
        <div className="p-6 text-center">
          <Award className="w-8 h-8 text-brand-600 mx-auto mb-3" />
          <h4 className="text-3xl font-bold text-slate-900 mb-1">15+</h4>
          <p className="text-slate-500 text-sm uppercase tracking-wide">Years Experience</p>
        </div>
        <div className="p-6 text-center">
          <Home className="w-8 h-8 text-brand-600 mx-auto mb-3" />
          <h4 className="text-3xl font-bold text-slate-900 mb-1">200+</h4>
          <p className="text-slate-500 text-sm uppercase tracking-wide">Properties Sold</p>
        </div>
        <div className="p-6 text-center">
          <Users className="w-8 h-8 text-brand-600 mx-auto mb-3" />
          <h4 className="text-3xl font-bold text-slate-900 mb-1">5-Star</h4>
          <p className="text-slate-500 text-sm uppercase tracking-wide">Client Rating</p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute top-4 -left-4 w-full h-full border-2 border-brand-200 rounded-lg"></div>
            <img 
              src={agent.photoUrl || 'https://via.placeholder.com/400x600?text=Agent+Photo'} 
              alt={agent.firstName || 'Agent'} 
              className="relative w-full aspect-[3/4] object-cover rounded-lg shadow-2xl"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x600?text=Agent+Photo';
              }}
            />
          </div>
          <div>
            <h2 className="text-4xl font-serif font-bold text-slate-900 mb-6">
              Meet {agent.firstName || 'Our Agent'}
            </h2>
            <div className="w-20 h-1 bg-brand-600 mb-8"></div>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              {agent.bio || 'Dedicated real estate professional committed to excellence.'}
            </p>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Whether you are buying your first home or seeking a luxury estate, {agent.firstName || 'our team'}'s commitment to excellence ensures a smooth and successful transaction.
            </p>
            
            <div className="flex items-center gap-8 pt-4">
              {agent.brokerage && (
                <div className="opacity-50 grayscale hover:grayscale-0 transition-all">
                  <span className="text-sm font-semibold text-slate-600">{agent.brokerage}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Listings Section */}
      <section id="listings" className="py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-brand-600 font-bold tracking-widest uppercase text-xs mb-2 block">Exclusive Portfolio</span>
            <h2 className="text-4xl font-serif font-bold text-slate-900">Featured Properties</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map(listing => (
              <ListingCard key={listing.id || Math.random()} listing={listing} variant="detailed" />
            ))}
            {listings.length === 0 && (
              <div className="col-span-full py-20 text-center">
                <p className="text-gray-500 text-lg">No active listings at this time.</p>
                <CustomButton
                  onClick={() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  label="View Sold Portfolio"
                  variant="ghost"
                  size="small"
                  icon={false}
                  className="mt-4 text-brand-600 hover:underline"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {agent.testimonials && agent.testimonials.length > 0 && (
        <section id="testimonials" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-serif font-bold text-center mb-16">Client Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {agent.testimonials.map((t, index) => (
                <div key={t.id || index} className="bg-brand-50/50 p-8 rounded-xl border border-brand-50">
                  <div className="flex gap-1 text-yellow-400 mb-4">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-slate-700 italic mb-6">"{t.text || t.message || ''}"</p>
                  <p className="font-bold text-slate-900 text-sm">— {t.clientName || 'Client'}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-serif font-bold mb-6">Let's Discuss Your Real Estate Goals</h2>
            <p className="text-gray-400 text-lg mb-12">
              Ready to start your journey? Contact {agent.firstName || 'our team'} today for a confidential consultation.
            </p>
            
            <div className="space-y-6">
              {agent.phone && (
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-brand-400">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">Phone</p>
                    <p className="text-lg font-medium">{agent.phone}</p>
                  </div>
                </div>
              )}
              {agent.email && (
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-brand-400">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">Email</p>
                    <p className="text-lg font-medium">{agent.email}</p>
                  </div>
                </div>
              )}
              {agent.brokerage && (
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-brand-400">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">Office</p>
                    <p className="text-lg font-medium">{agent.brokerage} HQ</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <form className="bg-white p-8 rounded-xl text-slate-900 shadow-2xl" onSubmit={handleSubmit}>
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <EditableTextInput
                    value={formData.firstName}
                    onChange={(value) => handleChange('firstName', value)}
                    placeholder="John"
                    width="100%"
                    className="border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <EditableTextInput
                    value={formData.lastName}
                    onChange={(value) => handleChange('lastName', value)}
                    placeholder="Doe"
                    width="100%"
                    className="border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <EditableTextInput
                  value={formData.email}
                  onChange={(value) => handleChange('email', value)}
                  placeholder="john@example.com"
                  width="100%"
                  inputType="email"
                  className="border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <EditableTextInput
                  value={formData.phone}
                  onChange={(value) => handleChange('phone', value)}
                  placeholder="(555) 000-0000"
                  width="100%"
                  inputType="tel"
                  className="border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <LabeledTextarea
                  value={formData.message}
                  onChange={(value) => handleChange('message', value)}
                  placeholder="I am interested in..."
                  label="Message"
                  minHeight="120px"
                />
              </div>
              <CustomButton
                type="submit"
                onClick={handleSubmit}
                label="Send Message"
                variant="primary"
                size="large"
                iconComponent={<Send size={18} />}
                className="w-full bg-brand-600 hover:bg-brand-700"
                style={{ backgroundColor: '#2563eb' }}
              />
            </div>
          </form>
        </div>
      </section>
      
      <footer className="bg-black text-white py-8 border-t border-white/10 text-center">
        <p className="text-gray-500 text-sm">Powered by OpenHouse IDX Platform</p>
      </footer>
    </div>
  );
};

export default AgentTemplateB;


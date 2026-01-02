import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Home, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Wrench, 
  Banknote, 
  CalendarDays,
  Menu,
  X,
  ArrowLeft,
  Mail
} from 'lucide-react';
import CustomButton from '../../../components/common/CustomButton';
import EditableTextInput from '../../../components/common/EditableTextInput';
import LabeledTextarea from '../../../components/common/LabeledTextarea';
import Dropdown from '../../../components/common/Dropdown';

// Default office data
const DEFAULT_OFFICE = {
  id: 'default',
  displayName: 'HarborHomes',
  brandLine1: 'Harbor',
  brandLine2: 'Homes',
  serviceAreaLabel: 'Metro Area',
  cityStateLabel: 'San Diego, CA',
  phone: '(555) 123-4567',
  email: 'offers@harborhomes.com',
};



// --- Subcomponents ---
const NavBar = ({ office }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Who We Help', href: '#who-we-help' },
    { name: 'About', href: '#about' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 ml-10 md:ml-0">
            <Home className="h-8 w-8 text-emerald-700" />
            <div>
              <span className="block text-xl font-serif font-bold text-gray-900 leading-none">{office.brandLine1}</span>
              <span className="block text-xs font-sans font-bold text-emerald-700 tracking-widest uppercase">{office.brandLine2}</span>
            </div>
          </div>
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-gray-600 hover:text-emerald-700 font-medium text-sm transition-colors"
              >
                {link.name}
              </a>
            ))}
            <CustomButton
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              label="Get My Offer"
              variant="primary"
              size="small"
              icon={false}
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors shadow-lg"
              style={{ boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.2)' }}
            />
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <CustomButton
              onClick={() => setIsOpen(!isOpen)}
              label=""
              variant="ghost"
              size="small"
              iconComponent={isOpen ? <X size={24} /> : <Menu size={24} />}
              className="text-gray-600"
            />
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-md"
              >
                {link.name}
              </a>
            ))}
            <CustomButton
              onClick={() => {
                setIsOpen(false);
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              label="Get My Free Offer"
              variant="primary"
              size="medium"
              icon={false}
              className="block mt-4 text-center bg-emerald-700 text-white px-3 py-3 rounded-md font-bold w-full"
            />
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = ({ office }) => {
  return (
    <section className="relative bg-emerald-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <img 
          src="https://www.transparenttextures.com/patterns/cubes.png" 
          alt="pattern" 
          className="w-full h-full object-cover" 
        />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800 text-emerald-100 text-xs font-bold tracking-wider uppercase border border-emerald-700">
              <MapPin size={12} /> {office.serviceAreaLabel}
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
              A Simple, Fair Way to <br/>
              <span className="text-amber-400">Sell Your Home</span> in {office.cityStateLabel.split(',')[0]}.
            </h1>
            <p className="text-lg text-emerald-100 max-w-lg leading-relaxed">
              We buy houses in any condition. No repairs, no cleaning, and no agent fees. 
              Take control of your timeline and sell on your terms.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <CustomButton
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                label="Get My Free Offer"
                variant="primary"
                size="large"
                icon={false}
                className="inline-flex justify-center items-center px-8 py-4 bg-amber-500 text-emerald-950 rounded-lg font-bold text-lg hover:bg-amber-400 transition-colors"
              />
              <CustomButton
                onClick={() => {
                  document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
                }}
                label="How It Works"
                variant="outline"
                size="large"
                icon={false}
                className="inline-flex justify-center items-center px-8 py-4 bg-transparent border border-emerald-700 text-white rounded-lg font-bold text-lg hover:bg-emerald-800 transition-colors"
              />
            </div>
            {/* Trust Bar */}
            <div className="pt-8 border-t border-emerald-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-emerald-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-amber-400" />
                <span>No repairs needed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-amber-400" />
                <span>Close in 7-21 days</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-amber-400" />
                <span>No obligation</span>
              </div>
            </div>
          </div>
          <div className="relative hidden lg:block">
             <div className="absolute -inset-4 bg-amber-500/20 rounded-2xl transform rotate-3 blur-lg"></div>
             <img 
               src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
               alt="Modern Home" 
               className="relative rounded-2xl shadow-2xl border-4 border-emerald-800/50"
             />
             <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-xl max-w-xs">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-100 rounded-full text-green-600">
                    <Banknote size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Recent Offer</p>
                    <p className="font-bold text-gray-900">Accepted in Area</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">"Closed in 14 days without fixing a single thing. Thank you {office.brandLine1}!"</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      icon: <Phone className="w-8 h-8 text-emerald-700" />,
      title: "1. Tell us about your home",
      desc: "Fill out the form below or give us a quick call. We'll ask a few simple questions about the property's condition."
    },
    {
      icon: <CheckCircle2 className="w-8 h-8 text-emerald-700" />,
      title: "2. Get a fair offer",
      desc: "We analyze the market and property condition to provide a no-obligation cash offer. Take your time to review it."
    },
    {
      icon: <CalendarDays className="w-8 h-8 text-emerald-700" />,
      title: "3. Choose your closing date",
      desc: "If you accept, we handle all the paperwork and close on the day that works best for you. Cash in hand."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Selling Simplified</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Skip the staging, showings, and uncertainty of the traditional market.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-emerald-100 transition-colors">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.desc}</p>
              
              {/* Connector Line (Desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gray-100 -z-10"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhoWeHelp= ({ office }) => {
  const scenarios = [
    {
      icon: <Wrench size={24} />,
      title: "Houses Needing Repairs",
      desc: "Foundation issues, roof leaks, or outdated interiors? We buy as-is so you don't spend a dime on contractors."
    },
    {
      icon: <Clock size={24} />,
      title: "Inherited Properties",
      desc: "Navigating probate can be stressful. We help you turn an unwanted inherited property into cash quickly."
    },
    {
      icon: <Banknote size={24} />,
      title: "Financial Distress",
      desc: "Behind on payments or facing foreclosure? A quick sale can help save your credit and provide a fresh start."
    },
    {
      icon: <Home size={24} />,
      title: "Tired Landlords",
      desc: "Done dealing with bad tenants, late rent, and midnight maintenance calls? We take over the headaches."
    }
  ];

  return (
    <section id="who-we-help" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-emerald-700 font-bold tracking-wider uppercase text-sm">Who We Help</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mt-2 mb-6">
              Solutions for Any Situation
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Life happens. Whether you are relocating, downsizing, or dealing with a difficult property, 
              {office.displayName} provides a respectful and private way to move forward.
            </p>
            <a href="#contact" className="text-emerald-700 font-bold flex items-center gap-2 hover:gap-3 transition-all">
              See if we can help you <ArrowRight size={20} />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {scenarios.map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-amber-500 mb-4">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutCompany= ({ office }) => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-900 rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-10 md:p-16 flex flex-col justify-center">
              <h2 className="text-3xl font-serif font-bold text-white mb-6">
                Local Home Buyers You Can Actually Talk To
              </h2>
              <div className="space-y-4 text-emerald-100 text-lg leading-relaxed">
                <p>
                  We aren't a faceless algorithm or a national call center. We are a local team focused right here in {office.cityStateLabel.split(',')[0]}.
                </p>
                <p>
                  At {office.displayName}, we believe in honesty, transparency, and treating every homeowner with dignity. 
                  Our goal isn't just to buy your house—it's to find the best solution for your unique situation, even if that means we recommend a realtor instead.
                </p>
              </div>
              <div className="mt-8 pt-8 border-t border-emerald-800">
                <p className="font-serif font-bold text-white text-xl">The {office.brandLine1} Promise</p>
                <p className="text-emerald-200 mt-2">No pressure. No fees. Just honest answers.</p>
              </div>
            </div>
            <div className="relative h-64 lg:h-auto">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Keys being handed over" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-emerald-900/20"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    {
      name: "Brenda T.",
      loc: "Homeowner in Katy, TX",
      quote: "I was skeptical at first, but the team was incredibly professional. They gave me a fair price and I didn't have to clean out the garage which was packed with years of stuff. A huge relief."
    },
    {
      name: "Marcus L.",
      loc: "Homeowner in Pearland, TX",
      quote: "Fast, easy, and exactly as promised. I needed to move for a new job and couldn't wait months for a buyer. We closed in 10 days."
    },
    {
      name: "Sarah & Jim",
      loc: "Homeowners in The Heights",
      quote: "Inheriting a house that needed a lot of work was overwhelming. Magnolia City Home Buyers walked us through the probate process and made it simple."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-serif font-bold text-gray-900 text-center mb-12">What Our Neighbors Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="flex text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
              </div>
              <p className="text-gray-600 italic mb-6">"{r.quote}"</p>
              <div>
                <p className="font-bold text-gray-900">{r.name}</p>
                <p className="text-xs text-gray-500 uppercase">{r.loc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "Do I have to make any repairs?",
      a: "Absolutely not. We buy houses 'as-is'. That means you don't need to paint, fix the roof, repair the foundation, or even clean the floors. We handle all of that after closing."
    },
    {
      q: "How fast can you close?",
      a: "We can typically close in as little as 7 days if your title is clear. However, we are flexible—if you need 30, 60, or even 90 days to move out, we can work around your schedule."
    },
    {
      q: "Are there any fees or commissions?",
      a: "None. Unlike a traditional sale where you pay 6% in agent commissions plus closing costs, we pay all standard closing costs and charge zero commissions. The offer price is what you get."
    },
    {
      q: "Am I obligated to accept your offer?",
      a: "No. Our offers are 100% free and come with zero obligation. You can review our number, shop it around, or simply say no. We believe in a low-pressure approach."
    },
    {
      q: "What types of properties do you buy?",
      a: "We buy single-family homes, duplexes, townhomes, and small multi-family properties. We buy in any condition, whether it's brand new or needs a total renovation."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-serif font-bold text-gray-900 text-center mb-12">Common Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex justify-between items-center p-5 bg-white hover:bg-gray-50 transition-colors text-left"
              >
                <span className="font-semibold text-gray-900">{faq.q}</span>
                {openIndex === idx ? <ChevronUp size={20} className="text-emerald-600" /> : <ChevronDown size={20} className="text-gray-400" />}
              </button>
              {openIndex === idx && (
                <div className="p-5 bg-gray-50 border-t border-gray-200 text-gray-600 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection= ({ office }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    propertyType: 'House',
    reason: '',
    timeline: 'ASAP'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setSubmitted(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 bg-emerald-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold mb-4">Get Your Free Cash Offer</h2>
          <p className="text-emerald-100 text-lg">
            Fill out the form below to get started. It's confidential and there is no obligation.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 text-gray-900">
          {submitted ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                <CheckCircle2 size={48} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Message Received!</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Thank you, {formData.name}. A team member from {office.displayName} will review your property details and reach out to you shortly at {formData.phone}.
              </p>
              <CustomButton
                onClick={() => setSubmitted(false)}
                label="Send another inquiry"
                variant="ghost"
                size="medium"
                icon={false}
                className="mt-8 text-emerald-700 font-semibold hover:underline"
              />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <EditableTextInput
                    value={formData.name}
                    onChange={(value) => {
                      const syntheticEvent = { target: { name: "name", value } };
                      handleChange(syntheticEvent);
                    }}
                    placeholder="John Smith"
                    width="100%"
                    className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                  <EditableTextInput
                    value={formData.phone}
                    onChange={(value) => {
                      const syntheticEvent = { target: { name: "phone", value } };
                      handleChange(syntheticEvent);
                    }}
                    placeholder="(713) 555-0123"
                    width="100%"
                    inputType="tel"
                    className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                  <EditableTextInput
                    value={formData.email}
                    onChange={(value) => {
                      const syntheticEvent = { target: { name: "email", value } };
                      handleChange(syntheticEvent);
                    }}
                    placeholder="john@example.com"
                    width="100%"
                    inputType="email"
                    className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Property Address *</label>
                  <EditableTextInput
                    value={formData.address}
                    onChange={(value) => {
                      const syntheticEvent = { target: { name: "address", value } };
                      handleChange(syntheticEvent);
                    }}
                    placeholder={`123 Main St, ${office.cityStateLabel}`}
                    width="100%"
                    className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Property Type</label>
                  <Dropdown
                    value={formData.propertyType}
                    onChange={(value) => {
                      const syntheticEvent = { target: { name: "propertyType", value } };
                      handleChange(syntheticEvent);
                    }}
                    options={[
                      { value: 'House', label: 'Single Family House' },
                      { value: 'Condo', label: 'Condo / Townhome' },
                      { value: 'Duplex', label: 'Duplex / Multi-Family' },
                      { value: 'Land', label: 'Land' },
                      { value: 'Mobile', label: 'Mobile Home' },
                    ]}
                    width="100%"
                    className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Ideal Timeline</label>
                  <Dropdown
                    value={formData.timeline}
                    onChange={(value) => {
                      const syntheticEvent = { target: { name: "timeline", value } };
                      handleChange(syntheticEvent);
                    }}
                    options={[
                      { value: 'ASAP', label: 'ASAP (7-14 Days)' },
                      { value: '30-60', label: '30-60 Days' },
                      { value: '60-90', label: '60-90 Days' },
                      { value: 'Exploring', label: 'Just exploring options' },
                    ]}
                    width="100%"
                    className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Reason for Selling (Optional)</label>
                <LabeledTextarea
                  value={formData.reason}
                  onChange={(value) => {
                    const syntheticEvent = { target: { name: "reason", value } };
                    handleChange(syntheticEvent);
                  }}
                  placeholder="Tell us a bit about your situation..."
                  rows={3}
                  width="100%"
                  className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                />
              </div>
              <CustomButton
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit(e);
                }}
                label="Get My Fair Cash Offer"
                variant="primary"
                size="large"
                icon={false}
                className="w-full bg-amber-500 text-emerald-950 font-bold text-lg py-4 rounded-lg hover:bg-amber-400 transform hover:-translate-y-0.5 transition-all shadow-lg"
              />
              <p className="text-xs text-center text-gray-500 mt-4">
                By submitting this form, you agree to receive a call or text from {office.displayName} regarding your property. Your info is private.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const Footer = ({ office }) => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4 text-white">
              <Home className="h-6 w-6" />
              <span className="font-serif font-bold text-lg">{office.displayName}</span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              We provide win-win solutions to help homeowners get out of their sticky situations… like foreclosure, owning a burdensome property, probate, or anything else.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#how-it-works" className="hover:text-emerald-500">How It Works</a></li>
              <li><a href="#about" className="hover:text-emerald-500">Our Company</a></li>
              <li><a href="#faq" className="hover:text-emerald-500">FAQ</a></li>
              <li><a href="#contact" className="hover:text-emerald-500">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>{office.cityStateLabel}</li>
              <li>{office.phone}</li>
              <li>{office.email}</li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-800 text-xs text-center md:text-left flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} {office.displayName}. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Use</a>
          </div>
        </div>
        <p className="text-[10px] text-gray-600 mt-8 text-center">
          Disclaimer: We are professional home buyers. We are not providing legal, financial, or real estate agency advice. Please consult a professional if you need specific advice.
        </p>
      </div>
    </footer>
  );
};

// --- Main Page Component ---
const PartnerSite = ({ office = DEFAULT_OFFICE }) => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-emerald-100 selection:text-emerald-900">
      <button
        onClick={() => window.history.back()}
        className="fixed top-4 left-4 z-[100] flex items-center justify-center w-10 h-10 bg-white/90 text-gray-700 rounded-full shadow-md border border-gray-200 hover:bg-gray-100 hover:text-gray-900 hover:scale-110 transition-all"
        title="Back to Dashboard"
      >
        <ArrowLeft size={20} />
      </button>

      <NavBar office={office} />
      <Hero office={office} />
      <HowItWorks />
      <WhoWeHelp office={office} />
      <AboutCompany office={office} />
      <Testimonials />
      <FAQ />
      <ContactSection office={office} />
      <Footer office={office} />
    </div>
  );
};

const PartnerOriginal = PartnerSite;
export default PartnerOriginal;


import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  Home,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Star,
  Calendar,
  DollarSign,
  ShieldCheck,
  User,
  Menu,
  X,
  Building,
  ArrowDownCircle,
  Palette,
  ArrowLeft,
  Zap,
  Award,
  TrendingUp,
  Send,
  Briefcase,
  Lock,
  Search,
  Heart,
  ThumbsUp,
  HelpCircle,
  AlertTriangle,
  Timer,
  MousePointer2,
} from 'lucide-react';
import CustomButton from '../../../components/common/CustomButton';
import EditableTextInput from '../../../components/common/EditableTextInput';







// Shared Office shape (no TS types, just a JS object contract)
const DEFAULT_OFFICE = {
  id: "default",
  displayName: "HarborHomes",
  brandLine1: "Harbor",
  brandLine2: "Homes",
  serviceAreaLabel: "Metro Area",
  cityStateLabel: "San Diego, CA",
  phone: "(555) 123-4567",
  email: "offers@harborhomes.com",
};

const SITE_CONTENT = {
  hero: {
    title: "Sell Your House The Easy Way",
    subtitle:
      "We buy houses in any condition. No repairs, no commissions, no fees. Just a fair cash offer on your timeline.",
    cta: "Get My Cash Offer",
  },
  steps: [
    {
      title: "Contact Us",
      desc: "Fill out our simple form or give us a call. It takes less than 5 minutes.",
    },
    {
      title: "Get Your Offer",
      desc: "We'll review your property and give you a fair, no-obligation cash offer.",
    },
    {
      title: "Close & Get Paid",
      desc: "Accept the offer and we close at a local title company on the date of your choice.",
    },
  ],
  benefits: [
    {
      title: "No Repairs Needed",
      desc: "We buy as-is. Leave the junk and the repairs to us.",
    },
    {
      title: "Zero Commissions",
      desc: "Skip the 6% agent fees. We pay all closing costs too.",
    },
    {
      title: "Fast Closing",
      desc: "We can close in as little as 7 days, or whenever you are ready.",
    },
  ],
  testimonials: [
    {
      name: "James Peterson",
      location: "Homeowner",
      text: "I was facing foreclosure and needed to sell fast. They made me an offer the same day and we closed two weeks later. Lifesavers!",
    },
    {
      name: "Sarah Jenkins",
      location: "Inherited Property",
      text: "The process was incredibly smooth. I didn't have to clean out the house or fix anything. Highly recommended.",
    },
    {
      name: "Mike Ross",
      location: "Relocating",
      text: "Fair price and professional service. It was exactly what I needed to move on to my new job quickly.",
    },
  ],
  faq: [
    {
      q: "Do I really not have to make repairs?",
      a: "Correct. We buy houses in their current condition. You don't need to paint, clean, or fix anything.",
    },
    {
      q: "Is there any obligation?",
      a: "None at all. Our offers are 100% free. You can accept it or reject it, no hard feelings.",
    },
    {
      q: "How fast can you close?",
      a: "Typically we can close in 7-14 days, but we can also wait 60 days if you need time to move.",
    },
  ],
};

// Theme config used by variants and wizard
export const PRESET_THEMES = [
  { name: "Slate", primary: "slate", neutral: "slate", color: "#64748b" },
  { name: "Red", primary: "red", neutral: "stone", color: "#ef4444" },
  { name: "Orange", primary: "orange", neutral: "stone", color: "#f97316" },
  { name: "Amber", primary: "amber", neutral: "stone", color: "#f59e0b" },
  { name: "Yellow", primary: "yellow", neutral: "stone", color: "#eab308" },
  { name: "Lime", primary: "lime", neutral: "stone", color: "#84cc16" },
  { name: "Green", primary: "green", neutral: "gray", color: "#22c55e" },
  { name: "Emerald", primary: "emerald", neutral: "zinc", color: "#10b981" },
  { name: "Teal", primary: "teal", neutral: "slate", color: "#14b8a6" },
  { name: "Cyan", primary: "cyan", neutral: "slate", color: "#06b6d4" },
  { name: "Sky", primary: "sky", neutral: "slate", color: "#0ea5e9" },
  { name: "Blue", primary: "blue", neutral: "slate", color: "#3b82f6" },
  { name: "Indigo", primary: "indigo", neutral: "slate", color: "#6366f1" },
  { name: "Violet", primary: "violet", neutral: "gray", color: "#8b5cf6" },
  { name: "Purple", primary: "purple", neutral: "gray", color: "#a855f7" },
  { name: "Fuchsia", primary: "fuchsia", neutral: "slate", color: "#d946ef" },
  { name: "Pink", primary: "pink", neutral: "stone", color: "#ec4899" },
  { name: "Rose", primary: "rose", neutral: "stone", color: "#f43f5e" },
];

// Helper function to convert hex to rgba with opacity
const hexToRgba = (hex, opacity = 1) => {
  if (!hex || !hex.startsWith('#')) return hex;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// Simple local lead-form state used by many variants
const useLeadForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', phone: '', address: '' });
  };

  return { formData, submitted, handleChange, handleSubmit };
};

// Floating theme switcher used in demo variants (hidden in wizard preview)
const ThemeSwitcher = ({ themes, current, onSet }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 transition-all duration-300">
      <CustomButton
        onClick={() => setIsOpen(!isOpen)}
        label=""
        variant="outline"
        size="large"
        iconComponent={isOpen ? <X size={24} /> : <AlertTriangle size={24} />}
        className="absolute bottom-0 right-0 flex h-14 w-14 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-800 shadow-2xl hover:scale-105 transition-transform z-20"
        style={{
          borderRadius: "50%",
          width: "3.5rem",
          height: "3.5rem",
          padding: 0,
        }}
      />

      <div
        className={`absolute bottom-16 right-0 w-64 origin-bottom-right rounded-2xl border border-gray-200 bg-white/95 p-4 shadow-2xl backdrop-blur-md transition-all duration-300 ${
          isOpen
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-75 opacity-0 pointer-events-none"
        }`}
      >
        <div className="mb-3 border-b border-gray-100 pb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
          Select Color Scheme
        </div>
        <div className="grid grid-cols-5 gap-2">
          {themes.map((t) => (
            <button
              key={t.name}
              type="button"
              onClick={() => onSet(t)}
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all ${
                current.name === t.name
                  ? "scale-110 border-gray-900 shadow-sm"
                  : "border-gray-100 hover:scale-110"
              }`}
              style={{ backgroundColor: t.color }}
              title={t.name}
            >
              {current.name === t.name && (
                <CheckCircle2 size={14} className="text-white mix-blend-difference" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Back-to-dashboard button (hidden in wizard preview)
const DemoBackButton = () => (
  <button
    onClick={() => window.history.back()}
    className="fixed left-4 top-4 z-[100] flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-gray-700 shadow-md transition-all hover:scale-110 hover:bg-gray-100 hover:text-gray-900"
  >
    <ArrowLeft size={20} />
  </button>
);

// All partner variants share these props
// office: office-specific branding, customTheme: theme override, hideControls: hide floating demo UI

export const PartnerSiteVariantOne = ({ office, customTheme, hideControls }) => {
  const { formData, submitted, handleChange, handleSubmit } = useLeadForm();
  const [localTheme, setLocalTheme] = useState(
    PRESET_THEMES.find((t) => t.name === "Blue") || PRESET_THEMES[0]
  );

  const theme = customTheme || localTheme;
  const data = office || DEFAULT_OFFICE;

  return (
    <div className="min-h-screen bg-white font-sans text-gray-600" style={{ minHeight: hideControls ? "auto" : "100vh", width: "100%" }}>
      {!hideControls && <DemoBackButton />}
      {!hideControls && (
        <ThemeSwitcher themes={PRESET_THEMES} current={theme} onSet={setLocalTheme} />
      )}

      <nav className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="ml-10 flex items-center gap-2 text-2xl font-bold md:ml-0" style={{ color: theme.color }}>
            <Home className="fill-current" /> {data.displayName}
          </div>
          <div className="hidden gap-6 text-sm font-medium md:flex">
            <a href="#process" className="text-gray-600 hover:text-gray-900 transition-colors">How it Works</a>
            <a href="#reviews" className="text-gray-600 hover:text-gray-900 transition-colors">Reviews</a>
            <a href="#contact" style={{ color: theme.color }} className="font-semibold hover:opacity-80 transition-opacity">
              Get Offer
            </a>
          </div>
        </div>
      </nav>

      <section className="px-4 py-20 text-center md:py-32 bg-gray-50">
        <div className="mx-auto max-w-5xl">
          <h1 
            className="mb-6 font-black tracking-tight text-gray-900"
            style={{
              fontSize: 'clamp(1.75rem, 5vw, 4rem)',
              fontWeight: 900,
              lineHeight: '1.1',
              textAlign: 'center',
            }}
          >
            {SITE_CONTENT.hero.title} in {data.cityStateLabel}
          </h1>
          <p 
            className="mb-10 text-xl text-gray-600 leading-relaxed"
            style={{ 
              textAlign: 'center',
              maxWidth: '42rem',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            {SITE_CONTENT.hero.subtitle}
          </p>
          <CustomButton
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            label={SITE_CONTENT.hero.cta}
            variant="primary"
            size="large"
            icon={false}
            className="inline-flex items-center justify-center rounded-full px-8 py-4 text-lg font-bold shadow-lg transition-all hover:shadow-xl"
            style={{
              backgroundColor: theme.color,
              boxShadow: `0 10px 15px -3px ${hexToRgba(theme.color, 0.25)}`,
            }}
          />
        </div>
      </section>

      <section id="process" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 text-center md:grid-cols-3">
          {SITE_CONTENT.steps.map((s, i) => (
            <div key={s.title} className="p-6">
              <div
                className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold"
                style={{
                  backgroundColor: hexToRgba(theme.color, 0.1),
                  color: theme.color,
                }}
              >
                {i + 1}
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">{s.title}</h3>
              <p className="text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-900 py-20 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:px-8 md:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold">
              Why Choose {data.brandLine1}?
            </h2>
            <div className="space-y-6">
              {SITE_CONTENT.benefits.map((b) => (
                <div key={b.title} className="flex gap-4">
                  <CheckCircle2 className="shrink-0" size={24} style={{ color: hexToRgba(theme.color, 0.8) }} />
                  <div>
                    <h4 className="font-bold text-lg mb-1">{b.title}</h4>
                    <p className="text-sm text-gray-400">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            id="contact"
            className="rounded-2xl border border-gray-700 bg-gray-800 p-8"
          >
            <h3 className="mb-6 text-xl font-bold">Request Your Offer</h3>
            {submitted ? (
              <div className="py-12 text-center font-bold text-green-400">
                Sent! We'll be in touch.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <EditableTextInput
                  value={formData.name || ""}
                  onChange={(value) => {
                    const syntheticEvent = { target: { name: "name", value } };
                    handleChange(syntheticEvent);
                  }}
                  placeholder="Full Name"
                  width="100%"
                  className="rounded border bg-gray-900 border-gray-700 p-3 text-white"
                />
                <EditableTextInput
                  value={formData.address || ""}
                  onChange={(value) => {
                    const syntheticEvent = { target: { name: "address", value } };
                    handleChange(syntheticEvent);
                  }}
                  placeholder="Property Address"
                  width="100%"
                  className="rounded border bg-gray-900 border-gray-700 p-3 text-white"
                />
                <EditableTextInput
                  value={formData.email || ""}
                  onChange={(value) => {
                    const syntheticEvent = { target: { name: "email", value } };
                    handleChange(syntheticEvent);
                  }}
                  placeholder="Email Address"
                  width="100%"
                  inputType="email"
                  className="rounded border bg-gray-900 border-gray-700 p-3 text-white"
                />
                <EditableTextInput
                  value={formData.phone || ""}
                  onChange={(value) => {
                    const syntheticEvent = { target: { name: "phone", value } };
                    handleChange(syntheticEvent);
                  }}
                  placeholder="Phone Number"
                  width="100%"
                  className="rounded border bg-gray-900 border-gray-700 p-3 text-white"
                />
                <CustomButton
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
                  }}
                  label="Get Cash Offer"
                  variant="primary"
                  size="medium"
                  icon={false}
                  className="w-full"
                  style={{
                    backgroundColor: theme.color,
                  }}
                />
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t py-12 text-center text-sm text-gray-400 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <p className="mb-2">© {new Date().getFullYear()} {data.displayName}. All rights reserved.</p>
          <p className="text-gray-500">
            {data.phone} • {data.email}
          </p>
        </div>
      </footer>
    </div>
  );
};

export const PartnerSiteVariantTwo = ({ office, customTheme, hideControls }) => {
  const { formData, submitted, handleChange, handleSubmit } = useLeadForm();
  const [localTheme, setLocalTheme] = useState(
    PRESET_THEMES.find((t) => t.name === "Orange") || PRESET_THEMES[0]
  );

  const theme = customTheme || localTheme;
  const data = office || DEFAULT_OFFICE;

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800" style={{ minHeight: hideControls ? "auto" : "100vh", width: "100%" }}>
      {!hideControls && <DemoBackButton />}
      {!hideControls && (
        <ThemeSwitcher themes={PRESET_THEMES} current={theme} onSet={setLocalTheme} />
      )}
      <div className="grid min-h-screen lg:grid-cols-2" style={{ minHeight: hideControls ? "auto" : undefined }}>
        <div className="order-2 flex flex-col justify-center p-8 lg:order-1 lg:p-20">
          <div
            className="mb-8 flex items-center gap-2 text-2xl font-bold ml-10 lg:ml-0"
            style={{ color: theme.color }}
          >
            <Zap size={28} /> {data.brandLine1.toUpperCase()}
            <span className="text-gray-900">{data.brandLine2.toUpperCase()}</span>
          </div>
          <h1 
            className="mb-6 font-black leading-none"
            style={{
              fontSize: 'clamp(1.75rem, 5vw, 4rem)',
              fontWeight: 900,
              lineHeight: '1.1',
            }}
          >
            SELL FAST.
            <br />
            <span style={{ color: hexToRgba(theme.color, 0.8) }}>GET PAID.</span>
          </h1>
          <p 
            className="mb-10 w-full text-xl text-gray-500 leading-relaxed"
            style={{ textAlign: 'left' }}
          >
            {SITE_CONTENT.hero.subtitle}
          </p>

          <div
            id="contact"
            className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-8"
          >
            <h3 className="mb-4 text-xl font-bold">Get A Fair Offer Today</h3>
            {submitted ? (
              <div className="font-bold" style={{ color: theme.color }}>Request Received!</div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <EditableTextInput
                  value={formData.address || ""}
                  onChange={(value) => {
                    const syntheticEvent = { target: { name: "address", value } };
                    handleChange(syntheticEvent);
                  }}
                  placeholder="Enter Property Address..."
                  width="100%"
                  className="rounded-xl border p-4 font-medium"
                />
                <div className="grid grid-cols-2 gap-4">
                  <EditableTextInput
                    value={formData.name || ""}
                    onChange={(value) => {
                      const syntheticEvent = { target: { name: "name", value } };
                      handleChange(syntheticEvent);
                    }}
                    placeholder="Name"
                    width="100%"
                    className="rounded-xl border p-4 font-medium"
                  />
                  <EditableTextInput
                    value={formData.phone || ""}
                    onChange={(value) => {
                      const syntheticEvent = { target: { name: "phone", value } };
                      handleChange(syntheticEvent);
                    }}
                    placeholder="Phone"
                    width="100%"
                    className="rounded-xl border p-4 font-medium"
                  />
                </div>
                <CustomButton
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
                  }}
                  label="GET CASH OFFER"
                  variant="primary"
                  size="large"
                  icon={false}
                  className="w-full rounded-xl py-4 text-xl font-black shadow-xl transition-transform active:scale-95"
                  style={{ backgroundColor: theme.color }}
                />
              </form>
            )}
          </div>
        </div>
        <div className="relative order-1 h-64 bg-gray-100 lg:order-2 lg:h-auto">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80"
            className="absolute inset-0 h-full w-full object-cover"
            alt="House"
          />
          <div className="absolute inset-0 mix-blend-overlay" style={{ backgroundColor: hexToRgba(theme.color, 0.2) }} />
        </div>
      </div>

      <section className="bg-gray-900 py-20 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-3">
          {SITE_CONTENT.benefits.map((b) => (
            <div key={b.title} className="flex flex-col items-center p-6 text-center">
              <div
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-800"
                style={{ color: theme.color }}
              >
                <CheckCircle2 size={32} />
              </div>
              <h3 className="mb-2 text-xl font-bold">{b.title}</h3>
              <p className="text-gray-400">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="mb-12 text-center text-2xl font-black uppercase tracking-wide">
          Recent Deals in {data.serviceAreaLabel}
        </h2>
        <div className="space-y-6">
          {SITE_CONTENT.testimonials.map((t) => (
            <div
              key={t.name}
              className="flex items-start gap-4 border-b border-gray-100 p-6"
            >
              <div
                className="rounded p-3 text-xl font-bold"
                style={{
                  backgroundColor: hexToRgba(theme.color, 0.1),
                  color: theme.color,
                }}
              >
                "
              </div>
              <div>
                <p className="mb-2 text-lg font-medium">{t.text}</p>
                <p className="text-sm font-bold uppercase text-gray-500">
                  - {t.name}, {t.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-gray-50 py-12 text-center text-xs font-bold uppercase tracking-widest text-gray-400">
        © {new Date().getFullYear()} {data.displayName} | {data.phone}
      </footer>
    </div>
  );
};

export const PartnerSiteVariantThree = ({ office, customTheme, hideControls }) => {
  const { formData, submitted, handleChange, handleSubmit } = useLeadForm();
  const [localTheme, setLocalTheme] = useState(
    PRESET_THEMES.find((t) => t.name === "Emerald") || PRESET_THEMES[0]
  );

  const theme = customTheme || localTheme;
  const { primary: p, neutral: n } = theme;
  const data = office || DEFAULT_OFFICE;

  return (
    <div className={`min-h-screen bg-${n}-50 font-serif text-${n}-800`} style={{ minHeight: hideControls ? "auto" : undefined }}>
      {!hideControls && <DemoBackButton />}
      {!hideControls && (
        <ThemeSwitcher themes={PRESET_THEMES} current={theme} onSet={setLocalTheme} />
      )}

      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
          <div
            className={`ml-10 flex items-center gap-2 text-2xl font-bold text-${p}-800 md:ml-0`}
          >
            <Building /> {data.brandLine1}
            <span className="text-gray-400">{data.brandLine2}</span>
          </div>
          <a
            href="#contact"
            className={`hidden rounded bg-${p}-800 px-6 py-2 font-sans text-sm font-bold tracking-wide text-white hover:bg-${p}-700 md:block`}
          >
            REQUEST CONSULTATION
          </a>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-12 md:py-20 lg:grid-cols-12">
        <div className="flex flex-col justify-center lg:col-span-7">
          <div
            className={`mb-6 inline-block w-max rounded-full bg-${p}-100 px-4 py-1 font-sans text-xs font-bold uppercase tracking-wider text-${p}-800`}
          >
            Trusted by 500+ Local Families
          </div>
          <h1 
            className="mb-6 font-black leading-tight text-gray-900"
            style={{
              fontSize: 'clamp(1.75rem, 5vw, 4rem)',
              fontWeight: 900,
              lineHeight: '1.1',
            }}
          >
            The Dignified Way to Sell Your Home.
          </h1>
          <p 
            className="mb-8 w-full font-sans text-xl leading-relaxed text-gray-600"
            style={{ textAlign: 'left' }}
          >
            {data.displayName} provides bespoke property solutions for homeowners who
            value privacy, speed, and convenience.
          </p>
          <div className="flex gap-4 font-sans">
            <a
              href="#contact"
              className={`rounded bg-${p}-700 px-8 py-3 font-medium text-white hover:bg-${p}-800`}
            >
              Get My Offer
            </a>
            <a
              href="#process"
              className="rounded border border-gray-300 bg-white px-8 py-3 font-medium text-gray-700 hover:bg-gray-50"
            >
              Learn More
            </a>
          </div>
        </div>
        <div className="lg:col-span-5">
          <div
            id="contact"
            className="rounded-xl border border-gray-100 bg-white p-8 shadow-xl"
          >
            <h3 className="mb-2 text-xl font-bold">Property Assessment</h3>
            <p className="mb-6 font-sans text-sm text-gray-500">
              Confidential. No Obligation.
            </p>
            {submitted ? (
              <div
                className={`rounded bg-${p}-50 p-4 text-center font-sans text-${p}-700`}
              >
                Inquiry Received.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <EditableTextInput
                  value={formData.address || ""}
                  onChange={(value) => {
                    const syntheticEvent = { target: { name: "address", value } };
                    handleChange(syntheticEvent);
                  }}
                  placeholder="Property Address"
                  width="100%"
                  className="rounded border bg-gray-50 p-3 transition-colors focus:bg-white"
                />
                <EditableTextInput
                  value={formData.phone || ""}
                  onChange={(value) => {
                    const syntheticEvent = { target: { name: "phone", value } };
                    handleChange(syntheticEvent);
                  }}
                  placeholder="Phone Number"
                  width="100%"
                  className="rounded border bg-gray-50 p-3 transition-colors focus:bg-white"
                />
                <EditableTextInput
                  value={formData.email || ""}
                  onChange={(value) => {
                    const syntheticEvent = { target: { name: "email", value } };
                    handleChange(syntheticEvent);
                  }}
                  placeholder="Email"
                  width="100%"
                  inputType="email"
                  className="rounded border bg-gray-50 p-3 transition-colors focus:bg-white"
                />
                <CustomButton
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
                  }}
                  label="Submit Information"
                  variant="primary"
                  size="medium"
                  icon={false}
                  className="w-full"
                  style={{ backgroundColor: theme.color }}
                />
              </form>
            )}
          </div>
        </div>
      </div>

      <section id="process" className="bg-white py-20 font-sans">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {SITE_CONTENT.steps.map((s, i) => (
              <div
                key={s.title}
                className={`rounded-lg border border-${n}-100 bg-${n}-50 p-8 transition-colors hover:border-${p}-200`}
              >
                <div
                  className={`mb-4 font-serif text-4xl font-bold text-${p}-200`}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="mb-3 text-lg font-bold">{s.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-900 py-20 text-center text-white font-sans">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-12 text-3xl font-serif">Client Experiences</h2>
          <div className="grid gap-8 text-left md:grid-cols-2">
            {SITE_CONTENT.testimonials.slice(0, 2).map((t) => (
              <div key={t.name} className="rounded-lg bg-gray-800 p-8">
                <p className="mb-6 leading-relaxed text-gray-300">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full bg-${p}-900 font-bold text-${p}-400`}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-white py-12 text-center text-xs text-gray-400 font-sans border-t border-gray-200">
        <p>
          © {new Date().getFullYear()} {data.displayName} LLC. All rights reserved.
        </p>
        <p>{data.phone}</p>
      </footer>
    </div>
  );
};

export const PartnerSiteVariantFour = ({ office, customTheme, hideControls }) => {
  const { formData, submitted, handleChange, handleSubmit } = useLeadForm();
  const [localTheme, setLocalTheme] = useState(
    PRESET_THEMES.find((t) => t.name === "Violet") || PRESET_THEMES[0]
  );

  const theme = customTheme || localTheme;
  const { primary: p, neutral: n } = theme;
  const data = office || DEFAULT_OFFICE;

  return (
    <div
      className={`min-h-screen bg-${n}-950 font-sans text-${n}-300 selection:bg-${p}-500 selection:text-white`}
      style={{ minHeight: hideControls ? "auto" : undefined }}
    >
      {!hideControls && <DemoBackButton />}
      {!hideControls && (
        <ThemeSwitcher themes={PRESET_THEMES} current={theme} onSet={setLocalTheme} />
      )}

      <nav
        className={`fixed z-40 w-full border-b border-${n}-800 bg-${n}-950/50 backdrop-blur`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="ml-10 text-xl font-bold tracking-tight text-white md:ml-0">
            {data.brandLine1.toUpperCase()}
            <span className={`text-${p}-500`}>
              {data.brandLine2.toUpperCase()}
            </span>
          </div>
          <CustomButton
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            label="Start Now"
            variant="primary"
            size="small"
            icon={false}
            className="rounded px-4 py-1.5 text-sm font-medium text-white transition-colors"
            style={{ backgroundColor: theme.color }}
          />
        </div>
      </nav>

      <section className="px-6 pt-32 pb-20 text-center">
        <div
          className={`mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-${p}-500/30 bg-${p}-500/10 px-3 py-1 text-xs font-medium text-${p}-400`}
        >
          <Zap size={12} /> Instant Cash Offers Available in{" "}
          {data.cityStateLabel.split(",")[0]}
        </div>
        <h1 
          className="mb-8 font-black tracking-tight text-white"
          style={{
            fontSize: 'clamp(1.75rem, 5vw, 4rem)',
            fontWeight: 900,
            lineHeight: '1.1',
            textAlign: 'center',
            maxWidth: '80rem',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          The future of{" "}
          <span
            style={{
              backgroundImage: `linear-gradient(to right, ${hexToRgba(theme.color, 0.8)}, ${theme.color})`,
            }}
            className="bg-clip-text text-transparent"
          >
            selling your home
          </span>{" "}
          is here.
        </h1>
        <p 
          className="mb-12 text-xl text-gray-400"
          style={{ 
            textAlign: 'center',
            maxWidth: '42rem',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Algorithm-backed offers. 7-day closings. Zero friction. Experience the
          modern way to liquidate real estate assets.
        </p>
        <div className="mx-auto flex max-w-md rounded-xl border border-gray-800 bg-gray-900 p-2">
          <EditableTextInput
            value={formData.address || ""}
            onChange={(value) => {
              const syntheticEvent = { target: { name: "address", value } };
              handleChange(syntheticEvent);
            }}
            placeholder="Enter address to begin..."
            width="100%"
            className="flex-1 bg-transparent px-4 text-white outline-none"
          />
          <CustomButton
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            label="Go"
            variant="primary"
            size="small"
            icon={false}
            className="rounded-lg bg-white px-6 py-3 font-bold text-black transition-colors hover:bg-gray-50"
            style={{ backgroundColor: "white", color: "black" }}
          />
        </div>
      </section>

      <section className={`bg-${n}-900/50 py-20 border-t border-${n}-900`}>
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-3">
          {SITE_CONTENT.benefits.map((b) => (
            <div
              key={b.title}
              className={`rounded-2xl border border-${n}-800 bg-${n}-900 p-8 transition-colors hover:border-${p}-500/50`}
            >
              <div
                className={`mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-${p}-500/20 text-${p}-400`}
              >
                <Award size={24} />
              </div>
              <h3 className="mb-2 text-lg font-bold text-white">{b.title}</h3>
              <p className="text-sm leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="px-6 py-24">
        <div
          className={`mx-auto max-w-3xl rounded-3xl border border-${n}-800 bg-gradient-to-br from-${n}-900 to-${n}-950 p-8 text-center md:p-12`}
        >
          <h2 className="mb-6 text-3xl font-bold text-white">Ready to initiate?</h2>
          <p className="mb-8 text-gray-400">
            Our analysts are standing by to value your property.
          </p>
          {submitted ? (
            <div className={`text-${p}-400`}>Transmission Received.</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <EditableTextInput
                value={formData.name || ""}
                onChange={(value) => {
                  const syntheticEvent = { target: { name: "name", value } };
                  handleChange(syntheticEvent);
                }}
                placeholder="Full Name"
                width="100%"
                className="rounded-lg border border-gray-800 bg-gray-950 p-4 text-white outline-none focus:border-blue-500"
              />
              <EditableTextInput
                value={formData.phone || ""}
                onChange={(value) => {
                  const syntheticEvent = { target: { name: "phone", value } };
                  handleChange(syntheticEvent);
                }}
                placeholder="Contact Number"
                width="100%"
                className="rounded-lg border border-gray-800 bg-gray-950 p-4 text-white outline-none focus:border-blue-500"
              />
              <EditableTextInput
                value={formData.address || ""}
                onChange={(value) => {
                  const syntheticEvent = { target: { name: "address", value } };
                  handleChange(syntheticEvent);
                }}
                placeholder="Property Address"
                width="100%"
                className="md:col-span-2 rounded-lg border border-gray-800 bg-gray-950 p-4 text-white outline-none focus:border-blue-500"
              />
              <CustomButton
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit(e);
                }}
                label="Generate Offer"
                variant="primary"
                size="large"
                icon={false}
                className="md:col-span-2"
                style={{ backgroundColor: theme.color }}
              />
            </form>
          )}
        </div>
      </section>

      <footer
        className={`border-t border-${n}-900 py-12 text-center text-xs opacity-50`}
      >
        © {new Date().getFullYear()} {data.displayName}.
      </footer>
    </div>
  );
};

export const PartnerSiteVariantFive = ({ office, customTheme, hideControls }) => {
  const { formData, submitted, handleChange, handleSubmit } = useLeadForm();
  const [localTheme, setLocalTheme] = useState(
    PRESET_THEMES.find((t) => t.name === "Yellow") || PRESET_THEMES[0]
  );

  const theme = customTheme || localTheme;
  const { neutral: n } = theme;
  const data = office || DEFAULT_OFFICE;

  return (
    <div className="min-h-screen bg-white font-sans" style={{ minHeight: hideControls ? "auto" : undefined }}>
      {!hideControls && <DemoBackButton />}
      {!hideControls && (
        <ThemeSwitcher themes={PRESET_THEMES} current={theme} onSet={setLocalTheme} />
      )}

      <div
        className={`animate-pulse bg-${n}-600 py-2 text-center text-sm font-bold uppercase tracking-wide text-white`}
      >
        <AlertTriangle className="mb-0.5 mr-2 inline-block h-4 w-4" />
        Market Update: Buying 3 more homes in {data.cityStateLabel.split(",")[0]} this
        month!
      </div>

      <nav className="p-4 text-center shadow-md">
        <div className="text-2xl font-black uppercase italic tracking-tighter">
          {data.brandLine1}
          <span className={`text-${n}-600`}>{data.brandLine2}</span>
        </div>
      </nav>

      <section className="bg-yellow-50 px-4 py-12">
        <div className="mx-auto max-w-2xl rounded-xl border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="mb-8 text-center">
            <h1 
              className="mb-4 font-black uppercase leading-none text-black"
              style={{
                fontSize: 'clamp(1.75rem, 5vw, 4rem)',
                fontWeight: 900,
                lineHeight: '1.1',
                textAlign: 'center',
              }}
            >
              Sell Your House{" "}
              <span className="underline" style={{ color: theme.color }}>This Week!</span>
            </h1>
            <p 
              className="text-lg font-bold text-gray-600"
              style={{ 
                textAlign: 'center',
                maxWidth: '42rem',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              We have cash ready and are waiting for your call.
            </p>
          </div>

          <div className="mb-6 flex items-center justify-between rounded bg-gray-100 p-4 text-sm font-bold text-gray-700">
            <span>Offer Expires In:</span>
            <span className={`font-mono text-xl text-${n}-600`}>11:59:42</span>
          </div>

          {submitted ? (
            <div className="rounded bg-green-100 p-6 text-center font-bold text-green-800">
              Info Sent! Call us if you do not hear back in 10 mins.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-bold uppercase">Property Address</label>
                <EditableTextInput
                  value={formData.address || ""}
                  onChange={(value) => {
                    const syntheticEvent = { target: { name: "address", value } };
                    handleChange(syntheticEvent);
                  }}
                  placeholder="123 Main St..."
                  width="100%"
                  className="rounded border-2 border-gray-300 bg-yellow-50 p-3 font-bold"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-bold uppercase">Phone</label>
                  <EditableTextInput
                    value={formData.phone || ""}
                    onChange={(value) => {
                      const syntheticEvent = { target: { name: "phone", value } };
                      handleChange(syntheticEvent);
                    }}
                    placeholder="(555)..."
                    width="100%"
                    className="rounded border-2 border-gray-300 bg-yellow-50 p-3 font-bold"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold uppercase">Email</label>
                  <EditableTextInput
                    value={formData.email || ""}
                    onChange={(value) => {
                      const syntheticEvent = { target: { name: "email", value } };
                      handleChange(syntheticEvent);
                    }}
                    placeholder="me@..."
                    width="100%"
                    inputType="email"
                    className="rounded border-2 border-gray-300 bg-yellow-50 p-3 font-bold"
                  />
                </div>
              </div>
              <CustomButton
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit(e);
                }}
                label="Get My Cash Offer"
                variant="primary"
                size="large"
                iconComponent={<MousePointer2 />}
                className="flex w-full items-center justify-center gap-2 rounded py-4 text-2xl font-black uppercase shadow-lg transition-transform active:scale-95"
                style={{ backgroundColor: theme.color }}
              />
              <p className="mt-1 text-center text-xs text-gray-500">
                No obligation. 100% Free. Confidential.
              </p>
            </form>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="border-b-2 border-black pb-2 text-xl font-black uppercase">
              Why Sell To Us?
            </h3>
            <ul className="space-y-3 font-medium">
              <li className="flex items-center gap-2 text-green-700">
                <CheckCircle2 size={20} /> Cash in hand in 7 days
              </li>
              <li className="flex items-center gap-2 text-green-700">
                <CheckCircle2 size={20} /> We pay ALL closing costs
              </li>
              <li className="flex items-center gap-2 text-green-700">
                <CheckCircle2 size={20} /> No cleaning needed
              </li>
              <li className="flex items-center gap-2 text-green-700">
                <CheckCircle2 size={20} /> No realtors involved
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="border-b-2 border-black pb-2 text-xl font-black uppercase">
              Who We Are
            </h3>
            <p className="text-gray-700">
              We are local investors looking for properties in {data.serviceAreaLabel}.
              We do not want to list your house, we want to BUY it.
            </p>
            <div className="flex items-center gap-2 font-bold">
              <Phone size={20} /> {data.phone}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black py-6 text-center text-sm font-bold uppercase text-white">
        Use Caution: Fast Closing Ahead
      </footer>
    </div>
  );
};

export const PartnerSiteVariantSix = ({ office, customTheme, hideControls }) => {
  const { formData, submitted, handleChange, handleSubmit } = useLeadForm();
  const [localTheme, setLocalTheme] = useState(
    PRESET_THEMES.find((t) => t.name === "Blue") || PRESET_THEMES[0]
  );

  const theme = customTheme || localTheme;
  const { primary: p } = theme;
  const data = office || DEFAULT_OFFICE;

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800" style={{ minHeight: hideControls ? "auto" : undefined }}>
      {!hideControls && <DemoBackButton />}
      {!hideControls && (
        <ThemeSwitcher themes={PRESET_THEMES} current={theme} onSet={setLocalTheme} />
      )}

      <div className={`bg-${p}-900 px-4 py-2 text-sm text-white`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <span>Serving {data.serviceAreaLabel} Since 2010</span>
          <span className="flex items-center gap-2 font-bold">
            <Phone size={14} /> {data.phone}
          </span>
        </div>
      </div>

      <nav className="border-b border-gray-200 bg-white px-4 py-4 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div
            className={`ml-10 flex items-center gap-2 text-2xl font-bold text-${p}-800 md:ml-0`}
          >
            <Building className="text-gray-400" /> {data.brandLine1}
            <span className={`text-${p}-600`}>{data.brandLine2}</span>
          </div>
          <div className="hidden gap-8 text-sm font-semibold text-gray-600 md:flex">
            <a href="#about">About Us</a>
            <a href="#process">Our Process</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#faq">FAQ</a>
          </div>
          <a
            href="#contact"
            className={`hidden rounded bg-${p}-700 px-5 py-2 text-sm font-semibold text-white hover:bg-${p}-800 md:block`}
          >
            Get Offer
          </a>
        </div>
      </nav>

      <div className="bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 md:py-24 md:grid-cols-2">
          <div>
            <h1 
              className="mb-6 font-black text-gray-900"
              style={{
                fontSize: 'clamp(1.75rem, 5vw, 4rem)',
                fontWeight: 900,
                lineHeight: '1.1',
              }}
            >
              Professional Home Buying Services.
            </h1>
            <p 
              className="mb-8 w-full text-lg leading-relaxed text-gray-600"
              style={{ textAlign: 'left' }}
            >
              We provide homeowners with a reliable, transparent, and efficient way to
              sell their properties directly, bypassing the complexities of the open
              market.
            </p>
            <ul className="mb-8 space-y-3">
              <li className="flex items-center gap-3 font-medium text-gray-700">
                <span
                  className={`rounded-full bg-${p}-100 p-1 text-${p}-700`}
                >
                  <CheckCircle2 size={16} />
                </span>
                Accredited Business
              </li>
              <li className="flex items-center gap-3 font-medium text-gray-700">
                <span
                  className={`rounded-full bg-${p}-100 p-1 text-${p}-700`}
                >
                  <CheckCircle2 size={16} />
                </span>
                Proof of Funds Available
              </li>
              <li className="flex items-center gap-3 font-medium text-gray-700">
                <span
                  className={`rounded-full bg-${p}-100 p-1 text-${p}-700`}
                >
                  <CheckCircle2 size={16} />
                </span>
                Local Title Company Closing
              </li>
            </ul>
          </div>
          <div
            id="contact"
            className="rounded-lg border border-gray-200 bg-gray-50 p-8 shadow-sm"
          >
            <h3
              className={`mb-4 border-b border-gray-200 pb-4 text-xl font-bold text-${p}-900`}
            >
              Property Information Request
            </h3>
            {submitted ? (
              <div className="py-8 text-center font-medium text-green-600">
                Thank you. Your information has been securely received.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <EditableTextInput
                    value={formData.name || ""}
                    onChange={(value) => {
                      const syntheticEvent = { target: { name: "name", value } };
                      handleChange(syntheticEvent);
                    }}
                    placeholder="First Name"
                    width="100%"
                    className="rounded border border-gray-300 p-2"
                  />
                  <EditableTextInput
                    value={formData.phone || ""}
                    onChange={(value) => {
                      const syntheticEvent = { target: { name: "phone", value } };
                      handleChange(syntheticEvent);
                    }}
                    placeholder="Phone"
                    width="100%"
                    className="rounded border border-gray-300 p-2"
                  />
                </div>
                <EditableTextInput
                  value={formData.email || ""}
                  onChange={(value) => {
                    const syntheticEvent = { target: { name: "email", value } };
                    handleChange(syntheticEvent);
                  }}
                  placeholder="Email Address"
                  width="100%"
                  inputType="email"
                  className="rounded border border-gray-300 p-2"
                />
                <EditableTextInput
                  value={formData.address || ""}
                  onChange={(value) => {
                    const syntheticEvent = { target: { name: "address", value } };
                    handleChange(syntheticEvent);
                  }}
                  placeholder="Property Address"
                  width="100%"
                  className="rounded border border-gray-300 p-2"
                />
                <CustomButton
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
                  }}
                  label="Submit for Review"
                  variant="primary"
                  size="medium"
                  icon={false}
                  className="w-full"
                  style={{ backgroundColor: theme.color }}
                />
              </form>
            )}
          </div>
        </div>
      </div>

      <section className="border-t border-gray-200 bg-gray-100 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="mb-12 text-2xl font-bold text-gray-900">
            Our Corporate Values
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded bg-white p-8 shadow-sm border border-gray-200">
              <div
                className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-${p}-50 text-${p}-700`}
              >
                <ShieldCheck />
              </div>
              <h3 className="mb-2 text-lg font-bold">Integrity</h3>
              <p className="text-sm text-gray-600">
                We do what we say we will do. No hidden fees or last-minute changes.
              </p>
            </div>
            <div className="rounded bg-white p-8 shadow-sm border border-gray-200">
              <div
                className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-${p}-50 text-${p}-700`}
              >
                <Clock />
              </div>
              <h3 className="mb-2 text-lg font-bold">Efficiency</h3>
              <p className="text-sm text-gray-600">
                We respect your time. Our streamlined process ensures a quick
                transaction.
              </p>
            </div>
            <div className="rounded bg-white p-8 shadow-sm border border-gray-200">
              <div
                className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-${p}-50 text-${p}-700`}
              >
                <User />
              </div>
              <h3 className="mb-2 text-lg font-bold">Privacy</h3>
              <p className="text-sm text-gray-600">
                Your information and situation are kept strictly confidential.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-200 bg-white py-8 text-sm text-gray-500">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
          <p>© {new Date().getFullYear()} {data.displayName} Group.</p>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-gray-900">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-gray-900">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const PartnerSiteVariantSeven = ({ office, customTheme, hideControls }) => {
  const { formData, submitted, handleChange, handleSubmit } = useLeadForm();
  const [localTheme, setLocalTheme] = useState(
    PRESET_THEMES.find((t) => t.name === "Teal") || PRESET_THEMES[0]
  );

  const theme = customTheme || localTheme;
  const { primary: p } = theme;
  const data = office || DEFAULT_OFFICE;

  return (
    <div className={`min-h-screen bg-${p}-50 font-sans text-gray-800`} style={{ minHeight: hideControls ? "auto" : undefined }}>
      {!hideControls && <DemoBackButton />}
      {!hideControls && (
        <ThemeSwitcher themes={PRESET_THEMES} current={theme} onSet={setLocalTheme} />
      )}

      <div className="mx-auto max-w-5xl px-4 py-8">
        <nav className="mb-12 flex items-center justify-between rounded-3xl bg-white/70 px-8 py-4 shadow-sm backdrop-blur">
          <div
            className={`flex items-center gap-2 text-2xl font-black lowercase tracking-tight text-${p}-500`}
          >
            <Heart fill="currentColor" size={24} />{" "}
            {data.displayName.toLowerCase().replace(/\s/g, "")}
          </div>
          <a
            href="#contact"
            className={`rounded-2xl bg-${p}-400 px-6 py-2 font-bold text-white shadow-lg transition-colors hover:bg-${p}-500`}
          >
            Let&apos;s Chat!
          </a>
        </nav>

        <div
          className={`mb-12 rounded-[3rem] bg-white p-10 text-center shadow-xl md:p-20 shadow-${p}-100`}
        >
          <h1 
            className="mb-8 font-black leading-tight text-gray-800"
            style={{
              fontSize: 'clamp(1.75rem, 5vw, 4rem)',
              fontWeight: 900,
              lineHeight: '1.1',
              textAlign: 'center',
            }}
          >
            Selling your home <br />
            should feel{" "}
            <span
              className="underline decoration-wavy"
              style={{ color: hexToRgba(theme.color, 0.8) }}
            >
              good.
            </span>
          </h1>
          <p 
            className="mb-10 text-xl text-gray-500"
            style={{ 
              textAlign: 'center',
              maxWidth: '42rem',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            No stress. No strangers walking through your bedroom. Just a friendly team
            ready to help you move on.
          </p>

          <div
            id="contact"
            className="mx-auto max-w-md rounded-3xl border-4 border-gray-100 bg-gray-50 p-2"
          >
            {submitted ? (
              <div className="py-4 font-bold text-gray-400">
                Yay! We will call you soon!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <EditableTextInput
                  value={formData.address || ""}
                  onChange={(value) => {
                    const syntheticEvent = { target: { name: "address", value } };
                    handleChange(syntheticEvent);
                  }}
                  placeholder="What's your address?"
                  width="100%"
                  className="rounded-xl bg-white p-4 text-center font-bold outline-none"
                />
                <CustomButton
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
                  }}
                  label="Start My Free Offer"
                  variant="primary"
                  size="large"
                  icon={false}
                  className="rounded-xl p-4 font-bold transition-transform hover:scale-[1.02]"
                  style={{ backgroundColor: theme.color }}
                />
              </form>
            )}
          </div>
        </div>

        <div className="mb-12 grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-10 shadow-sm">
            <h2 className="mb-6 text-2xl font-bold">How we help</h2>
            <div className="space-y-4">
              {SITE_CONTENT.steps.map((s, i) => (
                <div
                  key={s.title}
                  className={`flex items-center gap-4 rounded-2xl bg-${p}-50/50 p-4`}
                >
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full bg-${p}-200 font-bold text-${p}-700`}
                  >
                    {i + 1}
                  </div>
                  <span className="font-bold text-gray-600">{s.title}</span>
                </div>
              ))}
            </div>
          </div>
          <div
            className={`flex flex-col justify-center rounded-3xl bg-${p}-400 p-10 text-center text-white shadow-lg shadow-${p}-200`}
          >
            <ThumbsUp size={48} className="mx-auto mb-6 opacity-80" />
            <h2 className="mb-4 text-3xl font-bold">You&apos;re in control.</h2>
            <p className="text-lg opacity-90">
              Pick your closing date. Leave what you do not want. Move when you are
              ready.
            </p>
          </div>
        </div>
      </div>

      <footer className="py-8 text-center text-sm font-medium text-gray-400">
        Made with love in {data.cityStateLabel}.
      </footer>
    </div>
  );
};

export const PartnerSiteVariantEight = ({ office, customTheme, hideControls }) => {
  const { formData, submitted, handleChange, handleSubmit } = useLeadForm();
  const [localTheme, setLocalTheme] = useState(
    PRESET_THEMES.find((t) => t.name === "Yellow") || PRESET_THEMES[0]
  );

  const theme = customTheme || localTheme;
  const p = theme.primary;
  const data = office || DEFAULT_OFFICE;

  return (
    <div className="min-h-screen bg-neutral-900 font-serif text-neutral-200" style={{ minHeight: hideControls ? "auto" : undefined }}>
      {!hideControls && <DemoBackButton />}
      {!hideControls && (
        <ThemeSwitcher themes={PRESET_THEMES} current={theme} onSet={setLocalTheme} />
      )}

      <nav className="flex items-center justify-between border-b border-white/10 px-8 py-8">
        <div className={`text-xl uppercase tracking-[0.2em] text-${p}-600`}>
          {data.brandLine1}
        </div>
        <div className="text-xs uppercase tracking-widest text-neutral-500">
          Private Real Estate Acquisitions
        </div>
      </nav>

      <section className="mx-auto max-w-5xl px-8 py-24 text-center">
        <h1 
          className="mb-8 font-black leading-tight text-neutral-200"
          style={{
            fontSize: 'clamp(1.75rem, 5vw, 4rem)',
            fontWeight: 900,
            lineHeight: '1.1',
            textAlign: 'center',
          }}
        >
          Discretion. Speed. <br />
          <span className="italic" style={{ color: theme.color }}>Certainty.</span>
        </h1>
        <p 
          className="mb-16 text-lg font-sans font-light text-neutral-400"
          style={{ 
            textAlign: 'center',
            maxWidth: '42rem',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          We acquire distinguished properties directly from owners in{" "}
          {data.serviceAreaLabel}, ensuring a seamless transaction without public
          exposure.
        </p>
        <div className="grid gap-px border border-white/10 bg-white/10 md:grid-cols-3">
          <div className="bg-neutral-900 p-12 transition-colors hover:bg-neutral-800">
            <h3 className={`mb-4 text-sm uppercase tracking-widest text-${p}-600`}>
              Valuation
            </h3>
            <p className="font-sans text-sm font-light text-neutral-400">
              Market-leading offers based on comprehensive analysis.
            </p>
          </div>
          <div className="bg-neutral-900 p-12 transition-colors hover:bg-neutral-800">
            <h3 className={`mb-4 text-sm uppercase tracking-widest text-${p}-600`}>
              Process
            </h3>
            <p className="font-sans text-sm font-light text-neutral-400">
              Concierge-level service managing every detail.
            </p>
          </div>
          <div className="bg-neutral-900 p-12 transition-colors hover:bg-neutral-800">
            <h3 className={`mb-4 text-sm uppercase tracking-widest text-${p}-600`}>
              Result
            </h3>
            <p className="font-sans text-sm font-light text-neutral-400">
              Immediate liquidity on your exact timeline.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-neutral-800 py-24">
        <div className="mx-auto max-w-xl px-8">
          <div className="mb-12 text-center">
            <span
              className={`mb-4 block text-xs uppercase tracking-widest text-${p}-600`}
            >
              Inquire
            </span>
            <h2 className="text-3xl">Request Confidential Offer</h2>
          </div>

          {submitted ? (
            <div className={`text-center font-sans text-${p}-600`}>
              Inquiry Received.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 font-sans font-light">
              <div className="group">
                <label
                  className="mb-2 block text-xs uppercase tracking-widest text-neutral-500 transition-colors"
                  style={{ color: "rgb(115 115 115)" }}
                >
                  Property Address
                </label>
                <EditableTextInput
                  value={formData.address || ""}
                  onChange={(value) => {
                    const syntheticEvent = { target: { name: "address", value } };
                    handleChange(syntheticEvent);
                  }}
                  width="100%"
                  className="border-b border-neutral-600 bg-transparent py-2 text-white outline-none transition-colors"
                  style={{ borderBottomColor: "rgb(82 82 91)", borderTop: "none", borderLeft: "none", borderRight: "none" }}
                />
              </div>
              <div className="group">
                <label
                  className="mb-2 block text-xs uppercase tracking-widest text-neutral-500 transition-colors"
                  style={{ color: "rgb(115 115 115)" }}
                >
                  Owner Name
                </label>
                <EditableTextInput
                  value={formData.name || ""}
                  onChange={(value) => {
                    const syntheticEvent = { target: { name: "name", value } };
                    handleChange(syntheticEvent);
                  }}
                  width="100%"
                  className="border-b border-neutral-600 bg-transparent py-2 text-white outline-none transition-colors"
                  style={{ borderBottomColor: "rgb(82 82 91)", borderTop: "none", borderLeft: "none", borderRight: "none" }}
                />
              </div>
              <div className="group">
                <label
                  className="mb-2 block text-xs uppercase tracking-widest text-neutral-500 transition-colors"
                  style={{ color: "rgb(115 115 115)" }}
                >
                  Contact
                </label>
                <EditableTextInput
                  value={formData.phone || ""}
                  onChange={(value) => {
                    const syntheticEvent = { target: { name: "phone", value } };
                    handleChange(syntheticEvent);
                  }}
                  width="100%"
                  className="border-b border-neutral-600 bg-transparent py-2 text-white outline-none transition-colors"
                  style={{ borderBottomColor: "rgb(82 82 91)", borderTop: "none", borderLeft: "none", borderRight: "none" }}
                />
              </div>
              <CustomButton
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit(e);
                }}
                label="Submit"
                variant="outline"
                size="large"
                icon={false}
                className="w-full border py-4 text-xs uppercase tracking-widest transition-colors hover:text-black"
                style={{ borderColor: theme.color, color: theme.color }}
              />
            </form>
          )}
        </div>
      </section>

      <footer className="py-12 text-center text-xs uppercase tracking-widest text-neutral-600">
        {data.displayName} © {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export const PartnerSiteVariantNine = ({ office, customTheme, hideControls }) => {
  const { formData, submitted, handleChange, handleSubmit } = useLeadForm();
  const [localTheme, setLocalTheme] = useState(
    PRESET_THEMES.find((t) => t.name === "Slate") || PRESET_THEMES[0]
  );

  const theme = customTheme || localTheme;
  const { primary: p, neutral: n } = theme;
  const data = office || DEFAULT_OFFICE;

  const darkNeutral = n === "stone" ? "stone-900" : "gray-900";

  return (
    <div
      className={`flex min-h-screen flex-col bg-white font-sans text-black selection:bg-${p}-200 md:flex-row`}
      style={{ minHeight: hideControls ? "auto" : undefined }}
    >
      {!hideControls && <DemoBackButton />}
      {!hideControls && (
        <ThemeSwitcher themes={PRESET_THEMES} current={theme} onSet={setLocalTheme} />
      )}

      <aside className="z-10 flex w-full flex-col justify-between border-r border-gray-200 bg-gray-50 p-8 md:fixed md:h-screen md:w-64">
        <div>
          <div className="mb-12 text-2xl font-bold tracking-tight">
            {data.brandLine1.toLowerCase()}.{data.brandLine2.toLowerCase()}
          </div>
          <nav className="space-y-6 text-lg font-medium">
            <a href="#start" className="block transition-transform hover:translate-x-2">
              Start
            </a>
            <a
              href="#process"
              className="block text-gray-400 transition-all hover:translate-x-2 hover:text-black"
            >
              Process
            </a>
            <a
              href="#reviews"
              className="block text-gray-400 transition-all hover:translate-x-2 hover:text-black"
            >
              Stories
            </a>
          </nav>
        </div>
        <div className="hidden text-xs text-gray-400 md:block">
          Est. {new Date().getFullYear()}
          <br />
          {data.cityStateLabel}
        </div>
      </aside>

      <main className="flex-1 md:ml-64">
        <section
          id="start"
          className="flex min-h-[80vh] flex-col justify-center border-b border-gray-100 p-8 md:p-24"
        >
          <h1 
            className="mb-12 font-black leading-[0.9] tracking-tighter text-black"
            style={{
              fontSize: 'clamp(1.75rem, 5vw, 4rem)',
              fontWeight: 900,
              lineHeight: '0.9',
            }}
          >
            Sell simply.
            <br />
            Move freely.
          </h1>
          <div className="max-w-md">
            <p 
              className="mb-8 w-full text-xl leading-relaxed text-gray-500"
              style={{ textAlign: 'left' }}
            >
              We strip away the noise of the real estate market. No agents. No showings.
              Just a direct transaction between you and us.
            </p>
            <a
              href="#contact"
              className={`inline-block border-b-2 border-${p}-600 pb-1 text-xl font-medium transition-all hover:pb-2`}
            >
              Get an offer &rarr;
            </a>
          </div>
        </section>

        <section
          id="process"
          className="grid border-b border-gray-100 md:grid-cols-3"
        >
          {SITE_CONTENT.steps.map((s, i) => (
            <div
              key={s.title}
              className="group border-r border-gray-100 p-12 last:border-r-0 transition-colors hover:bg-gray-50"
            >
              <span
                className={`mb-6 flex h-6 w-6 items-center justify-center rounded-full border border-${p}-600 text-xs font-bold group-hover:bg-${p}-600 group-hover:text-white transition-colors`}
              >
                {i + 1}
              </span>
              <h3 className="mb-2 text-lg font-medium">{s.title}</h3>
              <p className="text-gray-500">{s.desc}</p>
            </div>
          ))}
        </section>

        <section
          id="contact"
          className={`bg-${darkNeutral} px-8 py-24 text-white md:p-24`}
        >
          <div className="max-w-xl">
            <h2 className="mb-8 text-4xl font-medium">Begin.</h2>
            {submitted ? (
              <div>Done.</div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <EditableTextInput
                  value={formData.address || ""}
                  onChange={(value) => {
                    const syntheticEvent = { target: { name: "address", value } };
                    handleChange(syntheticEvent);
                  }}
                  placeholder="Address"
                  width="100%"
                  className="border-b border-white/20 bg-transparent py-4 text-2xl placeholder-white/20 outline-none transition-colors focus:border-white"
                  style={{ borderTop: "none", borderLeft: "none", borderRight: "none", color: "white" }}
                />
                <EditableTextInput
                  value={formData.email || ""}
                  onChange={(value) => {
                    const syntheticEvent = { target: { name: "email", value } };
                    handleChange(syntheticEvent);
                  }}
                  placeholder="Email"
                  width="100%"
                  inputType="email"
                  className="border-b border-white/20 bg-transparent py-4 text-2xl placeholder-white/20 outline-none transition-colors focus:border-white"
                  style={{ borderTop: "none", borderLeft: "none", borderRight: "none", color: "white" }}
                />
                <CustomButton
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
                  }}
                  label="Submit Details"
                  variant="primary"
                  size="large"
                  icon={false}
                  className="mt-12 inline-flex items-center justify-center rounded-full px-8 py-4 text-xl font-medium transition-transform hover:scale-105"
                  style={{ backgroundColor: "white", color: "#111827" }}
                />
              </form>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export const PartnerSiteVariantTen = ({ office, customTheme, hideControls }) => {
  const { formData, submitted, handleChange, handleSubmit } = useLeadForm();
  const [localTheme, setLocalTheme] = useState(
    PRESET_THEMES.find((t) => t.name === "Pink") || PRESET_THEMES[0]
  );

  const theme = customTheme || localTheme;
  const { primary: p, neutral: n } = theme;
  const data = office || DEFAULT_OFFICE;

  const shadowClass = "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]";
  const borderClass = "border-2 border-black";

  return (
    <div className={`min-h-screen bg-${n}-200 p-4 font-mono text-black md:p-8`} style={{ minHeight: hideControls ? "auto" : undefined }}>
      {!hideControls && <DemoBackButton />}
      {!hideControls && (
        <ThemeSwitcher themes={PRESET_THEMES} current={theme} onSet={setLocalTheme} />
      )}

      <div className={`mx-auto max-w-6xl bg-white ${borderClass} ${shadowClass}`}>
        <header
          className={`flex items-center justify-between border-b-2 border-black bg-${p}-400 p-6`}
        >
          <div
            className={`transform -rotate-2 border-2 border-black bg-white px-2 text-2xl font-black uppercase tracking-tighter`}
          >
            {data.brandLine1}!
          </div>
          <div className="flex gap-4 font-bold">
            <a href="#contact" className="hover:underline">
              Contact
            </a>
          </div>
        </header>

        <div className="grid md:grid-cols-2">
          <div className="border-b-2 border-black bg-white p-8 md:border-b-0 md:border-r-2 md:p-16">
            <h1 
              className="mb-6 font-black uppercase leading-[0.85] text-black"
              style={{
                fontSize: 'clamp(1.75rem, 5vw, 4rem)',
                fontWeight: 900,
                lineHeight: '0.85',
              }}
            >
              We Buy <br />
              <span style={{ color: hexToRgba(theme.color, 0.8) }}>Ugly</span> <br />
              Houses.
            </h1>
            <p 
              className="mb-8 w-full text-lg font-bold"
              style={{ textAlign: 'left' }}
            >
              Seriously. Any condition. Any price. Cash.
            </p>
            <a
              href="#contact"
              className={`block text-center text-xl font-bold uppercase ${borderClass} bg-black py-4 text-white transition-all hover:bg-white hover:text-black`}
            >
              YES! BUY MY HOUSE!
            </a>
          </div>

          <div
            className={`relative flex items-center justify-center overflow-hidden bg-${n}-300 p-8`}
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(black 2px, transparent 2px)",
                backgroundSize: "20px 20px",
              }}
            />
            <div
              className={`relative max-w-xs transform rotate-3 bg-white p-8 ${borderClass} ${shadowClass}`}
            >
              <h3 className="mb-4 inline-block bg-yellow-300 px-1 text-2xl font-black">
                How It Works:
              </h3>
              <ol className="list-decimal space-y-2 pl-5 font-bold">
                <li>You call {data.phone}.</li>
                <li>We show up.</li>
                <li>We give cash.</li>
              </ol>
            </div>
          </div>
        </div>

        <div id="contact" className="border-t-2 border-black">
          <div className="bg-black p-4 text-center text-xl font-bold uppercase text-white">
            Start Here
          </div>
          <div className={`bg-${p}-100 p-8 md:p-16`}>
            {submitted ? (
              <div className="animate-bounce text-center text-4xl font-black">
                SENT!!!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-black uppercase">
                    Your Name?
                  </label>
                  <EditableTextInput
                    value={formData.name || ""}
                    onChange={(value) => {
                      const syntheticEvent = { target: { name: "name", value } };
                      handleChange(syntheticEvent);
                    }}
                    width="100%"
                    className={`p-3 ${borderClass} ${shadowClass} transition-all focus:translate-x-1 focus:translate-y-1 focus:shadow-none`}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black uppercase">
                    Phone Number?
                  </label>
                  <EditableTextInput
                    value={formData.phone || ""}
                    onChange={(value) => {
                      const syntheticEvent = { target: { name: "phone", value } };
                      handleChange(syntheticEvent);
                    }}
                    width="100%"
                    className={`p-3 ${borderClass} ${shadowClass} transition-all focus:translate-x-1 focus:translate-y-1 focus:shadow-none`}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black uppercase">
                    Where Is It?
                  </label>
                  <EditableTextInput
                    value={formData.address || ""}
                    onChange={(value) => {
                      const syntheticEvent = { target: { name: "address", value } };
                      handleChange(syntheticEvent);
                    }}
                    width="100%"
                    className={`p-3 ${borderClass} ${shadowClass} transition-all focus:translate-x-1 focus:translate-y-1 focus:shadow-none`}
                  />
                </div>
                <CustomButton
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
                  }}
                  label="Give Me An Offer Now"
                  variant="primary"
                  size="large"
                  icon={false}
                  className={`w-full bg-white py-4 text-xl font-black uppercase ${borderClass} ${shadowClass} transition-all hover:bg-black hover:text-white active:translate-x-1 active:translate-y-1 active:shadow-none`}
                  style={{ backgroundColor: "white", color: "black" }}
                />
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};




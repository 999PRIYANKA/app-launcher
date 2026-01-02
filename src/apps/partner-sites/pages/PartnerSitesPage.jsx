import React from 'react';
import { Building2, Palette, PenTool, Layout, ArrowRight } from 'lucide-react';

const PartnerSitesPage = ({ 
  onLaunchWizard, 
  onOpenTemplateBuilder,
  onNavigate 
}) => {
  
  const variants = [
    {
      id: 1,
      name: 'Cool Blue',
      desc: 'Centered, calming aesthetic for coastal markets.',
      bg: '#DBEAFE',
      textClass: 'text-blue-900',
      borderClass: 'border-transparent',
    },
    {
      id: 2,
      name: 'Warm Orange',
      desc: 'Split hero, high energy for desert/sunny markets.',
      bg: '#FFEDD5',
      textClass: 'text-orange-900',
      borderClass: 'border-transparent',
    },
    {
      id: 3,
      name: 'Premium Green',
      desc: 'Card-based layout, trusted & established feel.',
      bg: '#D1FAE5',
      textClass: 'text-emerald-900',
      borderClass: 'border-transparent',
    },
    {
      id: 4,
      name: 'Sleek Dark Mode',
      desc: 'Modern, high-contrast dark theme for luxury/tech appeal.',
      bg: '#0F172A',
      textClass: 'text-white',
      borderClass: 'border-transparent',
    },
    {
      id: 5,
      name: 'High Urgency',
      desc: 'Squeeze page style with bold warnings and CTAs.',
      bg: '#FEF9C3',
      textClass: 'text-yellow-950',
      borderClass: 'border-transparent',
    },
    {
      id: 6,
      name: 'Corporate Trust',
      desc: 'Traditional blue/grey business layout.',
      bg: '#E5E7EB',
      textClass: 'text-gray-900',
      borderClass: 'border-transparent',
    },
    {
      id: 7,
      name: 'Friendly Soft',
      desc: 'Rounded shapes and pastel colors for approachability.',
      bg: '#CCFBF1',
      textClass: 'text-teal-900',
      borderClass: 'border-transparent',
    },
    {
      id: 8,
      name: 'Luxury Gold',
      desc: 'Black and gold, serif fonts, exclusive feel.',
      bg: '#111827',
      textClass: 'text-yellow-500',
      borderClass: 'border-transparent',
    },
    {
      id: 9,
      name: 'Minimal Sidebar',
      desc: 'Clean sidebar navigation, focus on typography.',
      bg: '#FFFFFF',
      textClass: 'text-black',
      borderClass: 'border-gray-200',
    },
    {
      id: 10,
      name: 'Retro Bold',
      desc: 'Brutalist/Pop-art style for high attention.',
      bg: '#FCE7F3',
      textClass: 'text-pink-900',
      borderClass: 'border-transparent',
    },
  ];

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center bg-gray-50 p-8 font-sans">
      <div className="w-full max-w-8xl rounded-2xl bg-white p-8 text-center shadow-xl md:p-12">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          <Layout size={35} />
        </div>
        <h1 className="mb-4 font-serif text-3xl font-bold text-gray-900 md:text-4xl">
          Partner Website Platform
        </h1>
        <p className="mb-10 text-lg text-gray-600">
          Choose a flow below to preview how partner sites will work for each
          office.
        </p>

        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div
            onClick={() => onNavigate?.('OFFICE RECORD')}
            className="group relative block overflow-hidden rounded-xl border-2 border-blue-100 bg-blue-50 p-6 text-left transition-all hover:border-blue-500 hover:shadow-lg cursor-pointer"
          >
            <div className="absolute right-0 top-0 rounded-bl-lg bg-blue-500 px-2 py-1 text-xs font-bold text-white">
              DEMO
            </div>
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-200 text-blue-800">
                <Building2 size={24} />
              </div>
              <div>
                <h3 className="font-bold text-blue-900">Partner CRM</h3>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  Office Record
                </span>
              </div>
            </div>
            <p className="mb-4 line-clamp-2 text-sm text-blue-700/70">
              Simulates the CRM record view where users launch the Website Wizard.
            </p>
            <div className="flex items-center gap-1 text-sm font-bold text-blue-700 transition-all group-hover:gap-2">
              Open Office Record <ArrowRight size={16} />
            </div>
          </div>

          <div
            onClick={() => onOpenTemplateBuilder?.() || onNavigate?.('TEMPLATE BUILDER')}
            className="group relative block overflow-hidden rounded-xl border-2 border-indigo-100 bg-indigo-50 p-6 text-left transition-all hover:border-indigo-500 hover:shadow-lg cursor-pointer"
          >
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-200 text-indigo-800">
                <PenTool size={24} />
              </div>
              <div>
                <h3 className="font-bold text-indigo-900">Template Builder</h3>
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                  Drag & Drop
                </span>
              </div>
            </div>
            <p className="mb-4 line-clamp-2 text-sm text-indigo-700/70">
              Visual drag-and-drop builder for marketing pages with live preview.
            </p>
            <div className="flex items-center gap-1 text-sm font-bold text-indigo-700 transition-all group-hover:gap-2">
              Open Builder <ArrowRight size={16} />
            </div>
          </div>

          <div
            onClick={() => onNavigate?.('PARTNER ORIGINAL')}
            className="group block rounded-xl border-2 border-emerald-100 bg-emerald-50 p-6 text-left transition-all hover:border-emerald-500 hover:shadow-lg cursor-pointer"
          >
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-200 text-emerald-800">
                <Building2 size={24} />
              </div>
              <div>
                <h3 className="font-bold text-emerald-900">Partner Original</h3>
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                  Magnolia Style
                </span>
              </div>
            </div>
            <p className="mb-4 line-clamp-2 text-sm text-emerald-700/70">
              Standard seller-facing landing page for off-market cash offers.
            </p>
            <div className="flex items-center gap-1 text-sm font-bold text-emerald-700 transition-all group-hover:gap-2">
              View Template <ArrowRight size={16} />
            </div>
          </div>

          {/* Agent Sites */}
          <div
            onClick={() => onNavigate?.('AGENT SITES')}
            className="group relative block overflow-hidden rounded-xl border-2 border-purple-100 bg-purple-50 p-6 text-left transition-all hover:border-purple-500 hover:shadow-lg cursor-pointer"
          >
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-200 text-purple-800">
                <Layout size={24} />
              </div>
              <div>
                <h3 className="font-bold text-purple-900">Agent Sites</h3>
                <span className="text-xs font-semibold uppercase tracking-wider text-purple-600">
                  Personal Branding
                </span>
              </div>
            </div>
            <p className="mb-4 line-clamp-2 text-sm text-purple-700/70">
              Professional agent website templates with listing integration.
            </p>
            <div className="flex items-center gap-1 text-sm font-bold text-purple-700 transition-all group-hover:gap-2">
              View Templates <ArrowRight size={16} />
            </div>
          </div>
        </div>

        <h2 className="mb-8 flex items-center justify-center gap-2 font-serif text-2xl font-bold text-gray-900">
          <Palette className="text-purple-600" /> Partner Site Variations
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
          {variants.map((v) => (
            <div
              key={v.id}
              onClick={() => onNavigate?.(`VARIANT ${v.id}`)}
              className={`group flex h-full flex-col justify-between rounded-xl border-2 p-5 text-left transition-all hover:shadow-md cursor-pointer ${v.borderClass}`}
              style={{ backgroundColor: v.bg }}
            >
              <div>
                <div
                  className={`mb-1 text-xs font-bold uppercase tracking-wider opacity-90 ${v.textClass}`}
                >
                  Variant {v.id}
                </div>
                <div
                  className={`mb-2 text-xs font-semibold opacity-95 ${v.textClass}`}
                >
                  {v.name}
                </div>
                <p
                  className={`mb-4 text-xs leading-relaxed opacity-90 ${v.textClass}`}
                >
                  {v.desc}
                </p>
              </div>
              <div className="flex justify-end">
                <span
                  className={`text-xs font-bold uppercase tracking-wider group-hover:underline ${v.textClass}`}
                >
                  View &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-400">
        <p>Frontend demo only – wiring to CRM APIs will be added next.</p>
      </div>
    </div>
  );
};

export default PartnerSitesPage;



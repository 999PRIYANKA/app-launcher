import React from 'react';
import { User, ArrowRight } from 'lucide-react';

const AgentSitesPage = ({ onNavigate }) => {
  const templates = [
    {
      id: 'template-a',
      name: 'Template A',
      description: 'Split hero layout with modern design',
      bg: '#DBEAFE',
      textClass: 'text-blue-900',
    },
    {
      id: 'template-b',
      name: 'Template B',
      description: 'Full-screen hero with luxury aesthetic',
      bg: '#0F172A',
      textClass: 'text-white',
    },
  ];

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center bg-gray-50 p-8 font-sans">
      <div className="w-full max-w-6xl rounded-2xl bg-white p-8 text-center shadow-xl md:p-12">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          <User size={35} />
        </div>
        <h1 className="mb-4 font-serif text-3xl font-bold text-gray-900 md:text-4xl">
          Agent Website Templates
        </h1>
        <p className="mb-10 text-lg text-gray-600">
          Choose a template to preview your agent website
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => onNavigate?.(template.id.toUpperCase().replace('-', ' '))}
              className="group relative block overflow-hidden rounded-xl border-2 border-blue-100 bg-blue-50 p-6 text-left transition-all hover:border-blue-500 hover:shadow-lg cursor-pointer"
              style={{ backgroundColor: template.bg }}
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-blue-800">
                  <User size={24} />
                </div>
                <div>
                  <h3 className={`font-bold ${template.textClass}`}>{template.name}</h3>
                  <span className={`text-xs font-semibold uppercase tracking-wider ${template.textClass} opacity-80`}>
                    Agent Template
                  </span>
                </div>
              </div>
              <p className={`mb-4 line-clamp-2 text-sm ${template.textClass} opacity-90`}>
                {template.description}
              </p>
              <div className="flex items-center gap-1 text-sm font-bold transition-all group-hover:gap-2">
                <span className={template.textClass}>View Template</span>
                <ArrowRight size={16} className={template.textClass} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentSitesPage;


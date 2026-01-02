import React, { useState } from "react";
import {
  MonitorPlay,
  ArrowLeft,
  ArrowRight,
  Save,
} from "lucide-react";
import {
  PartnerSiteVariantOne,
  PartnerSiteVariantTwo,
  PartnerSiteVariantThree,
  PartnerSiteVariantFour,
  PartnerSiteVariantFive,
  PartnerSiteVariantSix,
  PartnerSiteVariantSeven,
  PartnerSiteVariantEight,
  PartnerSiteVariantNine,
  PartnerSiteVariantTen,
  PRESET_THEMES,
} from './PartnerVariants';
import CustomButton from '../../../components/common/CustomButton';
import EditableTextInput from '../../../components/common/EditableTextInput';

const DEFAULT_OFFICE = {
  id: "new-office",
  displayName: "My Home Buyers",
  brandLine1: "My",
  brandLine2: "Home Buyers",
  serviceAreaLabel: "Greater Metro Area",
  cityStateLabel: "Austin, TX",
  phone: "(512) 555-0123",
  email: "hello@myhomebuyers.com",
};

const TEMPLATE_OPTIONS = [
  { id: 1, name: "Cool Blue", Component: PartnerSiteVariantOne, description: "Clean SaaS style", defaultTheme: "Blue" },
  { id: 2, name: "Warm Orange", Component: PartnerSiteVariantTwo, description: "High energy, split hero", defaultTheme: "Orange" },
  { id: 3, name: "Premium Green", Component: PartnerSiteVariantThree, description: "Trust & Authority", defaultTheme: "Emerald" },
  { id: 4, name: "Sleek Dark", Component: PartnerSiteVariantFour, description: "Modern & Tech-forward", defaultTheme: "Violet" },
  { id: 5, name: "High Urgency", Component: PartnerSiteVariantFive, description: "Direct response squeeze page", defaultTheme: "Yellow" },
  { id: 6, name: "Corporate", Component: PartnerSiteVariantSix, description: "Traditional business", defaultTheme: "Blue" },
  { id: 7, name: "Friendly", Component: PartnerSiteVariantSeven, description: "Soft & approachable", defaultTheme: "Teal" },
  { id: 8, name: "Luxury", Component: PartnerSiteVariantEight, description: "High-end exclusive", defaultTheme: "Yellow" },
  { id: 9, name: "Minimal", Component: PartnerSiteVariantNine, description: "Design focused sidebar", defaultTheme: "Slate" },
  { id: 10, name: "Retro", Component: PartnerSiteVariantTen, description: "Bold brutalist pop", defaultTheme: "Pink" },
];

// Helper to get default theme for a template
const getDefaultThemeForTemplate = (templateId) => {
  const template = TEMPLATE_OPTIONS.find((t) => t.id === templateId);
  if (template && template.defaultTheme) {
    return PRESET_THEMES.find((t) => t.name === template.defaultTheme) || PRESET_THEMES[0];
  }
  return PRESET_THEMES[0];
};



const WebsiteWizard= ({ officeId, onExit }) => {
  const [step, setStep] = useState(1);
  const [selectedTemplateId, setSelectedTemplateId] = useState(1);
  const [officeData, setOfficeData] = useState(DEFAULT_OFFICE);
  const [selectedTheme, setSelectedTheme] = useState(() => getDefaultThemeForTemplate(1));

  const CurrentTemplate =
    TEMPLATE_OPTIONS.find((t) => t.id === selectedTemplateId)?.Component ||
    PartnerSiteVariantOne;

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 2));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSave = () => {
    // In a later step this will POST to backend with office + template + theme
    // For now we just return to the Office Record view inside the partner sites flow
    onExit?.();
  };

  const updateField = (field, value) => {
    setOfficeData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-50 font-sans shadow-sm" style={{ height: 'calc(100vh - 4rem)' }}>
      {/* Sidebar / Stepper */}
      <aside className="flex w-80 flex-col border-r border-gray-200 bg-white">
        <div className="border-b border-gray-100 p-6">
          <button
            onClick={onExit}
            className="mb-6 flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
          >
            <ArrowLeft size={16} /> Back to Office
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Website Wizard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Launch a partner site for this office in two quick steps.
          </p>
        </div>

        <div className="flex-1 space-y-8 overflow-y-auto p-6">
          {/* Step 1 */}
          <div
            className={`transition-opacity ${
              step === 1 ? "opacity-100" : "pointer-events-none opacity-40"
            }`}
          >
            <div className="mb-4 flex items-center gap-3 font-bold text-blue-600">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                1
              </div>
              Design & Style
            </div>
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="mb-3 block text-xs font-bold uppercase tracking-wider text-gray-400">
                    Choose Template
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {TEMPLATE_OPTIONS.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => {
                          setSelectedTemplateId(t.id);
                          setSelectedTheme(getDefaultThemeForTemplate(t.id));
                        }}
                        className={`rounded-lg border p-3 text-left text-sm transition-all ${
                          selectedTemplateId === t.id
                            ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600 shadow-md"
                            : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <div className="font-semibold text-gray-900">
                          {t.name}
                        </div>
                        <div className="mt-1 line-clamp-1 text-xs text-gray-500">
                          {t.description}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="mb-3 block text-xs font-bold uppercase tracking-wider text-gray-400">
                    Select Color Theme
                  </label>
                  <div className="grid grid-cols-5 gap-3">
                    {PRESET_THEMES.map((t) => (
                      <button
                        key={t.name}
                        type="button"
                        onClick={() => setSelectedTheme(t)}
                        className={`h-9 w-9 rounded-full border-2 transition-transform ${
                          selectedTheme.name === t.name
                            ? "scale-110 border-gray-900 shadow-lg ring-2 ring-gray-200 ring-offset-2"
                            : "border-gray-200 hover:scale-105 hover:border-gray-400"
                        }`}
                        style={{ backgroundColor: t.color }}
                        title={t.name}
                      />
                    ))}
                  </div>
                  <div className="mt-2 text-right text-xs text-gray-400">
                    Selected:{" "}
                    <span className="font-semibold text-gray-700">
                      {selectedTheme.name}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Step 2 */}
          <div
            className={`transition-opacity ${
              step === 2 ? "opacity-100" : "pointer-events-none opacity-40"
            }`}
          >
            <div className="mb-4 flex items-center gap-3 font-bold text-blue-600">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                2
              </div>
              Brand Details
            </div>
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase text-gray-500">
                    Display Name
                  </label>
                  <EditableTextInput
                    value={officeData.displayName}
                    onChange={(value) => updateField("displayName", value)}
                    placeholder="Enter display name"
                    width="100%"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="mb-1 block text-xs font-bold uppercase text-gray-500">
                      Brand Line 1
                    </label>
                    <EditableTextInput
                      value={officeData.brandLine1}
                      onChange={(value) => updateField("brandLine1", value)}
                      placeholder="Enter brand line 1"
                      width="100%"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-bold uppercase text-gray-500">
                      Brand Line 2
                    </label>
                    <EditableTextInput
                      value={officeData.brandLine2}
                      onChange={(value) => updateField("brandLine2", value)}
                      placeholder="Enter brand line 2"
                      width="100%"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase text-gray-500">
                    City Label
                  </label>
                  <EditableTextInput
                    value={officeData.cityStateLabel}
                    onChange={(value) => updateField("cityStateLabel", value)}
                    placeholder="Enter city label"
                    width="100%"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase text-gray-500">
                    Phone
                  </label>
                  <EditableTextInput
                    value={officeData.phone}
                    onChange={(value) => updateField("phone", value)}
                    placeholder="Enter phone number"
                    width="100%"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase text-gray-500">
                    Email
                  </label>
                  <EditableTextInput
                    value={officeData.email}
                    onChange={(value) => updateField("email", value)}
                    placeholder="Enter email"
                    width="100%"
                    inputType="email"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 p-4">
          {step > 1 ? (
            <CustomButton
              onClick={handleBack}
              label="Back"
              variant="ghost"
              size="small"
              icon={false}
              className="text-sm font-bold text-gray-600 transition-colors hover:text-gray-900"
            />
          ) : (
            <div />
          )}
          {step < 2 ? (
            <CustomButton
              onClick={handleNext}
              label="Next Step"
              variant="primary"
              size="medium"
              iconComponent={<ArrowRight size={16} />}
            />
          ) : (
            <CustomButton
              onClick={handleSave}
              label="Save & Publish"
              variant="green"
              size="medium"
              iconComponent={<Save size={16} />}
            />
          )}
        </div>
      </aside>

      {/* Main Preview */}
      <main className="flex flex-1 flex-col overflow-hidden bg-gray-100" style={{ minHeight: 0 }}>
        <div className="flex h-12 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6 text-sm text-gray-500">
          <div className="flex items-center gap-2 font-medium">
            <MonitorPlay size={18} /> Live Preview
          </div>
          <div className="text-xs text-gray-400">
            {
              TEMPLATE_OPTIONS.find((t) => t.id === selectedTemplateId)?.name
            }{" "}
            Template • {selectedTheme.name} Theme
          </div>
        </div>
        <div 
          className="flex-1 overflow-y-auto overflow-x-hidden"
          style={{ 
            minHeight: 0,
            height: '100%',
            overflowY: 'auto',
            overflowX: 'hidden',
            WebkitOverflowScrolling: 'touch',
            position: 'relative'
          }}
        >
          <style>{`
            .wizard-preview-container > div[style*="minHeight"] {
              min-height: auto !important;
              height: auto !important;
            }
            .wizard-preview-container > div[class*="min-h-screen"] {
              min-height: auto !important;
            }
            .wizard-preview-container [style*="minHeight"][style*="100vh"] {
              min-height: auto !important;
            }
          `}</style>
          <div 
            className="wizard-preview-container w-full"
            style={{ 
              width: '100%',
              position: 'relative'
            }}
          >
            <CurrentTemplate
              office={officeData}
              customTheme={selectedTheme}
              hideControls
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default WebsiteWizard;




import React from "react";
import {
  ArrowLeft,
  Building2,
  Globe,
  Settings,
  ExternalLink,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import CustomButton from '../../../components/common/CustomButton';



const PartnerSitesOfficeRecordPage= ({ 
  onLaunchWizard,
  onNavigate 
}) => {
  const handleLaunchWizard = () => {
    onLaunchWizard?.('office-1');
  };

  return (
    <div className="min-h-[80vh] bg-gray-50 font-sans text-gray-900">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-12 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onNavigate?.('DASHBOARD')}
            className="text-gray-400 transition-colors hover:text-gray-900"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-base font-bold sm:text-lg">
            Office Record: Magnolia City Home Buyers
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main info */}
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                    <Building2 size={32} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Magnolia City Home Buyers
                    </h2>
                    <p className="text-sm text-gray-500">Active Partner Office</p>
                  </div>
                </div>
                <CustomButton
                  onClick={() => {}}
                  label="Edit Details"
                  variant="ghost"
                  size="small"
                  icon={false}
                  className="text-sm font-medium text-blue-600 hover:underline"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 text-sm text-gray-600 md:grid-cols-2">
                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-gray-400" />
                  <span>Houston, TX</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={20} className="text-gray-400" />
                  <span>(713) 555-0123</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-gray-400" />
                  <span>hello@magnoliacity.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe size={20} className="text-gray-400" />
                  <span>magnoliacity.partner-site.com</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold text-gray-900">
                Recent Activity
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-4 border-b border-gray-100 py-3">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <p className="text-gray-600">
                    <span className="font-bold text-gray-900">New Lead</span>{" "}
                    submitted form from Website.
                  </p>
                  <span className="ml-auto text-xs text-gray-400">2h ago</span>
                </div>
                <div className="flex items-center gap-4 border-b border-gray-100 py-3">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <p className="text-gray-600">
                    <span className="font-bold text-gray-900">
                      Website Updated
                    </span>{" "}
                    by Admin.
                  </p>
                  <span className="ml-auto text-xs text-gray-400">1d ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar actions */}
          <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold text-gray-900">
                Website Configuration
              </h3>
              <div className="mb-6 rounded-lg border border-gray-100 bg-gray-50 p-4 text-sm">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Current Template
                  </span>
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">
                    Live
                  </span>
                </div>
                <div className="font-medium text-gray-900">
                  Variant 1: Cool Blue
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  Last published: Oct 24, 2024
                </div>
              </div>

              <div className="space-y-3">
                <CustomButton
                  onClick={handleLaunchWizard}
                  label="Launch Website Wizard"
                  variant="primary"
                  size="medium"
                  iconComponent={<Settings size={18} />}
                  className="w-full"
                />
                <button
                  onClick={() => onNavigate?.('VARIANT 1')}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white py-3 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50"
                >
                  <ExternalLink size={18} /> View Live Site
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PartnerSitesOfficeRecordPage;




import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../config/appRoutes';

// Partner Sites App Pages
import PartnerSitesPage from '../apps/partner-sites/pages/PartnerSitesPage';
import PartnerSitesOfficeRecordPage from '../apps/partner-sites/pages/PartnerSitesOfficeRecordPage';
import WebsiteWizard from '../apps/partner-sites/components/WebsiteWizard';
import TemplateBuilder from '../apps/partner-sites/pages/TemplateBuilder';
import PartnerOriginal from '../apps/partner-sites/components/PartnerOriginal';
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
} from '../apps/partner-sites/components/PartnerVariants';
import AgentSitesPage from '../apps/partner-sites/pages/AgentSitesPage';
import { AgentTemplateA, AgentTemplateB } from '../apps/partner-sites/components/agentSites';

// Wrapper components that convert navigation callbacks to route navigation
const PartnerSitesPageWrapper = () => {
  const navigate = useNavigate();
  
  const handleNavigate = (page) => {
    // Map page names to routes
    const pageToRoute = {
      'DASHBOARD': APP_ROUTES.PARTNER_SITES.DASHBOARD,
      'OFFICE RECORD': APP_ROUTES.PARTNER_SITES.OFFICE_RECORD,
      'TEMPLATE BUILDER': APP_ROUTES.PARTNER_SITES.TEMPLATE_BUILDER,
      'WEBSITE WIZARD': APP_ROUTES.PARTNER_SITES.WEBSITE_WIZARD,
      'AGENT SITES': APP_ROUTES.PARTNER_SITES.AGENT_SITES,
      'PARTNER ORIGINAL': APP_ROUTES.PARTNER_SITES.PARTNER_ORIGINAL,
      'VARIANT 1': APP_ROUTES.PARTNER_SITES.VARIANT_1,
      'VARIANT 2': APP_ROUTES.PARTNER_SITES.VARIANT_2,
      'VARIANT 3': APP_ROUTES.PARTNER_SITES.VARIANT_3,
      'VARIANT 4': APP_ROUTES.PARTNER_SITES.VARIANT_4,
      'VARIANT 5': APP_ROUTES.PARTNER_SITES.VARIANT_5,
      'VARIANT 6': APP_ROUTES.PARTNER_SITES.VARIANT_6,
      'VARIANT 7': APP_ROUTES.PARTNER_SITES.VARIANT_7,
      'VARIANT 8': APP_ROUTES.PARTNER_SITES.VARIANT_8,
      'VARIANT 9': APP_ROUTES.PARTNER_SITES.VARIANT_9,
      'VARIANT 10': APP_ROUTES.PARTNER_SITES.VARIANT_10,
    };
    const route = pageToRoute[page] || APP_ROUTES.PARTNER_SITES.DASHBOARD;
    navigate(route);
  };
  
  const handleOpenTemplateBuilder = () => {
    navigate(APP_ROUTES.PARTNER_SITES.TEMPLATE_BUILDER);
  };
  
  const handleLaunchWizard = (officeId) => {
    navigate(APP_ROUTES.PARTNER_SITES.WEBSITE_WIZARD);
  };
  
  return (
    <PartnerSitesPage
      onNavigate={handleNavigate}
      onOpenTemplateBuilder={handleOpenTemplateBuilder}
      onLaunchWizard={handleLaunchWizard}
    />
  );
};

const PartnerSitesOfficeRecordPageWrapper = () => {
  const navigate = useNavigate();
  
  const handleLaunchWizard = (officeId) => {
    navigate(APP_ROUTES.PARTNER_SITES.WEBSITE_WIZARD);
  };
  
  const handleNavigate = (page) => {
    const pageToRoute = {
      'DASHBOARD': APP_ROUTES.PARTNER_SITES.DASHBOARD,
      'OFFICE RECORD': APP_ROUTES.PARTNER_SITES.OFFICE_RECORD,
    };
    const route = pageToRoute[page] || APP_ROUTES.PARTNER_SITES.DASHBOARD;
    navigate(route);
  };
  
  return (
    <PartnerSitesOfficeRecordPage
      onLaunchWizard={handleLaunchWizard}
      onNavigate={handleNavigate}
    />
  );
};

const WebsiteWizardWrapper = () => {
  const navigate = useNavigate();
  
  const handleExit = () => {
    navigate(APP_ROUTES.PARTNER_SITES.DASHBOARD);
  };
  
  return <WebsiteWizard officeId="new-office" onExit={handleExit} />;
};

const AgentSitesPageWrapper = () => {
  const navigate = useNavigate();
  
  const handleNavigate = (page) => {
    const pageToRoute = {
      'AGENT SITES': APP_ROUTES.PARTNER_SITES.AGENT_SITES,
      'TEMPLATE A': APP_ROUTES.PARTNER_SITES.TEMPLATE_A,
      'TEMPLATE B': APP_ROUTES.PARTNER_SITES.TEMPLATE_B,
    };
    const route = pageToRoute[page] || APP_ROUTES.PARTNER_SITES.AGENT_SITES;
    navigate(route);
  };
  
  return <AgentSitesPage onNavigate={handleNavigate} />;
};

const AgentTemplateAWrapper = () => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(APP_ROUTES.PARTNER_SITES.AGENT_SITES);
  };
  
  return (
    <AgentTemplateA
      agent={{
        firstName: 'John',
        lastName: 'Smith',
        brokerage: 'Premier Realty',
        title: 'Senior Real Estate Agent',
        bio: 'With over 15 years of experience in the real estate industry, I specialize in helping clients find their perfect home. My commitment to excellence and personalized service has helped hundreds of families achieve their real estate goals.',
        phone: '(555) 123-4567',
        email: 'john.smith@premierrealty.com',
        photoUrl: 'https://via.placeholder.com/400x600?text=Agent+Photo',
        socials: {
          instagram: 'https://instagram.com',
          linkedin: 'https://linkedin.com',
        },
      }}
      listings={[
        {
          id: 1,
          address: '123 Main Street',
          city: 'San Francisco',
          state: 'CA',
          price: 1250000,
          bedrooms: 3,
          bathrooms: 2,
          imageUrl: 'https://via.placeholder.com/400x300?text=Property+1',
        },
        {
          id: 2,
          address: '456 Oak Avenue',
          city: 'San Francisco',
          state: 'CA',
          price: 950000,
          bedrooms: 2,
          bathrooms: 2,
          imageUrl: 'https://via.placeholder.com/400x300?text=Property+2',
        },
      ]}
      onBack={handleBack}
    />
  );
};

const AgentTemplateBWrapper = () => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(APP_ROUTES.PARTNER_SITES.AGENT_SITES);
  };
  
  return (
    <AgentTemplateB
      agent={{
        firstName: 'John',
        lastName: 'Smith',
        brokerage: 'Premier Realty',
        title: 'Senior Real Estate Agent',
        bio: 'With over 15 years of experience in the real estate industry, I specialize in helping clients find their perfect home. My commitment to excellence and personalized service has helped hundreds of families achieve their real estate goals.',
        phone: '(555) 123-4567',
        email: 'john.smith@premierrealty.com',
        photoUrl: 'https://via.placeholder.com/400x600?text=Agent+Photo',
        testimonials: [
          {
            id: 1,
            text: 'John helped us find our dream home. His attention to detail and market knowledge is unmatched.',
            clientName: 'Sarah Johnson',
            rating: 5,
          },
          {
            id: 2,
            text: 'Professional, responsive, and truly cares about his clients. Highly recommend!',
            clientName: 'Michael Chen',
            rating: 5,
          },
        ],
      }}
      listings={[
        {
          id: 1,
          address: '123 Main Street',
          city: 'San Francisco',
          state: 'CA',
          price: 1250000,
          bedrooms: 3,
          bathrooms: 2,
          squareFootage: 2500,
          imageUrl: 'https://via.placeholder.com/400x300?text=Property+1',
          description: 'Beautiful modern home with stunning views',
        },
        {
          id: 2,
          address: '456 Oak Avenue',
          city: 'San Francisco',
          state: 'CA',
          price: 950000,
          bedrooms: 2,
          bathrooms: 2,
          squareFootage: 1800,
          imageUrl: 'https://via.placeholder.com/400x300?text=Property+2',
          description: 'Charming Victorian in prime location',
        },
      ]}
      onBack={handleBack}
    />
  );
};

// Partner Sites App Routes
export const PartnerSitesRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<PartnerSitesPageWrapper />} />
      <Route path="office-record" element={<PartnerSitesOfficeRecordPageWrapper />} />
      <Route path="website-wizard" element={<WebsiteWizardWrapper />} />
      <Route path="template-builder" element={<TemplateBuilder />} />
      <Route path="variant-1" element={<PartnerSiteVariantOne />} />
      <Route path="variant-2" element={<PartnerSiteVariantTwo />} />
      <Route path="variant-3" element={<PartnerSiteVariantThree />} />
      <Route path="variant-4" element={<PartnerSiteVariantFour />} />
      <Route path="variant-5" element={<PartnerSiteVariantFive />} />
      <Route path="variant-6" element={<PartnerSiteVariantSix />} />
      <Route path="variant-7" element={<PartnerSiteVariantSeven />} />
      <Route path="variant-8" element={<PartnerSiteVariantEight />} />
      <Route path="variant-9" element={<PartnerSiteVariantNine />} />
      <Route path="variant-10" element={<PartnerSiteVariantTen />} />
      <Route path="partner-original" element={<PartnerOriginal />} />
      <Route path="agent-sites" element={<AgentSitesPageWrapper />} />
      <Route path="template-a" element={<AgentTemplateAWrapper />} />
      <Route path="template-b" element={<AgentTemplateBWrapper />} />
      
      {/* Default redirect to dashboard */}
      <Route path="*" element={<PartnerSitesPageWrapper />} />
    </Routes>
  );
};

export default PartnerSitesRoutes;


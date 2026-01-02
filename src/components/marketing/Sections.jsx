import React from 'react';
import CustomButton from '../common/CustomButton';
import EditableTextInput from '../common/EditableTextInput';
import LabeledTextarea from '../common/LabeledTextarea';
import { CheckCircle2, Star, ArrowRight } from 'lucide-react';





const HeroSection = ({ content }) => (
  <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-24 px-4">
    <div className="max-w-5xl mx-auto text-center">
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
        {content.title || 'Welcome to Our Platform'}
      </h1>
      <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
        {content.subtitle || 'Build amazing things with our powerful tools and intuitive interface'}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <CustomButton
          onClick={() => {
            if (content.ctaUrl && content.ctaUrl !== '#') {
              window.location.href = content.ctaUrl;
            }
          }}
          label={content.ctaText || 'Get Started'}
          variant="primary"
          size="large"
          icon={false}
          className="min-w-[200px]"
        />
        {content.secondaryCtaText && (
          <CustomButton
            onClick={() => {}}
            label={content.secondaryCtaText}
            variant="outline"
            size="large"
            icon={false}
            className="min-w-[200px]"
          />
        )}
      </div>
    </div>
  </section>
);

const FeaturesGrid = ({ content }) => (
  <section className="py-20 px-4 bg-white">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">{content.title || 'Our Features'}</h2>
        {content.subtitle && (
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{content.subtitle}</p>
        )}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(content.features || []).map((feature, idx) => (
          <div
            key={idx}
            className="p-8 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow bg-white"
          >
            {feature.icon && (
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                {feature.icon}
              </div>
            )}
            <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title || 'Feature'}</h3>
            <p className="text-gray-600 leading-relaxed">{feature.description || 'Feature description'}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const AboutSection = ({ content }) => (
  <section className="py-20 px-4 bg-gray-50">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">{content.title || 'About Us'}</h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            {content.description || 'We are a company dedicated to excellence and innovation.'}
          </p>
          {content.details && (
            <p className="text-gray-700 leading-relaxed mb-6">{content.details}</p>
          )}
          {content.ctaText && (
            <CustomButton
              onClick={() => {}}
              label={content.ctaText}
              variant="primary"
              size="medium"
              icon={false}
            />
          )}
        </div>
        <div>
          {content.imageUrl ? (
            <img
              src={content.imageUrl}
              alt={content.title}
              className="rounded-xl shadow-xl w-full h-auto"
            />
          ) : (
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl shadow-xl aspect-video flex items-center justify-center">
              <span className="text-gray-400 text-lg">Image Placeholder</span>
            </div>
          )}
        </div>
      </div>
    </div>
  </section>
);

const TestimonialsSection = ({ content }) => (
  <section className="py-20 px-4 bg-white">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          {content.title || 'What Our Customers Say'}
        </h2>
        {content.subtitle && (
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{content.subtitle}</p>
        )}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(content.testimonials || []).map((testimonial, idx) => (
          <div
            key={idx}
            className="p-8 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex text-yellow-400 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="fill-current" />
              ))}
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed italic">
              &quot;{testimonial.quote || 'Testimonial quote'}&quot;
            </p>
            <div className="border-t border-gray-200 pt-4">
              <p className="font-bold text-gray-900">{testimonial.author || 'Author Name'}</p>
              <p className="text-sm text-gray-500">{testimonial.role || 'Role'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const PricingSection = ({ content }) => (
  <section className="py-20 px-4 bg-gray-50">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">{content.title || 'Choose Your Plan'}</h2>
        {content.subtitle && (
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{content.subtitle}</p>
        )}
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {(content.plans || []).map((plan, idx) => (
          <div
            key={idx}
            className={`p-8 bg-white border-2 rounded-xl ${
              plan.featured
                ? 'border-blue-500 shadow-xl scale-105'
                : 'border-gray-200 hover:shadow-lg'
            } transition-all`}
          >
            {plan.featured && (
              <div className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                POPULAR
              </div>
            )}
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name || 'Plan Name'}</h3>
            <div className="mb-6">
              <span className="text-5xl font-bold text-gray-900">${plan.price || '0'}</span>
              <span className="text-gray-600">/{plan.period || 'mo'}</span>
            </div>
            <ul className="space-y-3 mb-8">
              {(plan.features || []).map((feature, fIdx) => (
                <li key={fIdx} className="flex items-start gap-2 text-gray-600">
                  <CheckCircle2 size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <CustomButton
              onClick={() => {}}
              label={plan.ctaText || 'Choose Plan'}
              variant={plan.featured ? 'primary' : 'outline'}
              size="medium"
              icon={false}
              className="w-full"
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FAQSection= ({ content }) => {
  const [openIndex, setOpenIndex] = React.useState(0);

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {content.title || 'Frequently Asked Questions'}
          </h2>
          {content.subtitle && (
            <p className="text-lg text-gray-600">{content.subtitle}</p>
          )}
        </div>
        <div className="space-y-4">
          {(content.faqs || []).map((faq, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex justify-between items-center p-6 bg-white hover:bg-gray-50 transition-colors text-left"
              >
                <span className="font-semibold text-gray-900 text-lg">{faq.question || 'Question?'}</span>
                <span className="text-gray-400 text-xl">
                  {openIndex === idx ? '−' : '+'}
                </span>
              </button>
              {openIndex === idx && (
                <div className="p-6 bg-gray-50 border-t border-gray-200 text-gray-600 leading-relaxed">
                  {faq.answer || 'Answer here'}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = ({ content }) => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {content.title || 'Get In Touch'}
          </h2>
          {content.subtitle && (
            <p className="text-lg text-gray-600">{content.subtitle}</p>
          )}
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {content.nameLabel || 'Full Name'}
              </label>
              <EditableTextInput
                value={formData.name}
                onChange={(value) => setFormData({ ...formData, name: value })}
                placeholder={content.namePlaceholder || 'Your Name'}
                width="100%"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {content.emailLabel || 'Email Address'}
              </label>
              <EditableTextInput
                value={formData.email}
                onChange={(value) => setFormData({ ...formData, email: value })}
                placeholder={content.emailPlaceholder || 'Your Email'}
                inputType="email"
                width="100%"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {content.messageLabel || 'Message'}
              </label>
              <LabeledTextarea
                label=""
                value={formData.message}
                onChange={(value) => setFormData({ ...formData, message: value })}
                placeholder={content.messagePlaceholder || 'Your Message'}
                width="100%"
                minHeight="150px"
              />
            </div>
            <CustomButton
              type="submit"
              onClick={handleSubmit}
              label={content.submitText || 'Send Message'}
              variant="primary"
              size="large"
              icon={false}
              className="w-full"
            />
          </form>
        </div>
      </div>
    </section>
  );
};

const FooterSection = ({ content }) => (
  <footer className="bg-gray-900 text-white py-16 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-4 gap-8 mb-12">
        <div className="md:col-span-2">
          <h3 className="text-2xl font-bold mb-4">{content.companyName || 'Company'}</h3>
          <p className="text-gray-400 leading-relaxed max-w-md">
            {content.description || 'Company description'}
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-lg">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            {(content.links || []).map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.url || '#'}
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  {link.label || 'Link'}
                  {link.external && <ArrowRight size={14} />}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-lg">Contact</h4>
          <ul className="space-y-3 text-gray-400">
            {content.email && (
              <li>
                <a href={`mailto:${content.email}`} className="hover:text-white transition-colors">
                  {content.email}
                </a>
              </li>
            )}
            {content.phone && (
              <li>
                <a href={`tel:${content.phone}`} className="hover:text-white transition-colors">
                  {content.phone}
                </a>
              </li>
            )}
            {content.address && <li className="text-gray-400">{content.address}</li>}
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
        <p>{content.copyright || '© 2024 Company. All rights reserved.'}</p>
      </div>
    </div>
  </footer>
);

export const SECTION_COMPONENTS = {
  hero: HeroSection,
  features: FeaturesGrid,
  about: AboutSection,
  testimonials: TestimonialsSection,
  pricing: PricingSection,
  faq: FAQSection,
  contact: ContactSection,
  footer: FooterSection,
};

export const getDefaultContent = (type) => {
  const defaults = {
    hero: {
      title: 'Welcome to Our Platform',
      subtitle: 'Build amazing things with our powerful tools and intuitive interface',
      ctaText: 'Get Started',
      ctaUrl: '#',
      secondaryCtaText: 'Learn More',
    },
    features: {
      title: 'Our Features',
      subtitle: 'Everything you need to succeed',
      features: [
        {
          title: 'Fast Performance',
          description: 'Lightning-fast load times and smooth user experience',
        },
        {
          title: 'Secure & Reliable',
          description: 'Enterprise-grade security to keep your data safe',
        },
        {
          title: 'Easy to Use',
          description: 'Intuitive interface that anyone can master quickly',
        },
        {
          title: '24/7 Support',
          description: 'Round-the-clock assistance whenever you need help',
        },
        {
          title: 'Scalable',
          description: 'Grows with your business from startup to enterprise',
        },
        {
          title: 'Customizable',
          description: 'Tailor every aspect to fit your unique needs',
        },
      ],
    },
    about: {
      title: 'About Us',
      description:
        'We are a company dedicated to excellence and innovation. Our mission is to provide the best solutions for our customers.',
      details:
        'With years of experience and a passionate team, we\'ve helped thousands of businesses achieve their goals. We believe in building long-term relationships based on trust and results.',
      ctaText: 'Learn More About Us',
      imageUrl: '',
    },
    testimonials: {
      title: 'What Our Customers Say',
      subtitle: 'Don\'t just take our word for it',
      testimonials: [
        {
          quote:
            'This platform has transformed how we work. The efficiency gains have been incredible!',
          author: 'John Doe',
          role: 'CEO, Tech Company',
        },
        {
          quote:
            'Best investment we\'ve made. The ROI was visible within the first month.',
          author: 'Jane Smith',
          role: 'CTO, Startup Inc',
        },
        {
          quote:
            'Outstanding support and a product that just works. Highly recommended!',
          author: 'Mike Johnson',
          role: 'Founder, Digital Agency',
        },
      ],
    },
    pricing: {
      title: 'Choose Your Plan',
      subtitle: 'Select the perfect plan for your needs',
      plans: [
        {
          name: 'Starter',
          price: '29',
          period: 'mo',
          features: [
            'Up to 5 projects',
            '10GB storage',
            'Email support',
            'Basic analytics',
          ],
          ctaText: 'Get Started',
          featured: false,
        },
        {
          name: 'Professional',
          price: '79',
          period: 'mo',
          features: [
            'Unlimited projects',
            '100GB storage',
            'Priority support',
            'Advanced analytics',
            'API access',
          ],
          ctaText: 'Get Started',
          featured: true,
        },
        {
          name: 'Enterprise',
          price: '199',
          period: 'mo',
          features: [
            'Everything in Professional',
            'Unlimited storage',
            'Dedicated support',
            'Custom integrations',
            'SLA guarantee',
          ],
          ctaText: 'Contact Sales',
          featured: false,
        },
      ],
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know',
      faqs: [
        {
          question: 'How does the free trial work?',
          answer:
            'You get full access to all features for 14 days. No credit card required. Cancel anytime during the trial with no charges.',
        },
        {
          question: 'Can I change plans later?',
          answer:
            'Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate the billing.',
        },
        {
          question: 'What payment methods do you accept?',
          answer:
            'We accept all major credit cards, PayPal, and bank transfers for annual plans. All payments are processed securely.',
        },
        {
          question: 'Is there a setup fee?',
          answer:
            'No setup fees for any plan. What you see is what you pay, with transparent pricing and no hidden costs.',
        },
        {
          question: 'Do you offer refunds?',
          answer:
            'Yes, we offer a 30-day money-back guarantee. If you\'re not satisfied, contact us for a full refund.',
        },
      ],
    },
    contact: {
      title: 'Get In Touch',
      subtitle: 'We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.',
      nameLabel: 'Full Name',
      namePlaceholder: 'John Doe',
      emailLabel: 'Email Address',
      emailPlaceholder: 'john@example.com',
      messageLabel: 'Message',
      messagePlaceholder: 'Tell us about your project...',
      submitText: 'Send Message',
    },
    footer: {
      companyName: 'Company Name',
      description:
        'We provide innovative solutions to help businesses grow and succeed in the digital age.',
      email: 'contact@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Business St, Suite 100, City, State 12345',
      links: [
        { label: 'Home', url: '#' },
        { label: 'About', url: '#' },
        { label: 'Services', url: '#' },
        { label: 'Contact', url: '#' },
      ],
      copyright: '© 2024 Company Name. All rights reserved.',
    },
  };

  return defaults[type] || {};
};



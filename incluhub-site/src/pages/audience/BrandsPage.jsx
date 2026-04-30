import AudiencePageTemplate from './_AudiencePageTemplate'

const page = {
  label: 'Brands',
  title: 'For Brands',
  glow: 'rgba(201,169,110,0.07)',
  intro: 'IncluHub gives your brand direct access to India\'s most diverse talent network — models, creators, and influencers — with zero middlemen, powerful campaign tools, and data-driven results under one premium platform.',
  cta: 'Ready to scale your brand with IncluHub?',
  offerings: [
    { title: 'Complete Social Media Solutions', text: 'End-to-end social media management for your brand — from content strategy and creator partnerships to scheduled publishing and performance analytics. Build a consistent, premium presence across every platform.' },
    { title: 'Direct Talent Access', text: 'Browse and book from a verified, diverse roster of models and creators filtered by look, location, size, style, and audience reach. No agency fees, no gatekeepers — connect with the right talent instantly.' },
    { title: 'Branding and Marketing Solutions', text: 'From visual identity and campaign concepting to influencer-led brand storytelling — IncluHub provides integrated branding and marketing tools that elevate how your audience perceives and engages with your brand.' },
    { title: 'Advertising', text: 'Launch targeted advertising campaigns powered by authentic creator content. Leverage IncluHub\'s talent network to produce ad creatives that convert — across digital, social, and beyond.' },
    { title: 'Events', text: 'Plan, staff, and execute brand events with curated talent from the IncluHub ecosystem. From product launches and fashion shows to experiential activations — we provide the faces and the framework.' },
    { title: 'AI Solutions', text: 'Harness AI-powered tools including digital twin campaigns, automated talent matching, predictive analytics, and smart content generation — giving your brand an unfair advantage in speed and scale.' },
  ],
}

export default function BrandsPage() {
  return <AudiencePageTemplate page={page} />
}

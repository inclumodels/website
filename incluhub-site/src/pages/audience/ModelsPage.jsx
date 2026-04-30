import AudiencePageTemplate from './_AudiencePageTemplate'

const page = {
  label: 'Model',
  title: 'For Models',
  glow: 'rgba(122,23,40,0.07)',
  intro: 'IncluHub is built to launch, manage, and grow your modelling career — from your first digital portfolio to your first international booking. One platform, everything you need.',
  cta: 'Ready to build your career with IncluHub?',
  offerings: [
    { title: 'Digital Portfolio', text: 'Create a professional portfolio and comp card that lives online, gets discovered by agencies, and updates in real time. No printing costs, no waiting — your work is always ready to share.' },
    { title: 'Casting & Bookings', text: 'Get discovered by brands, photographers, and agencies actively casting through IncluHub. Submit directly to open calls, manage your bookings calendar, and track every opportunity in one place.' },
    { title: 'IncluTwin Identity', text: 'Build your AI-powered digital twin — a virtual replica that can attend brand deals, virtual runway shows, and online campaigns 24/7 while you focus on what matters most.' },
    { title: 'Brand Partnerships', text: 'Connect with fashion labels, lifestyle brands, and luxury houses looking for models that match their vision. IncluHub matches you based on your portfolio, aesthetic, and market fit.' },
    { title: 'Model Community', text: 'Join a private network of models, stylists, and makeup artists from across India. Share advice, find collaborators, and grow alongside a community that genuinely supports each other.' },
    { title: 'Training & Resources', text: 'Access guides, industry tips, and expert resources curated for Indian models navigating the fashion world — from posing techniques to contract basics to building your personal brand.' },
  ],
}

export default function ModelsPage() {
  return <AudiencePageTemplate page={page} />
}

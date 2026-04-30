import ProductPageTemplate from './_ProductPageTemplate'
import { SocialLogo } from '../../components/ui/ProductLogos'

const product = {
  name: 'IncluSocial',
  category: 'Social',
  description: 'Placeholder — describe the IncluSocial product in full detail here.',
  glowColor: 'rgba(200,196,188,0.04)',
  Logo: SocialLogo,
}

export default function SocialPage() {
  return <ProductPageTemplate product={product} />
}

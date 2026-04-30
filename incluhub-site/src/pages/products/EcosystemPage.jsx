import ProductPageTemplate from './_ProductPageTemplate'
import { EcosystemLogo } from '../../components/ui/ProductLogos'

const product = {
  name: 'IncluEcosystem',
  category: 'Ecosystem',
  description: 'Placeholder — describe the IncluEcosystem product in full detail here.',
  glowColor: 'rgba(200,169,106,0.06)',
  Logo: EcosystemLogo,
}

export default function EcosystemPage() {
  return <ProductPageTemplate product={product} />
}

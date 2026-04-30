import ProductPageTemplate from './_ProductPageTemplate'
import { TwinLogo } from '../../components/ui/ProductLogos'

const product = {
  name: 'IncluTwin',
  category: 'Twin',
  description: 'Placeholder — describe the IncluTwin product in full detail here.',
  glowColor: 'rgba(200,196,188,0.04)',
  Logo: TwinLogo,
}

export default function TwinPage() {
  return <ProductPageTemplate product={product} />
}

import ProductPageTemplate from './_ProductPageTemplate'
import { StoreLogo } from '../../components/ui/ProductLogos'

const product = {
  name: 'IncluStore',
  category: 'Store',
  description: 'Placeholder — describe the IncluStore product in full detail here.',
  glowColor: 'rgba(122,23,40,0.06)',
  Logo: StoreLogo,
}

export default function StorePage() {
  return <ProductPageTemplate product={product} />
}

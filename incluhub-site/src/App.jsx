import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import EcosystemPage from './pages/products/EcosystemPage'
import SocialPage from './pages/products/SocialPage'
import StorePage from './pages/products/StorePage'
import TwinPage from './pages/products/TwinPage'
import BrandsPage from './pages/audience/BrandsPage'
import CreatorsPage from './pages/audience/CreatorsPage'
import ModelsPage from './pages/audience/ModelsPage'
import BlogsPage from './pages/BlogsPage'
import JoinAgencyPage from './pages/JoinAgencyPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ecosystem" element={<EcosystemPage />} />
        <Route path="/social" element={<SocialPage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/twin" element={<TwinPage />} />
        <Route path="/brands" element={<BrandsPage />} />
        <Route path="/creators" element={<CreatorsPage />} />
        <Route path="/models" element={<ModelsPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/join-agency" element={<JoinAgencyPage />} />
      </Routes>
    </BrowserRouter>
  )
}

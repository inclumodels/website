import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
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

function ScrollToHash() {
  const location = useLocation()

  useEffect(() => {
    const hash = location.hash
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      return
    }

    const id = hash.replace('#', '')
    let rafId = null
    const startedAt = performance.now()

    const tryScroll = () => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }

      // Retry briefly for delayed mounts/animations.
      if (performance.now() - startedAt < 2500) {
        rafId = window.requestAnimationFrame(tryScroll)
      }
    }

    tryScroll()
    return () => {
      if (rafId != null) window.cancelAnimationFrame(rafId)
    }
  }, [location.pathname, location.hash])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
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

import { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import DedicatedManager from '../components/chat/DedicatedManager'
import HeroSection from '../sections/HeroSection'
import OriginSection from '../sections/OriginSection'
import PhilosophySection from '../sections/PhilosophySection'
import MobileSection from '../sections/MobileSection'
import ContactSection from '../sections/ContactSection'
import PolicySection from '../sections/PolicySection'
import TrustStripSection from '../sections/TrustStripSection'
import CtaBandSection from '../sections/CtaBandSection'

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false)
  const [introComplete, setIntroComplete] = useState(false)

  return (
    <>
      {introComplete ? <Navbar /> : null}
      <main style={{ paddingBottom: 0 }}>
        <HeroSection
          onOpenChat={() => setChatOpen(true)}
          onIntroStateChange={setIntroComplete}
        />
        {introComplete ? (
          <>
            <OriginSection />
            <PhilosophySection />
            <TrustStripSection />
            <MobileSection />
            <CtaBandSection onOpenChat={() => setChatOpen(true)} />
            <ContactSection />
            <PolicySection />
          </>
        ) : null}
      </main>
      {introComplete ? <Footer /> : null}
      <DedicatedManager isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  )
}

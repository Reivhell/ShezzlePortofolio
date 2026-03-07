'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import WelcomeScreen from '@/components/ui/WelcomeScreen'
import Navbar from '@/components/ui/Navbar'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import PortfolioSection from '@/components/sections/PortfolioSection'
import ContactSection from '@/components/sections/ContactSection'

export default function LandingPage() {
  const [showWelcome, setShowWelcome] = useState(true)

  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      {!showWelcome && (
        <>
          <Navbar />
          <main className="min-h-screen bg-[#030014]">
            <HeroSection />
            <AboutSection />
            <PortfolioSection />
            <ContactSection />
          </main>
        </>
      )}
    </>
  )
}

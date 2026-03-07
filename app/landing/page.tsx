'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import WelcomeScreen from '../components/WelcomeScreen'
import Navbar from '../components/Navbar'
import HeroSection from '../sections/HeroSection'
import AboutSection from '../sections/AboutSection'
import PortfolioSection from '../sections/PortfolioSection'
import ContactSection from '../sections/ContactSection'

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

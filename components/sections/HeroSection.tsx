'use client'

import { useState, useEffect, useCallback } from 'react'
import { Github, Linkedin, Mail, ExternalLink, Instagram, Sparkles } from 'lucide-react'
import Image from 'next/image'

const TYPING_SPEED = 100
const ERASING_SPEED = 50
const PAUSE_DURATION = 2000
const WORDS = ['Network & Telecom Student', 'Tech Enthusiast']
const TECH_STACK = ['React', 'Javascript', 'Node.js', 'Tailwind']
const SOCIAL_LINKS = [
  { icon: Github, link: 'https://github.com/Reivhell', label: 'GitHub Profile' },
  { icon: Linkedin, link: 'https://www.linkedin.com/in/-/', label: 'LinkedIn Profile' },
  { icon: Instagram, link: 'https://www.instagram.com/Sheznael', label: 'Instagram Profile' },
]

const StatusBadge = () => (
  <div className="inline-block animate-float">
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
      <div className="relative px-3 sm:px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
        <span className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-transparent bg-clip-text sm:text-sm text-[0.7rem] font-medium flex items-center">
          <Sparkles className="sm:w-4 sm:h-4 w-3 h-3 mr-2 text-blue-400" />
          Ready to Work
        </span>
      </div>
    </div>
  </div>
)

const MainTitle = () => (
  <div className="space-y-2">
    <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
          Fullstack & Mobile
        </span>
      </span>
      <br />
      <span className="relative inline-block mt-2">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
          Developer
        </span>
      </span>
    </h1>
  </div>
)

const TechStack = ({ tech }: { tech: string }) => (
  <div className="px-4 py-2 hidden sm:block rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition-colors">
    {tech}
  </div>
)

const CTAButton = ({
  href,
  text,
  icon: Icon,
}: {
  href: string
  text: string
  icon: React.ElementType
}) => (
  <a href={href}>
    <button className="group relative w-[160px]">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-700"></div>
      <div className="relative h-11 bg-[#030014] backdrop-blur-xl rounded-lg border border-white/10 leading-none overflow-hidden">
        <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-[#4f52c9]/20 to-[#8644c5]/20"></div>
        <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm group-hover:gap-3 transition-all duration-300">
          <span className="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent font-medium z-10">
            {text}
          </span>
          <Icon
            className={`w-4 h-4 text-gray-200 ${
              text === 'Contact'
                ? 'group-hover:translate-x-1'
                : 'group-hover:rotate-45'
            } transform transition-all duration-300 z-10`}
          />
        </span>
      </div>
    </button>
  </a>
)

const SocialLink = ({
  icon: Icon,
  link,
  label,
}: {
  icon: React.ElementType
  link: string
  label: string
}) => (
  <a href={link} target="_blank" rel="noopener noreferrer" aria-label={label}>
    <button className="group relative p-3" aria-label={label}>
      <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
      <div className="relative rounded-xl bg-black/50 backdrop-blur-xl p-2 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300">
        <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
      </div>
    </button>
  </a>
)

export default function HeroSection() {
  const [text, setText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isLoaded] = useState(true)

  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText((prev) => prev + WORDS[wordIndex][charIndex])
        setCharIndex((prev) => prev + 1)
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION)
      }
    } else {
      if (charIndex > 0) {
        setText((prev) => prev.slice(0, -1))
        setCharIndex((prev) => prev - 1)
      } else {
        setWordIndex((prev) => (prev + 1) % WORDS.length)
        setIsTyping(true)
      }
    }
  }, [charIndex, isTyping, wordIndex])

  useEffect(() => {
    const timeout = setTimeout(handleTyping, isTyping ? TYPING_SPEED : ERASING_SPEED)
    return () => clearTimeout(timeout)
  }, [handleTyping])

  return (
    <section
      id="Home"
      className="min-h-screen bg-[#030014] overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] pt-20"
    >
      <div
        className={`relative z-10 transition-all duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="container mx-auto min-h-[calc(100vh-5rem)]">
          <div className="flex flex-col lg:flex-row items-center justify-center min-h-[calc(100vh-5rem)] md:justify-between gap-8 lg:gap-12">
            {/* Left Column */}
            <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-left lg:text-left order-1 lg:order-1 lg:mt-0">
              <div className="space-y-4 sm:space-y-6">
                <StatusBadge />
                <MainTitle />

                {/* Typing Effect */}
                <div className="h-8 flex items-center">
                  <span className="text-xl md:text-2xl bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent font-light">
                    {text}
                  </span>
                  <span className="w-[3px] h-6 bg-gradient-to-t from-[#6366f1] to-[#a855f7] ml-1 animate-blink"></span>
                </div>

                {/* Description */}
                <p className="text-base md:text-lg text-gray-400 max-w-xl leading-relaxed font-light">
                  Menciptakan Aplikasi dan Website Yang Inovatif, Fungsional, dan User-Friendly.
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-3 justify-start">
                  {TECH_STACK.map((tech, index) => (
                    <TechStack key={index} tech={tech} />
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-row gap-3 w-full justify-start">
                  <CTAButton href="#Portofolio" text="Projects" icon={ExternalLink} />
                  <CTAButton href="#Contact" text="Contact" icon={Mail} />
                </div>

                {/* Social Links */}
                <div className="hidden sm:flex gap-4 justify-start">
                  {SOCIAL_LINKS.map((social, index) => (
                    <SocialLink key={index} {...social} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Animation */}
            <div className="w-full py-0 md:py-[10%] sm:py-0 lg:w-1/2 h-full flex items-center justify-center order-2 lg:order-2 mt-8 lg:mt-0">
              <div className="relative w-full max-w-md aspect-square">
                {/* Animated background rings */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[90%] h-[90%] border border-[#6366f1]/20 rounded-full animate-[spin_10s_linear_infinite]" />
                  <div className="absolute w-[75%] h-[75%] border border-[#a855f7]/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                  <div className="absolute w-[60%] h-[60%] border border-[#6366f1]/30 rounded-full animate-[spin_20s_linear_infinite]" />
                </div>

                {/* Main Image Container */}
                <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#6366f1]/10 to-[#a855f7]/10 backdrop-blur-sm p-4">
                  <div className="w-full h-full rounded-2xl overflow-hidden bg-[#0a0a1a]">
                    <Image
                      src="/photo.jpg"
                      alt="Hero Image"
                      fill
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                      priority
                    />
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 px-4 py-2 rounded-full bg-[#6366f1]/20 backdrop-blur-md border border-[#6366f1]/30 text-sm text-white animate-bounce">
                  React
                </div>
                <div className="absolute -bottom-4 -left-4 px-4 py-2 rounded-full bg-[#a855f7]/20 backdrop-blur-md border border-[#a855f7]/30 text-sm text-white animate-pulse">
                  TypeScript
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

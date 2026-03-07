'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { Code, Award, Globe, ArrowUpRight, Sparkles } from 'lucide-react'
import { createClient } from '@/lib/supabase'

const Header = () => (
  <div className="text-center lg:mb-8 mb-2 px-[5%]">
    <div className="inline-block relative group">
      <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
        About Me
      </h2>
    </div>
    <p className="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2">
      <Sparkles className="w-5 h-5 text-purple-400" />
      Menciptakan Aplikasi dan Website Yang Inovatif, Fungsional, dan User-Friendly.
      <Sparkles className="w-5 h-5 text-purple-400" />
    </p>
  </div>
)

const ProfileImage = () => (
  <div className="flex justify-center items-center p-4">
    <div className="relative group">
      <div className="absolute -inset-6 opacity-[25%] z-0 hidden sm:block">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600 rounded-full blur-2xl animate-spin-slower" />
        <div className="absolute inset-0 bg-gradient-to-l from-fuchsia-500 via-rose-500 to-pink-600 rounded-full blur-2xl animate-pulse-slow opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-cyan-500 to-teal-400 rounded-full blur-2xl animate-float opacity-50" />
      </div>

      <div className="relative">
        <div className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden shadow-[0_0_40px_rgba(120,119,198,0.3)] transform transition-all duration-700 group-hover:scale-105">
          <div className="absolute inset-0 border-4 border-white/20 rounded-full z-20 transition-all duration-700 group-hover:border-white/40 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10 transition-opacity duration-700 group-hover:opacity-0 hidden sm:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-blue-500/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden sm:block" />

          <Image
            src="/photo.jpg"
            alt="Profile"
            fill
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
            priority
          />

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 z-20 hidden sm:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/10 to-transparent transform translate-y-full group-hover:-translate-y-full transition-transform duration-1000 delay-100" />
            <div className="absolute inset-0 rounded-full border-8 border-white/10 scale-0 group-hover:scale-100 transition-transform duration-700 animate-pulse-slow" />
          </div>
        </div>
      </div>
    </div>
  </div>
)

interface StatCardProps {
  icon: React.ElementType
  color: string
  value: number
  label: string
  description: string
}

const StatCard = ({ icon: Icon, color, value, label, description }: StatCardProps) => (
  <div className="relative group">
    <div className="relative z-10 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between">
      <div className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10 transition-transform group-hover:rotate-6">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <span className="text-4xl font-bold text-white">{value}</span>
      </div>

      <div>
        <p className="text-sm uppercase tracking-wider text-gray-300 mb-2">{label}</p>
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400">{description}</p>
          <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
        </div>
      </div>
    </div>
  </div>
)

export default function AboutSection() {
  const [totalProjects, setTotalProjects] = useState(0)
  const [totalCertificates, setTotalCertificates] = useState(0)

  useEffect(() => {
    async function fetchStats() {
      const supabase = createClient()

      const [{ count: projectCount, error: projectError }, { count: certificateCount, error: certificateError }] = await Promise.all([
        supabase.from('projects').select('*', { count: 'exact', head: true }),
        supabase.from('certificates').select('*', { count: 'exact', head: true }),
      ])

      if (projectError) {
        console.error('Error fetching projects count:', projectError)
      }
      if (certificateError) {
        console.error('Error fetching certificates count:', certificateError)
      }
      
      if (projectCount !== null) setTotalProjects(projectCount)
      if (certificateCount !== null) setTotalCertificates(certificateCount)
    }

    fetchStats()
  }, [])

  const YearExperience = useMemo(() => {
    const startDate = new Date('2021-11-06')
    const today = new Date()
    return today.getFullYear() - startDate.getFullYear() -
      (today < new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate()) ? 1 : 0)
  }, [])

  const statsData = useMemo(() => {
    interface Stat {
      icon: React.ElementType
      color: string
      value: number
      label: string
      description: string
    }
    
    const stats: Stat[] = [
      {
        icon: Code,
        color: 'from-[#6366f1] to-[#a855f7]',
        value: totalProjects,
        label: 'Total Projects',
        description: 'Innovative web solutions crafted',
      },
      {
        icon: Award,
        color: 'from-[#a855f7] to-[#6366f1]',
        value: totalCertificates,
        label: 'Certificates',
        description: 'Professional skills validated',
      },
      {
        icon: Globe,
        color: 'from-[#6366f1] to-[#a855f7]',
        value: YearExperience,
        label: 'Years of Experience',
        description: 'Continuous learning journey',
      },
    ]
    return stats
  }, [totalProjects, totalCertificates, YearExperience])

  return (
    <section
      id="About"
      className="h-auto text-white overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] py-20 lg:py-24"
    >
      <Header />

      <div className="w-full mx-auto pt-8">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                Hello, I'm
              </span>
              <span className="block mt-2 text-gray-200">Ahmad David Alvees</span>
            </h2>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed text-justify pb-4 sm:pb-0">
              Saya adalah mahasiswa Teknik Informatika yang berfokus pada pengembangan Aplikasi dan Website Yang Inovatif, Fungsional, dan User-Friendly. 
            </p>

            {/* Quote Section */}
            <div className="relative bg-gradient-to-br from-[#6366f1]/5 via-transparent to-[#a855f7]/5 border border-[#6366f1]/30 rounded-2xl p-4 my-6 backdrop-blur-md shadow-2xl overflow-hidden">
              <div className="absolute top-2 right-4 w-16 h-16 bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-2 w-12 h-12 bg-gradient-to-r from-[#a855f7]/20 to-[#6366f1]/20 rounded-full blur-lg"></div>
              
              <div className="absolute top-3 left-4 text-[#6366f1] opacity-30">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
              </div>
              
              <blockquote className="text-gray-300 text-center lg:text-left italic font-medium text-sm relative z-10 pl-6">
                "Technology is not just a tool. It is the bridge between imagination and reality, transforming ideas into experiences that uplift the human spirit."
              </blockquote>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <a
                href="#Portofolio"
                className="group relative px-8 py-3 rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-medium overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  View Projects
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              </a>
              <a
                href="#Contact"
                className="group px-8 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-all duration-300"
              >
                Get in Touch
              </a>
            </div>
          </div>

          {/* Right Column - Profile Image */}
          <ProfileImage />
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {statsData.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import CardProject from '../components/CardProject'
import { Sparkles } from 'lucide-react'
import type { Project } from '@/types'

export default function PortfolioSection() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching projects:', error)
      } else if (data) {
        setProjects(data)
      }
      setLoading(false)
    }

    fetchProjects()
  }, [])

  return (
    <section id="Portofolio" className="py-20 px-[5%] sm:px-[5%] lg:px-[10%]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block relative group">
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
              My Projects
            </h2>
          </div>
          <p className="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            Innovative web solutions crafted with passion
            <Sparkles className="w-5 h-5 text-purple-400" />
          </p>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.length > 0 ? (
              projects.map((project) => (
                <CardProject
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  image={project.image_url}
                  link={project.demo_url}
                  slug={project.slug}
                />
              ))
            ) : (
              // Placeholder projects if no data from Supabase
              <>
                <CardProject
                  title="Portfolio Website"
                  description="Personal portfolio website built with Next.js and Tailwind CSS"
                  image="/Photo.jpg"
                  link="#"
                />
                <CardProject
                  title="Dashboard App"
                  description="Admin dashboard with real-time data visualization"
                  image="/Photo.jpg"
                  link="#"
                />
                <CardProject
                  title="E-commerce Platform"
                  description="Full-stack e-commerce solution with payment integration"
                  image="/Photo.jpg"
                />
              </>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

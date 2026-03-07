import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { ElementType } from 'react'
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Code2,
  Star,
  ChevronRight,
  Layers,
  Layout,
  Globe,
  Package,
  Cpu,
  Code
} from 'lucide-react'
import type { Project } from '@/types'
import { slugify } from '@/lib/utils'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

const TECH_ICONS: Record<string, ElementType> = {
  React: Globe,
  Tailwind: Layout,
  Express: Cpu,
  Python: Code,
  Javascript: Code,
  HTML: Code,
  CSS: Code,
  default: Package,
}

export async function generateStaticParams() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const { data: projects } = await supabase.from('projects').select('slug, title')

  return projects?.map((project) => ({
    slug: project.slug || slugify(project.title),
  })) || []
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!project) {
    return { title: 'Project Not Found' }
  }

  return {
    title: `${project.title} | Eki Zulfar Rachman`,
    description: project.description.slice(0, 155),
    openGraph: {
      title: project.title,
      description: project.description.slice(0, 155),
      images: project.image_url ? [project.image_url] : [],
    },
  }
}

function TechBadge({ tech }: { tech: string }) {
  const Icon = TECH_ICONS[tech] || TECH_ICONS.default
  return (
    <div className="group relative overflow-hidden px-3 py-2 md:px-4 md:py-2.5 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 cursor-default">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500" />
      <div className="relative flex items-center gap-1.5 md:gap-2">
        <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
        <span className="text-xs md:text-sm font-medium text-blue-300/90 group-hover:text-blue-200 transition-colors">
          {tech}
        </span>
      </div>
    </div>
  )
}

function FeatureItem({ feature }: { feature: string }) {
  return (
    <li className="group flex items-start space-x-3 p-2.5 md:p-3.5 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10">
      <div className="relative mt-2">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
        <div className="relative w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 group-hover:scale-125 transition-transform duration-300" />
      </div>
      <span className="text-sm md:text-base text-gray-300 group-hover:text-white transition-colors">
        {feature}
      </span>
    </li>
  )
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !project) {
    notFound()
  }

  const techStack = project.tech_stack || []
  const features = project.features || []

  return (
    <div className="min-h-screen bg-[#030014] px-4 sm:px-6 lg:px-8 relative overflow-hidden pt-24">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -inset-[10px] opacity-20">
          <div className="absolute top-0 -left-4 w-72 md:w-96 h-72 md:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
          <div className="absolute top-0 -right-4 w-72 md:w-96 h-72 md:h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 md:w-96 h-72 md:h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
        </div>
      </div>

      <div className="relative">
        <div className="max-w-7xl mx-auto px-0 py-8 md:py-12">
          {/* Breadcrumb */}
          <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-6 md:mb-8">
            <Link
              href="/#Portofolio"
              className="group inline-flex items-center space-x-1.5 md:space-x-2 px-3 md:px-5 py-2 md:py-2.5 bg-white/5 backdrop-blur-xl rounded-xl text-white/90 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 text-sm md:text-base"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back</span>
            </Link>
            <div className="flex items-center space-x-1 md:space-x-2 text-sm md:text-base text-white/50">
              <span>Projects</span>
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
              <span className="text-white/90 truncate">{project.title}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 md:gap-12">
            {/* Left Column */}
            <div className="space-y-6 md:space-y-8">
              <div className="space-y-4 md:space-y-6">
                <h1 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
                  {project.title}
                </h1>
                <div className="relative h-1 w-16 md:w-24">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm" />
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-base md:text-lg text-gray-300/90 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 md:gap-4 p-3 md:p-4 bg-[#0a0a1a] rounded-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 opacity-50 blur-2xl z-0" />
                <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-white/5 p-2 md:p-3 rounded-lg border border-blue-500/20">
                  <div className="bg-blue-500/20 p-1.5 md:p-2 rounded-full">
                    <Code2 className="text-blue-300 w-4 h-4 md:w-6 md:h-6" strokeWidth={1.5} />
                  </div>
                  <div className="flex-grow">
                    <div className="text-lg md:text-xl font-semibold text-blue-200">{techStack.length}</div>
                    <div className="text-[10px] md:text-xs text-gray-400">Technologies</div>
                  </div>
                </div>

                <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-white/5 p-2 md:p-3 rounded-lg border border-purple-500/20">
                  <div className="bg-purple-500/20 p-1.5 md:p-2 rounded-full">
                    <Layers className="text-purple-300 w-4 h-4 md:w-6 md:h-6" strokeWidth={1.5} />
                  </div>
                  <div className="flex-grow">
                    <div className="text-lg md:text-xl font-semibold text-purple-200">{features.length}</div>
                    <div className="text-[10px] md:text-xs text-gray-400">Features</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                {project.demo_url && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                )}
                {project.repo_url && (
                  <a
                    href={project.repo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-white/10 transition-all duration-300"
                  >
                    <Github className="w-4 h-4" />
                    <span>Source Code</span>
                  </a>
                )}
              </div>

              {/* Tech Stack */}
              <div className="space-y-4">
                <h3 className="text-lg md:text-xl font-semibold text-white flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-blue-400" />
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech: string) => (
                    <TechBadge key={tech} tech={tech} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="space-y-6">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <Image
                    src={project.image_url}
                    alt={project.title}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                </div>
              </div>

              {/* Features */}
              {features.length > 0 && (
                <div className="bg-[#0a0a1a] rounded-2xl p-6 border border-white/10">
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {features.map((feature: string, index: number) => (
                      <FeatureItem key={index} feature={feature} />
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

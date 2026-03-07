import { createClient } from '@/lib/supabase-server'
import Link from 'next/link'
import { Plus, ExternalLink, Pencil, Trash2 } from 'lucide-react'
import type { Project } from '@/types'

export default async function ProjectsPage() {
  const supabase = await createClient()
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching projects:', error)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-gray-400 text-sm mt-1">Manage your portfolio projects</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white rounded-lg hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {/* Projects Table */}
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Project</th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Tech Stack</th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Date</th>
              <th className="text-right text-gray-400 text-sm font-medium px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {projects && projects.length > 0 ? (
              projects.map((project: Project) => (
                <tr key={project.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-xl">
                        📁
                      </div>
                      <div>
                        <p className="text-white font-medium">{project.title}</p>
                        <p className="text-gray-500 text-sm truncate max-w-[200px]">{project.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {project.tech_stack?.slice(0, 3).map((tech, i) => (
                        <span key={i} className="px-2 py-0.5 text-xs bg-white/10 rounded-full text-gray-300">
                          {tech}
                        </span>
                      ))}
                      {project.tech_stack && project.tech_stack.length > 3 && (
                        <span className="px-2 py-0.5 text-xs bg-white/10 rounded-full text-gray-300">
                          +{project.tech_stack.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-400 text-sm">
                      {new Date(project.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/project/${project.slug}`}
                        target="_blank"
                        className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <button className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-blue-400 transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                  No projects found. Create your first project!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

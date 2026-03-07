import { createClient } from '@/lib/supabase-server'
import { Plus, ExternalLink, Pencil, Trash2 } from 'lucide-react'
import type { Certificate } from '@/types'
import Image from 'next/image'

export default async function CertificatesPage() {
  const supabase = await createClient()
  const { data: certificates, error } = await supabase
    .from('certificates')
    .select('*')
    .order('issue_date', { ascending: false })

  if (error) {
    console.error('Error fetching certificates:', error)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Certificates</h1>
          <p className="text-gray-400 text-sm mt-1">Manage your certificates and credentials</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white rounded-lg hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" />
          Add Certificate
        </button>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates && certificates.length > 0 ? (
          certificates.map((cert: Certificate) => (
            <div key={cert.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden group">
              <div className="aspect-[16/11] relative">
                <Image
                  src={cert.image_url}
                  alt={cert.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button className="p-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-medium truncate">{cert.title}</h3>
                <p className="text-gray-500 text-sm">{cert.issuer}</p>
                <p className="text-gray-600 text-xs mt-1">
                  {new Date(cert.issue_date).toLocaleDateString('id-ID', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-gray-500 bg-white/5 border border-white/10 rounded-xl">
            No certificates found. Add your first certificate!
          </div>
        )}
      </div>
    </div>
  )
}

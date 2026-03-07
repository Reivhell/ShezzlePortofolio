'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Maximize2, X } from 'lucide-react'

interface CertificateProps {
  image: string
  title: string
}

export default function Certificate({ image, title }: CertificateProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Thumbnail */}
      <div
        className="relative overflow-hidden rounded-xl cursor-pointer group"
        onClick={() => setIsOpen(true)}
      >
        <div className="relative aspect-[16/11.5]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover filter contrast-110 brightness-90 saturate-110 group-hover:contrast-105 group-hover:brightness-100 transition-all duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <Maximize2 className="w-10 h-10 mx-auto mb-2" />
            <p className="text-sm font-medium">View Certificate</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setIsOpen(false)}
        >
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors z-10"
            onClick={() => setIsOpen(false)}
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative max-w-full max-h-[90vh]">
            <Image
              src={image}
              alt={title}
              width={1200}
              height={800}
              className="max-w-full max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  )
}

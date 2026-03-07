import Link from 'next/link'
import { Home, AlertTriangle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#030014] text-white px-4">
      <div className="text-center space-y-6">
        <div className="relative inline-block">
          <div className="absolute -inset-4 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full blur-2xl opacity-30" />
          <AlertTriangle className="relative w-16 h-16 sm:w-20 sm:h-20 text-indigo-400 mx-auto" />
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
          404
        </h1>

        <h2 className="text-xl sm:text-2xl font-semibold text-white">Page Not Found</h2>

        <p className="text-gray-400 max-w-md mx-auto text-sm sm:text-base">
          The page you are looking for does not exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white rounded-xl hover:opacity-90 transition-opacity text-sm sm:text-base"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}

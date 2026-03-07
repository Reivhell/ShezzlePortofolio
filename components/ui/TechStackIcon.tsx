'use client'

interface TechStackIconProps {
  name: string
}

const techIcons: Record<string, string> = {
  'React': '⚛️',
  'JavaScript': '📜',
  'TypeScript': '🔷',
  'Node.js': '🟢',
  'Tailwind': '🌊',
  'Next.js': '▲',
  'Python': '🐍',
  'HTML': '📄',
  'CSS': '🎨',
}

export default function TechStackIcon({ name }: TechStackIconProps) {
  const icon = techIcons[name] || '💻'
  
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">
      <span>{icon}</span>
      <span>{name}</span>
    </div>
  )
}

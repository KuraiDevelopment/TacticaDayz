import { ReactNode } from 'react'

interface FeatureCardProps {
  title: string
  description: string
  icon: ReactNode
}

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-orange-500/40 transition-all duration-300 transform hover:scale-105 group">
      <div className="text-orange-500 mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-white mb-3 group-hover:text-orange-500 transition-colors text-center">
        {title}
      </h3>
      <p className="text-gray-400 leading-relaxed text-sm text-center">
        {description}
      </p>
    </div>
  )
}
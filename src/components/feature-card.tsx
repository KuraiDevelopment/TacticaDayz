interface FeatureCardProps {
  title: string
  description: string
  icon: string
}

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="bg-gray-800/50 p-6 rounded-xl border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 transform hover:scale-105 group">
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors">
        {title}
      </h3>
      <p className="text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
  )
}
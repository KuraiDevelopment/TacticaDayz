'use client'

interface CommunityLink {
  name: string
  url: string
  icon: string
  description: string
  color: string
}

export function CommunityLinks() {
  const links: CommunityLink[] = [
    {
      name: 'Discord',
      url: 'https://discord.gg/tacticadayz',
      icon: '💬',
      description: 'Join our Discord for real-time chat and support',
      color: 'hover:bg-blue-600'
    },
    {
      name: 'Steam Group',
      url: 'https://steamcommunity.com/groups/tacticadayz',
      icon: '🎮',
      description: 'Follow our Steam group for updates and events',
      color: 'hover:bg-gray-700'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/tacticadayz',
      icon: '🐦',
      description: 'Get the latest news and announcements',
      color: 'hover:bg-blue-500'
    },
    {
      name: 'Forums',
      url: 'https://forums.tacticadayz.com',
      icon: '📋',
      description: 'Discuss strategies and report issues',
      color: 'hover:bg-orange-600'
    }
  ]

  const handleLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {links.map((link) => (
        <button
          key={link.name}
          onClick={() => handleLinkClick(link.url)}
          className={`bg-gray-800/50 p-6 rounded-xl border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 transform hover:scale-105 ${link.color} group`}
        >
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
            {link.icon}
          </div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-500 transition-colors">
            {link.name}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            {link.description}
          </p>
        </button>
      ))}
    </div>
  )
}
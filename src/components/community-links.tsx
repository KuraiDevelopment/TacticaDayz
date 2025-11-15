'use client'

import { 
  MessageCircle, 
  Users2, 
  Twitter, 
  BookOpen,
  ExternalLink 
} from 'lucide-react'

interface CommunityLink {
  name: string
  url: string
  icon: React.ReactNode
  description: string
  color: string
}

export function CommunityLinks() {
  const links: CommunityLink[] = [
    {
      name: 'Discord',
      url: 'https://discord.gg/mm4mSdq3Pd',
      icon: <MessageCircle className="w-6 h-6" />,
      description: 'Join our Discord for real-time chat, support, and community events',
      color: 'hover:bg-blue-600/20 border-blue-600/30'
    },
    {
      name: 'Steam Group',
      url: 'https://steamcommunity.com/groups/tacticadayz',
      icon: <Users2 className="w-6 h-6" />,
      description: 'Follow our Steam group for server updates and announcements',
      color: 'hover:bg-gray-600/20 border-gray-600/30'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/tacticadayz',
      icon: <Twitter className="w-6 h-6" />,
      description: 'Stay updated with the latest news and server status',
      color: 'hover:bg-blue-500/20 border-blue-500/30'
    },
    {
      name: 'Forums',
      url: 'https://forums.tacticadayz.com',
      icon: <BookOpen className="w-6 h-6" />,
      description: 'Discuss strategies, share experiences, and get support',
      color: 'hover:bg-orange-600/20 border-orange-600/30'
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
          className={`bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 transition-all duration-300 text-left group ${link.color}`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="text-orange-500 group-hover:scale-110 transition-transform">
              {link.icon}
            </div>
            <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-gray-300 transition-colors" />
          </div>
          <h3 className="font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">
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
'use client'

import { useState } from 'react'
import { 
  Shield, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Sword,
  Home,
  MessageCircle,
  Zap
} from 'lucide-react'

interface Rule {
  id: number
  title: string
  description: string
  severity: 'warning' | 'ban' | 'kick'
  icon: React.ReactNode
}

export default function ServerRules() {
  const [selectedCategory, setSelectedCategory] = useState<'general' | 'pvp' | 'building' | 'communication'>('general')

  const ruleCategories = {
    general: {
      title: 'General Rules',
      icon: <Shield className="w-6 h-6" />,
      rules: [
        {
          id: 1,
          title: 'No Cheating or Exploiting',
          description: 'Use of any third-party software, glitches, duplication exploits, or game modifications that provide unfair advantages is strictly prohibited.',
          severity: 'ban' as const,
          icon: <XCircle className="w-5 h-5" />
        },
        {
          id: 2,
          title: 'Respect All Players',
          description: 'Harassment, discrimination, or toxic behavior based on race, gender, religion, or any other factor will not be tolerated.',
          severity: 'ban' as const,
          icon: <Users className="w-5 h-5" />
        },
        {
          id: 3,
          title: 'No Real Money Trading',
          description: 'Trading in-game items, vehicles, or currency for real money or external rewards is forbidden.',
          severity: 'ban' as const,
          icon: <XCircle className="w-5 h-5" />
        },
        {
          id: 4,
          title: 'English Only in Global Chat',
          description: 'Global communications must be in English. Use direct communication or group chat for other languages.',
          severity: 'warning' as const,
          icon: <MessageCircle className="w-5 h-5" />
        },
        {
          id: 5,
          title: 'Report Bugs Appropriately',
          description: 'Report any game-breaking bugs or exploits to administrators immediately. Do not abuse or share exploits.',
          severity: 'warning' as const,
          icon: <CheckCircle className="w-5 h-5" />
        }
      ]
    },
    pvp: {
      title: 'PvP & Combat Rules',
      icon: <Sword className="w-6 h-6" />,
      rules: [
        {
          id: 6,
          title: 'Safezone Violations',
          description: 'No hostile actions, looting, or PvP within designated safezones. This includes trader areas and spawn zones.',
          severity: 'ban' as const,
          icon: <Shield className="w-5 h-5" />
        },
        {
          id: 7,
          title: 'No Combat Logging',
          description: 'Disconnecting during combat, being unconscious, or while restrained is prohibited. Wait 15 minutes after combat before logging out.',
          severity: 'kick' as const,
          icon: <AlertTriangle className="w-5 h-5" />
        },
        {
          id: 8,
          title: 'Group Size Limits',
          description: 'Maximum group size is 6 players. Trading between groups is allowed but no alliances are permitted.',
          severity: 'warning' as const,
          icon: <Users className="w-5 h-5" />
        },
        {
          id: 9,
          title: 'No Spawn Killing',
          description: 'Killing fresh spawns or camping spawn areas is prohibited. Allow new players reasonable time to gear up.',
          severity: 'kick' as const,
          icon: <XCircle className="w-5 h-5" />
        },
        {
          id: 10,
          title: 'Airdrop Camping Rules',
          description: 'Excessive camping of airdrop sites for extended periods is discouraged. Engage in fair competition for airdrops.',
          severity: 'warning' as const,
          icon: <Zap className="w-5 h-5" />
        }
      ]
    },
    building: {
      title: 'Base Building & Territory',
      icon: <Home className="w-6 h-6" />,
      rules: [
        {
          id: 11,
          title: 'No Glitch Building',
          description: 'Building inside rocks, trees, or using exploits to create unreachable bases is forbidden. Bases must be accessible.',
          severity: 'ban' as const,
          icon: <XCircle className="w-5 h-5" />
        },
        {
          id: 12,
          title: 'Reasonable Base Size',
          description: 'Bases should be reasonable in size. No massive compounds that block significant map areas or resources.',
          severity: 'warning' as const,
          icon: <Home className="w-5 h-5" />
        },
        {
          id: 13,
          title: 'Hidden Stash Limits',
          description: 'Maximum of 3 hidden stashes per group. Stashes must not be placed in exploit locations or unreachable areas.',
          severity: 'warning' as const,
          icon: <CheckCircle className="w-5 h-5" />
        },
        {
          id: 14,
          title: 'Base Raiding Guidelines',
          description: 'Base raiding is encouraged but must be done through legitimate means. No ghosting, glitching, or exploiting.',
          severity: 'kick' as const,
          icon: <Shield className="w-5 h-5" />
        },
        {
          id: 15,
          title: 'Inactive Base Removal',
          description: 'Bases inactive for 14+ days may be removed by administrators. Keep your base active by regular visits.',
          severity: 'warning' as const,
          icon: <AlertTriangle className="w-5 h-5" />
        }
      ]
    },
    communication: {
      title: 'Communication & RP',
      icon: <MessageCircle className="w-6 h-6" />,
      rules: [
        {
          id: 16,
          title: 'No Meta Gaming',
          description: 'Do not use information obtained outside of in-game means to gain advantages. Discord calls during gameplay are discouraged.',
          severity: 'kick' as const,
          icon: <XCircle className="w-5 h-5" />
        },
        {
          id: 17,
          title: 'Voice Chat Proximity',
          description: 'In-game voice chat should be used for immersion. Avoid breaking character or discussing out-of-game topics in direct chat.',
          severity: 'warning' as const,
          icon: <MessageCircle className="w-5 h-5" />
        },
        {
          id: 18,
          title: 'No Excessive Trolling',
          description: 'Light roleplay and banter are welcome, but excessive trolling, griefing, or harassment is prohibited.',
          severity: 'kick' as const,
          icon: <Users className="w-5 h-5" />
        },
        {
          id: 19,
          title: 'Admin Impersonation',
          description: 'Impersonating server administrators or claiming special privileges is strictly forbidden.',
          severity: 'ban' as const,
          icon: <Shield className="w-5 h-5" />
        },
        {
          id: 20,
          title: 'Constructive Feedback',
          description: 'Provide constructive feedback about server issues through proper channels. Avoid constant complaining in global chat.',
          severity: 'warning' as const,
          icon: <CheckCircle className="w-5 h-5" />
        }
      ]
    }
  }

  const getSeverityInfo = (severity: string) => {
    switch (severity) {
      case 'ban':
        return { color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/30', text: 'Permanent Ban' }
      case 'kick':
        return { color: 'text-orange-400', bg: 'bg-orange-500/20', border: 'border-orange-500/30', text: 'Kick/Temp Ban' }
      case 'warning':
        return { color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/30', text: 'Warning' }
      default:
        return { color: 'text-gray-400', bg: 'bg-gray-500/20', border: 'border-gray-500/30', text: 'Info' }
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-md z-50 border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-red-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">TD</span>
              </div>
              <h1 className="text-2xl font-bold text-white">Tactica DayZ</h1>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a>
              <a href="/rules" className="text-white transition-colors">Server Rules</a>
              <a href="#community" className="text-gray-300 hover:text-white transition-colors">Community</a>
              <a href="/admin" className="text-gray-300 hover:text-white transition-colors">Admin</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-24 pb-12 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Server <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">Rules</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Essential guidelines for a fair and immersive survival experience
            </p>
            <p className="text-gray-400 max-w-3xl mx-auto">
              These rules ensure everyone can enjoy the authentic DayZ experience. Violations may result in warnings, kicks, or permanent bans depending on severity. 
              When in doubt, contact an administrator.
            </p>
          </div>
        </div>
      </section>

      {/* Rule Categories */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          {/* Category Selector */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-800/50 backdrop-blur-sm p-2 rounded-xl border border-gray-700">
              <div className="flex space-x-2">
                {Object.entries(ruleCategories).map(([key, category]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      selectedCategory === key
                        ? 'bg-gradient-to-r from-orange-600 to-red-700 text-white shadow-lg'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    {category.icon}
                    <span className="hidden sm:inline">{category.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Selected Category Rules */}
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                {ruleCategories[selectedCategory].icon}
                <h2 className="text-3xl font-bold text-white">
                  {ruleCategories[selectedCategory].title}
                </h2>
              </div>
            </div>

            <div className="grid gap-6">
              {ruleCategories[selectedCategory].rules.map((rule) => {
                const severityInfo = getSeverityInfo(rule.severity)
                return (
                  <div
                    key={rule.id}
                    className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 text-orange-500 mt-1">
                        {rule.icon}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">
                            {rule.title}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${severityInfo.bg} ${severityInfo.border} ${severityInfo.color} border`}>
                            {severityInfo.text}
                          </span>
                        </div>
                        <p className="text-gray-300 leading-relaxed">
                          {rule.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Enforcement Info */}
      <section className="py-16 px-6 bg-gray-900/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Rule Enforcement
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-500/30">
                <AlertTriangle className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold text-yellow-400 mb-2">Warning</h3>
              <p className="text-gray-400 text-sm">
                First-time minor violations result in warnings. Multiple warnings may lead to temporary restrictions.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-orange-500/30">
                <XCircle className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-orange-400 mb-2">Kick/Temp Ban</h3>
              <p className="text-gray-400 text-sm">
                Moderate violations or repeated warnings result in temporary bans (1 hour to 7 days).
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/30">
                <Shield className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-red-400 mb-2">Permanent Ban</h3>
              <p className="text-gray-400 text-sm">
                Serious violations like cheating, harassment, or repeated offenses result in permanent server bans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 px-6">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl font-bold text-white mb-6">
            Questions or Appeals?
          </h2>
          <p className="text-gray-400 mb-8">
            If you have questions about these rules or need to appeal a punishment, contact our administration team through the appropriate channels.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://discord.gg/mm4mSdq3Pd" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-600/20 hover:bg-blue-600/30 border border-blue-600/30 text-blue-400 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              Join Discord
            </a>
            <a 
              href="mailto:admin@tacticadayz.com"
              className="bg-gray-800/50 hover:bg-gray-700 border border-gray-600 text-gray-300 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              Email Admins
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-800 bg-black/50">
        <div className="container mx-auto text-center">
          <p className="text-gray-500">
            © 2024 Tactica DayZ. All rights reserved. DayZ is a trademark of Bohemia Interactive.
          </p>
        </div>
      </footer>
    </main>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { ServerStatus } from '@/components/server-status'
import { FeatureCard } from '@/components/feature-card'
import { CommunityLinks } from '@/components/community-links'
import { 
  Shield, 
  Users, 
  Truck, 
  Plane, 
  ShoppingCart, 
  Home as HomeIcon, 
  Package, 
  Hammer 
} from 'lucide-react'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
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
              <a href="#home" className="text-gray-300 hover:text-white transition-colors">Home</a>
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#server" className="text-gray-300 hover:text-white transition-colors">Servers</a>
              <a href="/rules" className="text-gray-300 hover:text-white transition-colors">Rules</a>
              <a href="#community" className="text-gray-300 hover:text-white transition-colors">Community</a>
              <a href="/admin" className="text-gray-300 hover:text-white transition-colors">Admin</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-12 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className={`text-5xl md:text-7xl font-bold text-white mb-6 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              Tactica <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">DayZ</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Vanilla+ Survival Experience
            </p>
            <p className="text-lg text-gray-400 mb-10 max-w-3xl mx-auto">
              Experience authentic DayZ survival with carefully crafted enhancements. Navigate hostile territories, 
              forge alliances, and survive against all odds in our balanced Vanilla+ environment featuring dynamic airdrops, 
              secure trading zones, and strategic group systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105">
                Connect to Server
              </button>
              <a 
                href="/rules"
                className="border border-gray-600 text-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 hover:border-gray-500 transition-all duration-300 text-center"
              >
                Server Rules
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Server Status */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          <ServerStatus />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-4">
            Vanilla+ Features
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Enhanced DayZ experience with carefully balanced additions that preserve the core survival atmosphere
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              title="Group System"
              description="Form alliances and coordinate with your team using our integrated group management system for enhanced tactical gameplay."
              icon={<Users className="w-8 h-8" />}
            />
            <FeatureCard
              title="Custom Armors"
              description="Discover unique protective gear and tactical equipment designed to enhance survivability without breaking immersion."
              icon={<Shield className="w-8 h-8" />}
            />
            <FeatureCard
              title="Dynamic Airdrops"
              description="High-value supply drops appear at random locations, creating intense PvP hotspots and strategic opportunities."
              icon={<Plane className="w-8 h-8" />}
            />
            <FeatureCard
              title="Trader Safezone"
              description="Secure trading areas where survivors can safely exchange goods, plan expeditions, and interact with other players."
              icon={<ShoppingCart className="w-8 h-8" />}
            />
            <FeatureCard
              title="Gassed Black Market"
              description="Venture into contaminated zones to access exclusive black market traders offering rare and powerful items."
              icon={<Package className="w-8 h-8" />}
            />
            <FeatureCard
              title="Custom Vehicles"
              description="Enhanced vehicle selection with improved mechanics, maintenance requirements, and unique transportation options."
              icon={<Truck className="w-8 h-8" />}
            />
            <FeatureCard
              title="Hidden Stashes"
              description="Discover secret supply caches and underground storage locations scattered across Chernarus and Livonia."
              icon={<Package className="w-8 h-8" />}
            />
            <FeatureCard
              title="Vanilla Base Building"
              description="Classic DayZ base construction with enhanced stability, improved mechanics, and expanded building options."
              icon={<HomeIcon className="w-8 h-8" />}
            />
          </div>
        </div>
      </section>

      {/* Server Information */}
      <section id="server" className="py-16 px-6 bg-gray-900/50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Server Information
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
              <h3 className="text-2xl font-bold text-orange-500 mb-6">Server Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Server Name:</span>
                  <span className="text-white font-semibold">Tactica DayZ | Vanilla+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Maps:</span>
                  <span className="text-white">Chernarus • Livonia</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Max Players:</span>
                  <span className="text-white">60 per server</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Restart Schedule:</span>
                  <span className="text-white">Every 4 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Perspective:</span>
                  <span className="text-white">1PP/3PP</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
              <h3 className="text-2xl font-bold text-orange-500 mb-6">Connection Info</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-gray-400 block mb-1">Chernarus Server:</span>
                  <div className="flex items-center gap-2">
                    <code className="bg-gray-900 px-3 py-2 rounded text-orange-400 font-mono text-sm flex-1">
                      79.127.242.122:11630
                    </code>
                    <button 
                      onClick={() => copyToClipboard('79.127.242.122:11630')}
                      className="text-gray-400 hover:text-orange-400 transition-colors p-2"
                      title="Copy IP"
                    >
                      <Package className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div>
                  <span className="text-gray-400 block mb-1">Livonia Server:</span>
                  <div className="flex items-center gap-2">
                    <code className="bg-gray-900 px-3 py-2 rounded text-orange-400 font-mono text-sm flex-1">
                      205.209.101.156:2402
                    </code>
                    <button 
                      onClick={() => copyToClipboard('205.209.101.156:2402')}
                      className="text-gray-400 hover:text-orange-400 transition-colors p-2"
                      title="Copy IP"
                    >
                      <Package className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div>
                  <span className="text-gray-400 block mb-1">Steam Connect:</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => window.open('steam://connect/79.127.242.122:11630', '_blank')}
                      className="bg-blue-600/80 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors flex-1"
                    >
                      Chernarus
                    </button>
                    <button 
                      onClick={() => window.open('steam://connect/205.209.101.156:2402', '_blank')}
                      className="bg-green-600/80 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors flex-1"
                    >
                      Livonia
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            Join Our Community
          </h2>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
            Connect with fellow survivors, coordinate strategies, and stay updated with server events and announcements.
          </p>
          <CommunityLinks />
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

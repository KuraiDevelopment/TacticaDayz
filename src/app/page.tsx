'use client'

import { useState, useEffect } from 'react'
import { ServerStatus } from '@/components/server-status'
import { FeatureCard } from '@/components/feature-card'
import { CommunityLinks } from '@/components/community-links'

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
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-orange-500/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">TD</span>
              </div>
              <h1 className="text-2xl font-bold text-white">Tactica DayZ</h1>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-300 hover:text-orange-500 transition-colors">Home</a>
              <a href="#features" className="text-gray-300 hover:text-orange-500 transition-colors">Features</a>
              <a href="#server" className="text-gray-300 hover:text-orange-500 transition-colors">Server Info</a>
              <a href="#community" className="text-gray-300 hover:text-orange-500 transition-colors">Community</a>
              <a href="/admin" className="text-gray-300 hover:text-orange-500 transition-colors">Admin</a>
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
              A Vanilla+ Experience
            </p>
            <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
              Experience DayZ as it was meant to be played. Enhanced but not overpowered. 
              Tactical gameplay with carefully balanced modifications for the ultimate survival experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105">
                Join Server
              </button>
              <button className="border border-orange-500 text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300">
                View Rules
              </button>
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
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Server Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Vanilla+ Experience"
              description="Enhanced vanilla gameplay with carefully selected mods that maintain the core DayZ experience while improving quality of life."
              icon="🎯"
            />
            <FeatureCard
              title="Enhanced Vehicles"
              description="Improved vehicle mechanics and additional vehicle types for better transportation and tactical gameplay."
              icon="🚗"
            />
            <FeatureCard
              title="Base Building+"
              description="Advanced base building options with additional materials and structures while maintaining balance."
              icon="🏠"
            />
            <FeatureCard
              title="Medical System"
              description="Enhanced medical system with more realistic treatment options and improved injury mechanics."
              icon="🏥"
            />
            <FeatureCard
              title="Weapon Variety"
              description="Expanded weapon selection with balanced additions that fit the DayZ atmosphere."
              icon="🔫"
            />
            <FeatureCard
              title="Active Admins"
              description="Dedicated admin team ensuring fair play and quick response to issues 24/7."
              icon="🛡️"
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
            <div className="bg-gray-800/50 p-8 rounded-xl border border-orange-500/20">
              <h3 className="text-2xl font-bold text-orange-500 mb-6">Server Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Server Name:</span>
                  <span className="text-white font-semibold">Tactica DayZ | Vanilla+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Map:</span>
                  <span className="text-white">Chernarus</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Max Players:</span>
                  <span className="text-white">60</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Restart Schedule:</span>
                  <span className="text-white">Every 4 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Perspective:</span>
                  <span className="text-white">1st/3rd Person</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 p-8 rounded-xl border border-orange-500/20">
              <h3 className="text-2xl font-bold text-orange-500 mb-6">Connection Info</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-gray-400 block mb-1">Chernarus Server IP:</span>
                  <div className="flex items-center gap-2">
                    <code className="bg-gray-900 px-3 py-2 rounded text-orange-400 font-mono text-sm">
                      205.209.101.156:2302
                    </code>
                    <button 
                      onClick={() => copyToClipboard('205.209.101.156:2302')}
                      className="text-orange-500 hover:text-orange-400 transition-colors"
                      title="Copy IP"
                    >
                      📋
                    </button>
                  </div>
                </div>
                <div>
                  <span className="text-gray-400 block mb-1">Livonia Server IP:</span>
                  <div className="flex items-center gap-2">
                    <code className="bg-gray-900 px-3 py-2 rounded text-orange-400 font-mono text-sm">
                      205.209.101.156:2402
                    </code>
                    <button 
                      onClick={() => copyToClipboard('205.209.101.156:2402')}
                      className="text-orange-500 hover:text-orange-400 transition-colors"
                      title="Copy IP"
                    >
                      📋
                    </button>
                  </div>
                </div>
                <div>
                  <span className="text-gray-400 block mb-1">Steam Connect:</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => window.open('steam://connect/205.209.101.156:2302', '_blank')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
                    >
                      Chernarus
                    </button>
                    <button 
                      onClick={() => window.open('steam://connect/205.209.101.156:2402', '_blank')}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
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
            Connect with fellow survivors, get support, and stay updated with server news and events.
          </p>
          <CommunityLinks />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-800">
        <div className="container mx-auto text-center">
          <p className="text-gray-500">
            © 2024 Tactica DayZ. All rights reserved. DayZ is a trademark of Bohemia Interactive.
          </p>
        </div>
      </footer>
    </main>
  )
}

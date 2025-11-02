'use client'

import { useState, useEffect } from 'react'

interface ServerInfo {
  status: 'online' | 'offline'
  players: number
  maxPlayers: number
  map: string
  uptime: string
}

export function ServerStatus() {
  const [serverInfo, setServerInfo] = useState<ServerInfo>({
    status: 'offline',
    players: 0,
    maxPlayers: 60,
    map: 'Chernarus',
    uptime: '0h 0m'
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate server status check
    const checkServerStatus = () => {
      // In a real implementation, this would make an API call to check server status
      setTimeout(() => {
        setServerInfo({
          status: Math.random() > 0.1 ? 'online' : 'offline', // 90% chance online
          players: Math.floor(Math.random() * 45) + 5, // Random players between 5-50
          maxPlayers: 60,
          map: 'Chernarus',
          uptime: `${Math.floor(Math.random() * 24)}h ${Math.floor(Math.random() * 60)}m`
        })
        setLoading(false)
      }, 1500)
    }

    checkServerStatus()
    const interval = setInterval(checkServerStatus, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const statusColor = serverInfo.status === 'online' ? 'text-green-500' : 'text-red-500'
  const statusBg = serverInfo.status === 'online' ? 'bg-green-500/20' : 'bg-red-500/20'
  const statusBorder = serverInfo.status === 'online' ? 'border-green-500/30' : 'border-red-500/30'

  return (
    <div className="bg-gray-800/50 p-8 rounded-xl border border-orange-500/20 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Server Status</h2>
        <div className={`px-3 py-1 rounded-full border ${statusBg} ${statusBorder}`}>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${serverInfo.status === 'online' ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
            <span className={`text-sm font-medium ${statusColor}`}>
              {loading ? 'Checking...' : serverInfo.status.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-2/3"></div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          <div>
            <span className="text-gray-400 text-sm">Players Online</span>
            <p className="text-2xl font-bold text-white">
              {serverInfo.players}/{serverInfo.maxPlayers}
            </p>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div 
                className="bg-gradient-to-r from-orange-500 to-red-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(serverInfo.players / serverInfo.maxPlayers) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <span className="text-gray-400 text-sm">Current Map</span>
            <p className="text-xl font-semibold text-white">{serverInfo.map}</p>
          </div>
          
          <div>
            <span className="text-gray-400 text-sm">Uptime</span>
            <p className="text-xl font-semibold text-white">{serverInfo.uptime}</p>
          </div>
          
          <div>
            <span className="text-gray-400 text-sm">Queue</span>
            <p className="text-xl font-semibold text-white">0</p>
          </div>
        </div>
      )}

      <div className="mt-6 pt-6 border-t border-gray-700">
        <button 
          onClick={() => window.open('steam://connect/play.tacticadayz.com:2302', '_blank')}
          className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-[1.02]"
        >
          Connect to Server
        </button>
      </div>
    </div>
  )
}
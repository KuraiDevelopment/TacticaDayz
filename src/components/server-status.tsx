'use client'

import { useState, useEffect } from 'react'

interface ServerInfo {
  status: 'online' | 'offline' | 'unknown'
  players: number
  maxPlayers: number
  map: string
  uptime: string
  gamePort: string
  queryPort: string
  rconPort: string
  ip: string
}

const SERVER_CONFIG = {
  chernarus: {
    ip: '205.209.101.156',
    gamePort: '2302',
    queryPort: '2303', 
    rconPort: '2305',
    map: 'Chernarus',
    maxPlayers: 60
  },
  livonia: {
    ip: '205.209.101.156',
    gamePort: '2402',
    queryPort: '2403',
    rconPort: '2405', 
    map: 'Livonia',
    maxPlayers: 60
  }
}

export function ServerStatus() {
  const [selectedServer, setSelectedServer] = useState<'chernarus' | 'livonia'>('chernarus')
  const [serverInfo, setServerInfo] = useState<ServerInfo>({
    status: 'offline',
    players: 0,
    maxPlayers: 60,
    map: 'Chernarus',
    uptime: '0h 0m',
    gamePort: '2302',
    queryPort: '2303',
    rconPort: '2305',
    ip: '205.209.101.156'
  })
  const [loading, setLoading] = useState(true)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const connectToServer = (ip: string, port: string) => {
    window.open(`steam://connect/${ip}:${port}`, '_blank')
  }

  useEffect(() => {
    // Fetch real server status from API
    const checkServerStatus = async () => {
      try {
        const response = await fetch(`/api/server-status?server=${selectedServer}`)
        const data = await response.json()
        
        setServerInfo({
          status: data.status === 'online' ? 'online' : 'offline',
          players: data.players || 0,
          maxPlayers: data.maxPlayers || 60,
          map: data.map,
          uptime: data.uptime || 'Unknown',
          gamePort: selectedServer === 'chernarus' ? '2302' : '2402',
          queryPort: selectedServer === 'chernarus' ? '2303' : '2403',
          rconPort: selectedServer === 'chernarus' ? '2305' : '2405',
          ip: data.ip || '205.209.101.156'
        })
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch server status:', error)
        // Fallback to mock data
        const config = SERVER_CONFIG[selectedServer]
        setServerInfo({
          status: 'unknown',
          players: 0,
          maxPlayers: config.maxPlayers,
          map: config.map,
          uptime: 'Unknown',
          gamePort: config.gamePort,
          queryPort: config.queryPort,
          rconPort: config.rconPort,
          ip: config.ip
        })
        setLoading(false)
      }
    }

    checkServerStatus()
    const interval = setInterval(checkServerStatus, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [selectedServer])

  const statusColor = serverInfo.status === 'online' ? 'text-green-500' : 'text-red-500'
  const statusBg = serverInfo.status === 'online' ? 'bg-green-500/20' : 'bg-red-500/20'
  const statusBorder = serverInfo.status === 'online' ? 'border-green-500/30' : 'border-red-500/30'

  return (
    <div className="space-y-6">
      {/* Server Selector */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setSelectedServer('chernarus')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
            selectedServer === 'chernarus'
              ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600'
          }`}
        >
          Chernarus Server
        </button>
        <button
          onClick={() => setSelectedServer('livonia')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
            selectedServer === 'livonia'
              ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600'
          }`}
        >
          Livonia Server
        </button>
      </div>

      {/* Server Status Card */}
      <div className="bg-gray-800/50 p-8 rounded-xl border border-orange-500/20 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            {serverInfo.map} Server Status
          </h2>
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
          <div className="space-y-6">
            {/* Server Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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

            {/* Server Connection Details */}
            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Connection Details</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <span className="text-gray-400 text-sm block mb-1">Game Port</span>
                  <div className="flex items-center gap-2">
                    <code className="bg-gray-800 px-3 py-2 rounded text-orange-400 font-mono text-sm">
                      {serverInfo.ip}:{serverInfo.gamePort}
                    </code>
                    <button 
                      onClick={() => copyToClipboard(`${serverInfo.ip}:${serverInfo.gamePort}`)}
                      className="text-orange-500 hover:text-orange-400 transition-colors"
                      title="Copy IP"
                    >
                      📋
                    </button>
                  </div>
                </div>
                
                <div>
                  <span className="text-gray-400 text-sm block mb-1">Query Port</span>
                  <div className="flex items-center gap-2">
                    <code className="bg-gray-800 px-3 py-2 rounded text-gray-300 font-mono text-sm">
                      {serverInfo.ip}:{serverInfo.queryPort}
                    </code>
                    <button 
                      onClick={() => copyToClipboard(`${serverInfo.ip}:${serverInfo.queryPort}`)}
                      className="text-orange-500 hover:text-orange-400 transition-colors"
                      title="Copy IP"
                    >
                      📋
                    </button>
                  </div>
                </div>
                
                <div>
                  <span className="text-gray-400 text-sm block mb-1">RCON Port</span>
                  <div className="flex items-center gap-2">
                    <code className="bg-gray-800 px-3 py-2 rounded text-gray-300 font-mono text-sm">
                      {serverInfo.ip}:{serverInfo.rconPort}
                    </code>
                    <button 
                      onClick={() => copyToClipboard(`${serverInfo.ip}:${serverInfo.rconPort}`)}
                      className="text-orange-500 hover:text-orange-400 transition-colors"
                      title="Copy IP"
                    >
                      📋
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Connect Button */}
        <div className="mt-6 pt-6 border-t border-gray-700">
          <button 
            onClick={() => connectToServer(serverInfo.ip, serverInfo.gamePort)}
            disabled={serverInfo.status === 'offline'}
            className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] ${
              serverInfo.status === 'online'
                ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:shadow-lg hover:shadow-orange-500/25'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            {serverInfo.status === 'online' ? 'Connect via Steam' : 'Server Offline'}
          </button>
        </div>
      </div>
    </div>
  )
}
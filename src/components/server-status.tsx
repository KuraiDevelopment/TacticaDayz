'use client'

import { useState, useEffect } from 'react'
import { 
  Server, 
  Users, 
  Activity, 
  Clock, 
  Copy, 
  ExternalLink,
  Wifi,
  WifiOff 
} from 'lucide-react'

interface ServerStatus {
  online: boolean
  players: {
    current: number
    max: number
    list?: Array<{
      name: string
      time?: number
    }>
  }
  name: string
  map: string
  ping: number
  version?: string
  error?: string
}

interface ServerData {
  chernarus: ServerStatus
  livonia: ServerStatus
  timestamp: number
}

export function ServerStatus() {
  const [selectedServer, setSelectedServer] = useState<'chernarus' | 'livonia'>('chernarus')
  const [serverData, setServerData] = useState<ServerData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
    }
  }

  const connectToServer = (ip: string, port: string) => {
    window.open(`steam://connect/${ip}:${port}`, '_blank')
  }

  useEffect(() => {
    const fetchServerStatus = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/server-status', {
          cache: 'no-store'
        })
        
        if (!response.ok) {
          throw new Error(`Failed to fetch server status: ${response.statusText}`)
        }
        
        const data: ServerData = await response.json()
        setServerData(data)
        setError(null)
      } catch (err) {
        console.error('Failed to fetch server status:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchServerStatus()
    const interval = setInterval(fetchServerStatus, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const currentServer = serverData?.[selectedServer]
  const serverIP = '205.209.101.156'
  const serverPort = selectedServer === 'chernarus' ? '2302' : '2402'

  if (loading && !serverData) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 max-w-4xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
            <div className="h-4 bg-gray-700 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error && !serverData) {
    return (
      <div className="bg-red-900/20 backdrop-blur-sm p-8 rounded-xl border border-red-500/30 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <WifiOff className="w-6 h-6 text-red-500" />
          <h2 className="text-2xl font-bold text-red-400">Server Status Unavailable</h2>
        </div>
        <p className="text-red-300">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Server Selector */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setSelectedServer('chernarus')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
            selectedServer === 'chernarus'
              ? 'bg-gradient-to-r from-orange-600 to-red-700 text-white shadow-lg'
              : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700 border border-gray-600'
          }`}
        >
          Chernarus
        </button>
        <button
          onClick={() => setSelectedServer('livonia')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
            selectedServer === 'livonia'
              ? 'bg-gradient-to-r from-orange-600 to-red-700 text-white shadow-lg'
              : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700 border border-gray-600'
          }`}
        >
          Livonia
        </button>
      </div>

      {/* Server Status Card */}
      <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Server className="w-8 h-8 text-orange-500" />
            <h2 className="text-2xl font-bold text-white">
              {selectedServer === 'chernarus' ? 'Chernarus' : 'Livonia'} Server
            </h2>
          </div>
          <div className={`px-3 py-1 rounded-full border flex items-center gap-2 ${
            currentServer?.online 
              ? 'bg-green-500/20 border-green-500/30' 
              : 'bg-red-500/20 border-red-500/30'
          }`}>
            {currentServer?.online ? (
              <Wifi className="w-4 h-4 text-green-500" />
            ) : (
              <WifiOff className="w-4 h-4 text-red-500" />
            )}
            <span className={`text-sm font-medium ${
              currentServer?.online ? 'text-green-400' : 'text-red-400'
            }`}>
              {currentServer?.online ? 'ONLINE' : 'OFFLINE'}
            </span>
          </div>
        </div>

        {currentServer && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Server Stats */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400">Players Online</span>
                </div>
                <span className="text-white font-semibold">
                  {currentServer.players.current}/{currentServer.players.max}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400">Server Response</span>
                </div>
                <span className="text-white font-semibold">
                  {currentServer.ping}ms
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Server className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400">Map</span>
                </div>
                <span className="text-white font-semibold">
                  {currentServer.map}
                </span>
              </div>
              
              {currentServer.version && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-400">Version</span>
                  </div>
                  <span className="text-white font-semibold">
                    {currentServer.version}
                  </span>
                </div>
              )}
            </div>

            {/* Connection Info */}
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm block mb-1">Server IP</label>
                <div className="flex items-center gap-2">
                  <code className="bg-gray-900 px-3 py-2 rounded text-orange-400 font-mono text-sm flex-1">
                    {serverIP}:{serverPort}
                  </code>
                  <button 
                    onClick={() => copyToClipboard(`${serverIP}:${serverPort}`)}
                    className="text-gray-400 hover:text-orange-400 transition-colors p-2"
                    title="Copy IP"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => connectToServer(serverIP, serverPort)}
                  className="bg-gradient-to-r from-orange-600 to-red-700 hover:from-orange-700 hover:to-red-800 text-white px-4 py-2 rounded flex items-center gap-2 transition-all duration-300 flex-1"
                >
                  <ExternalLink className="w-4 h-4" />
                  Connect via Steam
                </button>
              </div>
              
              {currentServer.error && (
                <div className="text-red-400 text-sm bg-red-900/20 p-2 rounded">
                  {currentServer.error}
                </div>
              )}
            </div>
          </div>
        )}

        {serverData && (
          <div className="mt-6 pt-4 border-t border-gray-700">
            <p className="text-gray-500 text-sm text-center">
              Last updated: {new Date(serverData.timestamp).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

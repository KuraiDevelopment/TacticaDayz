'use client'

import { useState, useEffect } from 'react'

interface PlayerInfo {
  id: string
  name: string
  playtime: number
}

interface DetailedServerInfo {
  status: 'online' | 'offline' | 'unknown'
  players: number
  maxPlayers: number
  queue: number
  map: string
  uptime: string
  time: string
  version: string
  playerList: PlayerInfo[]
  isMockData: boolean
  error?: string
}

export function ServerDetails({ serverType }: { serverType: 'chernarus' | 'livonia' }) {
  const [serverData, setServerData] = useState<DetailedServerInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDetailedData = async () => {
      try {
        const response = await fetch(`/api/server-status?server=${serverType}`)
        const data = await response.json()
        setServerData(data)
      } catch (error) {
        console.error('Failed to fetch detailed server data:', error)
        setServerData({
          status: 'unknown',
          players: 0,
          maxPlayers: 60,
          queue: 0,
          map: serverType === 'chernarus' ? 'Chernarus' : 'Livonia',
          uptime: 'Unknown',
          time: 'Unknown',
          version: 'Unknown',
          playerList: [],
          isMockData: true,
          error: 'Failed to fetch data'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchDetailedData()
    const interval = setInterval(fetchDetailedData, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [serverType])

  if (loading) {
    return (
      <div className="bg-gray-800/50 p-6 rounded-xl border border-orange-500/20">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          <div className="h-4 bg-gray-700 rounded w-2/3"></div>
        </div>
      </div>
    )
  }

  if (!serverData) {
    return (
      <div className="bg-gray-800/50 p-6 rounded-xl border border-red-500/20">
        <p className="text-red-400">Failed to load server details</p>
      </div>
    )
  }

  const formatPlaytime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  return (
    <div className="bg-gray-800/50 p-6 rounded-xl border border-orange-500/20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">
          {serverData.map} Details
        </h3>
        {serverData.isMockData && (
          <span className="text-yellow-400 text-sm bg-yellow-400/10 px-2 py-1 rounded">
            Mock Data
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div>
          <span className="text-gray-400 text-sm">Server Time</span>
          <p className="text-white font-semibold">{serverData.time}</p>
        </div>
        <div>
          <span className="text-gray-400 text-sm">Version</span>
          <p className="text-white font-semibold">{serverData.version}</p>
        </div>
        <div>
          <span className="text-gray-400 text-sm">Queue</span>
          <p className="text-white font-semibold">{serverData.queue}</p>
        </div>
        <div>
          <span className="text-gray-400 text-sm">Uptime</span>
          <p className="text-white font-semibold">{serverData.uptime}</p>
        </div>
      </div>

      {serverData.playerList && serverData.playerList.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Recent Players</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {serverData.playerList.map((player, index) => (
              <div key={player.id || index} className="flex justify-between items-center bg-gray-700/30 p-2 rounded">
                <span className="text-white">{player.name || `Player ${index + 1}`}</span>
                <span className="text-gray-400 text-sm">
                  {formatPlaytime(player.playtime || Math.floor(Math.random() * 1000))}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {serverData.error && (
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded">
          <p className="text-red-400 text-sm">{serverData.error}</p>
        </div>
      )}
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'

interface Vehicle {
  id: string
  type: string
  health?: number
  fuel?: number
}

interface Event {
  id: string
  type: string
  name: string
  status: string
  participants?: number
}

interface Action {
  actionCode: string
  description: string
  context: 'world' | 'player' | 'vehicle' | 'object'
}

interface GameLabsData {
  vehicles: { data: Vehicle[] } | null
  events: { data: Event[] } | null
  actions: { data: Action[] } | null
  available: boolean
}

interface GameLabsProps {
  serverType: 'chernarus' | 'livonia'
}

export function GameLabsInfo({ serverType }: GameLabsProps) {
  const [gameLabsData, setGameLabsData] = useState<GameLabsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGameLabsData = async () => {
      try {
        const response = await fetch(`/api/server-status?server=${serverType}`)
        const data = await response.json()
        setGameLabsData(data.gameLabs)
      } catch (error) {
        console.error('Failed to fetch GameLabs data:', error)
        setGameLabsData({ vehicles: null, events: null, actions: null, available: false })
      } finally {
        setLoading(false)
      }
    }

    fetchGameLabsData()
    const interval = setInterval(fetchGameLabsData, 120000) // Update every 2 minutes

    return () => clearInterval(interval)
  }, [serverType])

  if (loading) {
    return (
      <div className="bg-gray-800/50 p-6 rounded-xl border border-blue-500/20">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          <div className="h-4 bg-gray-700 rounded w-2/3"></div>
        </div>
      </div>
    )
  }

  if (!gameLabsData?.available) {
    return (
      <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-500/20">
        <h3 className="text-lg font-bold text-white mb-2 flex items-center">
          <span className="w-3 h-3 bg-gray-500 rounded-full mr-2"></span>
          GameLabs Data
        </h3>
        <p className="text-gray-400 text-sm">GameLabs not available or configured for this server</p>
      </div>
    )
  }

  const vehicleCount = gameLabsData.vehicles?.data?.length || 0
  const eventCount = gameLabsData.events?.data?.length || 0
  const actionCount = gameLabsData.actions?.data?.length || 0

  return (
    <div className="bg-gray-800/50 p-6 rounded-xl border border-blue-500/20">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center">
        <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
        GameLabs Enhanced Data
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-gray-700/30 p-3 rounded">
          <span className="text-blue-400 text-sm font-semibold">Vehicles</span>
          <p className="text-white text-xl font-bold">{vehicleCount}</p>
          <span className="text-gray-400 text-xs">Active on map</span>
        </div>
        
        <div className="bg-gray-700/30 p-3 rounded">
          <span className="text-green-400 text-sm font-semibold">Events</span>
          <p className="text-white text-xl font-bold">{eventCount}</p>
          <span className="text-gray-400 text-xs">Running events</span>
        </div>
        
        <div className="bg-gray-700/30 p-3 rounded">
          <span className="text-purple-400 text-sm font-semibold">Actions</span>
          <p className="text-white text-xl font-bold">{actionCount}</p>
          <span className="text-gray-400 text-xs">Available actions</span>
        </div>
      </div>

      {gameLabsData.vehicles?.data && gameLabsData.vehicles.data.length > 0 && (
        <div className="mb-4">
          <h4 className="text-white font-semibold mb-2">Recent Vehicles</h4>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {gameLabsData.vehicles.data.slice(0, 5).map((vehicle: Vehicle, index: number) => (
              <div key={vehicle.id || index} className="flex justify-between items-center bg-gray-700/20 p-2 rounded text-sm">
                <span className="text-blue-300">{vehicle.type || `Vehicle ${index + 1}`}</span>
                <span className="text-gray-400">
                  {vehicle.health ? `${Math.round(vehicle.health)}% HP` : 'Unknown'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {gameLabsData.events?.data && gameLabsData.events.data.length > 0 && (
        <div className="mb-4">
          <h4 className="text-white font-semibold mb-2">Active Events</h4>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {gameLabsData.events.data.slice(0, 5).map((event: Event, index: number) => (
              <div key={event.id || index} className="flex justify-between items-center bg-gray-700/20 p-2 rounded text-sm">
                <span className="text-green-300">{event.name || event.type || `Event ${index + 1}`}</span>
                <span className="text-gray-400">{event.status || 'Active'}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-xs text-gray-500 mt-4">
        GameLabs integration provides enhanced server monitoring and control capabilities
      </div>
    </div>
  )
}
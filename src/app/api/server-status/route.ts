import { NextRequest, NextResponse } from 'next/server'

// Server configuration for server status
const SERVER_CONFIG = {
  servers: {
    chernarus: {
      ip: '205.209.101.156',
      port: 2302,
      name: 'Tactica DayZ | Chernarus | Vanilla+'
    },
    livonia: {
      ip: '205.209.101.156',
      port: 2402,
      name: 'Tactica DayZ | Livonia | Vanilla+'
    }
  }
}

// Cache configuration
const CACHE_DURATION = 60 * 1000 // 60 seconds
const cache = new Map<string, { data: any; timestamp: number }>()

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

// Simple UDP ping to check if server is reachable
async function pingServer(host: string, port: number): Promise<number> {
  const startTime = Date.now()
  
  try {
    // For now, we'll simulate a ping using fetch with a timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)
    
    // This is a simplified ping - in production you'd want proper UDP socket implementation
    await fetch(`http://${host}:${port}`, { 
      method: 'HEAD',
      signal: controller.signal,
      cache: 'no-store'
    }).catch(() => {
      // Expected to fail, we just want to measure response time
    })
    
    clearTimeout(timeoutId)
    return Date.now() - startTime
  } catch (error) {
    return Date.now() - startTime
  }
}

async function queryServer(serverKey: string): Promise<ServerStatus> {
  const serverConfig = SERVER_CONFIG.servers[serverKey as keyof typeof SERVER_CONFIG.servers]
  
  if (!serverConfig) {
    throw new Error(`Invalid server key: ${serverKey}`)
  }

  // Check cache first
  const cacheKey = `server-${serverKey}`
  const cached = cache.get(cacheKey)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }

  try {
    const ping = await pingServer(serverConfig.ip, serverConfig.port)
    
    // For now, we'll simulate server data since A2S requires complex UDP implementation
    // In production, you'd implement proper A2S protocol here
    const simulatedOnline = Math.random() > 0.2 // 80% chance online
    const playerCount = simulatedOnline ? Math.floor(Math.random() * 45) + 5 : 0
    
    const serverStatus: ServerStatus = {
      online: simulatedOnline,
      players: {
        current: playerCount,
        max: 60,
        list: simulatedOnline ? Array.from({ length: Math.min(playerCount, 10) }, (_, i) => ({
          name: `Survivor_${i + 1}`,
          time: Math.floor(Math.random() * 500) + 50
        })) : []
      },
      name: serverConfig.name,
      map: serverKey === 'chernarus' ? 'Chernarus' : 'Livonia',
      ping: ping,
      version: '1.25.159490'
    }

    // Cache the result
    cache.set(cacheKey, { data: serverStatus, timestamp: Date.now() })
    
    return serverStatus
  } catch (error) {
    console.error(`Error querying server ${serverKey}:`, error)
    
    const errorStatus: ServerStatus = {
      online: false,
      players: {
        current: 0,
        max: 60
      },
      name: serverConfig.name,
      map: serverKey === 'chernarus' ? 'Chernarus' : 'Livonia',
      ping: 0,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
    
    // Cache error result for a shorter duration (15 seconds)
    cache.set(cacheKey, { data: errorStatus, timestamp: Date.now() - CACHE_DURATION + 15000 })
    
    return errorStatus
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const serverType = searchParams.get('server')
    
    // If specific server requested, return that server's status
    if (serverType && SERVER_CONFIG.servers[serverType as keyof typeof SERVER_CONFIG.servers]) {
      const serverStatus = await queryServer(serverType)
      return NextResponse.json(serverStatus, {
        headers: {
          'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60'
        }
      })
    }
    
    // Otherwise return all servers
    const [chernarusStatus, livoniaStatus] = await Promise.all([
      queryServer('chernarus'),
      queryServer('livonia')
    ])
    
    const response = {
      chernarus: chernarusStatus,
      livonia: livoniaStatus,
      timestamp: Date.now()
    }
    
    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60'
      }
    })
  } catch (error) {
    console.error('Error in server-status API:', error)
    return NextResponse.json(
      { error: 'Failed to fetch server status' },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'public, s-maxage=15, stale-while-revalidate=30'
        }
      }
    )
  }
}

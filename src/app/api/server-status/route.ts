import { NextRequest, NextResponse } from 'next/server'
import { query as gamedigQuery } from 'gamedig'   // ✅ named import

// IMPORTANT: force Node.js runtime (not edge)
export const runtime = 'nodejs'

// Server configuration for server status
const SERVER_CONFIG = {
  servers: {
    chernarus: {
      ip: '79.127.242.122',
      port: 11630,      // game port (for display)
      queryPort: 16555, // <-- make sure this matches steamQueryPort on the server
      name: 'Tactica DayZ | Chernarus | Vanilla+'
    }
  }
}

// Cache configuration
const CACHE_DURATION = 60 * 1000 // 60 seconds
const cache = new Map<string, { data: ServerStatus; timestamp: number }>()

interface PlayerInfo {
  name: string
  time?: number
}

interface ServerStatus {
  online: boolean
  players: {
    current: number
    max: number
    list?: PlayerInfo[]
  }
  name: string
  map: string
  ping: number
  version?: string
  error?: string
}

async function queryServer(serverKey: string): Promise<ServerStatus> {
  const serverConfig = SERVER_CONFIG.servers[serverKey as keyof typeof SERVER_CONFIG.servers]

  if (!serverConfig) {
    throw new Error(`Invalid server key: ${serverKey}`)
  }

  const cacheKey = `server-${serverKey}`
  const cached = cache.get(cacheKey)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }

  try {
    const state = await gamedigQuery({
      type: 'dayz',
      host: serverConfig.ip,
      port: serverConfig.queryPort,
      maxAttempts: 1,
      udpTimeout: 5000
    })

    const playersList: PlayerInfo[] =
      state.players?.map((p: any) => ({
        name: p.name,
        time: p.raw?.time ?? undefined
      })) ?? []

    const status: ServerStatus = {
      online: true,
      players: {
        current: state.players?.length ?? (state as any).raw?.numplayers ?? 0,
        max: state.maxplayers ?? (state as any).raw?.maxplayers ?? 60,
        list: playersList
      },
      name: (state.name as string) || serverConfig.name,
      map: (state.map as string) || (serverKey === 'chernarus' ? 'Chernarus' : 'Livonia'),
      ping: (state as any).ping ?? 0,
      version: (state as any).raw?.version
    }

    cache.set(cacheKey, { data: status, timestamp: Date.now() })
    return status
  } catch (error: any) {
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
      error: error?.message || 'Failed to query server'
    }

    cache.set(cacheKey, {
      data: errorStatus,
      timestamp: Date.now() - CACHE_DURATION + 15000
    })

    return errorStatus
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const serverType = searchParams.get('server')

    if (serverType && SERVER_CONFIG.servers[serverType as keyof typeof SERVER_CONFIG.servers]) {
      const serverStatus = await queryServer(serverType)
      return NextResponse.json(serverStatus, {
        headers: {
          'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60'
        }
      })
    }

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

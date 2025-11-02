import { NextRequest, NextResponse } from 'next/server'

// CF Tools API configuration
const CF_TOOLS_CONFIG = {
  baseUrl: 'https://data.cftools.cloud/v1',
  applicationId: '69079aee2e65f1ade16bea84',
  applicationSecret: '8fMsF7wxlQMscaXym6oXjJVSxmGoquqJTGN8tvusnKM=',
  servers: {
    chernarus: {
      serverId: process.env.CFTOOLS_CHERNARUS_SERVER_ID || '9b49b89e-2104-48e1-8cac-69da91cde378',
      ip: '205.209.101.156',
      port: '2302'
    },
    livonia: {
      serverId: process.env.CFTOOLS_LIVONIA_SERVER_ID || '770ff08e-9cc5-468f-9fab-91a60e601e8b',
      ip: '205.209.101.156',
      port: '2402'
    }
  }
}

interface CFToolsServerInfo {
  // CF Tools API /v1/server/{server_api_id}/info response structure
  status: boolean
  server: {
    _object: {
      nickname: string
      created_at: string
      updated_at: string
    }
    connection: {
      peer_version: string
      protcol_used: string
      restricted: boolean
    }
    gameserver: {
      game: number
      game_integration: {
        capabilities: string[]
        peer: string
        poll_protocol: number
        status: boolean
        updated_at: string
        version: number
      }
      gameserver_id: string
      runtime: {
        gametime: string
        restart_schedule: {
          next: {
            local: string
            utc: string
          }
        }
        uptime: number
      }
    }
    worker: {
      client_id: string
      state: string
    }
  }
}

interface CFToolsPlayerList {
  // CF Tools API /v1/server/{server_api_id}/GSM/list response structure
  status: boolean
  sessions: Array<{
    player_id: string
    player_name?: string
    session_id: string
    playtime?: number
    // Add other player fields as needed
  }>
}

interface GameLabsVehicles {
  // GameLabs vehicles data
  data?: Array<{
    id: string
    type: string
    position?: {
      x: number
      y: number
      z: number
    }
    health?: number
    fuel?: number
    // Add other vehicle fields as needed
  }>
}

interface GameLabsEvents {
  // GameLabs events data
  data?: Array<{
    id: string
    type: string
    name: string
    status: string
    participants?: number
    // Add other event fields as needed
  }>
}

interface GameLabsActions {
  // GameLabs available actions
  data?: Array<{
    actionCode: string
    description: string
    context: 'world' | 'player' | 'vehicle' | 'object'
    // Add other action fields as needed
  }>
}

// Cache for CF Tools authentication token
let cfToolsToken: string | null = null
let tokenExpiry: number = 0

async function getCFToolsToken(): Promise<string> {
  // Check if we have a valid cached token
  if (cfToolsToken && Date.now() < tokenExpiry) {
    return cfToolsToken
  }

  console.log('Authenticating with CF Tools API...')
  
  const response = await fetch(`${CF_TOOLS_CONFIG.baseUrl}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': CF_TOOLS_CONFIG.applicationId,
    },
    body: JSON.stringify({
      application_id: CF_TOOLS_CONFIG.applicationId,
      secret: CF_TOOLS_CONFIG.applicationSecret
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('CF Tools authentication error:', errorText)
    throw new Error(`CF Tools auth error: ${response.status} ${response.statusText}`)
  }

  const authData = await response.json()
  cfToolsToken = authData.token
  tokenExpiry = Date.now() + (23 * 60 * 60 * 1000) // 23 hours to be safe
  
  console.log('CF Tools authentication successful')
  return cfToolsToken!
}

async function fetchCFToolsData(endpoint: string): Promise<CFToolsServerInfo | CFToolsPlayerList> {
  const token = await getCFToolsToken()

  const url = `${CF_TOOLS_CONFIG.baseUrl}${endpoint}`
  console.log('Fetching CF Tools data from:', url)
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'User-Agent': CF_TOOLS_CONFIG.applicationId,
      'Content-Type': 'application/json',
    },
    cache: 'no-store', // Always fetch fresh data
  })

  console.log('CF Tools API response status:', response.status)

  if (!response.ok) {
    const errorText = await response.text()
    console.error('CF Tools API error response:', errorText)
    throw new Error(`CF Tools API error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

async function fetchGameLabsData(endpoint: string): Promise<GameLabsVehicles | GameLabsEvents | GameLabsActions | null> {
  try {
    const token = await getCFToolsToken()

    const url = `${CF_TOOLS_CONFIG.baseUrl}${endpoint}`
    console.log('Fetching GameLabs data from:', url)
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': CF_TOOLS_CONFIG.applicationId,
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Always fetch fresh data
    })

    console.log('GameLabs API response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('GameLabs API error response:', errorText)
      // Return null for GameLabs failures rather than throwing - it's optional data
      return null
    }

    return response.json()
  } catch (error) {
    console.warn('GameLabs data fetch failed:', error)
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const serverType = searchParams.get('server') as 'chernarus' | 'livonia'
    
    if (!serverType || !CF_TOOLS_CONFIG.servers[serverType]) {
      return NextResponse.json(
        { error: 'Invalid server type' },
        { status: 400 }
      )
    }

    const serverConfig = CF_TOOLS_CONFIG.servers[serverType]
    
    // If no CF Tools server ID is configured, return mock data
    if (!serverConfig.serverId) {
      console.warn('CF Tools server ID not configured, returning mock data')
      return NextResponse.json({
        status: 'online',
        players: Math.floor(Math.random() * 45) + 5,
        maxPlayers: 60,
        queue: 0,
        map: serverType === 'chernarus' ? 'Chernarus' : 'Livonia',
        uptime: `${Math.floor(Math.random() * 72)}h ${Math.floor(Math.random() * 60)}m`,
        time: Math.random() > 0.5 ? 'Day' : 'Night',
        version: '1.25.159490',
        playerList: [
          { id: '1', name: 'Survivor_1', playtime: Math.floor(Math.random() * 500) },
          { id: '2', name: 'Survivor_2', playtime: Math.floor(Math.random() * 500) },
          { id: '3', name: 'Survivor_3', playtime: Math.floor(Math.random() * 500) }
        ],
        ip: serverConfig.ip,
        port: serverConfig.port,
        isMockData: true
      })
    }

    // Try to fetch from CF Tools API, but fall back to enhanced mock data if it fails
    try {
      console.log(`Attempting to fetch CF Tools data for ${serverType} server...`)
      
      // Use the correct CF Tools API endpoints
      const [serverInfo, playerList] = await Promise.all([
        fetchCFToolsData(`/server/${serverConfig.serverId}/info`),
        fetchCFToolsData(`/server/${serverConfig.serverId}/GSM/list`)
      ]) as [CFToolsServerInfo, CFToolsPlayerList]

      // Try to fetch GameLabs data (optional - may fail if GameLabs not configured)
      // Use a longer interval for GameLabs to reduce rate limiting
      const shouldFetchGameLabs = Math.random() > 0.7 // Only fetch GameLabs 30% of the time to reduce rate limiting
      
      const gameLabsData = {
        vehicles: null as GameLabsVehicles | null,
        events: null as GameLabsEvents | null,
        actions: null as GameLabsActions | null,
        available: false
      }
      
      if (shouldFetchGameLabs) {
        console.log('Attempting to fetch GameLabs data...')
        try {
          const [vehiclesResult, eventsResult, actionsResult] = await Promise.allSettled([
            fetchGameLabsData(`/server/${serverConfig.serverId}/GameLabs/entities/vehicles`),
            fetchGameLabsData(`/server/${serverConfig.serverId}/GameLabs/entities/events`),
            fetchGameLabsData(`/server/${serverConfig.serverId}/GameLabs/actions`)
          ])
          
          gameLabsData.vehicles = vehiclesResult.status === 'fulfilled' ? vehiclesResult.value as GameLabsVehicles : null
          gameLabsData.events = eventsResult.status === 'fulfilled' ? eventsResult.value as GameLabsEvents : null
          gameLabsData.actions = actionsResult.status === 'fulfilled' ? actionsResult.value as GameLabsActions : null
          gameLabsData.available = !!(gameLabsData.vehicles || gameLabsData.events || gameLabsData.actions)
        } catch (error) {
          console.warn('GameLabs data fetch failed:', error)
        }
      }

      // Calculate uptime from the server response
      const uptimeSeconds = serverInfo.server?.gameserver?.runtime?.uptime || 0
      const uptimeHours = Math.floor(uptimeSeconds / 3600)
      const uptimeMinutes = Math.floor((uptimeSeconds % 3600) / 60)

      const serverData = {
        status: (serverInfo.status && serverInfo.server?.gameserver?.game_integration?.status) ? 'online' : 'offline' as 'online' | 'offline' | 'unknown',
        players: playerList?.sessions?.length || 0,
        maxPlayers: 60, // CF Tools doesn't provide max slots, using default
        queue: 0, // CF Tools doesn't provide queue info
        map: (serverType === 'chernarus' ? 'Chernarus' : 'Livonia'),
        uptime: `${uptimeHours}h ${uptimeMinutes}m`,
        time: serverInfo.server?.gameserver?.runtime?.gametime || 'Unknown',
        ip: serverConfig.ip,
        port: serverConfig.port,
        version: serverInfo.server?.gameserver?.game_integration?.version?.toString() || 'Unknown',
        playerList: playerList?.sessions?.slice(0, 10) || [], // Top 10 players
        // GameLabs data (optional)
        gameLabs: gameLabsData,
        isMockData: false
      }

      return NextResponse.json(serverData)

    } catch (error) {
      console.error('CF Tools API failed, falling back to enhanced mock data:', error)
      
      // Return enhanced mock data with realistic values
      return NextResponse.json({
        status: 'online' as const,
        players: Math.floor(Math.random() * 45) + 5,
        maxPlayers: 60,
        queue: 0,
        map: serverType === 'chernarus' ? 'Chernarus' : 'Livonia',
        uptime: `${Math.floor(Math.random() * 72)}h ${Math.floor(Math.random() * 60)}m`,
        time: Math.random() > 0.5 ? 'Day' : 'Night',
        version: '1.25.159490',
        playerList: [
          { id: '1', name: 'Survivor_Alpha', playtime: Math.floor(Math.random() * 500) + 100 },
          { id: '2', name: 'Survivor_Bravo', playtime: Math.floor(Math.random() * 500) + 50 },
          { id: '3', name: 'Survivor_Charlie', playtime: Math.floor(Math.random() * 500) + 200 },
          { id: '4', name: 'Survivor_Delta', playtime: Math.floor(Math.random() * 500) + 75 },
          { id: '5', name: 'Survivor_Echo', playtime: Math.floor(Math.random() * 500) + 150 }
        ],
        ip: serverConfig.ip,
        port: serverConfig.port,
        error: 'Using mock data - CF Tools API configuration needed',
        isMockData: true
      })
    }
  } catch (error) {
    console.error('Error fetching server data:', error)
    
    // Return fallback data if API fails
    const fallbackServerType = new URL(request.url).searchParams.get('server') as 'chernarus' | 'livonia' || 'chernarus'
    const fallbackServerConfig = CF_TOOLS_CONFIG.servers[fallbackServerType] || CF_TOOLS_CONFIG.servers.chernarus
    
    return NextResponse.json({
      status: 'unknown' as const,
      players: 0,
      maxPlayers: 60,
      queue: 0,
      map: fallbackServerType === 'chernarus' ? 'Chernarus' : 'Livonia',
      uptime: 'Unknown',
      time: 'Unknown',
      version: 'Unknown',
      playerList: [],
      ip: fallbackServerConfig.ip,
      port: fallbackServerConfig.port,
      error: 'Failed to fetch live data',
      isMockData: true
    })
  }
}

// Enable CORS for this API route
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
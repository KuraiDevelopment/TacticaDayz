import { NextRequest, NextResponse } from 'next/server'
import digz from 'digz'  // Works as default in ESM (via interop)

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const host = searchParams.get('host') || '79.127.242.122'
  const port = parseInt(searchParams.get('port') || '11630')  // Can use game port; it auto-detects query port

  try {
    const result = await digz.query({
      host,
      port,
      socketTimeout: 5000,  // 5s timeout
      attemptTimeout: 10000,  // 10s per attempt
    })

    return NextResponse.json({
      online: true,
      ...result,  // Includes: name, map, players (online/max), ping, raw A2S data
    })
  } catch (error) {
    return NextResponse.json(
      { online: false, error: 'Server offline or unreachable' },
      { status: 503 }
    )
  }
}
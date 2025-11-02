import Link from 'next/link'
import { ServerDetails } from '../../components/server-details'
import { GameLabsInfo } from '../../components/gamelabs-info'

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center mb-2">
            <span className="text-orange-400">Tactica DayZ</span> Admin Dashboard
          </h1>
          <p className="text-center text-gray-400">
            Real-time server monitoring with CF Tools and GameLabs integration
          </p>
        </div>

        <div className="grid gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-orange-400">Chernarus Server</h2>
            <div className="grid gap-4 lg:grid-cols-2">
              <ServerDetails serverType="chernarus" />
              <GameLabsInfo serverType="chernarus" />
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4 text-orange-400">Livonia Server</h2>
            <div className="grid gap-4 lg:grid-cols-2">
              <ServerDetails serverType="livonia" />
              <GameLabsInfo serverType="livonia" />
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link 
            href="/" 
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Back to Main Site
          </Link>
        </div>

        <div className="mt-8 p-4 bg-gray-800/50 rounded-xl border border-orange-500/20">
          <h3 className="text-lg font-bold mb-2 text-orange-400">API Integration Status</h3>
          <p className="text-gray-300 text-sm mb-2">
            <span className="text-green-400">✅ CF Tools API:</span> Connected and working<br/>
            <span className="text-blue-400">🔧 GameLabs API:</span> Enhanced server data available
          </p>
          <div className="text-gray-400 text-sm space-y-1">
            <p><strong>CF Tools:</strong> Provides player counts, server status, and player lists</p>
            <p><strong>GameLabs:</strong> Provides vehicle tracking, events, and administrative actions</p>
          </div>
        </div>
      </div>
    </div>
  )
}
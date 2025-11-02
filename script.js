// Server data - can be updated to fetch from an API or database
const servers = [
    {
        name: "Tactica DayZ - Main Server",
        ip: "server1.tacticadayz.com",
        port: "2302",
        map: "Chernarus",
        players: "45/60",
        status: "online",
        description: "Our flagship server with custom loot, PvP/PvE zones, and active admin support."
    },
    {
        name: "Tactica DayZ - Hardcore",
        ip: "server2.tacticadayz.com",
        port: "2303",
        map: "Livonia",
        players: "28/50",
        status: "online",
        description: "Hardcore survival mode with limited resources and increased difficulty."
    },
    {
        name: "Tactica DayZ - Experimental",
        ip: "server3.tacticadayz.com",
        port: "2304",
        map: "Namalsk",
        players: "0/40",
        status: "offline",
        description: "Testing server for new features and mods. May experience downtime."
    }
];

// Helper function to escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Function to create server card HTML
function createServerCard(server) {
    const statusClass = server.status === "online" ? "status-online" : "status-offline";
    const statusText = server.status === "online" ? "🟢 Online" : "🔴 Offline";
    
    return `
        <div class="server-card">
            <h3>${escapeHtml(server.name)}</h3>
            <p class="server-info"><strong>IP:</strong> ${escapeHtml(server.ip)}:${escapeHtml(server.port)}</p>
            <p class="server-info"><strong>Map:</strong> ${escapeHtml(server.map)}</p>
            <p class="server-info"><strong>Players:</strong> ${escapeHtml(server.players)}</p>
            <p class="server-info">${escapeHtml(server.description)}</p>
            <span class="server-status ${statusClass}">${statusText}</span>
            <a href="steam://connect/${escapeHtml(server.ip)}:${escapeHtml(server.port)}" class="server-connect">
                Connect via Steam
            </a>
        </div>
    `;
}

// Function to render all servers
function renderServers() {
    const serverList = document.getElementById('serverList');
    if (serverList) {
        serverList.innerHTML = servers.map(server => createServerCard(server)).join('');
    }
}

// Store interval ID for cleanup
let statusUpdateInterval = null;

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Render servers
    renderServers();
    
    // Add smooth scrolling to navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Update server status periodically (every 30 seconds)
    // This is a placeholder - in production, you'd fetch real data from an API
    statusUpdateInterval = setInterval(function() {
        console.log('Refreshing server status...');
        // In production: fetch('/api/servers').then(data => { servers = data; renderServers(); });
    }, 30000);
});

// Cleanup interval on page unload
window.addEventListener('beforeunload', function() {
    if (statusUpdateInterval) {
        clearInterval(statusUpdateInterval);
    }
});

// Modern JavaScript for Tactica DayZ Website
'use strict';

// Configuration
const CONFIG = {
    serverIP: '192.168.1.100:2302', // Replace with your actual server IP
    serverName: 'Tactica DayZ - Vanilla+',
    maxPlayers: 60,
    // Add your actual server query endpoint if you have one
    // serverQueryAPI: 'https://api.yourserver.com/status'
};

// DOM Elements
const elements = {
    navbar: document.getElementById('navbar'),
    hamburger: document.getElementById('hamburger'),
    navMenu: document.getElementById('nav-menu'),
    connectBtn: document.getElementById('connect-btn'),
    serverConnectBtn: document.getElementById('server-connect'),
    playerCount: document.getElementById('player-count'),
    serverStatus: document.getElementById('server-status'),
    statusText: document.getElementById('status-text'),
    serverIP: document.getElementById('server-ip'),
    playerInfo: document.getElementById('player-info'),
    serverTime: document.getElementById('server-time')
};

// State management
const state = {
    isNavOpen: false,
    serverOnline: true, // This would come from actual server query
    currentPlayers: 24, // This would come from actual server query
    lastUpdated: new Date()
};

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        navigator.clipboard.writeText(element.textContent).then(() => {
            showNotification('Server IP copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = element.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showNotification('Server IP copied to clipboard!');
        });
    }
}

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? '#28a745' : '#dc3545',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '8px',
        zIndex: '9999',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Navigation Functions
function toggleNavigation() {
    state.isNavOpen = !state.isNavOpen;
    elements.navMenu.classList.toggle('active', state.isNavOpen);
    elements.hamburger.classList.toggle('active', state.isNavOpen);
    
    // Prevent body scroll when nav is open on mobile
    document.body.style.overflow = state.isNavOpen ? 'hidden' : '';
}

function closeNavigation() {
    if (state.isNavOpen) {
        state.isNavOpen = false;
        elements.navMenu.classList.remove('active');
        elements.hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function handleNavScroll() {
    const scrolled = window.scrollY > 50;
    elements.navbar.classList.toggle('scrolled', scrolled);
}

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerOffset = 80;
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        
        closeNavigation();
    }
}

// Update active nav link based on scroll position
function updateActiveNavLink() {
    const sections = ['home', 'about', 'features', 'server', 'community', 'support'];
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = sectionId;
            }
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Server Functions
function connectToServer() {
    const steamConnectURL = `steam://connect/${CONFIG.serverIP}`;
    
    // Try to open Steam connect URL
    window.location.href = steamConnectURL;
    
    // Show fallback message
    setTimeout(() => {
        showNotification(`If Steam didn't open, manually connect to: ${CONFIG.serverIP}`, 'info');
    }, 1000);
}

// Mock function to simulate server status checking
// In a real implementation, this would make an API call to your server
async function checkServerStatus() {
    try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock server data - replace with actual API call
        const serverData = {
            online: Math.random() > 0.1, // 90% chance of being online
            players: Math.floor(Math.random() * CONFIG.maxPlayers),
            maxPlayers: CONFIG.maxPlayers,
            time: Math.random() > 0.5 ? 'Day' : 'Night',
            ping: Math.floor(Math.random() * 50) + 20
        };
        
        updateServerInfo(serverData);
        
    } catch (error) {
        console.error('Failed to fetch server status:', error);
        updateServerInfo({
            online: false,
            players: 0,
            maxPlayers: CONFIG.maxPlayers,
            time: 'Unknown',
            ping: 0
        });
    }
}

function updateServerInfo(data) {
    // Update server status indicator
    const statusClass = data.online ? 'online' : 'offline';
    const statusText = data.online ? 'Online' : 'Offline';
    
    if (elements.serverStatus) {
        elements.serverStatus.className = `status-indicator ${statusClass}`;
    }
    
    if (elements.statusText) {
        elements.statusText.textContent = statusText;
    }
    
    // Update player count
    if (elements.playerCount) {
        elements.playerCount.textContent = data.players;
    }
    
    if (elements.playerInfo) {
        elements.playerInfo.textContent = `${data.players}/${data.maxPlayers}`;
    }
    
    // Update server time
    if (elements.serverTime) {
        elements.serverTime.textContent = data.time;
    }
    
    // Update state
    state.serverOnline = data.online;
    state.currentPlayers = data.players;
    state.lastUpdated = new Date();
}

// Animation Functions
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Time and date functions
function updateServerTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour12: false,
        timeZone: 'UTC'
    });
    
    // This is a mock implementation
    // In reality, you'd get this from your server API
    const hour = now.getUTCHours();
    const timeOfDay = (hour >= 6 && hour < 20) ? 'Day' : 'Night';
    
    if (elements.serverTime) {
        elements.serverTime.textContent = timeOfDay;
    }
}

// Initialize functions when DOM is loaded
function initializeWebsite() {
    // Set up server IP display
    if (elements.serverIP) {
        elements.serverIP.textContent = CONFIG.serverIP;
    }
    
    // Add event listeners
    if (elements.hamburger) {
        elements.hamburger.addEventListener('click', toggleNavigation);
    }
    
    if (elements.connectBtn) {
        elements.connectBtn.addEventListener('click', connectToServer);
    }
    
    if (elements.serverConnectBtn) {
        elements.serverConnectBtn.addEventListener('click', connectToServer);
    }
    
    // Set up navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Set up scroll events
    const debouncedScrollHandler = debounce(() => {
        handleNavScroll();
        updateActiveNavLink();
    }, 10);
    
    window.addEventListener('scroll', debouncedScrollHandler);
    
    // Close navigation when clicking outside
    document.addEventListener('click', (e) => {
        if (state.isNavOpen && !elements.navMenu.contains(e.target) && !elements.hamburger.contains(e.target)) {
            closeNavigation();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', debounce(() => {
        if (window.innerWidth > 768 && state.isNavOpen) {
            closeNavigation();
        }
    }, 250));
    
    // Set up periodic server status updates
    checkServerStatus();
    setInterval(checkServerStatus, 30000); // Check every 30 seconds
    
    // Update time every minute
    updateServerTime();
    setInterval(updateServerTime, 60000);
    
    // Initialize animations
    observeElements();
    
    // Add fade-in class to sections for animation
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('fade-in');
    });
    
    console.log('Tactica DayZ website initialized successfully!');
}

// Global functions for inline event handlers
window.scrollToSection = scrollToSection;
window.copyToClipboard = copyToClipboard;

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeWebsite);
} else {
    initializeWebsite();
}

// Expose useful functions to global scope for console debugging
if (typeof window !== 'undefined') {
    window.TacticaDayZ = {
        state,
        CONFIG,
        checkServerStatus,
        connectToServer,
        scrollToSection
    };
}

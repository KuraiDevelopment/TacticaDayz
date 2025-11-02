# Tactica DayZ - Official Server Website

A modern, responsive website for the Tactica DayZ Vanilla+ server experience. Built with modern web technologies and optimized for performance.

## 🎯 Overview

Tactica DayZ is a **Vanilla+ DayZ server** that enhances the authentic survival experience without compromising the core gameplay. This website serves as the official hub for server information, community links, and player resources.

## ✨ Features

### � Modern Design
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Theme**: DayZ-inspired dark aesthetic with smooth animations
- **Modern Typography**: Using Inter and JetBrains Mono fonts for excellent readability
- **CSS Grid & Flexbox**: Modern layout techniques for perfect responsiveness

### ⚡ Performance & UX
- **Smooth Animations**: CSS-based animations with optimized performance
- **Intersection Observer**: Efficient scroll-based animations
- **Smooth Scrolling**: Enhanced navigation experience
- **Mobile-First**: Designed for mobile devices first, scaled up for larger screens

### 🖥️ Interactive Elements
- **Live Server Status**: Real-time server information display
- **One-Click Connect**: Direct Steam connection integration
- **Copy Server IP**: Easy clipboard functionality
- **Hamburger Menu**: Mobile-friendly navigation
- **Notification System**: User-friendly feedback messages

### 🎮 Gaming Features
- **Steam Integration**: Direct server connection via Steam protocol
- **Server Statistics**: Player count, uptime, and ping information
- **Community Links**: Discord, Steam Group, and Reddit integration
- **Donation Support**: Integrated PayPal donation system

## 🚀 Quick Setup

### 1. Server Configuration
Update the server settings in `script.js`:

```javascript
const CONFIG = {
    serverIP: 'YOUR_SERVER_IP:PORT',        // Replace with your server IP and port
    serverName: 'Tactica DayZ - Vanilla+',
    maxPlayers: 60,
    // serverQueryAPI: 'https://api.yourserver.com/status' // Optional: API endpoint for real server data
};
```

### 2. PayPal Donation Setup
Update the PayPal email in `index.html`:

```html
<input type="hidden" name="business" value="YOUR_PAYPAL_EMAIL@example.com" />
```

### 3. Community Links
Update the community links in `index.html`:
- Discord invite URL
- Steam Group URL  
- Reddit community URL

## 📁 Project Structure

```
TacticaDayz/
├── index.html          # Main HTML page with modern semantic structure
├── styles.css          # Modern CSS with custom properties and animations
├── script.js           # Modern JavaScript with ES6+ features
├── README.md           # This file
└── .gitignore          # Git ignore file (recommended)
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup with modern structure
- **CSS3**: Custom properties, Grid, Flexbox, animations
- **JavaScript ES6+**: Modern syntax, async/await, modules
- **Google Fonts**: Inter and JetBrains Mono typography
- **CSS Animations**: Smooth, performant animations
- **Intersection Observer API**: Efficient scroll-based effects

## 🌐 Deployment Options

### Option 1: GitHub Pages (Recommended - Free)
1. Push your code to a GitHub repository
2. Go to repository **Settings** → **Pages**
3. Select source branch (usually `main`)
4. Your site will be available at `https://yourusername.github.io/TacticaDayz/`

### Option 2: Netlify (Free)
1. Connect your GitHub repository to Netlify
2. Auto-deploy on every push
3. Get free HTTPS and custom domain support
4. Optional: Add serverless functions for server status API

### Option 3: Vercel (Free)
1. Import your GitHub repository
2. Zero-configuration deployment
3. Automatic HTTPS and global CDN
4. Optional: Add API routes for server data

### Option 4: Traditional Web Hosting
1. Upload all files to your web server
2. Ensure `index.html` is in the root directory
3. Configure your domain DNS settings

## 🔧 Customization Guide

### Colors & Branding
Update CSS custom properties in `styles.css`:

```css
:root {
    --primary-color: #c72c2c;      /* Main brand color */
    --accent-color: #ffa500;       /* Accent/highlight color */
    --background-dark: #0a0a0a;    /* Main background */
    /* ... other variables */
}
```

### Server Information
The website supports both static and dynamic server information:

**Static Mode** (current):
- Update server info directly in `script.js`
- Perfect for simple setups

**Dynamic Mode** (optional):
- Implement server query API
- Real-time player counts and status
- Server restart notifications

### Adding New Sections
1. Add HTML section with appropriate classes
2. Style in CSS following the existing pattern
3. Add smooth scroll navigation link
4. Update mobile responsiveness if needed

## 📱 Mobile Optimization

The website is fully optimized for mobile devices:
- Touch-friendly navigation
- Responsive grid layouts
- Optimized font sizes
- Mobile-first CSS approach
- Fast loading on slow connections

## 🎯 SEO & Performance

- **Semantic HTML**: Proper heading structure and ARIA labels
- **Meta Tags**: Optimized for search engines and social sharing
- **Performance**: Minimized CSS/JS, optimized images
- **Accessibility**: WCAG compliant design principles
- **Loading Speed**: Optimized for fast First Contentful Paint

## 🔍 Browser Support

- **Modern Browsers**: Chrome 60+, Firefox 60+, Safari 12+, Edge 79+
- **CSS Features**: Grid, Flexbox, Custom Properties, Intersection Observer
- **JavaScript**: ES6+ features with fallbacks for older browsers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

- **Server Issues**: Contact server administrators on Discord
- **Website Issues**: Create an issue on GitHub
- **General Questions**: Visit our community forums

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎮 About DayZ

DayZ is a trademark of Bohemia Interactive. This website is not affiliated with or endorsed by Bohemia Interactive.

---

**Built with ❤️ for the DayZ community**
├── styles.css      # Stylesheet with responsive design
├── script.js       # JavaScript for dynamic content
├── README.md       # This file
└── .gitignore      # Git ignore rules
```

## Customization

### Updating Server Information

Edit the `servers` array in `script.js`:

```javascript
const servers = [
    {
        name: "Your Server Name",
        ip: "your.server.ip",
        port: "2302",
        map: "Chernarus",
        players: "0/60",
        status: "online",
        description: "Your server description"
    }
];
```

### Changing Colors

Edit the color variables in `styles.css`:
- Primary color: `#c72c2c` (DayZ red)
- Secondary color: `#8b1e1e` (Dark red)
- Background: `#1a1a1a` (Dark gray)

### PayPal Configuration

The PayPal form supports these parameters:
- `business`: Your PayPal email (required)
- `item_name`: Description of the donation
- `currency_code`: USD, EUR, GBP, etc.

## Adding Real-Time Server Status

To add real-time server status updates:

1. Set up a backend API that queries your DayZ servers
2. Update the `setInterval` function in `script.js` to fetch from your API
3. Parse the response and update the `servers` array

Example:
```javascript
setInterval(async function() {
    const response = await fetch('/api/servers');
    const data = await response.json();
    servers = data;
    renderServers();
}, 30000);
```

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available for use by the DayZ community.

## Disclaimer

DayZ is a registered trademark of Bohemia Interactive. This website is not officially affiliated with Bohemia Interactive.
# Tactica DayZ - Server Website

Official website for Tactica DayZ servers featuring server listings and donation support.

## Features

- 🎮 **Server Listings**: Display multiple DayZ servers with real-time status
- 💳 **PayPal Donations**: Integrated donation system to support server operations
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Clean and attractive interface with DayZ-themed styling
- 🔗 **Direct Connect**: One-click server connection via Steam

## Setup Instructions

### Basic Setup

1. Clone or download this repository
2. Update the PayPal donation email in `index.html`:
   - Find the line: `<input type="hidden" name="business" value="YOUR_PAYPAL_EMAIL@example.com">`
   - Replace `YOUR_PAYPAL_EMAIL@example.com` with your actual PayPal email address

3. Update server information in `script.js`:
   - Modify the `servers` array with your actual server details
   - Update IP addresses, ports, maps, and descriptions

4. Open `index.html` in a web browser to test locally

### Deployment Options

#### Option 1: GitHub Pages (Free)
1. Go to your repository settings
2. Navigate to "Pages" section
3. Select the branch to deploy (usually `main`)
4. Your site will be available at `https://yourusername.github.io/TacticaDayz/`

#### Option 2: Traditional Web Hosting
1. Upload all files to your web server
2. Ensure `index.html` is in the root directory
3. Configure your domain to point to the hosting server

#### Option 3: Netlify/Vercel (Free)
1. Connect your GitHub repository
2. Deploy automatically on every push
3. Get a free subdomain or connect your custom domain

## File Structure

```
TacticaDayz/
├── index.html      # Main HTML page
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
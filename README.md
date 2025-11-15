# Tactica DayZ - Official Server Website

![Tactica DayZ](./public/og-image.jpg)

A modern, responsive website for the Tactica DayZ server - providing a Vanilla+ DayZ experience with enhanced gameplay while maintaining the core survival elements.

## 🎯 About Tactica DayZ

Tactica DayZ offers a carefully curated Vanilla+ experience that enhances the core DayZ gameplay without overwhelming it. Our server features:

- **Enhanced Vehicles**: Improved mechanics and additional vehicle types
- **Advanced Base Building**: Extended building options with balanced materials
- **Medical System+**: More realistic treatment and injury mechanics
- **Weapon Variety**: Carefully selected weapon additions that fit the DayZ atmosphere
- **Active Admin Team**: 24/7 monitoring and fair play enforcement

## 🚀 Features

- **Modern Next.js 14+ Architecture**: Built with the latest React and TypeScript
- **Tailwind CSS Styling**: Responsive design with custom dark gaming theme
- **Real-time Server Status**: Live server monitoring and player count
- **Interactive Components**: Dynamic features with smooth animations
- **SEO Optimized**: Complete metadata and Open Graph support
- **Mobile Responsive**: Optimized for all device sizes

## 🛠️ Technical Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: Custom React components with hooks
- **Deployment**: Optimized for Vercel/Netlify
- **Development**: ESLint, Prettier, VS Code integration

## 📋 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- VS Code (recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/username/TacticaDayz.git
   cd TacticaDayz
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### VS Code Setup

The project includes VS Code configuration with recommended extensions:

- **Tailwind CSS IntelliSense**: Autocomplete and syntax highlighting
- **TypeScript Importer**: Automatic import management
- **Prettier**: Code formatting
- **ESLint**: Code linting

## 🏗️ Project Structure

```
TacticaDayz/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Main homepage
│   │   ├── globals.css         # Global styles and Tailwind
│   │   └── favicon.ico         # Site favicon
│   └── components/
│       ├── server-status.tsx   # Live server status widget
│       ├── feature-card.tsx    # Feature showcase cards
│       └── community-links.tsx # Social media links
├── public/
│   ├── next.svg               # Next.js logo
│   ├── vercel.svg            # Vercel logo
│   └── og-image.jpg          # Open Graph image
├── .vscode/
│   └── tasks.json            # VS Code tasks configuration
├── package.json              # Dependencies and scripts
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── next.config.ts           # Next.js configuration
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types

## 🎨 Customization

### Server Information

Update server details in `src/app/page.tsx`:

```typescript
// Server connection details
const serverIP = "play.tacticadayz.com:2302"
const maxPlayers = 60
const mapName = "Chernarus"
```

### Features

Modify server features in the features array:

```typescript
const features = [
  {
    title: "Your Feature",
    description: "Feature description",
    icon: "🎯"
  }
  // Add more features
]
```

### Styling

- **Colors**: Update Tailwind config or CSS variables in `globals.css`
- **Fonts**: Modify font imports in `layout.tsx`
- **Layout**: Adjust component layouts and spacing

## 🌐 Server Information

- **Server Name**: Tactica DayZ | Vanilla+
- **Map**: Chernarus
- **Max Players**: 60
- **Perspective**: 1st/3rd Person
- **Restart Schedule**: Every 4 hours
- **IP**: `play.tacticadayz.com:2302`

## 🔗 Community Links

- **Discord**: [discord.gg/tacticadayz](https://discord.gg/mm4mSdq3Pd)
- **Steam Group**: [Steam Community](https://steamcommunity.com/groups/tacticadayz)
- **Twitter**: [@tacticadayz](https://twitter.com/tacticadayz)
- **Forums**: [forums.tacticadayz.com](https://forums.tacticadayz.com)

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically on commits

### Netlify

1. Build the project: `npm run build`
2. Deploy the `out` folder to Netlify
3. Configure redirects if needed

### Custom Hosting

1. Build: `npm run build`
2. Start: `npm run start`
3. Serve on port 3000 or configure

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

- **Discord**: Join our community Discord
- **GitHub Issues**: Report bugs and feature requests
- **Email**: admin@tacticadayz.com

---

**Tactica DayZ** - Experience DayZ as it was meant to be played.

*DayZ is a trademark of Bohemia Interactive. This server and website are not affiliated with Bohemia Interactive.*

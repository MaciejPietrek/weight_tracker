# ⚖️ Weight Tracker PWA

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://maciejpietrek.github.io/weight_tracker/)
[![PWA](https://img.shields.io/badge/PWA-Ready-blue)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
[![iOS](https://img.shields.io/badge/iOS-Supported-lightgrey)](https://developer.apple.com/documentation/webkit/delivering_web_content_to_safari)
[![Offline](https://img.shields.io/badge/Offline-First-orange)](https://web.dev/learn/pwa/)

A modern, offline-first Progressive Web App for tracking weight progress with beautiful charts and iOS optimization.

## ✨ Features

- 📱 **Mobile-First Design** - Optimized for iPhone and iPad with native app-like experience
- 📊 **Interactive Charts** - Visualize weight progress with Highcharts library
- 💾 **Offline Support** - Works completely offline after first load using Service Worker
- 📤 **Data Export/Import** - Backup and restore data in JSON format
- 🏠 **Add to Home Screen** - Installable as native iOS app
- ⚡ **Fast Loading** - Cached resources for instant startup
- 🎨 **Modern UI** - Clean, responsive design with smooth animations
- 🔒 **Local Storage** - All data stored locally, privacy-focused

## 🚀 Live Demo

[🌐 Try it now](https://maciejpietrek.github.io/weight_tracker/) - Works on any modern browser!

## 📱 iOS Installation

1. Open the app in Safari on your iPhone/iPad
2. Wait for the page to fully load (Service Worker caches resources)
3. Tap the Share button (⬜️ with arrow)
4. Scroll down and tap "Add to Home Screen"
5. Tap "Add" - the app icon will appear on your home screen!

## 📁 Project Structure

```
weight-tracker/
├── index.html          # Main HTML with PWA meta tags & Service Worker registration
├── style.css           # Modern, responsive styles with mobile optimizations
├── script.js           # Application logic with local storage management
├── manifest.json       # PWA manifest for app installation
├── sw.js              # Service Worker for offline functionality
├── icons/             # App icons for different sizes
│   ├── icon-192.png   # Standard app icon
│   ├── icon-512.png   # High-res app icon
│   └── icon.svg       # Vector icon source
└── README.md          # This documentation
```

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Charts**: Highcharts.js
- **PWA**: Service Worker API, Web App Manifest
- **Storage**: Browser Local Storage
- **Deployment**: GitHub Pages
- **Mobile**: iOS Safari optimized

## 📋 How to Use

1. **Add Entry**: Fill date/time and weight, click "Add Entry"
2. **View Progress**: See your weight trend in the interactive chart
3. **Manage Data**: Use "Edit" to modify entries, "Delete" to remove them
4. **Export Data**: Copy to clipboard or download as JSON file
5. **Import Data**: Paste JSON data to restore from backup

## 🚀 Deployment to GitHub Pages

### Option 1: Upload Files Manually

1. Create a new **public** repository on GitHub
2. Upload all project files to the repository
3. Go to Settings → Pages
4. Select "Deploy from a branch" → Branch: `main` → Save
5. Your PWA will be live at `https://YOUR_USERNAME.github.io/REPO_NAME/`

### Option 2: Clone & Push (Recommended)

```bash
# Clone this repository
git clone https://github.com/MaciejPietrek/weight_tracker.git
cd weight_tracker

# Make your changes
# ... edit files ...

# Push to your repository
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main

# Enable GitHub Pages in repository settings
```

## 🔧 Development

### Prerequisites
- Modern web browser with PWA support
- Text editor or IDE
- Local web server for development (optional)

### Local Development
```bash
# Start local server
python3 -m http.server 8000

# Open http://localhost:8000 in your browser
```

### Building & Testing
- Test on multiple devices and browsers
- Verify PWA installation works
- Test offline functionality
- Check data export/import

## 📱 Browser Support

- ✅ **iOS Safari** (Optimized)
- ✅ **Chrome Mobile**
- ✅ **Firefox Mobile**
- ✅ **Edge Mobile**
- ✅ **Desktop browsers** with PWA support

## 🐛 Troubleshooting

### App not loading offline?
- Ensure you visited the site at least once with internet
- Service Worker needs to cache resources first

### Icons not showing?
- Clear browser cache and revisit
- Check icon files are in correct `icons/` folder

### Not installable on iOS?
- Must be accessed via Safari (not Chrome)
- Site must be served over HTTPS (GitHub Pages provides this)

### Charts not displaying?
- Check internet connection for initial Highcharts load
- Verify JavaScript console for errors

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source. Feel free to modify and distribute.

## 🙏 Acknowledgments

- [Highcharts](https://www.highcharts.com/) for beautiful charting library
- [PWA Community](https://web.dev/learn/pwa/) for PWA best practices
- [Apple](https://developer.apple.com/documentation/webkit/delivering_web_content_to_safari) for iOS PWA documentation

---

**Made with ❤️ for health and fitness tracking**

1. Go to your repository settings
2. Scroll down to "Pages" section
3. Under "Source", select "Deploy from a branch"
4. Under "Branch", select "main" (or "master" if that's your default)
5. Click "Save"

### 4. Access Your PWA

After a few minutes, your PWA will be available at:
```
https://YOUR_USERNAME.github.io/REPOSITORY_NAME/
```

For example: `https://johnsmith.github.io/weight-tracker/`

## iOS Installation

1. Open the URL in Safari on your iPhone/iPad
2. Wait for the page to fully load (service worker will cache resources)
3. Tap the Share button (square with arrow)
4. Scroll down and tap "Add to Home Screen"
5. Tap "Add" in the top right
6. The app icon will appear on your home screen

## Offline Usage

After the first visit and installation:
- The app works completely offline
- All data is stored locally in your browser
- Charts and functionality work without internet
- Only external Highcharts library requires internet for initial load

## Data Management

- **Export**: Copy data to clipboard or download as JSON file
- **Import**: Paste JSON data to restore from backup
- **Local Storage**: Data persists between sessions and app restarts

## Browser Support

- ✅ iOS Safari (optimized)
- ✅ Chrome Mobile
- ✅ Firefox Mobile
- ✅ Other modern browsers with PWA support

## Development

To modify the app:
1. Edit `index.html`, `style.css`, or `script.js`
2. Test locally with a web server (required for service worker)
3. Upload changes to GitHub
4. GitHub Pages will automatically update

## Troubleshooting

**App not loading offline?**
- Make sure you visited the site at least once with internet
- Service worker needs to cache resources first

**Icons not showing?**
- Clear browser cache and revisit the site
- Check that icon files are in the correct `icons/` folder

**Not installable on iOS?**
- Must be accessed via Safari (not Chrome or other browsers)
- Site must be served over HTTPS (GitHub Pages provides this)

## License

This project is open source. Feel free to modify and distribute.
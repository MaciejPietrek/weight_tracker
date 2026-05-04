# Weight Tracker PWA

A Progressive Web App for tracking weight with offline support, optimized for iOS Safari.

## Features

- 📱 **Mobile-first design** - Optimized for iPhone and iPad
- 📊 **Interactive charts** - Visualize weight progress with Highcharts
- 💾 **Offline support** - Works without internet after first load
- 📤 **Data export/import** - JSON format for data backup
- 🏠 **Add to Home Screen** - Installable as native iOS app
- ⚡ **Fast loading** - Cached resources for instant startup

## File Structure

```
weight-tracker/
├── index.html          # Main HTML file with PWA meta tags
├── style.css           # All styles
├── script.js           # Application logic
├── manifest.json       # PWA manifest
├── sw.js              # Service Worker for offline support
├── icons/             # App icons
│   ├── icon-192.png
│   ├── icon-512.png
│   └── icon.svg
└── README.md          # This file
```

## How to Deploy to GitHub Pages

### 1. Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and create a new repository
2. Name it `weight-tracker` or any name you prefer
3. Make sure it's **public** (required for GitHub Pages)
4. Don't initialize with README (we'll upload our files)

### 2. Upload Files

Upload all files from this folder to your GitHub repository:

- `index.html`
- `style.css`
- `script.js`
- `manifest.json`
- `sw.js`
- `icons/` folder with all icon files

### 3. Enable GitHub Pages

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
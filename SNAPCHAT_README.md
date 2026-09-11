# Snapchat जैसा UI App

यह एक Snapchat-inspired सोशल मीडिया ऐप है जो React Native और Expo के साथ बनाया गया है।

## मुख्य Features

### 📸 Camera Screen
- Full-screen camera view
- Flash toggle
- Camera flip (front/back)
- Real-time preview
- Flash, brightness, और camera controls

### 💬 Chat Screen
- Friends की list
- Unviewed snaps के लिए Yellow border
- Quick reply system
- Online status indicator
- Unread notification dots

### 🎬 Stories Screen
- Full-screen vertical stories
- Story progress bar
- User info and timestamp
- Quick actions (like, share, download)
- Story viewing tracker
- Yellow border for unviewed stories

### 📷 Memories Screen
- Saved snaps collection
- Category-based organization (Today, Yesterday, This Week, etc.)
- Grid layout for easy browsing
- Camera roll access

### 👤 Profile Screen
- User profile information
- Snapchat score (👻 emojis)
- Friends count
- Stories sent count
- Snaps received count
- Edit profile option

### 🎨 Camera Filters & Stickers
- 6 different filters (Normal, Sepia, B&W, Vintage, Cool, Warm)
- 8 emoji stickers
- Text addition on snaps
- Real-time filter preview

### 💌 Chat Detail Screen
- One-on-one messaging
- Emoji-based messages
- Active status
- Message bubbles (sent/received)
- Plus button for sharing snaps
- Voice message support

## Design Highlights

### 🎨 Color Scheme
- **Primary**: Yellow (#FFFC00) - Snapchat की iconic color
- **Background**: Black (#000)
- **Secondary**: White (#fff) for chat
- **Accent**: Gold highlights

### 📱 Navigation
- 5-tab bottom navigation
- Camera (Main)
- Chat (Messages)
- Stories (View snaps)
- Memories (Saved content)
- Profile (User info)

### ✨ UI Components
- Full-screen camera preview
- Vertical story swipes
- Yellow notification badges
- Circular avatars
- Message bubbles
- Filter panels
- Sticker picker

## Installation

```bash
npm install
npm start
```

## Running

```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## Tech Stack

- React Native
- Expo
- React Navigation
- Material Community Icons
- Animated API

## File Structure

```
├── SnapchatApp.js              # Main app component
├── screens/
│   ├── ChatDetailScreen.js     # One-on-one chat
│   └── CameraFiltersScreen.js  # Filters और stickers
└── README.md
```

## Future Features

- [ ] Real-time messaging with Firebase
- [ ] Camera capture functionality
- [ ] Image filters और AR effects
- [ ] Snap map integration
- [ ] Discover page with content
- [ ] Video recording
- [ ] Geofencing features
- [ ] Bitmoji integration

## License

MIT

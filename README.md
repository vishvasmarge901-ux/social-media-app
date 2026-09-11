# Social Media App

An Instagram-like social media application built with React Native and Expo.

## Features

- **Stories Section**: Horizontal scrollable stories with profile images and names
- **Feed**: Vertical scrollable feed displaying user posts
- **Post Interactions**: Like, comment, share, and bookmark posts
- **User Profiles**: Display user information and post captions
- **Modern UI**: Clean and intuitive interface inspired by Instagram

## Getting Started

### Prerequisites

- Node.js and npm installed
- Expo CLI installed (`npm install -g expo-cli`)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/vishvasmarge901-ux/social-media-app.git
cd social-media-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the app:
```bash
npm start
```

4. Run on your device:
   - **iOS**: Press `i`
   - **Android**: Press `a`
   - **Web**: Press `w`

## Project Structure

```
social-media-app/
├── App.js              # Main application component
├── package.json        # Project dependencies
├── app.json           # Expo configuration
└── README.md          # Project documentation
```

## Components

### Stories Component
- Horizontal scrollable list of user stories
- Circular profile images with gradient borders
- Story names displayed below images

### Feed Component
- Posts displayed in a vertical FlatList
- Post header with user information
- Post image
- Action buttons (like, comment, share, bookmark)
- Like count and caption

## Styling

All styles are defined in the StyleSheet and organized by component. The app uses:
- Flexbox for layout
- React Native's built-in components
- Expo Vector Icons for icons

## Future Enhancements

- [ ] User authentication
- [ ] Backend integration
- [ ] Real image uploads
- [ ] Comments section
- [ ] Direct messaging
- [ ] User profiles
- [ ] Follow/Unfollow functionality
- [ ] Search functionality
- [ ] Notifications
- [ ] Dark mode

## License

MIT

## Author

Vishvas Marge

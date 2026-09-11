# 📱 Social Media App

<div align="center">
  <h3>A Multi-Platform React Native Social Media Application</h3>
  <p>
    <strong>Instagram</strong> • <strong>Snapchat</strong> • <strong>Security</strong> • <strong>Enhanced Features</strong>
  </p>
</div>

---

## 🚀 Overview

यह एक comprehensive React Native social media application है जो **Instagram** और **Snapchat** जैसी features provide करता है। App में multiple UI variants, advanced security, state management, और rich interactive features हैं।

### 🌟 Highlights

✅ **3 अलग-अलग UI Variants:**
- Instagram-like feed interface
- Enhanced UI with interactive features
- Snapchat-like camera-first design

✅ **Enterprise-Grade Security:**
- Password encryption (SHA256)
- Secure token management
- Input validation & sanitization
- Rate limiting & CORS protection

✅ **Interactive Features:**
- Like/Unlike functionality
- Comments & messaging
- Story viewing with progress
- Real-time notifications

---

## 📂 Project Structure

```
social-media-app/
├── 📄 App.js                          # Instagram-like main app
├── 📄 SnapchatApp.js                  # Snapchat-like main app
│
├── 📁 screens/
│   ├── LoginScreen.js                 # Secure login
│   ├── ChatDetailScreen.js            # One-on-one chat
│   └── CameraFiltersScreen.js         # Camera filters
│
├── 📁 utils/
│   ├── encryption.js                  # Password & data encryption
│   ├── storage.js                     # Secure & regular storage
│   ├── auth.js                        # Authentication logic
│   ├── validation.js                  # Input validation
│   ├── api.js                         # Secure API calls
│   └── logger.js                      # Event logging
│
├── 📁 middleware/
│   └── securityMiddleware.js          # Security headers & validation
│
├── 📁 config/
│   └── security-config.js             # Security settings
│
├── 📄 README.md                       # Main documentation
└── 📄 SNAPCHAT_README.md              # Snapchat variant docs
```

---

## 🌿 Git Branches

### **1. `main` - Instagram-Like UI** 📸
Main social media feed interface
- ✅ Stories carousel
- ✅ Post feed with likes & comments
- ✅ Bottom navigation (5 tabs)
- ✅ Notification badge system

### **2. `feature/enhanced-ui` - Enhanced Features** ⚡
Improved interactive features
- ✅ State management (likes, bookmarks)
- ✅ Interactive buttons with visual feedback
- ✅ Timestamps on posts
- ✅ Comment counters

### **3. `feature/security` - Security & Authentication** 🔐
Enterprise-grade security features
- ✅ User authentication
- ✅ Password encryption
- ✅ Secure token management
- ✅ Input validation
- ✅ API security
- ✅ Event logging

### **4. `feature/snapchat-ui` - Snapchat Design** 🟡
Snapchat-inspired camera-first interface
- ✅ Full-screen camera view
- ✅ Vertical story viewing
- ✅ Chat interface
- ✅ Memories (saved snaps)
- ✅ Filter & sticker system

---

## ✨ Features by Branch

| Feature | main | enhanced-ui | security | snapchat-ui |
|---------|------|-------------|----------|-------------|
| Instagram Feed | ✅ | ✅ | - | - |
| Snapchat UI | - | - | - | ✅ |
| Authentication | - | - | ✅ | - |
| State Management | ✅ | ✅ | - | ✅ |
| Security Features | - | - | ✅ | - |
| Camera Filters | - | - | - | ✅ |
| Chat System | ✅ | ✅ | ✅ | ✅ |

---

## 🛠️ Installation

### Prerequisites
```bash
Node.js >= 14.0
npm or yarn
Expo CLI
```

### Clone & Setup
```bash
# Repository clone करें
git clone https://github.com/vishvasmarge901-ux/social-media-app.git
cd social-media-app

# Dependencies install करें
npm install
```

### Run करें
```bash
# Expo dev server start करें
npm start

# iOS simulator पर
npm run ios

# Android emulator पर
npm run android
```

---

## 📱 Branch-wise Usage

### **Instagram UI (main)**
```bash
git checkout main
npm install
npm start
```

### **Enhanced Features**
```bash
git checkout feature/enhanced-ui
npm install
npm start
```

### **Security Features**
```bash
git checkout feature/security
npm install
npm start
```

### **Snapchat UI**
```bash
git checkout feature/snapchat-ui
npm install
npm start
```

---

## 🔐 Security Features

### Password Requirements
```
✅ Minimum 8 characters
✅ Uppercase letters (A-Z)
✅ Lowercase letters (a-z)
✅ Numbers (0-9)
✅ Special characters (!@#$%^&*)
```

### Encryption & Hashing
```javascript
// Password hashing
const hashedPassword = await hashPassword(password);

// Data encryption
const encrypted = await encryptData(sensitiveData);

// Token generation
const token = await generateToken();
```

### Secure Storage
```javascript
// Sensitive data (encrypted)
await secureStorageSet('authToken', token);

// Regular data
await storageSet('userPreferences', data);
```

---

## 🎨 Design & UI

### Color Palettes

#### Instagram Theme
- 🔵 Blue: #0095f6 (Primary)
- 🔴 Red: #e31e56 (Liked)
- 🟣 Purple: #c13584 (Stories)

#### Snapchat Theme
- 🟡 Yellow: #FFFC00 (Primary)
- ⬛ Black: #000 (Background)
- ⚪ White: #fff (Chat)

---

## 🚀 Deployment

### Expo to iOS/Android
```bash
# Build करें
eas build --platform ios
eas build --platform android

# Submit करें
eas submit --platform ios
eas submit --platform android
```

---

## 🤝 Contributing

### How to Contribute

1. **Fork करें**
2. **Feature branch बनाएं** (`git checkout -b feature/your-feature`)
3. **Changes करें**
4. **Commit करें** (`git commit -m "Add: description"`)
5. **Push करें** (`git push origin feature/your-feature`)
6. **Pull Request खोलें**

---

## 📈 Future Roadmap

### Phase 1 (Current) ✅
- Multiple UI variants
- Security features
- Basic messaging

### Phase 2 (Upcoming) 🔄
- Real-time database (Firebase)
- Actual camera capture
- Image filters & AR
- Video support

### Phase 3 (Future) 🔄
- Live streaming
- Geolocation features
- AI-powered recommendations
- Web app version

---

## 📄 License

MIT License - freely use, modify, and distribute

---

## 👥 Author

**Vishvas Marge** 👨‍💻
- GitHub: [@vishvasmarge901-ux](https://github.com/vishvasmarge901-ux)
- Email: vishvasmarge901@gmail.com

---

## 🌟 Support

अगर आपको यह project पसंद आया, तो:
- ⭐ GitHub पर star दें
- 🍴 Fork करें
- 🐛 Issues report करें
- 💡 Suggestions दें

---

## 📞 Links

| Link | URL |
|------|-----|
| Main Repo | https://github.com/vishvasmarge901-ux/social-media-app |
| Instagram | https://github.com/vishvasmarge901-ux/social-media-app/tree/main |
| Enhanced UI | https://github.com/vishvasmarge901-ux/social-media-app/tree/feature/enhanced-ui |
| Security | https://github.com/vishvasmarge901-ux/social-media-app/tree/feature/security |
| Snapchat UI | https://github.com/vishvasmarge901-ux/social-media-app/tree/feature/snapchat-ui |

---

<div align="center">
  <p>
    <strong>Made with ❤️ by Vishvas Marge</strong>
  </p>
  <p>
    <sub>If you found this helpful, please consider giving it a ⭐</sub>
  </p>
</div>

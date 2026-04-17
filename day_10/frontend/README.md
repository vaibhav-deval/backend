# 🎵 Moodify — AI-Powered Mood-Based Music Player

A cutting-edge full-stack music application that uses facial expression recognition to recommend songs based on your current mood. Built with modern web technologies and featuring a sleek, responsive UI with smooth animations and transitions.

## ✨ Features

### 🎭 Mood Detection
- **Real-time Facial Expression Analysis**: Uses MediaPipe's FaceLandmarker to detect emotions like happy, surprised, sad, or neutral
- **AI-Powered Recommendations**: Automatically fetches songs matching your detected mood
- **Interactive Camera Interface**: Live video feed with elegant overlay effects

### 🎶 Music Player
- **Full-Featured Audio Controls**: Play/pause, skip forward/backward, progress scrubbing
- **Playback Customization**: Adjustable speed (0.5x to 2x) and volume controls
- **Rich Song Metadata**: Displays title, poster, and duration
- **Responsive Design**: Optimized for desktop and mobile devices

### 🔐 Authentication
- **Secure User System**: JWT-based authentication with secure cookies
- **User Registration & Login**: Clean, modern forms with validation
- **Protected Routes**: Seamless authentication flow

### 🎨 Modern UI/UX
- **Dark Theme**: Elegant dark color scheme with gradient accents
- **Smooth Animations**: Fade-in effects, hover transitions, and micro-interactions
- **Responsive Layout**: Grid-based design that adapts to all screen sizes
- **Glassmorphism Effects**: Backdrop blur and transparency for modern aesthetics
- **Custom Scrollbars**: Styled scrollbars matching the theme

## 🛠 Technology Stack

### Frontend
- **React 19.2.4** - Modern React with hooks and concurrent features
- **Vite** - Lightning-fast build tool and dev server
- **React Router 7.13.2** - Declarative routing for React
- **SCSS** - Enhanced CSS with variables, mixins, and nesting
- **Axios** - HTTP client for API requests
- **MediaPipe Tasks Vision** - AI-powered facial expression detection

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **multer** - File upload handling
- **ImageKit** - Cloud media storage and optimization
- **Redis** - Token blacklist storage

## 📁 Project Structure

```
frontend/
├── src/
│   ├── features/
│   │   ├── auth/           # Authentication pages and logic
│   │   ├── home/           # Main app with mood detection and player
│   │   ├── Expressions/    # Facial expression detection component
│   │   └── shared/         # Reusable components and global styles
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # App entry point
│   └── app.routes.jsx      # Route definitions
├── public/                 # Static assets
└── package.json

backend/
├── src/
│   ├── controllers/        # Request handlers
│   ├── models/            # Database schemas
│   ├── routes/            # API route definitions
│   ├── services/          # Business logic services
│   ├── config/            # Database and cache config
│   └── middlewares/       # Custom middleware
└── server.js              # Server entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB database
- ImageKit account for media storage
- Webcam access for mood detection

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with required environment variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secure_jwt_secret_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   REDIS_URL=your_redis_connection_url
   ```

4. Start the backend server:
   ```bash
   npm run server
   ```
   The API will be available at `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

## 🎯 Usage

1. **Register/Login**: Create an account or sign in
2. **Grant Camera Access**: Allow webcam permission for mood detection
3. **Detect Your Mood**: Click "Get Expression" to analyze your facial expression
4. **Enjoy Music**: Listen to AI-recommended songs matching your mood
5. **Control Playback**: Use the player controls to customize your listening experience

## 🎨 UI Highlights

- **Gradient Backgrounds**: Beautiful purple-to-pink gradients on auth pages
- **Card-Based Layout**: Elevated cards with shadows and rounded corners
- **Interactive Elements**: Hover effects, button animations, and smooth transitions
- **Typography**: Clean, modern font stack with proper hierarchy
- **Color Palette**: Consistent dark theme with accent colors for CTAs
- **Accessibility**: Focus states, proper contrast ratios, and keyboard navigation

## 📱 Responsive Design

The app is fully responsive and works seamlessly across:
- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile phones (320px - 767px)

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |
| GET | `/api/auth/get-me` | Get current user |
| GET | `/api/auth/logout` | Logout user |
| GET | `/api/songs?mood={mood}` | Fetch song by mood |
| POST | `/api/songs` | Upload new song |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [MediaPipe](https://mediapipe.dev/) for facial landmark detection
- [ImageKit](https://imagekit.io/) for media storage
- [React](https://reactjs.org/) and [Vite](https://vitejs.dev/) for the frontend framework

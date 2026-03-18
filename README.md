# 🌾 FarmVista - Smart Agricultural Management Platform

<div align="center">

![FarmVista Logo](https://img.shields.io/badge/FarmVista-Agricultural%20Management-green?style=for-the-badge&logo=leaf)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)

*A modern, AI-powered agricultural management system designed to help farmers optimize their crop production through intelligent insights and data-driven recommendations.*

[🚀 Live Demo](#) · [📖 Documentation](#documentation) · [🐛 Report Issues](https://github.com/abhylash/FarmVista/issues) · [💡 Feature Requests](https://github.com/abhylash/FarmVista/issues)

</div>

## 📋 Table of Contents

- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🔧 Configuration](#-configuration)
- [📚 API Documentation](#-api-documentation)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## ✨ Features

### 🌱 Farm Management
- **Smart Farm Registration**: Register multiple farms with precise GPS coordinates
- **Crop Tracking**: Monitor different crops and their growth stages
- **Soil Analysis**: Track soil types and receive tailored recommendations
- **Area Management**: Calculate and manage farm areas in square meters

### 🤖 AI-Powered Insights
- **Intelligent Advice**: Get personalized farming recommendations using Google Gemini AI
- **Weather Integration**: Real-time weather data integration with OpenWeatherMap
- **Crop Stage Optimization**: Stage-specific farming guidance
- **Data-Driven Decisions**: Make informed decisions based on comprehensive analysis

### 🔐 User Management
- **Secure Authentication**: JWT-based authentication system
- **User Profiles**: Personalized dashboards and farm management
- **Regional Support**: Location-based services and recommendations

### 📱 Modern UI/UX
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Interactive Dashboard**: Real-time farm status and insights
- **Intuitive Navigation**: User-friendly interface with smooth transitions
- **Modern Styling**: Beautiful UI with Tailwind CSS and Framer Motion

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React App     │    │  Express API    │    │   MongoDB      │
│   (Frontend)    │◄──►│   (Backend)     │◄──►│   (Database)   │
│                 │    │                 │    │                 │
│ • User Interface│    │ • REST API      │    │ • Users         │
│ • State Mgmt    │    │ • Auth Middleware│    │ • Farms         │
│ • Routing       │    │ • AI Integration │    │ • Advice        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Vite          │    │   JWT Auth      │    │   Mongoose      │
│   Tailwind      │    │   bcryptjs      │    │   Indexing      │
│   Framer Motion │    │   CORS          │    │   Validation    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - Modern UI library with hooks and context
- **Vite 7.2.4** - Fast build tool and development server
- **React Router 7.11.0** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Axios** - HTTP client for API calls
- **Headless UI** - Accessible UI components
- **Heroicons** - Beautiful SVG icons

### Backend
- **Node.js** - JavaScript runtime
- **Express 5.2.1** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose 9.1.2** - Object Data Modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Google Generative AI** - AI-powered recommendations
- **OpenWeatherMap API** - Weather data integration

### Development Tools
- **ESLint** - Code linting
- **nodemon** - Auto-restart development server
- **dotenv** - Environment variable management

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/abhylash/FarmVista.git
   cd FarmVista
   ```

2. **Install dependencies**
   ```bash
   # Install client dependencies
   cd client
   npm install
   
   # Install server dependencies
   cd ../server
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the `server` directory:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/farmvista
   
   # JWT Secret
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   
   # API Keys
   GEMINI_API_KEY=your_gemini_api_key
   WEATHER_API_KEY=your_openweather_api_key
   WEATHER_API_URL=https://api.openweathermap.org/data/2.5
   
   # Frontend URL
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start the application**
   
   **Terminal 1 - Start Backend:**
   ```bash
   cd server
   npm run dev
   ```
   
   **Terminal 2 - Start Frontend:**
   ```bash
   cd client
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - API Health Check: http://localhost:5000/api/health

## 📁 Project Structure

```
FarmVista/
├── client/                     # React Frontend
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── context/           # React context
│   │   ├── pages/             # Page components
│   │   ├── styles/            # CSS styles
│   │   ├── utils/             # Utility functions
│   │   ├── App.jsx            # Main App component
│   │   └── main.jsx           # Entry point
│   ├── package.json
│   └── vite.config.js
├── server/                     # Node.js Backend
│   ├── config/                # Database configuration
│   ├── controllers/           # Route controllers
│   ├── middleware/            # Custom middleware
│   ├── models/                # Mongoose models
│   ├── routes/                # API routes
│   ├── server.js              # Server entry point
│   └── package.json
├── .gitignore                  # Git ignore file
└── README.md                   # This file
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | Yes |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `GEMINI_API_KEY` | Google AI API key | Yes |
| `WEATHER_API_KEY` | OpenWeatherMap API key | Yes |
| `FRONTEND_URL` | Frontend URL for CORS | Yes |

### API Keys Setup

1. **Google Gemini API Key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Add it to your `.env` file

2. **OpenWeatherMap API Key**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up and get a free API key
   - Add it to your `.env` file

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/login` | User login |
| `GET` | `/api/auth/me` | Get current user |

### Farm Management Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/farms` | Get user farms |
| `POST` | `/api/farms` | Create new farm |
| `GET` | `/api/farms/:id` | Get farm details |
| `PUT` | `/api/farms/:id` | Update farm |
| `DELETE` | `/api/farms/:id` | Delete farm |

### Advice Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/advice/generate/:farmId` | Generate AI advice |
| `GET` | `/api/advice/farm/:farmId` | Get farm advice history |
| `GET` | `/api/advice` | Get all user advice |

### Sample API Response

```json
{
  "success": true,
  "data": {
    "farm": {
      "_id": "64a7b8c9d1e2f3g4h5i6j7k8",
      "farmName": "Green Valley Farm",
      "crop": "Wheat",
      "soilType": "Loamy",
      "cropStage": "Vegetative",
      "areaSqMeters": 5000,
      "location": {
        "latitude": 28.6139,
        "longitude": 77.2090,
        "city": "Delhi",
        "state": "Delhi"
      }
    }
  }
}
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Google Generative AI](https://ai.google.dev/) for providing AI capabilities
- [OpenWeatherMap](https://openweathermap.org/) for weather data
- [React](https://reactjs.org/) for the frontend framework
- [Express.js](https://expressjs.com/) for the backend framework
- [MongoDB](https://www.mongodb.com/) for the database

---

<div align="center">

**Made with ❤️ for farmers worldwide**

[⭐ Star this repo](https://github.com/abhylash/FarmVista) · [🐛 Report Issues](https://github.com/abhylash/FarmVista/issues) · [📧 Contact Us](mailto:contact@farmvista.com)

</div>

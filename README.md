# Wajeb Homework App

A modern, multilingual Home Work management platform with dark/light theme support and comprehensive user authentication.

## Features

### Authentication System
- User registration and login
- JWT token-based authentication
- Protected routes
- Account management (edit profile, delete account)

### File Management
- Upload files with sender information
- View files in table format
- Download and delete files
- File metadata (description, tags, etc.)
- Automatic file deletion after 7 days
- file Size restriction

### Multi-Language Support
- **Arabic** (default) - العربية
- **English** - English  
- **French** - Français
- RTL/LTR text direction support
- Language persistence in localStorage

### Theme System
- **Light Theme** (default)
- **Dark Theme**
- Smooth transitions between themes
- Theme persistence in localStorage
- SCSS variables for easy customization

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Collapsible sidebar navigation
- Touch-friendly interface

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Git

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd wajeb-app
```

### 2. Install Dependencies
```bash
# Install all dependencies (root, backend, frontend)
npm run install:all
```

### 3. Environment Configuration

#### Backend (.env file in `/back` directory)
```env
MONGO_DB=mongodb+srv://username:password@cluster.mongodb.net/wajeb?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your-super-secret-jwt-key
APIKEY=your-api-key
PORT=3000
```

#### Frontend API Configuration (`/front/src/config/api.js`)
```javascript
const config = {
  development: {
    API_BASE_URL: 'http://localhost:3000',
    // ... other config
  },
  production: {
    API_BASE_URL: 'https://your-vps-domain.com', // Replace with your VPS domain
    // ... other config
  }
};
```

### 4. Run the Application

#### Development Mode (Both Frontend & Backend)
```bash
npm run dev
```

#### Individual Services
```bash
# Backend only
npm run dev:backend

# Frontend only  
npm run dev:frontend
```

#### Production Mode
```bash
npm run start
```


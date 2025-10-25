
<img width="1917" height="910" alt="4" src="https://github.com/user-attachments/assets/dc0b038e-5c12-4738-af52-827b7f0ebb46" />
<img width="1919" height="908" alt="3" src="https://github.com/user-attachments/assets/e7d6ebfd-0f7a-4f48-b263-e7642048d81e" />
<img width="1919" height="904" alt="2" src="https://github.com/user-attachments/assets/136a72a1-93ed-4ce1-b26b-5e2b02f63dea" />
<img width="1919" height="919" alt="1" src="https://github.com/user-attachments/assets/46e25366-53a0-411e-b20a-ab190bb49eba" />

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
git clone 
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


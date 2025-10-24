
<img width="1906" height="909" alt="1" src="https://github.com/user-attachments/assets/3c6dd4cb-86eb-4844-a854-3f42c7c57023" />
<img width="1919" height="903" alt="2" src="https://github.com/user-attachments/assets/97a69d78-3722-4845-aab1-ab2f841b3503" />
<img width="1906" height="909" alt="3" src="https://github.com/user-attachments/assets/336d85bd-d8fb-4b96-b5ce-2ba1b4315e0b" />
<img width="1896" height="898" alt="4" src="https://github.com/user-attachments/assets/eac66964-0822-4244-83a0-8a3cae3c1e0a" />
<img width="1911" height="899" alt="5" src="https://github.com/user-attachments/assets/6fd7dfb8-0070-4198-b3a0-655b0b804ff5" />

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


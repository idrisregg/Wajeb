
<img width="1918" height="912" alt="1" src="https://github.com/user-attachments/assets/3ff6f437-7c54-408a-87b9-6ba26a79ecc7" />
<img width="1916" height="912" alt="2" src="https://github.com/user-attachments/assets/59166e66-b519-48bf-a907-20deee30a6ab" />
<img width="1917" height="908" alt="3" src="https://github.com/user-attachments/assets/febbe1b4-eb4e-4924-8059-c1fb5f8b4e64" />
<img width="1918" height="882" alt="4" src="https://github.com/user-attachments/assets/8f2cbaf6-ba0f-4abd-af08-1250c91354e5" />
<img width="1919" height="908" alt="5" src="https://github.com/user-attachments/assets/a6a73ead-5f6d-43df-91ad-d2aa9afb62ea" />

# Wajeb Homework App

A modern, multilingual Home Work management platform with dark/light theme support and comprehensive user authentication.

## Tech Stack:
- React - React Router
- Fastify (back-end)
- AWS S3 ( Cloud Storage)
- MongoDB (Database)

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


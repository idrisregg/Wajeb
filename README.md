# Wajeb File Management Application

A modern, multilingual file management platform with dark/light theme support and comprehensive user authentication.

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
- Public/private file settings
- File metadata (description, tags, etc.)
- Automatic file deletion after 7 days

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

## 🌐 Deployment to VPS

### 1. Update API Configuration
Edit `/front/src/config/api.js` and update the production URL:
```javascript
production: {
  API_BASE_URL: 'https://your-domain.com', // Your VPS domain
  APP_NAME: 'Wajeb',
  APP_VERSION: '1.0.0',
  APP_ENV: 'production'
}
```

### 2. Build for Production
```bash
npm run build
```

### 3. Deploy to VPS
- Upload the built files to your VPS
- Set up MongoDB Atlas connection
- Configure environment variables
- Start the production server

## Customization

### Adding New Languages
1. Edit `/front/context/languageContext/index.jsx`
2. Add new language object to `translations`
3. Add language option to `languages` array in `LanguageToggle` component

### Customizing Themes
1. Edit `/front/src/styles/themes.scss`
2. Modify SCSS variables for colors, gradients, etc.
3. Add new theme variants as needed

### API Configuration
- **Development**: Uses `http://localhost:3000`
- **Production**: Uses your VPS domain
- **Staging**: Add staging environment as needed

## Usage

### For Users
1. **Register**: Create a new account
2. **Login**: Use your credentials
3. **Upload Files**: Add files with sender information
4. **View Files**: Browse uploaded files in table format
5. **Manage Account**: Edit profile or delete account
6. **Change Language**: Use the language toggle (top-left)
7. **Toggle Theme**: Use the theme toggle (top-right)

### For Developers
- **API Service**: Centralized API calls in `/front/src/services/apiService.js`
- **Context Providers**: Auth, Theme, and Language contexts
- **Responsive Components**: Mobile-first design approach
- **Error Handling**: Comprehensive error messages and validation

## Available Scripts

```bash
# Development
npm run dev              # Run both frontend and backend
npm run dev:backend      # Run backend only
npm run dev:frontend     # Run frontend only

# Production
npm run start            # Run production build
npm run start:backend    # Run backend production
npm run start:frontend   # Run frontend production

# Building
npm run build            # Build both frontend and backend
npm run build:frontend   # Build frontend only
npm run build:backend    # Build backend only

# Utilities
npm run install:all      # Install all dependencies
npm run clean            # Clean all node_modules
npm run test             # Run all tests
```

## Internationalization

The application supports three languages with automatic RTL/LTR text direction:

- **Arabic** (العربية) - RTL, default
- **English** - LTR
- **French** (Français) - LTR

Language selection persists across sessions and affects:
- All UI text and labels
- Form placeholders
- Error messages
- Navigation items
- Button text

## Theme System

The application features a comprehensive theme system:

- **Light Theme**: Clean, professional appearance
- **Dark Theme**: Easy on the eyes for low-light usage
- **Smooth Transitions**: 0.3s ease transitions between themes
- **SCSS Variables**: Easy customization and maintenance
- **Persistence**: Theme choice saved in localStorage

## File Management Features

- **Upload**: Drag-and-drop file selection with validation
- **Metadata**: Sender name, description, tags, public/private settings
- **Table View**: Professional table layout with sorting and pagination
- **Download**: Secure file download with access control
- **Delete**: File removal with confirmation dialogs
- **Statistics**: Upload/download counts and file information
- **Auto-cleanup**: Files automatically deleted after 7 days

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt password encryption
- **File Validation**: Size limits and type checking
- **Access Control**: User-specific file access
- **Input Validation**: Comprehensive form validation
- **Error Handling**: Secure error messages without data leakage

## Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Responsive layout for tablets
- **Desktop**: Full-featured desktop experience
- **Touch Friendly**: Large touch targets and gestures
- **Collapsible Navigation**: Space-efficient mobile navigation

## Performance

- **Code Splitting**: Optimized bundle sizes
- **Lazy Loading**: Components loaded on demand
- **Caching**: localStorage for user preferences
- **Optimized Images**: Efficient image handling
- **Minimal Dependencies**: Lightweight framework usage

## Support

For support or questions:
- **Email**: support@wajeb.com
- **Documentation**: Check this README
- **Issues**: Report bugs via GitHub issues

## License

This project is licensed under the MIT License.

---

**Wajeb** - Modern File Management Platform


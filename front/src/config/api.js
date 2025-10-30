const config = {
  development: {
    API_BASE_URL: 'http://localhost:3004',
    APP_NAME: 'Wajeb',
    APP_VERSION: '1.0.0',
    APP_ENV: 'development'
  },
  production: {
    API_BASE_URL: 'https://your-vps-domain.com', 
    APP_VERSION: '1.0.0',
    APP_ENV: 'production'
  },
  staging: {
    API_BASE_URL: 'https://staging.your-domain.com',
    APP_NAME: 'Wajeb',
    APP_VERSION: '1.0.0',
    APP_ENV: 'staging'
  }
};

const getCurrentEnvironment = () => {
  if (import.meta.env.DEV) {
    return 'development';
  }
  
  if (import.meta.env.PROD) {
    return 'production';
  }
  
  return 'development';
};

export const currentConfig = config[getCurrentEnvironment()];

export default config;


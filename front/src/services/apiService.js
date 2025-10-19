import { currentConfig } from '../config/api.js';

class ApiService {
  constructor() {
    this.baseURL = currentConfig.API_BASE_URL;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    // Add auth token if available
    const token = localStorage.getItem('Access_Token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // User API methods
  async login(email, password) {
    return this.request('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  }

  async register(userName, email, password) {
    return this.request('/api/users', {
      method: 'POST',
      body: JSON.stringify({ userName, email, password })
    });
  }

  async getUserInfo() {
    return this.request('/api/users/me');
  }

  async updateUser(userId, data) {
    return this.request(`/api/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async deleteUser(userId) {
    return this.request(`/api/users/${userId}`, {
      method: 'DELETE'
    });
  }

  // File API methods
  async uploadFile(formData) {
    const token = localStorage.getItem('Access_Token');
    const url = `${this.baseURL}/api/files/upload`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  }

  async getFiles(page = 1, limit = 10, publicOnly = false) {
    const endpoint = publicOnly ? '/api/files/public' : '/api/files';
    return this.request(`${endpoint}?page=${page}&limit=${limit}`);
  }

  async getFileById(fileId) {
    return this.request(`/api/files/${fileId}`);
  }

  async downloadFile(fileId) {
    const token = localStorage.getItem('Access_Token');
    const url = `${this.baseURL}/api/files/${fileId}/download`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return response;
  }

  async updateFile(fileId, data) {
    return this.request(`/api/files/${fileId}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async deleteFile(fileId) {
    return this.request(`/api/files/${fileId}`, {
      method: 'DELETE'
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }

  // Get API info
  async getApiInfo() {
    return this.request('/api');
  }
}

// Create and export singleton instance
export const apiService = new ApiService();
export default apiService;



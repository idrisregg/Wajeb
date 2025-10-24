import { currentConfig } from '../config/api.js';

class ApiService {
  constructor() {
    this.baseURL = currentConfig.API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

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
  async uploadFile(formData, recipientId) {
    const token = localStorage.getItem('Access_Token');
    const url = `${this.baseURL}/api/files/upload`;
    
    // Add recipient to form data
    formData.append('recipientId', recipientId);
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }

      return response.json();
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  }

  async getFiles(page = 1, limit = 10, recipientId = null) {
    const endpoint = recipientId 
      ? `/api/files?page=${page}&limit=${limit}&recipient=${recipientId}`
      : `/api/files?page=${page}&limit=${limit}`;
    return this.request(endpoint);
  }

  async getFileById(fileId) {
    return this.request(`/api/files/${fileId}`);
  }

  async downloadFile(fileId) {
    const token = localStorage.getItem('Access_Token');
    const url = `${this.baseURL}/api/files/${fileId}/download`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Download failed: ${response.statusText}`);
      }

      // Get filename from headers
      const contentDisposition = response.headers.get('content-disposition');
      const filename = contentDisposition
        ? contentDisposition.split('filename=')[1].replace(/"/g, '')
        : 'download';

      // Convert response to blob
      const blob = await response.blob();
      
      // Create download link
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      return { success: true };
    } catch (error) {
      console.error('Download error:', error);
      throw error;
    }
  }

  async updateFile(fileId, data) {
    return this.request(`/api/files/${fileId}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

 async deleteFile(fileId) {
  const token = localStorage.getItem('Access_Token');
  const url = `${this.baseURL}/api/files/${fileId}`;
  
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
        // Remove Content-Type for DELETE requests without body
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Delete file error:', error);
    throw error;
  }
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

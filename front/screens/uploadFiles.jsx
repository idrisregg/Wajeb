
import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import { apiService } from '../src/services/apiService';
import './uploadFiles.scss';

const UploadFiles = () => {
    const { token } = useAuth();
    const [file, setFile] = useState(null);
    const [senderName, setSenderName] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            // Check file size (10MB limit)
            if (selectedFile.size > 10 * 1024 * 1024) {
                setError('File size must be less than 10MB');
                return;
            }
            setFile(selectedFile);
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!file) {
            setError('Please select a file');
            return;
        }
        
        if (!senderName.trim()) {
            setError('Please enter sender name');
            return;
        }

        setUploading(true);
        setError('');
        setMessage('');

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('senderName', senderName);
            formData.append('description', description);
            formData.append('tags', tags);
            formData.append('isPublic', isPublic.toString());

            const data = await apiService.uploadFile(formData);

            setMessage('File uploaded successfully!');
            // Reset form
            setFile(null);
            setSenderName('');
            setDescription('');
            setTags('');
            setIsPublic(false);
            document.getElementById('fileInput').value = '';
        } catch (err) {
            setError(err.message || 'Network error. Please try again.');
            console.error('Upload error:', err);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="upload-container">
            <div className="upload-card">
                <h2>Upload File</h2>
                
                <form onSubmit={handleSubmit} className="upload-form">
                    <div className="form-group">
                        <label htmlFor="fileInput">Select File:</label>
                        <input
                            type="file"
                            id="fileInput"
                            onChange={handleFileChange}
                            className="file-input"
                            required
                        />
                        {file && (
                            <div className="file-info">
                                <p><strong>Selected:</strong> {file.name}</p>
                                <p><strong>Size:</strong> {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                <p><strong>Type:</strong> {file.type}</p>
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="senderName">Sender Name:</label>
                        <input
                            type="text"
                            id="senderName"
                            value={senderName}
                            onChange={(e) => setSenderName(e.target.value)}
                            placeholder="Enter sender name"
                            className="text-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description (Optional):</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter file description"
                            className="textarea-input"
                            rows="3"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="tags">Tags (Optional):</label>
                        <input
                            type="text"
                            id="tags"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="Enter tags separated by commas"
                            className="text-input"
                        />
                        <small>Example: document, important, work</small>
                    </div>

                    <div className="form-group checkbox-group">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={isPublic}
                                onChange={(e) => setIsPublic(e.target.checked)}
                                className="checkbox-input"
                            />
                            <span className="checkbox-text">Make this file public</span>
                        </label>
                        <small>Public files can be viewed by anyone</small>
                    </div>

                    {error && <div className="error-message">{error}</div>}
                    {message && <div className="success-message">{message}</div>}

                    <button 
                        type="submit" 
                        className="upload-btn"
                        disabled={uploading}
                    >
                        {uploading ? 'Uploading...' : 'Upload File'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UploadFiles;
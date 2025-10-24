import React, { useState, useRef } from 'react';
import { useAuth } from '../context/authContext';
import { apiService } from '../src/services/apiService';
import './uploadFiles.scss';
import { useLanguage } from '../context/languageContext';


const UploadFiles = () => {
    const {t} = useLanguage();
    const { token } = useAuth();
    const [file, setFile] = useState(null);
    const [senderName, setSenderName] = useState('');
    const [recipientUserName, setRecipientUserName] = useState(''); // CHANGED
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [uploading, setUploading] = useState(false);

    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        if (selectedFile.size > 10 * 1024 * 1024) {
            setError('File size must be less than 10MB');
            setFile(null);
            return;
        }

        setFile(selectedFile);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            setError('Please select a file');
            return;
        }

        if (!senderName.trim()) {
            setError('Sender name is required');
            return;
        }

        if (!recipientUserName.trim()) { // CHANGED
            setError('Recipient username is required');
            return;
        }

        try {
            setUploading(true);
            setError('');
            setMessage('');

            const formData = new FormData();
            formData.append('file', file);
            formData.append('senderName', senderName);
            formData.append('recipientUserName', recipientUserName); // CHANGED
            formData.append('description', description);
            formData.append('tags', tags);

            await apiService.uploadFile(formData, token);

            setMessage('✅ File uploaded successfully!');

            setFile(null);
            setSenderName('');
            setRecipientUserName(''); // CHANGED
            setDescription('');
            setTags('');

            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }

        } catch (err) {
            setError(err.message || 'Upload failed');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="upload-container">
            <h2 className='warning'>{t('warning')}</h2>
            <div className="upload-card">
                <h2>{t('uploadFile')}</h2>

                <form onSubmit={handleSubmit} className="upload-form">
                    <div className="form-group">
                        <label htmlFor="fileInput">{t('selectFile')}: <span className='max'>max 10MB</span></label>
                        <input
                            type="file"
                            id="fileInput"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="file-input"
                            required
                        />
                        {file && (
                            <div className="file-info">
                                <p><strong>{file.name}</strong></p>
                                <p>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                <p>{file.type}</p>
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="senderName">{t('senderName')}</label>
                        <input
                            type="text"
                            id="senderName"
                            value={senderName}
                            onChange={(e) => setSenderName(e.target.value)}
                            placeholder={t('senderName')}
                            className="text-input"
                            required
                        />
                    </div>

                    {/* CHANGED: Recipient Username field */}
                    <div className="form-group">
                        <label htmlFor="recipientUserName">{t('recipient') || 'Recipient Username'}</label>
                        <input
                            type="text"
                            id="recipientUserName"
                            value={recipientUserName}
                            onChange={(e) => setRecipientUserName(e.target.value)}
                            placeholder={t('recipient') || 'Enter recipient username'}
                            className="text-input"
                            required
                        />
                        <small className="field-hint">
                            {t('recipient') || 'Enter the username of the person who will receive this file'}
                        </small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">{t('description')}</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder={t('description')}
                            className="textarea-input"
                            rows="3"
                        />
                    </div>

            
                    {error && <div className="error-message">{error}</div>}
                    {message && <div className="success-message">{message}</div>}

                    <button
                        type="submit"
                        className="upload-btn"
                        disabled={uploading}
                    >
                        {uploading ? t('uploading') : t('upload')}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UploadFiles;
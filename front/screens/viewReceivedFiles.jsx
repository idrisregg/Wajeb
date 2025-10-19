
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { apiService } from '../src/services/apiService';
import './viewReceivedFiles.scss';

const ViewReceivedFiles = () => {
    const { token } = useAuth();
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showPublic, setShowPublic] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({});

    const fetchFiles = async (page = 1, publicOnly = false) => {
        try {
            setLoading(true);
            const data = publicOnly 
                ? await apiService.getPublicFiles(page, 10)
                : await apiService.getUserFiles(page, 10);
            
            setFiles(data.files);
            setPagination(data.pagination);
        } catch (err) {
            setError(err.message || 'Network error. Please try again.');
            console.error('Fetch files error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchFiles(currentPage, showPublic);
        }
    }, [token, currentPage, showPublic]);

    const handleDownload = async (fileId, fileName) => {
        try {
            const blob = await apiService.downloadFile(fileId);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (err) {
            setError(err.message || 'Download failed');
            console.error('Download error:', err);
        }
    };

    const handleDelete = async (fileId) => {
        if (!window.confirm('Are you sure you want to delete this file?')) {
            return;
        }

        try {
            await apiService.deleteFile(fileId);
            // Refresh the file list
            fetchFiles(currentPage, showPublic);
        } catch (err) {
            setError(err.message || 'Delete failed');
            console.error('Delete error:', err);
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="files-container">
                <div className="loading">Loading files...</div>
            </div>
        );
    }

    return (
        <div className="files-container">
            <div className="files-header">
                <h2>{showPublic ? 'Public Files' : 'My Files'}</h2>
                <div className="view-controls">
                    <button 
                        className={`view-btn ${!showPublic ? 'active' : ''}`}
                        onClick={() => setShowPublic(false)}
                    >
                        My Files
                    </button>
                    <button 
                        className={`view-btn ${showPublic ? 'active' : ''}`}
                        onClick={() => setShowPublic(true)}
                    >
                        Public Files
                    </button>
                </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            {files.length === 0 ? (
                <div className="no-files">
                    <p>No files found.</p>
                </div>
            ) : (
                <>
                    <div className="files-table-container">
                        <table className="files-table">
                            <thead>
                                <tr>
                                    <th>اسم الملف</th>
                                    <th>اسم المرسل</th>
                                    <th>الحجم</th>
                                    <th>النوع</th>
                                    <th>تاريخ الرفع</th>
                                    <th>عدد التحميلات</th>
                                    <th>الحالة</th>
                                    <th>الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {files.map((file) => (
                                    <tr key={file._id}>
                                        <td className="file-name-cell">
                                            <div className="file-name-info">
                                                <span className="file-name">{file.originalName}</span>
                                                {file.description && (
                                                    <small className="file-description">{file.description}</small>
                                                )}
                                            </div>
                                        </td>
                                        <td className="sender-cell">
                                            <span className="sender-name">{file.senderName}</span>
                                        </td>
                                        <td className="size-cell">
                                            <span className="file-size">{formatFileSize(file.fileSize)}</span>
                                        </td>
                                        <td className="type-cell">
                                            <span className="file-type">{file.mimeType}</span>
                                        </td>
                                        <td className="date-cell">
                                            <span className="upload-date">{formatDate(file.createdAt)}</span>
                                        </td>
                                        <td className="downloads-cell">
                                            <span className="download-count">{file.downloadCount}</span>
                                        </td>
                                        <td className="status-cell">
                                            {file.isPublic ? (
                                                <span className="status-badge public">عام</span>
                                            ) : (
                                                <span className="status-badge private">خاص</span>
                                            )}
                                        </td>
                                        <td className="actions-cell">
                                            <div className="table-actions">
                                                <button 
                                                    className="action-btn download"
                                                    onClick={() => handleDownload(file._id, file.originalName)}
                                                    title="تحميل"
                                                >
                                                    ⬇️
                                                </button>
                                                {!showPublic && (
                                                    <button 
                                                        className="action-btn delete"
                                                        onClick={() => handleDelete(file._id)}
                                                        title="حذف"
                                                    >
                                                        🗑️
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {pagination.totalPages > 1 && (
                        <div className="pagination">
                            <button 
                                className="page-btn"
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={!pagination.hasPrev}
                            >
                                Previous
                            </button>
                            
                            <span className="page-info">
                                Page {pagination.currentPage} of {pagination.totalPages}
                            </span>
                            
                            <button 
                                className="page-btn"
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={!pagination.hasNext}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ViewReceivedFiles;
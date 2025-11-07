import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { apiService } from '../src/services/apiService';
import './viewReceivedFiles.scss';
import { useLanguage } from '../context/languageContext';


const ViewReceivedFiles = () => {
    const { t } = useLanguage();
    const { token } = useAuth();
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({});

    const fetchFiles = async (page = 1) => {
        try {
            setLoading(true);
            const data = await apiService.getFiles(page, 10);

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
            fetchFiles(currentPage);
        }
    }, [token, currentPage]);

    const handleDownload = async (fileId) => {
        try {
            await apiService.downloadFile(fileId);

        } catch (err) {
            setError(err.message || 'Download failed');
            console.error('Download error:', err);
        }
    };

    const handleDelete = async (fileId, fileName) => {
        if (!window.confirm(`Are you sure you want to delete "${fileName}"?`)) {
            return;
        }

        try {
            console.log('Deleting file:', fileId, fileName);
            await apiService.deleteFile(fileId);

            // Refresh the files list after successful deletion
            await fetchFiles(currentPage);

            // Clear any previous errors
            setError('');

        } catch (err) {
            console.error('Delete error details:', {
                message: err.message,
                fileId: fileId,
                fileName: fileName
            });

            // Try to get more specific error message
            let errorMessage = 'Delete failed. Please try again.';
            if (err.message.includes('400')) {
                errorMessage = 'Invalid request. The file ID might be corrupted.';
            } else if (err.message.includes('403')) {
                errorMessage = 'You are not authorized to delete this file.';
            } else if (err.message.includes('404')) {
                errorMessage = 'File not found. It may have been already deleted.';
            }

            setError(errorMessage);
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
                <h2>{t('myFiles')}</h2>
            </div>

            {error && <div className="error-message">{error}</div>}

            {files.length === 0 ? (
                <div className="no-files">
                    <p>{t('noFilesFound')}</p>
                </div>
            ) : (
                <>
                    <div className="files-table-container">
                        <table className="files-table">
                            <thead>
                                <tr>
                                    <th>{t('fileName')}</th>
                                    <th> {t('sender')}</th>
                                    <th>{t('size')}</th>
                                    <th>{t('type')}</th>
                                    <th>{t('uploadDate')} </th>
                                    <th>{t('downloads')} </th>
                                    <th>{t('actions')}</th>
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
                                        <td className="actions-cell">
                                            <div className="table-actions">
                                                <button
                                                    className="action-btn download"
                                                    onClick={() => handleDownload(file._id, file.originalName)}
                                                    title="تحميل"
                                                >
                                                    {t('download')}
                                                </button>
                                                <button
                                                    className="action-btn delete"
                                                    onClick={() => handleDelete(file._id,file.originalName)}
                                                    title="حذف"
                                                >
                                                    {t('delete')}
                                                </button>
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
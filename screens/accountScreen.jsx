import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { apiService } from '../src/services/apiService';
import './accountScreen.scss';
import { useLanguage } from '../hooks/useLanguage';


const AccountScreen = () => {
    const {t}= useLanguage();
    const { user, logout } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [newUserName, setNewUserName] = useState(user?.userName || '');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
             await apiService.updateUser(user.id, {
                userName: newUserName
            });

            setMessage('تم تحديث الملف الشخصي بنجاح');
            setIsEditing(false);
        
            window.location.reload();
        } catch (err) {
            setError(err.message || 'خطأ في الشبكة. يرجى المحاولة مرة أخرى');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (!window.confirm(t('deleteMessage'))) {
            return;
        }

        if (!window.confirm('تأكيد نهائي: هل تريد حذف حسابك نهائياً؟')) {
            return;
        }

        setLoading(true);
        setError('');

        try {
            await apiService.deleteUser(user.id);
            logout();
        } catch (err) {
            setError(err.message || 'خطأ في الشبكة. يرجى المحاولة مرة أخرى');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="account-container">
            <div className="account-header">
                <h1 className='head'>{t('accountManagement')} </h1>
            </div>

            <div className="account-content">
                <div className="account-section">
                    <div className="section-header">
                        <h2>{t('personalInfo')}</h2>
                        <button 
                            className="edit-btn"
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            {isEditing ? t('cancel') : t('edit')}
                        </button>
                    </div>

                    <div className="profile-info">
                        <div className="info-item">
                            <label>{t('email')}: </label>
                            <span>{user?.email}</span>
                        </div>
                        
                        <div className="info-item">
                            <label> {t('username')} :</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={newUserName}
                                    onChange={(e) => setNewUserName(e.target.value)}
                                    className="edit-input"
                                />
                            ) : (
                                <span>{user?.userName}</span>
                            )}
                        </div>
                    </div>

                    {isEditing && (
                        <form onSubmit={handleUpdateProfile} className="update-form">
                            <button 
                                type="submit" 
                                className="save-btn"
                                disabled={loading || !newUserName.trim()}
                            >
                                {loading ? t('saving')  : t('saveChanges')}
                            </button>
                        </form>
                    )}
                </div>

                <div className="account-section">
                    <div className="section-header">
                        <h2>{t('accountActions')}</h2>
                    </div>

                    <div className="account-actions">

                        <button 
                            className="delete-action"
                            onClick={handleDeleteAccount}
                            disabled={loading}
                        >
                            {loading ? t('deleting'): t('deleteAccount')}
                        </button>
                    </div>
                </div>

                

                {error && <div className="error-message">{error}</div>}
                {message && <div className="success-message">{message}</div>}
            </div>
        </div>
    );
};

export default AccountScreen;


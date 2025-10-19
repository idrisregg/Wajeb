import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import { apiService } from '../src/services/apiService';
import './accountScreen.scss';

const AccountScreen = () => {
    const { user, logout } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [newUserName, setNewUserName] = useState(user?.userName || '');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            const data = await apiService.updateUser(user.id, {
                userName: newUserName
            });

            setMessage('تم تحديث الملف الشخصي بنجاح');
            setIsEditing(false);
            // Update user in context
            window.location.reload(); // Simple way to refresh user data
        } catch (err) {
            setError(err.message || 'خطأ في الشبكة. يرجى المحاولة مرة أخرى');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (!window.confirm('هل أنت متأكد من حذف الحساب؟ لا يمكن التراجع عن هذا الإجراء.')) {
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
                <h1>إدارة الحساب</h1>
                <p>إدارة معلوماتك الشخصية وإعدادات الحساب</p>
            </div>

            <div className="account-content">
                {/* Profile Information */}
                <div className="account-section">
                    <div className="section-header">
                        <h2>المعلومات الشخصية</h2>
                        <button 
                            className="edit-btn"
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            {isEditing ? 'إلغاء' : 'تعديل'}
                        </button>
                    </div>

                    <div className="profile-info">
                        <div className="info-item">
                            <label>البريد الإلكتروني:</label>
                            <span>{user?.email}</span>
                        </div>
                        
                        <div className="info-item">
                            <label>اسم المستخدم:</label>
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

                        <div className="info-item">
                            <label>تاريخ التسجيل:</label>
                            <span>{new Date(user?.createdAt).toLocaleDateString('ar-SA')}</span>
                        </div>
                    </div>

                    {isEditing && (
                        <form onSubmit={handleUpdateProfile} className="update-form">
                            <button 
                                type="submit" 
                                className="save-btn"
                                disabled={loading || !newUserName.trim()}
                            >
                                {loading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                            </button>
                        </form>
                    )}
                </div>

                {/* Account Actions */}
                <div className="account-section">
                    <div className="section-header">
                        <h2>إجراءات الحساب</h2>
                    </div>

                    <div className="account-actions">
                        <button 
                            className="logout-action"
                            onClick={logout}
                        >
                            <span className="action-icon">🚪</span>
                            تسجيل الخروج
                        </button>

                        <button 
                            className="delete-action"
                            onClick={handleDeleteAccount}
                            disabled={loading}
                        >
                            <span className="action-icon">🗑️</span>
                            {loading ? 'جاري الحذف...' : 'حذف الحساب'}
                        </button>
                    </div>
                </div>

                {/* Statistics */}
                <div className="account-section">
                    <div className="section-header">
                        <h2>إحصائيات الحساب</h2>
                    </div>

                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon">📁</div>
                            <div className="stat-info">
                                <h3>الملفات المرفوعة</h3>
                                <p>0 ملف</p>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon">📥</div>
                            <div className="stat-info">
                                <h3>الملفات المستلمة</h3>
                                <p>0 ملف</p>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon">⬇️</div>
                            <div className="stat-info">
                                <h3>إجمالي التحميلات</h3>
                                <p>0 تحميل</p>
                            </div>
                        </div>
                    </div>
                </div>

                {error && <div className="error-message">{error}</div>}
                {message && <div className="success-message">{message}</div>}
            </div>
        </div>
    );
};

export default AccountScreen;


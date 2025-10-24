import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import { useLanguage } from '../context/languageContext';
import ThemeToggle from '../comps/themeToggle';
import UploadFiles from './uploadFiles';
import ViewReceivedFiles from './viewReceivedFiles';
import AccountScreen from './accountScreen';
import PrivacyPolicy from './privacyPolicy';
import './dashboard.scss';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const { t } = useLanguage();
    const [activeScreen, setActiveScreen] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const menuItems = [
        { id: 'dashboard', label: t('dashboard'), icon: '🏠' },
        { id: 'upload', label: t('upload'), icon: '📤' },
        { id: 'received', label: t('received'), icon: '📥' },
        { id: 'account', label: t('account'), icon: '👤' },
        { id: 'privacy', label: t('privacy'), icon: '🔒' }
    ];

    const renderContent = () => {
        switch (activeScreen) {
            case 'upload':
                return <UploadFiles />;
            case 'received':
                return <ViewReceivedFiles />;
            case 'account':
                return <AccountScreen />;
            case 'about':
                return <AboutUs />;
            case 'privacy':
                return <PrivacyPolicy />;
            default:
                return (
                    <div className="dashboard-content">
                        <div className="welcome-section">
                            <h1>{t('welcome')}، {user?.userName}</h1>
                            <p>{t('welcomeMessage')}</p>
                        </div>
                        
                        <div className="quick-actions">
                            <div className="action-card" onClick={() => setActiveScreen('upload')}>
                                <div className="action-icon">📤</div>
                                <h3>{t('uploadNewFile')}</h3>
                                <p>{t('uploadNewFileDesc')}</p>
                            </div>
                            
                            <div className="action-card" onClick={() => setActiveScreen('received')}>
                                <div className="action-icon">📥</div>
                                <h3>{t('viewReceivedFiles')}</h3>
                                <p>{t('viewReceivedFilesDesc')}</p>
                            </div>
                            
                            <div className="action-card" onClick={() => setActiveScreen('account')}>
                                <div className="action-icon">👤</div>
                                <h3>{t('manageAccount')}</h3>
                                <p>{t('manageAccountDesc')}</p>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="dashboard-container">
            <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <img src='icon.svg'/>
                </div>
                
                <nav className="sidebar-nav">
                    {menuItems.map(item => (
                        <button
                            key={item.id}
                            className={`nav-item ${activeScreen === item.id ? 'active' : ''}`}
                            onClick={() => {
                                setActiveScreen(item.id);
                                setSidebarOpen(false);
                            }}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            <span className="nav-label">{item.label}</span>
                        </button>
                    ))}
                </nav>
                
                <div className="sidebar-footer">
                    <button className="logout-btn" onClick={logout}>
                        <span className="nav-icon">🚪</span>
                        <span className="nav-label">{t('logout')}</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
                {/* Top Bar */}
                <div className="top-bar">
                    <button 
                        className="menu-btn"
                        onClick={() => setSidebarOpen(true)}
                    >
                        ☰
                    </button>
                    
                <div className="user-info">
                    <ThemeToggle className="compact" />
                    <span className="user-name">{user?.userName}</span>
                    <div className="user-avatar">
                        {user?.userName?.charAt(0).toUpperCase()}
                    </div>
                </div>
                </div>

                {/* Content Area */}
                <div className="content-area">
                    {renderContent()}
                </div>
            </div>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div 
                    className="sidebar-overlay"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default Dashboard;
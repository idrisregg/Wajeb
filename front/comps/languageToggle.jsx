import React from 'react';
import { useLanguage } from '..//context/languageContext/index';
import './languageToggle.css';

const LanguageToggle = ({ className = '' }) => {
    const { language, setLanguage, t } = useLanguage();

    const languages = [
        { code: 'ar', name: 'العربية', flag: 'AR' },
        { code: 'en', name: 'English', flag: 'EN' },
        { code: 'fr', name: 'Français', flag: 'FR' }
    ];

    const currentLanguage = languages.find(lang => lang.code === language);

    const handleLanguageChange = (langCode) => {
        setLanguage(langCode);
    };

    return (
        <div className={`language-toggle ${className}`}>
            <div className="language-dropdown">
                <button className="language-current" title={t('changeLanguage')}>
                    <span className="language-flag">{currentLanguage?.flag}</span>
                    <span className="language-name">{currentLanguage?.name}</span>
                    <span className="dropdown-arrow">▼</span>
                </button>
                
                <div className="language-menu">
                    {languages.map(lang => (
                        <button
                            key={lang.code}
                            className={`language-option ${language === lang.code ? 'active' : ''}`}
                            onClick={() => handleLanguageChange(lang.code)}
                        >
                            <span className="language-flag">{lang.flag}</span>
                            <span className="language-name">{lang.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LanguageToggle;



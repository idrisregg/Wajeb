import React from 'react';
import './infoPages.scss';
import { useLanguage } from '../context/languageContext';

const PrivacyPolicy = () => {
    const { t } = useLanguage();

    return (
        <div className="info-page">
            <div className="info-container">

                <h1>{t('privacy_title')}</h1>

                <div className="info-content">

                    <section className="info-section">
                        <h2>{t('privacy_intro_title')}</h2>
                        <p>{t('privacy_intro_text')}</p>
                    </section>

                    <section className="info-section">
                        <h2>{t('privacy_collect_title')}</h2>

                        <h3>{t('privacy_collect_personal')}</h3>
                        <ul>
                            {t('privacy_collect_personal_list').map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>

                        <h3>{t('privacy_collect_file')}</h3>
                        <ul>
                            {t('privacy_collect_file_list').map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </section>

                    <section className="info-section">
                        <h2>{t('privacy_use_title')}</h2>
                        <p>{t('privacy_use_text')}</p>
                        <ul>
                            {t('privacy_use_list').map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </section>

                    <section className="info-section">
                        <h2>{t('privacy_protect_title')}</h2>
                        <p>{t('privacy_protect_text')}</p>
                        <ul>
                            {t('privacy_protect_list').map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </section>

                    <section className="info-section">
                        <h2>{t('privacy_share_title')}</h2>
                        <p>{t('privacy_share_text')}</p>
                        <ul>
                            {t('privacy_share_list').map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </section>

                    <section className="info-section">
                        <h2>{t('privacy_cookies_title')}</h2>
                        <p>{t('privacy_cookies_text')}</p>
                    </section>

                    <section className="info-section">
                        <h2>{t('privacy_rights_title')}</h2>
                        <p>{t('privacy_rights_text')}</p>
                        <ul>
                            {t('privacy_rights_list').map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </section>

                    <section className="info-section">
                        <h2>{t('privacy_update_title')}</h2>
                        <p>{t('privacy_update_text')}</p>
                    </section>

                    <section className="info-section">
                        <h2>{t('privacy_contact_title')}</h2>
                        <p>{t('privacy_contact_text')}</p>
                        <div className="contact-info">
                            <p><strong>{t('privacy_email_label')}</strong> <span className='email-contact'>idrisregg@gmail.com</span></p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;

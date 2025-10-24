import './login.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/authContext';
import { useLanguage } from '../context/languageContext';

const Login = () => {
    const navigate = useNavigate();
    const { login, loading } = useAuth();
    const { t } = useLanguage();
    
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (!email || !password) {
            setErrorMessage(t('fillAllFields'));
            return;
        }

        const result = await login(email, password);
        
        if (result.success) {
            navigate('/dashboard');
        } else {
            setErrorMessage(result.error);
        }
    };

    return (
        <>
        <img className="logo" src="/icon.svg"/>
            <div className="container">
                <div className="forms-container">
                    <div className="form-control signup-form">
                    </div>
                    <div className="form-control signin-form">
                        <form onSubmit={handleSubmit}>
                            <h2>{t('login')}</h2>
                            <input 
                                type="email" 
                                placeholder={t('email')} 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                            <input 
                                type="password" 
                                placeholder={t('password')} 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                            {errorMessage && (
                                <div className="error-message">{errorMessage}</div>
                            )}
                            <button className='sign' type='submit' disabled={loading}>
                                {loading ? t('loginLoading') : t('loginButton')}
                            </button>
                        </form>
                    </div>
                </div>
                <div className="intros-container">
                    <div className="intro-control signin-intro">
                        <div className="intro-control__inner">
                            <h2 className='tit'>{t('welcomeMessage')}</h2>
                            <button id="signup-btn" onClick={() => navigate('/signup')}>
                                {t('noAccount')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
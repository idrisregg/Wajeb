import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from '../hooks/useAuth';
import './signup.scss';
import { useLanguage } from "../hooks/useLanguage";

const Signup = () => {
    const{t}=useLanguage();
    const navigate = useNavigate();
    const { register, loading } = useAuth();

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redoPassword, setRedoPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        document.title = "Signup";
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!userName || !email || !password) {
            setError('Please fill in all fields');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }
        if(password!==redoPassword){
            setError('Passwords do not match');
            return;
        }

        const result = await register(userName, email, password);
        
        if (result.success) {
            setSuccess(result.message);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } else {
            setError(result.error);
        }
    };

    return (
        <div className="signup-container">
            <img className='logo' src='/icon.svg' />
            <div className="signup-box">
                <h2 className="signup-title">{t('createAccount')} </h2>
                <form className="signup-form" onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder={t('userName')} 
                        required 
                        value={userName} 
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <input 
                        type="email" 
                        placeholder={t('email')}
                        required 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder={t('password')}
                        required 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder={t('redoPassword')}
                        required 
                        value={redoPassword} 
                        onChange={(e) => setRedoPassword(e.target.value)}
                    />
                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}
                    <button 
                        type="submit" 
                        className="signup-btn" 
                        disabled={loading}
                    >
                        {loading ? '...' : t('signupNow')}
                    </button>
                </form>
                <p className="signin-link">
                     {t('youHaveAccount')} <a href="/">{t('loginNow')} </a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
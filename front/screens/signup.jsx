import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from '../context/authContext';
import './signup.scss';

const Signup = () => {
    const navigate = useNavigate();
    const { register, loading } = useAuth();

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
                <h2 className="signup-title">أنشئ حسابك</h2>
                <form className="signup-form" onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="اسم المستخدم" 
                        required 
                        value={userName} 
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <input 
                        type="email" 
                        placeholder="البريد الإلكتروني" 
                        required 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="كلمة المرور" 
                        required 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}
                    <button 
                        type="submit" 
                        className="signup-btn" 
                        disabled={loading}
                    >
                        {loading ? 'جاري إنشاء الحساب...' : 'سجل الآن'}
                    </button>
                </form>
                <p className="signin-link">
                    عندك حساب؟ <a href="/">سجل الدخول</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
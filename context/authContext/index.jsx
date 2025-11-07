import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../../src/services/apiService';


export const AuthContext = createContext({
    user: null,
    token: null,
    login: () => { },
    logout: () => { },
    register: () => { },
    loading: false
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('Access_Token'));
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const data = await apiService.getUserInfo();
                setUser(data.user);
            } catch (error) {
                console.error('Error fetching user info:', error);
                logout();
            }
        };

        if (token) {
            fetchUserInfo();
        }
    }, [token]);

    const login = async (email, password) => {
        setLoading(true);
        try {
            const data = await apiService.login(email, password);
            setToken(data.token);
            setUser(data.user);
            localStorage.setItem('Access_Token', data.token);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message || 'Network error. Please try again.' };
        } finally {
            setLoading(false);
        }
    };

    const register = async (userName, email, password) => {
        setLoading(true);
        try {
            const data = await apiService.register(userName, email, password);
            return { success: true, message: data.message };
        } catch (error) {
            return { success: false, error: error.message || 'Network error. Please try again.' };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('Access_Token');
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            login,
            logout,
            register,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth= () => useContext(AuthContext);

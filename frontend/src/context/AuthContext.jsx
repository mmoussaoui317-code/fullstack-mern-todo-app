import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { config } from '../config';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    // إعداد axios defaults
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            // جلب بيانات المستخدم
            fetchUserData();
        } else {
            delete axios.defaults.headers.common['Authorization'];
            setLoading(false);
        }
    }, [token]);

    const fetchUserData = async () => {
        try {
            // يمكنك إضافة endpoint لجلب بيانات المستخدم
            // const response = await axios.get('/api/auth/me');
            // setUser(response.data.user);
        } catch (error) {
            console.error('Failed to fetch user data:', error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${config.apiUrl}/api/auth/login`, {
                email,
                password
            });
            
            const { token, user } = response.data;
            
            // حفظ الـtoken
            localStorage.setItem('token', token);
            setToken(token);
            setUser(user);
            
            return { success: true, data: response.data };
            
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const register = async (username, email, password) => {
        try {
            const response = await axios.post(`${config.apiUrl}/api/auth/register`, {
                username,
                email,
                password
            });
            
            const { token, user } = response.data;
            
            // حفظ الـtoken
            localStorage.setItem('token', token);
            setToken(token);
            setUser(user);
            
            return { success: true, data: response.data };
            
        } catch (error) {
            console.error('Registration error:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Registration failed'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
    };

    const value = {
        user,
        token,
        login,
        register,
        logout,
        loading,
        isAuthenticated: !!token
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

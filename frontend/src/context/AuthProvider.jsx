import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { config } from '../config';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    // prepare axios defaults
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            // get the data 
            fetchUserData();
        } else {
            delete axios.defaults.headers.common['Authorization'];
            setLoading(false);
        }
    // eslint-disable-next-line
    }, [token]);

    const fetchUserData = async () => {
        try {
            // endpoint GET the current user data connect
            const response = await axios.get(`${config.apiUrl}/api/auth/me?token=${token}`);
            // console.log(response.data);
            setUser(response.data.user);
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
            
            // save the token storage at navigator
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
            // console.log(config.apiUrl);
            const response = await axios.post(`${config.apiUrl}/api/auth/register`, {
                username,
                email,
                password
            });
            
            const { token, user } = response.data;
            
            // save the token storage at navigator
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

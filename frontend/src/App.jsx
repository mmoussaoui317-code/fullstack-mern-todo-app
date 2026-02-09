import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
// import { useTheme } from '@emotion/react';
import { useTheme } from './context/ThemeContext.jsx';
import { Button } from '@mui/material';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    
    return children;
};

const AppContent = (props) => {
    return (
        <Routes>
            <Route path="/login" element={<Login isDark={props.isDark} />} />
            <Route path="/register" element={<Register />} />
            <Route 
                path="/dashboard" 
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } 
            />
            <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
    );
};

const App = () => {
    const { dispatch, state } = useTheme();
    // console.log(dispatch, state);

    return (
        <Router className={`${state.isDark ? 'darkMode' : 'lightMode'}`}>
            <Button
                type="button"
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => { dispatch({type: "switchDark", payload: !state.isDark}) }}
            >
                Switch Mode
            </Button>
            <AuthProvider>
                <AppContent isDark={`${state.isDark ? 'darkMode' : 'lightMode'}`} />
            </AuthProvider>
        </Router>
    );
};

export default App;

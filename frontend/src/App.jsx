import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import { AuthProvider } from './context/AuthProvider.jsx';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
// import DashboardStats from './components/DashboardStats.jsx';
// import { useTheme } from '@emotion/react';
import { useTheme } from './context/ThemeContext.jsx';
// import { useTodos, TodosProvider } from './context/TodosProvider.jsx';
import { Button, Checkbox, Icon } from '@mui/material';
// import MoonIcon from '@mui/core-downloads-tracker';
// import SunIcon from '@mui/material'

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

    // const { dispatch, state } = useTodos();
    // dispatch({type: "AddTodo", payload: { id: 5, title: 'Todo 1', completed: false, priority: 'urgent' }});

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
            {/* <Route path="/dashboardStarts" element={<DashboardStats todos={state.todos}/>} /> */}
        </Routes>
    );
};

const App = () => {
    const { dispatch, state } = useTheme();

    return (
        <Router>
            <Button
                type="button"
                variant="contained"
                color="primary"
                sx={{ mr: 5, ml: 'auto', mb: 2, display: 'block', position: "relative"}}
                onClick={() => { dispatch({type: "switchDark", payload: !state.isDark}) }}
            >
                <Checkbox 
                    checked={state.isDark}
                    color="transparent"
                    style={{width: "100%", position: "absolute", top: 0, left: 0, height: "100%", opacity: 0, appearance: "none", accentColor: "none"}}
                />
                {/* <Icon sx={{borderRadius: "50%", width: "25px", height: "25px"}}> */}
                    { state.isDark ?  "Light" : "Dark"}
                {/* </Icon> */}
            </Button>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </Router>
    );
};

export default App;

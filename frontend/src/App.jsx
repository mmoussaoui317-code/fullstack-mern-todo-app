import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import { useTheme } from './context/ThemeContext.jsx';
import { Button, Checkbox, Box, Typography } from '@mui/material';
// import DashboardStats from './components/DashboardStats.jsx';
// import { useTheme } from '@emotion/react';
// import { useTodos, TodosProvider } from './context/TodosProvider.jsx';
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

const AppContent = () => {

    // const { dispatch, state } = useTodos();
    // dispatch({type: "AddTodo", payload: { id: 5, title: 'Todo 1', completed: false, priority: 'urgent' }});

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
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
    const { user, logout } = useAuth();
    // const [showForm, setShowForm] = useState(false);

    return (
        <Router>
            <Box sx={{display: 'flex', alignItems: 'center', gap: 2, width: "100%", mb: '15px'}}>
                <Typography variant="h4">
                    Welcome, {user?.username || 'User'}!
                </Typography>

                <Button
                type="button"
                variant="contained"
                color="primary"
                sx={{ display: 'block', position: "relative", ml: 'auto', bgcolor: state.isDark ? state.lightColor : state.darkColor}}
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
            
            {
                localStorage.getItem('token') && <Button 
                    type='button'
                    variant='contained'
                    color='warning'
                    onClick={() => { dispatch({type: "ShowForm", payload: !state.ShowForm}) }}
                    sx={{ pointerEvents: state.ShowForm && 'none', opacity: state.ShowForm && '0.3' }}
                >
                    Create Todo
                </Button>
            }
            {
                localStorage.getItem('token') && <Button 
                    type='button'
                    variant="contained" 
                    color='error'
                    onClick={logout}
                >
                    Logout
                </Button> 
            }
            </Box>
                <AppContent />
        </Router>
    );
};

export default App;

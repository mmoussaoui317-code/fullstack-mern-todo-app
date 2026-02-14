import React, { useState } from 'react';
import { Link, TextField, Button, Container, Typography, Box, CircularProgress } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { sanitizeUserInput } from '../utils/inputSanitizer';
// import { config } from '../config';
import { useAuth } from '../context/AuthContext';


const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // const response = await axios.post(`${config.apiUrl}/api/auth/login`, {
            //     email,
            //     password
            // });
            // console.log(email, password);
            // console.log('Login successful:', response.data);
            // alert('Login successful! Check console for token');
            // navigate('/dashboard');
            const response = await login(email, password);
            response.success && navigate('/dashboard');
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed!');
        }
        setLoading(false);
    };

    const handleInputChange = (e) => {
        const rawInput = e.target.value;
        const cleanInput = sanitizeUserInput(rawInput);
        if(e.target.type.toLowerCase() == "email") {
            setEmail(cleanInput);
        } else if(e.target.type.toLowerCase() == "password") {
            setPassword(cleanInput);
        }
    };

    return (
        <Container maxWidth="xs" style={{backgroundColor: props.isDark === 'darkMode' ? 'black' : 'white', color: props.isDark === 'darkMode' ? 'white' : 'black' }}>
            <Box sx={{ mt: 8, p: 3, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Login to Todo App
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={email}
                        onChange={handleInputChange}
                        margin="normal"
                        required
                        autoComplete="email"
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={handleInputChange}
                        margin="normal"
                        required
                        autoComplete="current-password"
                    />
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Login'}
                    </Button>
                </form>
                <Typography variant="body2" align="center">
                    Demo: Use any email/password for now
                </Typography>
                <Typography variant="body2" align="center" sx={{ mt: 2, color: 'text.secondary' }}>
                    I don't have an account?{' '}
                    <Link component={RouterLink} to="/register">
                        Register here
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default Login;

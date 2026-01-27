import React, { useState } from 'react';
import { Link, TextField, Button, Container, Typography, Box } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { sanitizeUserInput } from '../utils/inputSanitizer';
import { config } from '../config';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${config.apiUrl}/api/auth/login`, {
                email,
                password
            });
            console.log(email, password);
            console.log('Login successful:', response.data);
            alert('Login successful! Check console for token');
            navigate('/dashboard');
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed!');
        }
    };

    const handleInputChange = (e) => {
        const rawInput = e.target.value;
        const cleanInput = sanitizeUserInput(rawInput);
        if(e.target.type.toLowerCase() == "email") {
            setEmail(cleanInput);
        } else if(e.target.type.toLowerCase() == "password") {
            setPassword(cleanInput)
        }
    };

    return (
        <Container maxWidth="xs">
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
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={handleInputChange}
                        margin="normal"
                        required
                    />
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Login
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

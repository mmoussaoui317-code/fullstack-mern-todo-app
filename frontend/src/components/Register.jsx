import React, { useState } from 'react';
import { 
    TextField, Button, Container, Typography, Box, 
    Link, Alert, CircularProgress 
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext.jsx';
import { dataFormValidation } from '../utils/validationDataForm.js'
// import { DarkThemeMUI } from '../context/DarkThemeMUI.jsx';

import { sanitizeUserInput } from '../utils/inputSanitizer';

const Register = () => {
    const { state } = useTheme();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState('');
    
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const cleanValue = sanitizeUserInput(value);
        setFormData(prev => ({
            ...prev,
            [name]: cleanValue
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const { valid, errors } = dataFormValidation(formData);
        setErrors({...errors});
        if (!valid) {
            return;
        }
        
        setLoading(true);
        setApiError('');
        
        try {
            const result = await register(
                formData.username,
                formData.email,
                formData.password
            );
            
            if (result.success) {
                navigate('/dashboard');
            } else {
                setApiError(result.message);
            }
        } catch (error) {
            setApiError('Registration failed. Please try again.');
            console.error(`Error: ${error}`)
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="xs">
        {/* // sx={{color: state.isDark ? state.lightColor : state.darkColor, bgcolor: state.isDark ? state.secondaryColor : state.lightColor}} */}
        {/* > */}
            <Box sx={{ 
                mt: 8, 
                p: 3, 
                boxShadow: 3, 
                borderRadius: 2,
                // backgroundColor: state.isDark ? state.secondaryColor : state.lightColor
            }}>
                <Typography variant="h5" align="center" gutterBottom 
                // color={state.isDark ? state.lightColor : state.darkColor}
                >
                    Create Account
                </Typography>
                
                {apiError && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {apiError}
                    </Alert>
                )}
                
                <form onSubmit={handleSubmit}>
                    {/* <DarkThemeMUI> */}
                        <TextField
                            fullWidth
                            label="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            error={errors.username}
                            helperText={errors.username}
                            margin="normal"
                            disabled={loading}
                            autoComplete="username"
                            // onBlur={validateForm} // must be add to enhance the UX but for anyTextfield Nup All
                        />
                        
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                            helperText={errors.email}
                            margin="normal"
                            disabled={loading}
                            autoComplete="email"
                            // onBlur={validateForm} // must be add to enhance the UX but for anyTextfield Nup All
                        />
                        
                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            error={errors.password}
                            helperText={errors.password}
                            margin="normal"
                            disabled={loading}
                            autoComplete="new-password"
                            // onBlur={validateForm} // must be add to enhance the UX but for anyTextfield Nup All
                        />
                        
                        <TextField
                            fullWidth
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            error={errors.confirmPassword}
                            helperText={errors.confirmPassword}
                            margin="normal"
                            disabled={loading}
                            autoComplete="new-password"
                            // onBlur={validateForm} // must be add to enhance the UX but for anyTextfield Nup All
                        />
                    
                    {/* </DarkThemeMUI> */}

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Register'}
                    </Button>
                </form>
                
                <Typography variant="body2" align="center" sx={{color: state.isDark ? state.lightColor : state.darkColor}}>
                    Already have an account?{' '}
                    <Link component={RouterLink} to="/login">
                        Login here
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default Register;

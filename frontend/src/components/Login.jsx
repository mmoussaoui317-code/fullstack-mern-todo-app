import React, { useState } from 'react';
import { Link, TextField, Button, Container, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { sanitizeUserInput } from '../utils/inputSanitizer';
import { useAuth } from '../context/AuthContext';
import { dataFormValidation }  from '../utils/validationDataForm'
// import { config } from '../config';
// import { DarkThemeMUI } from '../context/DarkThemeMUI';
// import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [alertMsg, setAlertMsg] = useState(null);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const { login } = useAuth();
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if(!dataFormValidation()) {
        //     return;
        // } else {
        //     setErrors({});
        // }
        const { valid, errors } = dataFormValidation( {email, password} );

        setErrors({ ...errors});
        if(!valid) return;

        setLoading(true);
        // try {
            // const response = await axios.post(`${config.apiUrl}/api/auth/login`, {
            //     email,
            //     password
            // });
            // console.log(email, password);
            // console.log('Login successful:', response.data);
            // navigate('/dashboard');

            const response = await login(email, password);
            if(response.success) {
                navigate('/dashboard');
                setAlertMsg({
                    msg: 'Login Successful!',
                    payload: 'success'
                });
                // alert('Login successful!');
            } else {
                setAlertMsg( {
                    msg: 'Login failed!!',
                    payload: 'error'
                });
                // alert('Login failed!');
                console.error('Login error:', response.message);
            }
            
        // } catch (error) {
        //     setAlertMsg( {
        //         msg: 'Login failed!!',
        //         payload: 'error'
        //     });
        //     // alert('Login failed!');
        //     console.error('Login error:', error);
        // }
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
        // <DarkThemeMUI>
        <Container maxWidth="xs" 
        // xs={{backgroundColor: state.isDark ? state.secondaryColor : state.lightColor, color: state.isDark ? state.lightColor : state.darkColor, overflow: "hidden" }}
        >
            <Box sx={{ mt: 8, p: 3, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Login to Todo App
                </Typography>
                {
                    alertMsg && <Alert severity={alertMsg.payload} sx={{ mb: 2 }}>
                                {alertMsg.msg}
                            </Alert>
                }
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
                            error={errors?.email}
                            helperText={errors?.email}
                            // onBlur={dataFormValidation}
                            // sx={{color: `${state.isDark ? state.lightColor : state.darkColor} !important`, background: state.isDark ? state.secondaryColor : state.lightColor}}
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
                            error={errors?.password}
                            helperText={errors?.password}
                            // onBlur={dataFormValidation}
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
                <Typography variant="body2" align="center" sx={{mb: 2}}
                            // sx={{color: state.isDark ? state.lightColor : state.darkColor}}
                >
                    Demo: Use any email/password for now
                </Typography>
                <Typography variant="body2" align="center" 
                // sx={{ mt: 2, color: state.isDark ? state.lightColor : state.darkColor }}
                >
                    I don't have an account?{' '}
                    <Link component={RouterLink} to="/register">
                        Register here
                    </Link>
                </Typography>
            </Box>
        </Container>
        // </DarkThemeMUI>
    );
};

export default Login;

/***
 * This Also Can You Used To Change The Theme
 *  But It's Not Perfect
 *  you can access from the DevTools Console to see The names of the classes
 */

// sx={{
//     "& .MuiFormLabel-root": {
//         color: state.isDark ? state.lightColor : state.darkColor,
//     },

//     "& .MuiInputBase-root": {
//         bgcolor: state.isDark ? state.darkColor : state.lightColor,
//         color: state.isDark ? state.lightColor : state.darkColor,

//         "& input.MuiInputBase-input": {
//             color: state.isDark ? state.lightColor : state.darkColor,
//             accentColor: state.isDark ? state.lightColor : state.darkColor,
//             bgcolor: state.isDark ? state.darkColor : state.lightColor,

//         },

//         "& fieldset.MuiOutlinedInput-notchedOutline": {
//             bgcolor: state.isDark ? state.fieldsetColor : state.lightColor,
//             borderColor: state.isDark ? state.lightColor : state.darkColor
//         }
//     }
// }}
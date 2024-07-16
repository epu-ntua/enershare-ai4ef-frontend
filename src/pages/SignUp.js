import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useKeycloak } from '@react-keycloak/web';
import { Navigate } from 'react-router-dom';

export default function SignUp() {
    const { keycloak, initialized } = useKeycloak();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const validateForm = (fields = {}) => {
        const errors = {};

        if (!fields.firstName && !firstName) {
            errors.firstName = 'First Name is required';
        }

        if (!fields.lastName && !lastName) {
            errors.lastName = 'Last Name is required';
        }

        if (!fields.username && !username) {
            errors.username = 'Username is required';
        }

        if (!fields.email && !email) {
            errors.email = 'Email Address is required';
        } else if (fields.email && !/^\S+@\S+\.\S+$/.test(fields.email)) {
            errors.email = 'Invalid email address';
        }

        if (!fields.password && !password) {
            errors.password = 'Password is required';
        }

        return errors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true);

        const errors = validateForm({ firstName, lastName, username, email, password });
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            console.log('Submitting form:', { firstName, lastName, username, email, password });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const newState = { [name]: value };

        switch (name) {
            case 'firstName':
                setFirstName(value);
                break;
            case 'lastName':
                setLastName(value);
                break;
            case 'username':
                setUsername(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }

        if (submitted) {
            const errors = validateForm(newState);
            setFormErrors(errors);
        }
    };

    const [allowed, setAllowed] = useState(false);
    const [checkFinished, setCheckFinished] = useState(false);

    useEffect(() => {
        if (initialized) {
            if (!keycloak.authenticated) {
                setAllowed(true);
            }
            setCheckFinished(true);
        }
    }, [initialized]);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            {(!allowed && checkFinished) && <Navigate to="/" />}
            {allowed && <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                value={firstName}
                                onChange={handleInputChange}
                                error={submitted && !!formErrors.firstName}
                                helperText={submitted && formErrors.firstName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                                value={lastName}
                                onChange={handleInputChange}
                                error={submitted && !!formErrors.lastName}
                                helperText={submitted && formErrors.lastName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                value={username}
                                onChange={handleInputChange}
                                error={submitted && !!formErrors.username}
                                helperText={submitted && formErrors.username}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={handleInputChange}
                                error={submitted && !!formErrors.email}
                                helperText={submitted && formErrors.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                value={password}
                                onChange={handleInputChange}
                                error={submitted && !!formErrors.password}
                                helperText={submitted && formErrors.password}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                </Box>
            </Box>}
        </Container>
    );
}

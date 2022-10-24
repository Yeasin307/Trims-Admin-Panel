import React, { useContext, useState } from 'react';
import { Container, Typography, TextField, Button, Alert } from '@mui/material';
import { Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useLocation, useNavigate } from 'react-router-dom';
import login from '../../Utility/Images/login.jpg';
import { AuthContext } from '../../Context/AuthProvider';

const Login = () => {
    const [loginData, setLoginData] = useState({});
    const { isLoading, loginUser, userInfo } = useContext(AuthContext);

    let location = useLocation();
    let navigate = useNavigate();

    const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }
    const handleLoginSubmit = e => {
        loginUser(loginData.email, loginData.password, location, navigate);
        e.preventDefault();
    }

    return (
        <Container sx={{ marginTop: '100px' }}>
            {isLoading && <CircularProgress />}
            <Grid container sx={{ display: 'flex', alignItems: 'center' }} spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography sx={{ color: 'blue', fontWeight: 500 }} variant="h4" gutterBottom>Login</Typography>
                    <form onSubmit={handleLoginSubmit}>
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            label="Your Email"
                            name="email"
                            onChange={handleOnChange}
                            variant="standard" />
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            label="Your Password"
                            type="password"
                            name="password"
                            onChange={handleOnChange}
                            variant="standard" />

                        <Button sx={{ width: '75%', m: 1 }} type="submit" variant="contained">Login</Button>
                        {userInfo?.role_id === "admin" && <Alert severity="success">Login Successfully!</Alert>}
                        {(userInfo?.email && userInfo?.role_id !== "admin") && <Alert severity="error">You Are Not Allow Here!</Alert>}
                    </form>
                </Grid>
                <Grid item xs={12} md={6}>
                    <img style={{ width: "100%" }} src={login} alt="" />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;
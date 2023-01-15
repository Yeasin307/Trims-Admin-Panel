import React, { useContext, useState } from 'react';
import { Container, Grid, Typography, TextField, Button, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useLocation, useNavigate } from 'react-router-dom';
import login from '../assets/images/login.jpg';
import { AuthContext } from '../context/AuthProvider';
import axios from 'axios';

const Login = () => {
    const [data, setData] = useState({});
    const [forgotPassword, setForgotPassword] = useState(false);
    const { isLoading, loginUser } = useContext(AuthContext);

    let location = useLocation();
    let navigate = useNavigate();

    const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newData = { ...data };
        newData[field] = value;
        setData(newData);
    }

    const handleLoginSubmit = async (e) => {
        await loginUser(data.email, data.password, location, navigate);
        e.preventDefault();
    }

    const handleForgotPassword = e => {
        axios.post(`${process.env.REACT_APP_SERVER_API}/users/forgot-password`, data)
            .then((res) => {
                alert(res?.data);
                e.target.reset();
                setData({});
            })
            .catch((error) => {
                alert(error?.response?.data);
            })
        e.preventDefault();
    }

    return (
        <Container sx={{ marginTop: '100px' }}>

            {isLoading && <CircularProgress />}

            <Grid container sx={{ display: 'flex', alignItems: 'center' }} spacing={2}>

                {forgotPassword && <Grid item xs={12} md={6}>

                    <Typography sx={{ color: 'blue', fontWeight: 400 }} variant="h4" gutterBottom>Enter Your Email</Typography>

                    <form onSubmit={handleForgotPassword}>

                        <TextField
                            name="email"
                            type="email"
                            label="Your Email"
                            variant="standard"
                            onChange={handleOnChange}
                            sx={{ width: '75%', m: 1 }}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ width: '75%', m: 1 }}
                        >
                            Submit
                        </Button>

                    </form>

                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography
                            gutterBottom
                            variant="button"
                            onClick={() => { setForgotPassword(false) }}
                            sx={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer', width: '75%', mx: 1, textAlign: 'start' }}
                        >
                            Login
                        </Typography>
                    </Box>
                </Grid>}

                {!forgotPassword && <Grid item xs={12} md={6}>

                    <Typography sx={{ color: 'blue', fontWeight: 400 }} variant="h4" gutterBottom>Login</Typography>

                    <form onSubmit={handleLoginSubmit}>

                        <TextField
                            name="email"
                            type="email"
                            label="Your Email"
                            variant="standard"
                            onChange={handleOnChange}
                            sx={{ width: '75%', m: 1 }}
                        />

                        <TextField
                            name="password"
                            type="password"
                            label="Your Password"
                            variant="standard"
                            onChange={handleOnChange}
                            sx={{ width: '75%', m: 1 }}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ width: '75%', m: 1 }}
                        >
                            Login
                        </Button>

                    </form>

                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography
                            gutterBottom
                            variant="button"
                            onClick={() => { setForgotPassword(true) }}
                            sx={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer', width: '75%', mx: 1, textAlign: 'start' }}
                        >
                            Forgot Password
                        </Typography>
                    </Box>

                </Grid>}

                <Grid item xs={12} md={6}>
                    <img style={{ width: "100%" }} src={login} alt="" />
                </Grid>

            </Grid>
        </Container>
    );
};

export default Login;
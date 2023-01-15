import React, { useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { AuthContext } from './AuthProvider';

const PrivateRoute = ({ children, ...rest }) => {
    const { isLoading, userInfo } = useContext(AuthContext);
    let location = useLocation();

    if (isLoading) {
        return <CircularProgress />
    }

    if (userInfo?.role_id === 'admin') {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} />
};

export default PrivateRoute;
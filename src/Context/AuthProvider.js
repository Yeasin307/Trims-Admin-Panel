import axios from 'axios';
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [open, setOpen] = React.useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const loginUser = (email, password, location, navigate) => {
        setIsLoading(true);

        axios.post("http://localhost:5000/auth/login", {
            email,
            password,
        })
            .then(res => {
                let userInfo = res.data.user;
                localStorage.setItem("access_token", res.data.access_token);
                setUserInfo(userInfo);
                setIsLoading(false);
                const destination = location?.state?.from || '/';
                navigate(destination);
            })
            .catch(e => {
                setIsLoading(false);
            });
    };

    const logout = () => {
        localStorage.removeItem("access_token");
        setUserInfo({});
    }

    return (
        <AuthContext.Provider
            value={{
                isLoading,
                userInfo,
                loginUser,
                logout,
                open,
                setOpen
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
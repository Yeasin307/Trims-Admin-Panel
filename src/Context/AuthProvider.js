import axios from 'axios';
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const loginUser = (email, password, location, navigate) => {
        setIsLoading(true);

        axios.post("http://localhost:5000/login", {
            email,
            password,
        })
            .then(res => {
                let userInfo = res.data;
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
        setUserInfo({});
    }

    return (
        <AuthContext.Provider
            value={{
                isLoading,
                userInfo,
                loginUser,
                logout
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
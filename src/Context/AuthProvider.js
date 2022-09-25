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

    const cycleDetection = (arr, id, newParentId) => {
        if (newParentId === '') {
            return false;
        }
        else {
            let parId = newParentId;
            while (parId !== null) {
                if (parId === id) {
                    return true;
                }
                else {
                    for (let i = 0; i < arr.length; i++) {
                        if (parId === arr[i].id) {
                            parId = arr[i].parentId;
                        }
                    }
                }
            }
            return false;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                isLoading,
                userInfo,
                loginUser,
                logout,
                open,
                setOpen,
                cycleDetection
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
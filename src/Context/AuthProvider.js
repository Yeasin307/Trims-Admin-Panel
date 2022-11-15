import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const loginUser = (email, password, location, navigate) => {
        setIsLoading(true);

        axios.post("https://server.asdfashionbd.com/auth/login", {
            email,
            password,
        })
            .then(res => {
                const userInfo = res.data.user;
                localStorage.setItem("access_token", res.data.access_token);
                localStorage.setItem("id", res.data.user.id);
                setUserInfo(userInfo);
                const destination = location?.state?.from || '/';
                navigate(destination);
            })
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        setIsLoading(true);
        const id = localStorage.getItem("id");
        axios.post("https://server.asdfashionbd.com/auth/check-login", { id }, {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        })
            .then((res) => {
                setUserInfo(res.data);
            })
            .finally(() => setIsLoading(false));
    }, []);

    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("id");
        setUserInfo({});
    }

    const uniqueName = (categories, newName) => {
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].name === newName) {
                return false;
            }
        }
        return true;
    }

    const cycleDetection = (categories, id, newParentId) => {
        if (newParentId === "") {
            return false;
        }
        else {
            let parentId = newParentId;
            while (parentId !== null) {
                if (parentId === id) {
                    return true;
                }
                else {
                    for (let i = 0; i < categories.length; i++) {
                        if (parentId === categories[i].id) {
                            parentId = categories[i].parentId;
                            break;
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
                uniqueName,
                cycleDetection
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
import axios from 'axios';
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
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
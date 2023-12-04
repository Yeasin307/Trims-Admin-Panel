import React, { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});
    const [viewProfile, setViewProfile] = useState(false);
    const [editProfile, setEditProfile] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const id = localStorage.getItem("id");
        axios.post(`${process.env.REACT_APP_SERVER_API}/auth/check-login`, { id }, {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        })
            .then((res) => {
                setUserInfo(res.data);
            })
            .finally(() => setIsLoading(false));
    }, []);

    // login function
    const loginUser = (email, password, location, navigate) => {
        setIsLoading(true);

        axios.post(`${process.env.REACT_APP_SERVER_API}/auth/login`, {
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
                toast.success('Login Successfully!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            })
            .finally(() => setIsLoading(false));
    };

    // logout function
    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("id");
        setUserInfo({});
    }

    // Check unique name for categories
    const uniqueName = (categories, newName) => {
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].name === newName) {
                return false;
            }
        }
        return true;
    }

    // Check cycle for categories sub-categories
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
                setUserInfo,
                viewProfile,
                setViewProfile,
                editProfile,
                setEditProfile,
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
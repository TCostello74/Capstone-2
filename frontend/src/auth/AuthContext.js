import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [username, setUsername] = useState('');

    const login = (token, username) => {
        localStorage.setItem('token', token);
        setUsername(username);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUsername('');
        setIsLoggedIn(false);
    };

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem('token'));
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, username }}>
            {children}
        </AuthContext.Provider>
    );
};
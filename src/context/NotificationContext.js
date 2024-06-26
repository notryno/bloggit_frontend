// NotificationContext.js
import React, { createContext, useState, useContext } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = (message) => {
        setNotifications([...notifications, message]);
    };

    const clearNotifications = () => {
        setNotifications([]);
    };

    return (
        <NotificationContext.Provider value={{ notifications, addNotification, clearNotifications }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    return useContext(NotificationContext);
};

import React, { createContext, useState, useContext } from 'react';

const context = createContext();
const { Provider } = context;

const AppContext = ({ children }) => {
    const [appLikes, setAppLikes] = useState(0);

    return (
        <Provider value={{ appLikes, setAppLikes }} displayName="AppContext">
            {children}
        </Provider>
    );
};

export default AppContext;

export const useAppContext = () => useContext(context);

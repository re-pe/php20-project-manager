import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();
const { Provider } = UserContext;

const storage = window.sessionStorage;

const getValue = () => {
    try {
        // Get from storage by key
        const item = storage.getItem('userData');
        // Parse stored json or if none return initialValue
        return item ? JSON.parse(item) : {};
    } catch (error) {
        // If error also return initialValue
        // eslint-disable-next-line no-console
        console.log(error);
        return {};
    }
};

const UserContextProvider = ({ children }) => {
    const [userContext, setContextValue] = useState(getValue);
    // for modal delete window
    // sets modal window visibility
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // confirm or cancel deletion
    const [confirmedDeletion, confirmDeletion] = useState(false);
    const [canceledDeletion, cancelDeletion] = useState(false);

    const setUserContext = (value) => {
        try {
        // Allow value to be a function so we have same API as useState
            const valueToStore = value instanceof Function ? value(userContext) : value;
            // Save state
            setContextValue(valueToStore);
            // Save to local storage
            storage.setItem('userData', JSON.stringify(valueToStore));
        } catch (error) {
        // A more advanced implementation would handle the error case
        // eslint-disable-next-line no-console
            console.log(error);
        }
    };

    return (
        <Provider
            value={{ userContext,
                setUserContext,
                show,
                handleClose,
                handleShow,
                confirmedDeletion,
                confirmDeletion,
                canceledDeletion,
                cancelDeletion }}
            displayName="UserContextProvider"
        >
            {children}
        </Provider>
    );
};

export default UserContextProvider;

export const useUserContext = () => useContext(UserContext);

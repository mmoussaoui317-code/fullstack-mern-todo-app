import React, { createContext, /*useState,*/ useContext /*, useEffect*/ } from 'react';
import { useReducer } from 'react';
// import { useReducer } from 'react';

const ThemeReducer = (state, action) => {

    switch(action.type) {
        case "switchDark": 
            return {
                ...state,
                isDark: action.payload,
            };
        default: 
            return state;
    }
}

const ThemeContext = createContext();

// Must Be in a separate file
// eslint-disable-next-line
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    // const [darkMode, setDarkMode] = useState(() => {
    //     const saved = localStorage.getItem('darkMode');
    //     return saved ? JSON.parse(saved) : false;
    // });

    // useEffect(() => {
    //     localStorage.setItem('darkMode', JSON.stringify(darkMode));
        
    //     if (darkMode) {
    //         document.documentElement.classList.add('dark');
    //     } else {
    //         document.documentElement.classList.remove('dark');
    //     }
    // }, [darkMode]);

    // const toggleDarkMode = () => setDarkMode(!darkMode);
    const initialState = {
        isDark: false,
        lightColor: "#fff",
        darkColor: "#000",
        secondaryColor: "#333",
        fieldsetColor: "#3333336e",

    }

    const [state, dispatch] = useReducer(ThemeReducer, initialState);

    return (
        <ThemeContext.Provider value={{ state, dispatch }}>
            {children}
        </ThemeContext.Provider>
    );
};

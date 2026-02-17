import { createTheme, ThemeProvider } from "@mui/material";
import { useTheme } from "./ThemeContext.jsx";


export const DarkThemeMUI = ({ children }) => {
    const {state} = useTheme();

    const darkMode = createTheme({ 
        palette: { 
            mode: state.isDark ? "dark" : "light" 
        } 
    });


    return  <ThemeProvider theme={darkMode}>
                {children}
            </ThemeProvider>;
}
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx';
import { useTheme } from './context/ThemeContext.jsx';

export const AppDarkMode = () => {
  const {state} = useTheme();

document.getElementById("root").style = `background-color: ${state.isDark ? state.secondaryColor : state.lightColor}; color: ${state.isDark ? state.lightColor : state.darkColor}; padding: 15px 30px; min-height: 100vh;`;

  return <App style={{colors: `${state.isDark ? state.lightColor : state.darkColor}`, backgroundColor: `${state.isDark ? state.secondaryColor : state.lightColor}`}} />
};


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AppDarkMode />
    </ThemeProvider>
  </StrictMode>
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { useTheme } from './context/ThemeContext.jsx';

export const AppDarkMode = () => {
  const {state} = useTheme();
  return <App className={`${state.isDark ? 'darkMode' : 'lightMode'}`} />
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AppDarkMode />
    </ThemeProvider>
  </StrictMode>,
)

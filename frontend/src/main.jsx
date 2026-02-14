import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx';
// import { TodosProvider } from './context/TodosProvider.jsx';
import { useTheme } from './context/ThemeContext.jsx';
// import { TodosProvider } from './context/TodosProvider.jsx';

export const AppDarkMode = () => {
  const {state} = useTheme();
  return <App className={`${state.isDark ? 'darkMode' : 'lightMode'}`} />
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
                {/* <TodosProvider> */}
    
    <ThemeProvider>
      <AppDarkMode />
    </ThemeProvider>
                {/* </TodosProvider> */}
    
  </StrictMode>
)

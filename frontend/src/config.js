export const config = {
    apiUrl: import.meta.env.VITE_NODE_ENV  === 'production' ? 'https://fullstack-mern-todo-app.onrender.com' : `http://localhost:${import.meta.env.VITE_PORT}`
}
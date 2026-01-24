export const config = {
    apiUrl: import.meta.env.VITE_NODE_ENV  === 'production' ? 'https://fullstack-mern-todo-b8x7vpgua-moussaouims-projects.vercel.app' : `http://localhost:${import.meta.env.VITE_PORT}`
}
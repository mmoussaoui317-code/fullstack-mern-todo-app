export const config = {
    apiUrl: import.meta.env.VITE_NODE_ENV  === 'production' ? 'https://mmoussaoui317-code-fullstack-mern-t.vercel.app' : `http://localhost:${import.meta.env.VITE_PORT}`
}
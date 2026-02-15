import React, { useState, /*useEffect*/ } from 'react';
import { 
    Container, TextField, Button, Box, 
    Typography, List, ListItem, ListItemText,
    Checkbox, IconButton, CircularProgress
} from '@mui/material';
// import DeleteIcon from '@mui/';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { TodoList } from './TodoList.jsx';
import axios from 'axios';
import { config } from '../config.js';
import DashboardStats from './DashboardStats.jsx';
import { SimpleDragDrop } from './SimpleDragDrop.jsx';
import styles from "./styles/dashboard.module.scss"


const Dashboard = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({ title: '', description: '' });
    // const [completed, setCompleted] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user, logout } = useAuth();
    const { state } = useTheme();
    
    // useEffect(() => {
    //     fetchTodos();
    // }, []);

    // const fetchTodos = async () => {
    //     try {
    //         const response = await axios.get(`${config.apiUrl}/api/todos`);
    //         setTodos(response.data.data || []);
    //     } catch (error) {
    //         console.error('Failed to fetch todos:', error);
    //     }
    // };

    const handleAddTodo = async () => {
        if (!newTodo.title.trim()) return;
        
        setLoading(true);
        try {
            const response = await axios.post(`${config.apiUrl}/api/todos`, newTodo);
            setTodos([...todos, response.data.data]);
            setNewTodo({ title: '', description: '' });
        } catch (error) {
            console.error('Failed to add todo:', error);
        } finally {
            setLoading(false);
        }
    };

    const [preList, setPreList] = useState([
        { id: 1, title: 'حل واجبات البرمجة' },
        { id: 2, title: 'استكشاف المدينة' },
        { id: 3, title: 'الذهاب للصالة الرياضية' }
    ]);


    return (
        <Container maxWidth="md" sx={{overflow: 'hidden', padding: 4, borderRadius: 4, position: 'relative', color: state.isDark ? state.lightColor : state.darkColor, bgcolor: state.isDark ? state.darkColor : state.lightColor}}>
            <Box>
                <Typography variant="h4" gutterBottom>
                    Welcome, {user?.username || 'User'}!
                </Typography>
                
                {/* Add New Todo  */}
                <Box sx={{ mb: 4, p: 2, bgcolor: state.isDark ? state.secondaryColor : state.lightColor, borderRadius: 1 }}>
                    <TextField
                        fullWidth
                        label="Todo Title"
                        value={newTodo.title}
                        onChange={(e) => setNewTodo({...newTodo, title: e.target.value})}
                        margin="normal"
                        sx={{ color: state.isDark ? state.lightColor : state.darkColor }}
                        classes={state.isDark ? styles.dark : ""}
                    />
                    <TextField
                        fullWidth
                        label="Description (Optional)"
                        value={newTodo.description}
                        onChange={(e) => setNewTodo({...newTodo, description: e.target.value})}
                        margin="normal"
                        // sx={{overflow: 'hidden' }}
                        className={state.isDark ? "dark" : ""}
                    />
                    <Button
                        variant="contained"
                        onClick={handleAddTodo}
                        disabled={loading || !newTodo.title.trim()}
                        color={state.isDark ? state.lightColor : state.darkColor}
                        sx={{ mt: 2 }}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Add Todo'}
                    </Button>
                </Box>
                
                {/* List of Todos */}
                {/* <List> */}
                    {/* {todos.map((todo) => ( */}
                        {/* // <ListItem */}
                            {/* // key={todo._id} */}
                            {/* // secondaryAction={ */}
                                {/* // <IconButton edge="end"> */}
                                    {/* <DeleteIcon /> */}
                                {/* </IconButton> */}
                            {/* // } */}
                        {/* // > */}
                            {/* todo.completed */}
                            {/* <Checkbox checked={completed} onChange={() => setCompleted( prv => !prv)} /> */}
                            {/* <ListItemText  */}
                                {/* // primary={todo.title}  */}
                                {/* // secondary={todo.description}  */}
                            {/* // /> */}
                        {/* </ListItem> */}
                    {/* // ))} */}
                {/* </List> */}

                <TodoList todos={todos} onReorder={setTodos} />
                
                {todos.length === 0 && (
                    <Typography align="center" sx={{color: state.isDark ? state.lightColor : state.secondaryColor}}>
                        No todos yet. Add your first todo!
                    </Typography>
                )}
                
                <DashboardStats todos={ todos || [] } />
            </Box>

            <Button 
                variant="outlined" 
                onClick={logout}
                sx={{ position: 'absolute', ml: 'auto', top: '15px', right: '25px' }}
            >
                Logout
            </Button>
            <SimpleDragDrop items={preList} onReorder={setPreList} />
        </Container>
    );
};

export default Dashboard;

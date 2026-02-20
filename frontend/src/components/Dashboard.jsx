import React, { useState, /*useEffect*/ } from 'react';
import { 
    Container, TextField, Button, Box, 
    Typography, List, ListItem, ListItemText,
    Checkbox, IconButton, CircularProgress
} from '@mui/material';
import { SimpleDragDrop } from './SimpleDragDrop.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import Form from './Form.jsx';
// import { useAuth } from '../context/AuthContext.jsx';
// import axios from 'axios';
// import { config } from '../config.js';
// import { dataFormValidation } from '../utils/validationDataForm.js';
// import DeleteIcon from '@mui/';
// import { DarkThemeMUI } from '../context/DarkThemeMUI.jsx';
// import { TodoList } from './TodoList.jsx';
// import DashboardStats from './DashboardStats.jsx';
// import styles from "./styles/dashboard.module.scss";


const Dashboard = () => {
    const [todos, setTodos] = useState([]);
    // const { user } = useAuth();
    // const [completed, setCompleted] = useState(false);
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


    // const handleAddTodo = async () => {
    //     if (!newTodo.title.trim()) return;
    //         setLoading(true);
    //     try {
    //         const {valid, errors} = dataFormValidation(newTodo);
    //         setErrors({...errors});
    //         if(!valid) return;
    //         const response = await axios.post(`${config.apiUrl}/api/todos`, newTodo);
    //         setTodos([...todos, response.data.data]);
    //         setNewTodo({ title: '', description: '' });
    //     } catch (error) {
    //         console.error('Failed to add todo:', error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };


    return (
        <Container maxWidth="md" sx={{position: 'relative', "&::before": state.ShowForm && { content: '""', position: 'absolute', top: '0%', left: '0%', width: '100vw', height: '100vh', bgcolor: '#11221151', zIndex: -1}}}>
            <Box sx={{ position: 'relative', zIndex: 0, minHeight: '100vh'}}>
                {/* Add New Todo  */}
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
                {/* <TodoList todos={todos} onReorder={setTodos} /> */}

                {
                    state.ShowForm ? <Form /> : null
                }
                
                {todos.length === 0 && (
                    <Typography align="center" >
                        No todos yet. Add your first todo!
                    </Typography>
                )}
                
                <SimpleDragDrop items={todos} onReorder={setTodos} />
                {/* <DashboardStats todos={ todos || [] } /> */}
            </Box>
        </Container>
    );
};

export default Dashboard;

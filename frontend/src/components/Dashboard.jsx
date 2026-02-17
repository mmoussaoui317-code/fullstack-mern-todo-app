import React, { useState, /*useEffect*/ } from 'react';
import { 
    Container, TextField, Button, Box, 
    Typography, List, ListItem, ListItemText,
    Checkbox, IconButton, CircularProgress
} from '@mui/material';
// import DeleteIcon from '@mui/';
import { useAuth } from '../context/AuthContext.jsx';
// import { DarkThemeMUI } from '../context/DarkThemeMUI.jsx';
// import { useTheme } from '../context/ThemeContext.jsx';
import { TodoList } from './TodoList.jsx';
import axios from 'axios';
import { config } from '../config.js';
// import DashboardStats from './DashboardStats.jsx';
import { SimpleDragDrop } from './SimpleDragDrop.jsx';
// import styles from "./styles/dashboard.module.scss"


const Dashboard = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({ title: '', description: '' });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const { user } = useAuth();
    // const [completed, setCompleted] = useState(false);
    // const { state } = useTheme();
    
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

    const validationFrom = () => {
        let validity = true;
        if(newTodo.title.trim().length > 100) {
            setErrors(prv => { return {...prv, title: "Title Must be Less Then 100 Characters!!"}}); 
            validity = false;
        } else if(newTodo.description.trim() > 1000) {
            setErrors(prv => { return {...prv, description: "Description Must be Less Then 1000 Characters!!"}});
            validity = false;
        } else {
            setErrors({});
            validity = true;
        }

        return validity;
    }

    const handleAddTodo = async () => {
        if (!newTodo.title.trim()) return;
            setLoading(true);
        try {
            if(validationFrom()) return; 
            const response = await axios.post(`${config.apiUrl}/api/todos`, newTodo);
            setTodos([...todos, response.data.data]);
            setNewTodo({ title: '', description: '' });
        } catch (error) {
            console.error('Failed to add todo:', error);
        } finally {
            setLoading(false);
        }
    };


    return (
        // <DarkThemeMUI>
        <Container maxWidth="md" 
        // sx={{overflow: 'hidden', padding: 4, borderRadius: 4, position: 'relative', color: state.isDark ? state.lightColor : state.darkColor, bgcolor: state.isDark ? state.darkColor : state.lightColor}}
        >
            <Box>
                <Typography variant="h4" gutterBottom>
                    Welcome, {user?.username || 'User'}!
                </Typography>
                
                {/* Add New Todo  */}
                <Box sx={{ mb: 4, p: 2/*, bgcolor: state.isDark ? state.secondaryColor : state.lightColor, borderRadius: 1*/ }}>
                    <TextField
                        fullWidth
                        label="Todo Title"
                        value={newTodo.title}
                        onChange={(e) => setNewTodo({...newTodo, title: e.target.value})}
                        margin="normal"
                        onBlur={() => {validationFrom()}}
                        error={errors.title}
                        helperText={errors.title}
                    />
                    {/* {  ? <span className={styles.error_span}>{errors.title}</span> : null } */}

                    <TextField
                        fullWidth
                        label="Description (Optional)"
                        value={newTodo.description}
                        onChange={(e) => setNewTodo({...newTodo, description: e.target.value})}
                        margin="normal"
                        onBlur={() => {validationFrom()}}
                        error={errors.description}
                        helperText={errors.description}
                    />
                    {/* {  ? <span className={styles.error_span}>{errors.title}</span> : null } */}
                    <Button
                        variant="contained"
                        onClick={handleAddTodo}
                        disabled={loading || !newTodo.title.trim()}
                        // color={state.isDark ? state.lightColor : state.darkColor}
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

                {/* <TodoList todos={todos} onReorder={setTodos} /> */}
                
                {todos.length === 0 && (
                    <Typography align="center" 
                    // sx={{color: state.isDark ? state.lightColor : state.secondaryColor}}
                    >
                        No todos yet. Add your first todo!
                    </Typography>
                )}
                
                <SimpleDragDrop items={todos} onReorder={setTodos} />
                {/* <DashboardStats todos={ todos || [] } /> */}
            </Box>
        </Container>
        // {/* </DarkThemeMUI> */}

    );
};

export default Dashboard;

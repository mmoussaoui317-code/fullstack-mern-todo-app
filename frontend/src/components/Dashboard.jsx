import React, { useState, useEffect } from 'react';
import { 
    Container, TextField, Button, Box, 
    Typography, List, ListItem, ListItemText,
    Checkbox, IconButton, CircularProgress
} from '@mui/material';
// import DeleteIcon from '@mui/';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { config } from '../config.js';

const Dashboard = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({ title: '', description: '' });
    const [loading, setLoading] = useState(false);
    const { user, logout } = useAuth();

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get(`${config.apiUrl}/api/todos`);
            setTodos(response.data.data || []);
        } catch (error) {
            console.error('Failed to fetch todos:', error);
        }
    };

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

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Welcome, {user?.username || 'User'}!
                </Typography>
                
                {/* إضافة Todo جديد */}
                <Box sx={{ mb: 4, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                    <TextField
                        fullWidth
                        label="Todo Title"
                        value={newTodo.title}
                        onChange={(e) => setNewTodo({...newTodo, title: e.target.value})}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Description (Optional)"
                        value={newTodo.description}
                        onChange={(e) => setNewTodo({...newTodo, description: e.target.value})}
                        margin="normal"
                    />
                    <Button
                        variant="contained"
                        onClick={handleAddTodo}
                        disabled={loading || !newTodo.title.trim()}
                        sx={{ mt: 2 }}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Add Todo'}
                    </Button>
                </Box>
                
                {/* قائمة Todos */}
                <List>
                    {todos.map((todo) => (
                        <ListItem
                            key={todo._id}
                            secondaryAction={
                                <IconButton edge="end">
                                    <DeleteIcon />
                                </IconButton>
                            }
                        >
                            <Checkbox checked={todo.completed} />
                            <ListItemText 
                                primary={todo.title} 
                                secondary={todo.description} 
                            />
                        </ListItem>
                    ))}
                </List>
                
                {todos.length === 0 && (
                    <Typography align="center" color="text.secondary">
                        No todos yet. Add your first todo!
                    </Typography>
                )}
                
                <Button 
                    variant="outlined" 
                    onClick={logout}
                    sx={{ mt: 4 }}
                >
                    Logout
                </Button>
            </Box>
        </Container>
    );
};

export default Dashboard;

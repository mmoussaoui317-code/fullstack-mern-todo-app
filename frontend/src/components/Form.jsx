
import { Box, TextField, Button, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import axios from 'axios';
import { config } from '../config';
import { dataFormValidation } from '../utils/validationDataForm';
import { useTheme } from '../context/ThemeContext';

export default function Form() {
    const [newTodo, setNewTodo] = useState({ title: '', description: '' });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [todos, setTodos] = useState([]);
    const { dispatch } = useTheme();
    
    const handleAddTodo = async () => {
        if (!newTodo.title.trim()) return;
            setLoading(true);
        try {
            const {valid, errors} = dataFormValidation(newTodo);
            setErrors({...errors});
            if(!valid) return;
            
            const response = await axios.post(`${config.apiUrl}/api/todos`, newTodo);
            setTodos([...todos, response.data.data]);
            setNewTodo({ title: '', description: '' });
        } catch (error) {
            console.error('Failed to add todo:', error);
        } finally {
            setLoading(false);
        }
    };

    return <Box sx={{ mb: 4, p: 2, position: 'absolute', borderRadius: 1, zIndex: 100, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', boxShadow: 10 }}>
                <CloseIcon onClick={() => {{ dispatch({type: "ShowForm", payload: false}) }}} sx={{ position: 'absolute', top: 4, right: 4, cursor: 'pointer' }} />
                <TextField
                    fullWidth
                    label="Todo Title"
                    value={newTodo.title}
                    onChange={(e) => setNewTodo({...newTodo, title: e.target.value})}
                    margin="normal"
                    error={errors.title}
                    helperText={errors.title}
                />
                <TextField
                    fullWidth
                    label="Description (Optional)"
                    value={newTodo.description}
                    onChange={(e) => setNewTodo({...newTodo, description: e.target.value})}
                    margin="normal"
                    error={errors.description}
                    helperText={errors.description}
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
}
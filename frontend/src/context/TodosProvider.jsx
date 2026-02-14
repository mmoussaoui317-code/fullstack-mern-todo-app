import React, { createContext, /*useState,*/ useContext /*, useEffect*/ } from 'react';
import { useReducer } from 'react';
// import { useReducer } from 'react';

const TodosReducer = (state, action) => {

    switch(action.type) {
        case "AddTodo": 
            return {
                ...state,
                todos: [...state.todos, action.payload],
            };
        default: 
            return state;
    }
}

const TodosContext = createContext();

// Must Be in a separate file
// eslint-disable-next-line
export const useTodos = () => useContext(TodosContext);

const initialState = {
        todos: [
            { id: 1, title: 'Todo 1', completed: false, priority: 'urgent' },
        ],
    }

export const TodosProvider = ({ children }) => {
    
    const [state, dispatch] = useReducer(TodosReducer, initialState);

    return (
        <TodosContext.Provider value={{ state, dispatch }}>
            {children}
        </TodosContext.Provider>
    );
};

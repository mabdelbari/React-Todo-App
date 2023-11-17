import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getTodos = createAsyncThunk('todos/getTodos',
    async () => {
        
    })


const initialState = {
    isLoading: false,
    todos: JSON.parse(localStorage.getItem("todoList")) || []
}

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const newTodo = {
                id: Date.now(),
                text: action.payload,
                isCompleted: false
            };
            localStorage.setItem("todoList", JSON.stringify([...state.todos, newTodo]))
            return {
                ...state,
                todos: [...state.todos, newTodo]
            }
        },
        removeTodo: (state, action) => {
            const filteredTodos = state.todos.filter(item => item.id !== action.payload)
            localStorage.setItem("todoList", JSON.stringify(filteredTodos))
            return {
                ...state,
                todos: filteredTodos
            }
        },
        triggerComplete: (state, action) => {
            const updatedTodos = state.todos.map(todo => {
                if (todo.id === action.payload) {
                    return { ...todo, isCompleted: !todo.isCompleted };
                }

                return todo;
            })
            localStorage.setItem("todoList", JSON.stringify(updatedTodos))
            return {
                ...state,
                todos: updatedTodos
            }
        }

    }
});

export const { addTodo, removeTodo, triggerComplete } = todoSlice.actions
export default todoSlice.reducer
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
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
            const filteredTodos = state.todos.filter(item => item.text !== action.payload)
            localStorage.setItem("todoList", JSON.stringify(filteredTodos))
            return {
                ...state,
                todos: filteredTodos
            }
        }

    }
});

export const { addTodo, removeTodo } = todoSlice.actions
export default todoSlice.reducer
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = 'https://api.todoist.com/rest/v2/tasks'
const headers = {
    Authorization: 'Bearer 36c1a12b19dec3c4e88eed26ed2b551a8ea760c1'
}


const initialState = {
    isLoading: false,
    todos: JSON.parse(localStorage.getItem("todoList")) || [],
    completedTodos: [],
    error: ''
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

    },
    extraReducers: (builder) => {
        builder
            .addCase(getTodos.pending, (state) => {
                return {
                    ...state,
                    isLoading: true
                }
            })
            .addCase(getTodos.fulfilled, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    todos: [...state.todos, ...action.payload],
                    error: ""
                }
            })
            .addCase(getTodos.rejected, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    error: action.payload
                }
            })
            .addCase(getCompletedTodos.pending, (state) => {
                return {
                    ...state,
                    isLoading: true
                }
            })
            .addCase(getCompletedTodos.fulfilled, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    completedTodos: [...state.completedTodos, ...action.payload],
                    error: ""
                }
            })
            .addCase(getCompletedTodos.rejected, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    error: action.payload
                }
            })
            .addCase(createTodo.pending, (state) => {
                return {
                    ...state,
                    isLoading: true
                }
            })
            .addCase(createTodo.fulfilled, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    todos: [...state.todos, action.payload],
                    error: ""
                }
            })
            .addCase(createTodo.rejected, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    error: action.payload
                }
            })
            .addCase(triggerTodo.pending, (state) => {
                return {
                    ...state,
                    isLoading: true
                }
            })
            .addCase(triggerTodo.fulfilled, (state, action) => {
                if (action.payload.method === 'close') {
                    const filteredTodos = state.todos.filter(todo => (todo.task_id ? todo.task_id : todo.id) !== action.payload.todoId)
                    const closedTodo = state.todos.find(todo => (todo.task_id ? todo.task_id : todo.id) === action.payload.todoId)
                    return {
                        ...state,
                        isLoading: false,
                        todos: filteredTodos,
                        completedTodos: [...state.completedTodos, closedTodo],
                        error: ''
                    }
                } else {
                    const filteredCompletedTodos = state.completedTodos.filter(todo => (todo.task_id ? todo.task_id : todo.id) !== action.payload.todoId)
                    const openedTodo = state.completedTodos.find(todo => (todo.task_id ? todo.task_id : todo.id) === action.payload.todoId)
                    return {
                        ...state,
                        isLoading: false,
                        todos: [...state.todos, openedTodo],
                        completedTodos: filteredCompletedTodos,
                        error: ''
                    }
                }
            })
            .addCase(triggerTodo.rejected, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    error: action.payload
                }
            })
            .addCase(deleteTodo.pending, (state) => {
                return {
                    ...state,
                    isLoading: true
                }
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                const filteredTodos = state.todos.filter(item => item.id !== action.payload)
                const filteredCompletedTodos = state.completedTodos.filter(item => item.id !== action.payload)
                return {
                    ...state,
                    isLoading: false,
                    todos: filteredTodos,
                    completedTodos: filteredCompletedTodos
                }
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    error: action.payload
                }
            })
    }
});

export const getTodos = createAsyncThunk('todos/getTodos',
    async () => {
        try {
            const { data: todos } = await axios.get(baseURL, { headers })
            return todos
        } catch (error) {
            console.log(error)
        }
    })


export const getCompletedTodos = createAsyncThunk('todos/getCompletedTodos',
    async () => {
        try {
            const { data: completedTodos } = await axios.get('https://api.todoist.com/sync/v9/completed/get_all', { headers })

            return completedTodos.items
        } catch (error) {
            console.log(error)
        }
    })

export const createTodo = createAsyncThunk('todos/createTodo',
    async (content) => {
        try {
            const { data: newTodo } = await axios.post(baseURL, {
                content
            }, {
                headers
            })

            return newTodo
        } catch (error) {
            console.log(error)
        }

    })


export const triggerTodo = createAsyncThunk('todos/triggerTodo',
    async ({ todoId, method }) => {
        try {
            axios.post(`${baseURL}/${todoId}/${method}`, {}, { headers })

            return { todoId, method }
        } catch (error) {
            console.log(error)
        }
    })

export const deleteTodo = createAsyncThunk('todos/deleteTodo',
    async (todoId) => {
        try {
            axios.delete(`${baseURL}/${todoId}`, { headers })

            return todoId
        } catch (error) {
            console.log(error)
        }
    })

export const { addTodo, removeTodo, triggerComplete } = todoSlice.actions
export default todoSlice.reducer
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
    // reducers: {
    //     addTodo: (state, action) => {
    //         const newTodo = {
    //             id: Date.now(),
    //             text: action.payload,
    //             isCompleted: false
    //         };
    //         localStorage.setItem("todoList", JSON.stringify([...state.todos, newTodo]))
    //         return {
    //             ...state,
    //             todos: [...state.todos, newTodo]
    //         }
    //     },
    //     removeTodo: (state, action) => {
    //         const filteredTodos = state.todos.filter(item => item.id !== action.payload)
    //         localStorage.setItem("todoList", JSON.stringify(filteredTodos))
    //         return {
    //             ...state,
    //             todos: filteredTodos
    //         }
    //     },
    //     triggerComplete: (state, action) => {
    //         const updatedTodos = state.todos.map(todo => {
    //             if (todo.id === action.payload) {
    //                 return { ...todo, isCompleted: !todo.isCompleted };
    //             }

    //             return todo;
    //         })
    //         localStorage.setItem("todoList", JSON.stringify(updatedTodos))
    //         return {
    //             ...state,
    //             todos: updatedTodos
    //         }
    //     }

    // },
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
                    todos: [...action.payload],
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
                    completedTodos: [...action.payload],
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
                const { todo, method } = action.payload
                const todoID = todo.completed_at ? todo.task_id : todo.id

                if (method === 'close') {
                    const filteredTodos = state.todos.filter(todo => (todo.completed_at ? todo.task_id : todo.id) !== todoID)
                    return {
                        ...state,
                        isLoading: false,
                        todos: filteredTodos,
                        completedTodos: [...state.completedTodos, todo],
                        error: ''
                    }
                }

                const filteredCompletedTodos = state.completedTodos.filter(todo => (todo.completed_at ? todo.task_id : todo.id) !== todoID)
                return {
                    ...state,
                    isLoading: false,
                    todos: [...state.todos, todo],
                    completedTodos: filteredCompletedTodos,
                    error: ''
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
            .addCase(deleteTodo.fulfilled, (state, { payload: removedTodo }) => {
                if (removedTodo.completed_at) {
                    const filteredTodos = state.todos.filter(todo => todo.task_id !== removedTodo.task_id)
                    const filteredCompletedTodos = state.completedTodos.filter(todo => todo.task_id !== removedTodo.task_id)
                    return {
                        ...state,
                        isLoading: false,
                        todos: filteredTodos,
                        completedTodos: filteredCompletedTodos,
                        error: ''
                    }
                }

                const filteredTodos = state.todos.filter(todo => todo.id !== removedTodo.id)
                const filteredCompletedTodos = state.completedTodos.filter(todo => todo.id !== removedTodo.id)
                return {
                    ...state,
                    isLoading: false,
                    todos: filteredTodos,
                    completedTodos: filteredCompletedTodos,
                    error: ''
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
    async ({ todo, method }, { dispatch }) => {
        try {
            if (todo.task_id) {
                await axios.post(`${baseURL}/${todo.task_id}/${method}`, {}, { headers })
            } else {
                await axios.post(`${baseURL}/${todo.id}/${method}`, {}, { headers })
            }

            dispatch(getTodos())
            dispatch(getCompletedTodos())


            return { todo, method }
        } catch (error) {
            console.log(error)
        }
    })

export const deleteTodo = createAsyncThunk('todos/deleteTodo',
    async (todo) => {
        try {
            if (todo.task_id) {
                axios.delete(`${baseURL}/${todo.task_id}`, { headers })
            } else {
                axios.delete(`${baseURL}/${todo.id}`, { headers })
            }

            return todo
        } catch (error) {
            console.log(error)
        }
    })

export const { addTodo, removeTodo, triggerComplete } = todoSlice.actions
export default todoSlice.reducer
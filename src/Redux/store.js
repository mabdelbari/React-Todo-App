import { configureStore, combineReducers } from '@reduxjs/toolkit'

import todoReducer from './todoSlice'


const store = configureStore({
    reducer: {
        todoReducer,
    }
})

export default store
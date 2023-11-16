import { configureStore, combineReducers } from '@reduxjs/toolkit'

import {todosReducer} from 'reducers'


const reducers = {
    todosReducer,
}

const rootReducer = combineReducers(reducers)

export const store = configureStore(rootReducer);
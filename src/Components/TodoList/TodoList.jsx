import React, { useEffect } from 'react'
import TodoListItem from '../TodoListItem/TodoListItem'
import NewTodoForm from '../NewTodoForm/NewTodoForm';
import styles from './TodoList.module.scss';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux'
import { getCompletedTodos, getTodos } from '../../Redux/todoSlice';


const ListWrapper = styled.div`
    max-width: 700px;
    margin: auto;
`;

const LoadingScreen = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #6dc8cf;
    opacity: 0.5;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
`;

export default function TodoList() {
    const dispatch = useDispatch()
    const { todos: inCompletedTodos, completedTodos, isLoading } = useSelector(store => store.todoReducer)

    useEffect(() => {
        dispatch(getTodos());
        dispatch(getCompletedTodos())
    }, [])

    return (
        <>

            {isLoading
                ? <LoadingScreen>
                    Application is Loading
                </LoadingScreen>
                : ''
            }

            {
                < ListWrapper >
                    <NewTodoForm />
                    <h3>InCompleted Todos:</h3>
                    {inCompletedTodos.map(todo => <TodoListItem key={todo.completed_at ? todo.task_id : todo.id} todo={todo} method={"close"} />)}
                    <h3>Completed Todos:</h3>
                    {completedTodos.map(todo => <TodoListItem key={todo.completed_at ? todo.task_id : todo.id} todo={todo} method={"reopen"} />)}
                </ListWrapper >
            }


        </>
    )
}

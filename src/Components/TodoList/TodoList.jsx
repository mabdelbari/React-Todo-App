import React, { useEffect } from 'react'
import TodoListItem from '../TodoListItem/TodoListItem'
import NewTodoForm from '../NewTodoForm/NewTodoForm';
import { useDispatch, useSelector } from 'react-redux'
import styles from './TodoList.module.scss';
import { getCompletedTodos, getTodos } from '../../Redux/todoSlice';

export default function TodoList() {
    const dispatch = useDispatch()
    const { todos, completedTodos } = useSelector(store => store.todoReducer)

    useEffect(() => {
        dispatch(getTodos());
        dispatch(getCompletedTodos())
    }, [])

    return (
        <div className={styles.listWrapper}>
            <NewTodoForm />
            {todos.map(todo => <TodoListItem key={todo.task_id ? todo.task_id : todo.id} todo={todo} method={"close"} />)}
            <h2>Completed</h2>
            {completedTodos.map(todo => <TodoListItem key={todo.task_id ? todo.task_id : todo.id} todo={todo} method={"reopen"} />)}
        </div>
    )
}

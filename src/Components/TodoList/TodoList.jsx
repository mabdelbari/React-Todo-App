import React from 'react'
import TodoListItem from '../TodoListItem/TodoListItem'
import NewTodoForm from '../NewTodoForm/NewTodoForm';
import { useSelector } from 'react-redux'
import styles from './TodoList.module.scss';

export default function TodoList() {
    const { todos } = useSelector(store => store.todoReducer)

    return (
        <div className={styles.listWrapper}>
            <NewTodoForm />
            {console.log(todos)}
            {todos.map(todo => <TodoListItem key={todo.id} todo={todo} />)}
        </div>
    )
}

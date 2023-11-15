import React from 'react'
import TodoListItem from '../TodoListItem/TodoListItem'
import NewTodoForm from '../NewTodoForm/NewTodoForm';

import styles from './TodoList.module.scss';

export default function TodoList({ todos = [{ text: "Hello" }] }) {
    return (
        <div className={styles.listWrapper}>
            <NewTodoForm />
            {todos.map(todo => <TodoListItem todo={todo} />)}
        </div>
    )
}

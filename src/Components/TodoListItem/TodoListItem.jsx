import React from 'react'
import { useDispatch } from 'react-redux'
import { removeTodo } from '../../Redux/todoSlice'
import styles from './TodoListItem.module.scss';

export default function TodoListItem({ todo }) {
    const dispatch = useDispatch()

    return (
        <div className={styles.todoItemContainer}>
            <h3>{todo.text}</h3>
            <div className={styles.buttonsContainer}>
                <button className={styles.completedButton}>Mark As Completed</button>
                <button className={styles.removeButton} onClick={() => dispatch(removeTodo(todo.text))}>Remove</button>
            </div>
        </div>
    )
}

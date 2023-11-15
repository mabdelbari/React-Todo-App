import React from 'react'
import styles from './TodoListItem.module.scss';

export default function TodoListItem({ todo }) {
    return (
        <div className={styles.todoItemContainer}>
            <h3>{todo.text}</h3>
            <div className={styles.buttonsContainer}>
                <button className={styles.completedButton}>Mark As Completed</button>
                <button className={styles.removeButton}>Remove</button>
            </div>
        </div>
    )
}

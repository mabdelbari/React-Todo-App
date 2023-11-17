import React from 'react'
import { useDispatch } from 'react-redux'
import { removeTodo, triggerComplete } from '../../Redux/todoSlice'
import styles from './TodoListItem.module.scss';

export default function TodoListItem({ todo }) {
    const dispatch = useDispatch()

    return (
        <div className={styles.todoItemContainer}>
            <h3>{todo.text}</h3>
            <div className={styles.buttonsContainer}>
                {
                    todo.isCompleted
                        ? <button className={styles.completedButton} onClick={()=> dispatch(triggerComplete(todo.id))} >Mark As UnCompleted</button>
                        : <button className={styles.completedButton} onClick={()=> dispatch(triggerComplete(todo.id))} >Mark As Completed</button>
                }
                <button className={styles.removeButton} onClick={() => dispatch(removeTodo(todo.id))}>Remove</button>
            </div>
        </div>
    )
}

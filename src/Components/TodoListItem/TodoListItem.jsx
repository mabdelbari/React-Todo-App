import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteTodo, removeTodo, triggerComplete, triggerTodo } from '../../Redux/todoSlice'
import styles from './TodoListItem.module.scss';

export default function TodoListItem({ todo, method }) {
    const dispatch = useDispatch()

    return (
        <div className={styles.todoItemContainer}>
            <h3>{todo.content}</h3>
            <div className={styles.buttonsContainer}>
                {
                    method === "reopen"
                        ? <button
                            className={styles.completedButton}
                            onClick={() => dispatch(triggerTodo({ todoId: todo.task_id ? todo.task_id : todo.id, method: "reopen" }))} >Re-Open</button>
                        : <button
                            className={styles.completedButton}
                            onClick={() => dispatch(triggerTodo({ todoId: todo.task_id ? todo.task_id : todo.id, method: "close" }))} >Close</button>
                }
                <button className={styles.removeButton} onClick={() => dispatch(deleteTodo(todo.id))}>Remove</button>
            </div>
        </div>
    )
}

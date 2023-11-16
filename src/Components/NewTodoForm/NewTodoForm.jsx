import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { addTodo } from '../../Redux/todoSlice'
import styles from './NewTodoForm.module.scss';

export default function NewTodoForm() {
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();


    const handleAddTodo = () => {
        if (inputValue) {
            dispatch(addTodo(inputValue))
            setInputValue('')
        }
    }

    return <>
        <div className={styles.newTodoForm}>
            <input
                className={styles.newTodoInput}
                type="text"
                placeholder='Enter your new todo here'
                value={inputValue}
                onChange={e => setInputValue(e.target.value)} />
            <button className={styles.newTodoButton} onClick={handleAddTodo}>Create Todo</button>
        </div>
    </>
}

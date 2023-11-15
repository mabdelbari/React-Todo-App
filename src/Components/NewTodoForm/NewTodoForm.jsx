import React, { useState } from 'react';
import styles from './NewTodoForm.module.scss';

export default function NewTodoForm() {
    const [inputValue, setInputValue] = useState('');


    return <>
        <div className={styles.newTodoForm}>
            <input
                className={styles.newTodoInput}
                type="text"
                placeholder='Enter your new todo here'
                value={inputValue}
                onChange={e => setInputValue(e.target.value)} />
            <button className={styles.newTodoButton}>Create Todo</button>
        </div>
    </>
}

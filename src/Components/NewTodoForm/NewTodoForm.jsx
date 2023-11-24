import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { addTodo, createTodo } from '../../Redux/todoSlice'
import styles from './NewTodoForm.module.scss';
import styled from 'styled-components';



const CreateTodoForm = styled.div`
    border-radius: 8px;
    padding: 16px;
    text-align: center;
    box-shadow: 0 4px 8px grey;
`;

const CreateTodoInput = styled.input`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-bottom: 2px solid #ddd;
    border-radius: 8px;
    width: 70%;
    outline: none;
`;

const CreateTodoButton = styled.button`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    margin-left: 8px;
    width: 20%;
    background-color: #22ee22;
`;

export default function NewTodoForm() {
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();


    const handleAddTodo = () => {
        if (inputValue) {
            dispatch(createTodo(inputValue))
            setInputValue('')
        }
    }

    return <>
        <CreateTodoForm>
            <CreateTodoInput
                type="text"
                placeholder='Enter your new todo here'
                value={inputValue}
                onChange={e => setInputValue(e.target.value)} />
            <CreateTodoButton
                onClick={handleAddTodo}>Create Todo
            </CreateTodoButton>
        </CreateTodoForm>
    </>
}

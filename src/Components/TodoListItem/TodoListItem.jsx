import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteTodo, triggerTodo } from '../../Redux/todoSlice'
import styles from './TodoListItem.module.scss';
import styled from 'styled-components';


const TodoItemContainer = styled.div`
    background: #fff;
    border-radius: 8px;
    margin-top: 8px;
    padding: 16px;
    position: relative;
    box-shadow: 0 4px 8px grey;
`;

const WarningTodoItemContainer = styled(TodoItemContainer)`
    border-bottom: ${props => (new Date(props.createdat) < new Date(Date.now() - 86400000 * 2)
        ? '2px solid red'
        : 'none')};
`;

const ButtonsContainer = styled.div`
    position: absolute;
    right: 12px;
    bottom: 12px;
`;

const Button = styled.button`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    display: inline-block;
`;

const CompletedButton = styled(Button)`
    background-color: #22ee22;
`;

const RemoveButton = styled(Button)`
    background-color: #ee2222;
    margin-left: 8px;
`;


export default function TodoListItem({ todo, method }) {
    const dispatch = useDispatch()

    const Container = todo.completed_at ? TodoItemContainer : WarningTodoItemContainer

    return (
        <Container createdat={todo.created_at?.slice(0, 10)}>
            <h3>{todo.content}</h3>
            <p>
                {todo.completed_at
                    ? `Completed at: ${todo.completed_at.slice(0, 10)} ${todo.completed_at.slice(11, 19)}`
                    : `Created at: ${todo.created_at.slice(0, 10)} ${todo.created_at.slice(11, 19)}`
                }
            </p>
            <ButtonsContainer>
                {
                    method === "reopen"
                        ? <CompletedButton
                            onClick={() => dispatch(triggerTodo({ todo, method: "reopen" }))}>
                            Re-Open
                        </CompletedButton>
                        : <CompletedButton
                            onClick={() => dispatch(triggerTodo({ todo, method: "close" }))}>
                            Mark as Completed
                        </CompletedButton>
                }
                <RemoveButton
                    onClick={() => dispatch(deleteTodo(todo))}>Remove
                </RemoveButton>
            </ButtonsContainer>
        </Container>
    )
}

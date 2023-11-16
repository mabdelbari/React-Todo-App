export const createTodo = text => ({
    type: "CREATE_TODO",
    payload: { text }
})

export const removeTodo = text => ({
    type: "REMOVE_TODO",
    payload: { text }
})
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type Todo = {
    id: string,
    text: string,
    completed: boolean
}
type TodoState = {
    todos: Todo[]
}
const initialState: TodoState = {
    todos: []
}

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            state.todos.push({
                id: Date.now().toString(),
                text: action.payload,
                completed: false
            });
        },
        deleteTodo: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload)
        },
        toggleTodo: (state, action: PayloadAction<string>) => {
            const todo = state.todos.find(todo => todo.id == action.payload);
            if (todo) {
                todo.completed = !todo?.completed
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { addTodo, deleteTodo, toggleTodo } = todoSlice.actions

export default todoSlice.reducer
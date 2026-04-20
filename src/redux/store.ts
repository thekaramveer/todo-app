import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './features/todos/todoSlice'
import { loadTodos, saveTodos } from '../utils/localStorage'

const preloadedTodos = loadTodos();

export const store = configureStore({
    reducer: {
        todos: todoReducer,
    },
    preloadedState: {
        todos: {
            todos: preloadedTodos,
        }
    }
})

store.subscribe(() => {
    const state = store.getState();
    saveTodos(state.todos.todos);
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
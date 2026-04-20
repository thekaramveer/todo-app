import type { Todo } from "../redux/features/todos/types";


const STORAGE_KEY = "todos";

export const loadTodos = (): Todo[] => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) return [];
        return JSON.parse(data) as Todo[];
    } catch (error) {
        console.error("Error loading todos:", error);
        return [];
    }
};

export const saveTodos = (todos: Todo[]): void => {
    try {
        const serialized = JSON.stringify(todos);
        localStorage.setItem(STORAGE_KEY, serialized);
    } catch (error) {
        console.error("Error saving todos:", error);
    }
};
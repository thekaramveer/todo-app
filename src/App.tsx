import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from './redux/store'
import { addTodo, deleteTodo, toggleTodo } from './redux/features/todoSlice'
import './App.css'
function App() {

  const [text, setText] = useState('')
  const todos = useSelector((state: RootState) => state.todos.todos)
  const dispatch = useDispatch()

  const handleAdd = () => {
    if (text.trim() === '') return
    dispatch(addTodo(text))
    setText('')
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Todo App</h1>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter todo..."
      />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              onClick={() => dispatch(toggleTodo(todo.id))}
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer'
              }}
            >
              {todo.text}
            </span>

            <button onClick={() => dispatch(deleteTodo(todo.id))}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
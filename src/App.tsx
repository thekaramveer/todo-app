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
    <div className="sketchy-container">
      <h1 className="sketchy-title">Todo App</h1>

      <div className="input-group">
        <input
          className="sketchy-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter todo..."
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button className="sketchy-button" onClick={handleAdd}>Add</button>
      </div>

      <ul className="sketchy-list">
        {todos.map(todo => (
          <li key={todo.id} className="sketchy-list-item">
            <span
              onClick={() => dispatch(toggleTodo(todo.id))}
              className="sketchy-text"
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer',
                color: todo.completed ? '#888' : '#000'
              }}
            >
              {todo.text}
            </span>

            <button
              className="delete-btn"
              onClick={() => dispatch(deleteTodo(todo.id))}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
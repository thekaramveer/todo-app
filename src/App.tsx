import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from './redux/store'
import { addTodo, deleteTodo, toggleTodo } from './redux/features/todoSlice'
import './App.css'

function App() {
  const [text, setText] = useState('')
  const MAX_CHARS = 70;
  const [isAnimating, setIsAnimating] = useState(false)
  //for delete animation
  const [deletingIds, setDeletingIds] = useState<string[]>([])

  const todos = useSelector((state: RootState) => state.todos.todos)
  const dispatch = useDispatch()

  const handleAdd = () => {
    if (text.trim() === '') return
    dispatch(addTodo(text))
    setText('')
    setIsAnimating(true)
    setTimeout(() => {
      setIsAnimating(false)
    }, 300)
  }

  const handleDelete = (id: string) => {
    // Add the ID to trigger the CSS class
    setDeletingIds((prev) => [...prev, id])

    // Wait 100ms before dispatching to Redux
    setTimeout(() => {
      dispatch(deleteTodo(id.toString()))
      // Clean up the deletingIds state
      setDeletingIds((prev) => prev.filter((item) => item !== id))
    }, 100)
  }

  return (
    <div className={`sketchy-container ${isAnimating ? 'animate-pop' : ''}`}>
      <h1 className="sketchy-title">Todo App</h1>

      <div className="input-group">
        <input
          className="sketchy-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter todo..."
          maxLength={MAX_CHARS}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button className="sketchy-button" onClick={handleAdd}>Add</button>
      </div>

      {/* render the warning if user hit the word limit */}

      {text.length >= MAX_CHARS && (
        <div className="sketchy-warning animate-shake">
          Whoa there! You've reached the max limit.
        </div>
      )}

      <ul className="sketchy-list">
        {todos.map(todo => (
          <li
            key={todo.id}

            className={`sketchy-list-item ${deletingIds.includes(todo.id) ? 'deleting' : ''}`}
          >
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
              onClick={() => handleDelete(todo.id)}
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
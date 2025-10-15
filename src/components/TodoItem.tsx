import React, { useState, useRef, useEffect } from 'react'
import { Todo } from '../types'

type Props = {
  todo: Todo
  onToggle: () => void
  onDelete: () => void
  onEdit: (text: string) => void
}

const TodoItem: React.FC<Props> = ({ todo, onToggle, onDelete, onEdit }) => {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(todo.text)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (editing) inputRef.current?.focus()
  }, [editing])

  const save = () => {
    const trimmed = value.trim()
    if (!trimmed) return
    onEdit(trimmed)
    setEditing(false)
  }

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <label className="left">
        <input type="checkbox" checked={todo.completed} onChange={onToggle} />
        {!editing ? (
          <span className="text" onDoubleClick={() => { setEditing(true); setValue(todo.text) }}>
            {todo.text}
          </span>
        ) : (
          <input
            ref={inputRef}
            className="edit-input"
            value={value}
            onChange={e => setValue(e.target.value)}
            onBlur={save}
            onKeyDown={e => {
              if (e.key === 'Enter') save()
              if (e.key === 'Escape') { setEditing(false); setValue(todo.text) }
            }}
          />
        )}
      </label>
      <button className="delete" onClick={onDelete} aria-label="Delete">✕</button>
    </li>
  )
}

export default TodoItem

import React, { useEffect, useMemo, useState } from 'react'
import { Todo } from './types'
import { loadTodos, saveTodos } from './utils/loalStorage'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'

type Filter = 'all' | 'active' | 'completed'
type Theme = 'light' | 'dark'

const generateId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => loadTodos())
  const [filter, setFilter] = useState<Filter>('all')
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem('theme') as Theme) || 'light'
  )

  useEffect(() => {
    saveTodos(todos)
  }, [todos])

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const addTodo = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    const newTodo: Todo = {
      id: generateId(),
      text: trimmed,
      completed: false,
    }
    setTodos(prev => [newTodo, ...prev])
  }

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  const editTodo = (id: string, text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, text: trimmed } : t)))
  }

  const clearCompleted = () =>
    setTodos(prev => prev.filter(t => !t.completed))

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(t => !t.completed)
      case 'completed':
        return todos.filter(t => t.completed)
      default:
        return todos
    }
  }, [todos, filter])

  const activeCount = todos.filter(t => !t.completed).length

  return (
    <div className="app">
      <header className="header">
        <h1>Todo List</h1>
        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </header>
        <button className='NotPushButton'
        onClick={() => window.location.href = 'https://vkvideo.ru/video-127960182_456239022'}>
         Не нажимать !!!!
        </button>
      <TodoForm onAdd={addTodo} />

      <div className="controls">
        <div className="filters">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            Все 
          </button>
          <button
            className={filter === 'active' ? 'active' : ''}
            onClick={() => setFilter('active')}
          >
            Активные
          </button>
          <button
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            Выполненные
          </button>
        </div>
        <div className="actions">
          <span>Осталось {activeCount} задач(и)</span>
          <button onClick={clearCompleted}>Очистить выполненое</button>
        </div>
      </div>

      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />

      {todos.length === 0 && (
        <p className="empty">Список задач пуст. Добавьте первую задачу.</p>
      )}
    </div>
  )
}

export default App

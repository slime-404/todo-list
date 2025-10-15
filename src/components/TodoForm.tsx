import React, { useState } from 'react'

type Props = {
  onAdd: (text: string) => void
}

const TodoForm: React.FC<Props> = ({ onAdd }) => {
  const [text, setText] = useState('')

  const submit = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!text.trim()) return
    onAdd(text)
    setText('')
  }

  return (
    <form className="todo-form" onSubmit={submit}>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Новая задача"
      />
      <button type="submit">Добавить</button>
    </form>
  )
}

export default TodoForm

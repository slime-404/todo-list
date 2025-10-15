import React from 'react'
import { Todo } from '../types'
import TodoItem from '../components/TodoItem'


type Props = {
todos: Todo[]
onToggle: (id: string) => void
onDelete: (id: string) => void
onEdit: (id: string, text: string) => void
}


const TodoList: React.FC<Props> = ({ todos, onToggle, onDelete, onEdit }) => {
return (
<ul className="todo-list">
{todos.map(todo => (
<TodoItem
key={todo.id}
todo={todo}
onToggle={() => onToggle(todo.id)}
onDelete={() => onDelete(todo.id)}
onEdit={(text) => onEdit(todo.id, text)}
/>
))}
</ul>
)
}


export default TodoList
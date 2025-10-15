import { Todo } from '../types'


const KEY = 'todo_app_v1'


export const loadTodos = (): Todo[] => {
try {
const raw = localStorage.getItem(KEY)
if (!raw) return []
return JSON.parse(raw) as Todo[]
} catch (e) {
console.error('Failed to load todos from localStorage', e)
return []
}
}


export const saveTodos = (todos: Todo[]) => {
try {
localStorage.setItem(KEY, JSON.stringify(todos))
} catch (e) {
console.error('Failed to save todos to localStorage', e)
}
}
export const initialTodoLists = {
  '0000000001': {
    id: '0000000001',
    title: 'First List',
    todos: [{ id: crypto.randomUUID(), text: 'First todo of first list!', completed: false }],
  },
  '0000000002': {
    id: '0000000002',
    title: 'Second List',
    todos: [{ id: crypto.randomUUID(), text: 'First todo of second list!', completed: false }],
  },
}

export const createStore = (initialTodoLists = {}) => {
  const todoLists = structuredClone(initialTodoLists)

  const getTodoLists = () => structuredClone(todoLists)

  const updateTodos = (id, todos) => {
    if (!todoLists[id]) return false
    todoLists[id] = { ...todoLists[id], todos }
    return true
  }

  return { getTodoLists, updateTodos }
}
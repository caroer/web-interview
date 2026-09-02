import express from 'express'
import cors from 'cors'
import { createStore, initialTodoLists } from './store.js'
const store = createStore(initialTodoLists)

const isValidTodo = (todo) =>
  todo !== null &&
  typeof todo === 'object' &&
  typeof todo.id === 'string' &&
  typeof todo.text === 'string' &&
  typeof todo.completed === 'boolean'

const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3001

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/todolists', (req, res) => res.json(store.getTodoLists()))

app.put('/todolists/:id', (req, res) => {
  const { id } = req.params
  const { todos } = req.body

  if (!Array.isArray(todos) || !todos.every(isValidTodo)) {
    return res.sendStatus(400)
  }

  const ok = store.updateTodos(id, todos)
  res.sendStatus(ok ? 204 : 404)
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
import { isListCompleted } from './TodoLists'

test('list is completed when all todos are completed', () => {
  const list = { todos: [{ completed: true }, { completed: true }] }
  expect(isListCompleted(list)).toBe(true)
})

test('list is not completed when a todo is incomplete', () => {
  const list = { todos: [{ completed: true }, { completed: false }] }
  expect(isListCompleted(list)).toBe(false)
})

test('empty list is not completed', () => {
  const list = { todos: [] }
  expect(isListCompleted(list)).toBe(false)
})
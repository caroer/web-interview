import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createStore } from './store.js'

const testData = {
  'list-1': {
    id: 'list-1',
    title: 'Test',
    todos: [{ id: 't1', text: 'A', completed: false }],
  },
}

test('getTodoLists returns the data', () => {
  const store = createStore(testData)
  assert.deepEqual(store.getTodoLists(), testData)
})

test('getTodoLists returns a copy, not a referense to the store', () => {
  const store = createStore(testData)
  const lists = store.getTodoLists()
  lists['list-1'].title = 'Changed'

  assert.equal(store.getTodoLists()['list-1'].title, 'Test')
})

test('updateTodos returns true and saves for a known id', () => {
  const store = createStore(testData)
  const newTodos = [{ id: '123', text: 'Hello', completed: false }]
  const result = store.updateTodos('list-1', newTodos)

  assert.equal(result, true)
  assert.deepEqual(store.getTodoLists()['list-1'].todos, newTodos)
})

test('updateTodos returns false for an unknown id', () => {
  const store = createStore(testData)
  const result = store.updateTodos('not-existing', [])

  assert.equal(result, false)
})
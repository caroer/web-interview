import React, { useCallback, useState, useEffect, useRef } from 'react'
import { TextField, Card, CardContent, CardActions, Checkbox, Button, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

const AUTOSAVE_DELAY_MS = 600

export const TodoListForm = ({ todoList, saveTodoList }) => {
  const [todos, setTodos] = useState(todoList.todos)
  const [status, setStatus] = useState('idle')

  const isFirstRender = useRef(true)

  const save = useCallback(async () => {
    setStatus('saving')
  
    try {
      await saveTodoList(todoList.id, todos)
      setStatus('saved')
    } catch {
      setStatus('error')
    }
  }, [saveTodoList, todoList.id, todos])
  
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
  
    const timeout = setTimeout(save, AUTOSAVE_DELAY_MS)
  
    return () => clearTimeout(timeout)
  }, [save])

  const updateTodo = (id, changes) => {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, ...changes } : todo)))
  }

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{todoList.title}</Typography>
        <form
          style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
        >
          {todos.map((todo, index) => (
            <div key={todo.id} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ margin: '8px' }} variant='h6'>
                {index + 1}
              </Typography>
              <Checkbox checked={todo.completed} onChange={() => updateTodo(todo.id, { completed: !todo.completed })} />
              <TextField
                sx={{ flexGrow: 1, marginTop: '1rem', ...(todo.completed && { textDecoration: 'line-through' }) }}
                label='What to do?'
                value={todo.text}
                onChange={(event) => updateTodo(todo.id, { text: event.target.value })}
                onBlur={save}
              />
              <Button
                sx={{ margin: '8px' }}
                type='button'
                size='small'
                color='secondary'
                onClick={() => {
                  setTodos((prev) => prev.filter(item => item.id !== todo.id))
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={() => {
                setTodos((prev) => [...prev, { id: crypto.randomUUID(), text: '', completed: false }])
              }}
            >
              Add Todo <AddIcon />
            </Button>
            {status === 'saving' && <Typography variant='caption'>Saving…</Typography>}
            {status === 'saved' && <Typography variant='caption'>Saved</Typography>}
            {status === 'error' && <Typography variant='caption' color='error'>Unable to save</Typography>}
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}

import React, { Fragment, useCallback, useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  CircularProgress,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { TodoListForm } from './TodoListForm'
import { getTodoLists, updateTodoList } from '../api'

export const isListCompleted = (list) =>
  list.todos.length > 0 && list.todos.every((todo) => todo.completed)

export const TodoLists = ({ style }) => {
  const [todoLists, setTodoLists] = useState({})
  const [activeList, setActiveList] = useState()
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    getTodoLists()
      .then((lists) => {
        setTodoLists(lists)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  const saveTodoList = useCallback(async (id, todos) => {
    await updateTodoList(id, todos)
    setTodoLists((prev) => ({ ...prev, [id]: { ...prev[id], todos } }))
  }, [])

  if (status === 'loading') return <CircularProgress />
  if (status === 'error') return <Typography color='error'>Couldn't load your lists</Typography>
  
  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component='h2'>My Todo Lists</Typography>
          <List>
            {Object.keys(todoLists).map((key) => (
              <ListItemButton key={key} onClick={() => setActiveList(key)}>
                <ListItemIcon>
                  {isListCompleted(todoLists[key]) ? <CheckCircleIcon color='success' /> : <ReceiptIcon />}
                </ListItemIcon>
                <ListItemText primary={todoLists[key].title} />
              </ListItemButton>
            ))}
          </List>
        </CardContent>
      </Card>
      {todoLists[activeList] && (
        <TodoListForm
          key={activeList} // use key to make React recreate component to reset internal state
          todoList={todoLists[activeList]}
          saveTodoList={saveTodoList}
        />
      )}
    </Fragment>
  )
}

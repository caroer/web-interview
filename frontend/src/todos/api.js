const BASE_URL = 'http://localhost:3001'

const request = async (path, options) => {
  const response = await fetch(`${BASE_URL}${path}`, options)
  if (!response.ok) throw new Error(`Response status: ${response.status}`)
  return response
}

export const getTodoLists = async () => {
  const response = await request('/todolists')

  return await response.json()
}

export const updateTodoList = async (id, todos) => {
  await request(`/todolists/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({todos})
  })
}
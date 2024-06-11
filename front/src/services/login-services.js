import { request } from '../utilties/request'
const path = 'http://localhost:8080/tickets/back/api/controllers/login.php?'
// const path =
//   'https://ticket-production-264a.up.railway.app/api/controllers/login.php?'

export const httpLogin = async (body) => {
  const result = await request(`${path}login=true`, {
    method: 'POST',
    body,
  })
  return JSON.parse(result)
}

export const httpGetUserData = async (body) => {
  const result = await request(`${path}get-data-user=true`, {
    method: 'POST',
    body,
  })
  return JSON.parse(result)
}

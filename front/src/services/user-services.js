import { request } from '../utilties/request'
const path = 'http://localhost:8080/tickets/back/api/controllers/user.php?'

// const path =
//   'https://ticket-production-264a.up.railway.app/api/controllers/user.php?'

export const httpGetAllUser = async (activeonly = false) => {
  const result = await request(
    `${path}get-all-users=true&activeonly=${activeonly}`,
  )
  return JSON.parse(result)
}

export const httpAddOrUpdateUser = async (body) => {
  const result = await request(`${path}add-or-update-user=true`, {
    method: 'POST',
    body,
  })
  return JSON.parse(result)
}

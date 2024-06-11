import { request } from '../utilties/request'
const path = 'http://localhost:8080/tickets/back/api/controllers/rol.php?'

export const httpGetAllRol = async (activeonly = false) => {
  const result = await request(
    `${path}get-all-rol=true&activeonly=${activeonly}`,
  )
  return JSON.parse(result)
}



export const httpAddOrUpdateRol = async (body) => {
  const result = await request(`${path}add-or-update-rol=true`, {
    method: 'POST',
    body,
  })
  return JSON.parse(result)
}
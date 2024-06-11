import { request } from '../utilties/request'
const path = 'http://localhost:8080/tickets/back/api/controllers/area.php?'

export const httpGetAllAreas = async (activeonly = false) => {
  const result = await request(
    `${path}get-all-area=true&activeonly=${activeonly}`,
  )
  return JSON.parse(result)
}

export const httpAddOrUpdateArea = async (body) => {
  const result = await request(`${path}add-or-update-area=true`, {
    method: 'POST',
    body,
  })
  return JSON.parse(result)
}

import { request } from '../utilties/request'
const path = 'http://localhost:8080/tickets/back/api/controllers/menu.php?'

export const httpGetAllMenu = async (activeonly = false) => {
  const result = await request(
    `${path}get-all-menu=true&activeonly=${activeonly}`,
  )
  return JSON.parse(result)
}

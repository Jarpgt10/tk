import { request } from '../utilties/request'
const path = 'http://localhost:8080/tickets/back/api/controllers/ticket.php?'

// const path =
//   'https://ticket-production-264a.up.railway.app/api/controllers/ticket.php?'

export const httpAddOrUpdateTicket = async (body) => {
  const result = await request(`${path}add-or-update-ticket=true`, {
    method: 'POST',
    body,
  })
  return JSON.parse(result)
}

export const httpGetAllTicket = async (id_usuario = 0, activeonly = 0) => {
  const result = await request(
    `${path}get-all-ticket=true&id_usuario=${id_usuario}&activeonly=${activeonly}`,
  )
  return JSON.parse(result)
}

export const httpAddTicketComment = async (body) => {
  const result = await request(`${path}add-ticket-comment=true`, {
    method: 'POST',
    body,
  })
  return JSON.parse(result)
}

export const httpFinalizedTicket = async (body) => {
  const result = await request(`${path}finalize-ticket=true`, {
    method: 'POST',
    body,
  })
  return JSON.parse(result)
}

export const httpAsignamentTicket = async (body) => {
  const result = await request(`${path}asignamet-ticket=true`, {
    method: 'POST',
    body,
  })
  return JSON.parse(result)
}

export const httpGetTicketsTopUser = async (top) => {
  const result = await request(
    `${path}get-total-ticket-top-user=true&top=${top}`,
  )
  return JSON.parse(result)
}
export const httpGetTicketToday = async () => {
  const result = await request(`${path}get-ticket-today=true`)
  return JSON.parse(result)
}

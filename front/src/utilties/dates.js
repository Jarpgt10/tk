import dayjs from 'dayjs'

export const fechasTs = (fecha) => {
  return fecha.split('T')[0]
}

export function onlyDate(fechaHora) {
  const partes = fechaHora.split(' ')
  const fecha = partes[0]
  return fecha
}

export function DayDifference(fechaInicio, fechaFin) {
  const inicio = dayjs(fechaInicio)
  const fin = dayjs(fechaFin)
  const diferencia = fin.diff(inicio, 'day')
  return diferencia
}

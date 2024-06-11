export const obtenerIdMasAlto = (arr, propieteryName) => {
  const idMasAlto = arr.reduce((maxId, cliente) => {
    const idCliente = parseInt(cliente[propieteryName], 10)
    return idCliente > maxId ? idCliente : maxId
  }, 0)

  return idMasAlto
}

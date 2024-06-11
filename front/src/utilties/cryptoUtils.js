import CryptoJS from 'crypto-js'

const secretKey = 'G30d3oN'

const normalizeString = (str) => {
  return str.trim() // Eliminar espacios al principio y al final
}

const encryptPassword = (password) => {
  const normalizedPassword = normalizeString(password)
  return CryptoJS.SHA256(normalizedPassword).toString()
}

const decryptPassword = (encryptedPassword) => {
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey)
  return bytes.toString(CryptoJS.enc.Utf8)
}

export { encryptPassword, decryptPassword }

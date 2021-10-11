
function isEmail (email) {
  const regex = /^\w+@[0-9a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
  return regex.test(email)
}
function isMobile (mobile) {
  const regex = /^1[3456789]\d{9}$/
  return regex.test(mobile)
}
function isValidPassword (password) {
  const regex = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).{8,16}/
  return regex.test(password)
}

export {
  isEmail,
  isMobile,
  isValidPassword
}

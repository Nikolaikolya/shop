const spreadUser = (user) => {
  const { role_id, password_hash, reset_password_expire, reset_password_token, ...userSend } = user
  return userSend
}

module.exports = { spreadUser }
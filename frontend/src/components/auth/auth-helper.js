const auth = {
  isAuthenticated() {
    return true;
  },
  authenticate(jwt, callback) {
    callback()
  },
  clearJWT(callback) {
    callback()
  },
  updateUser(user, callback) {
  }
}

export default auth

export const state = () => ({})
export const mutations = {}
export const actions = {
  login(ctx,userData) {
    const user = {
      email: 'admin@gmail.com',
      password: '123456789',
    }
    if (user.email === userData.email && user.password === userData.password) {
      return true
    } else {
     return false
    }
  }
}
export const getters = {}

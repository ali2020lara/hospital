export const state = () => ({
  users: []
})
export const mutations =  {
  getUsers(state, data) {
    state.users = data
  }
}
export const actions =  {
  getUsers(ctx) {
    return this.$axios.get('https://hospital-99f23-default-rtdb.firebaseio.com/users.json')
      .then(res=>{
        console.log('get',res)
        const usersData = Object.entries(res.data)
        ctx.commit('getUsers',usersData)
        return Promise.resolve(res)
      }).catch(err=>{
        return Promise.reject(err)
      })
  },
  addUser(ctx, data) {
    return this.$axios.post('https://hospital-99f23-default-rtdb.firebaseio.com/users.json',data)
      .then(res=>{
        return Promise.resolve(res)
      }).catch(err=>{
        return Promise.reject(err)
      })
  },
  deleteUser(ctx, userId) {
    return this.$axios.delete(`https://hospital-99f23-default-rtdb.firebaseio.com/users/${userId}.json`)
      .then(res=>{
        return Promise.resolve(res)
      }).catch(err=>{
        return Promise.reject(err)
      })
  },
    likePost(ctx, userId) {
    return false
  },
}
export const getters =  {
  getUsers(state) {
    return state.users
  }
}

export const state = () => ({
  users: [],
  loading: false
})

export const mutations = {
  setUsers (state, users) {
    state.users = users
  },
  updateList (state, res) {
    state.users.push(res)
  },

  deleteUsers (state, res) {
    const index = state.users.findIndex(u => u.id === res[0].id)
    state.users.splice(index, 1)
  },

  updateUsers (state, res) {
    const index = state.users.findIndex(u => u.id === res.id)
    Object.assign(state.users[index], res)
  },
  changePassword (state, res) {
    state.users = res
  }
}

export const getters = {
  getUsers: state => state.users,
  getLoading: state => state.loading
}

export const actions = {
  async createUser ({ commit }, payload) {
    const res = await this.$axios.$post('/api/user', payload)
    commit('updateList', res)
  },

  async fetchUsers ({ commit }, payload) {
    const res = await this.$axios.$get('api/user', payload)
    commit('setUsers', res)
  },

  async fetchDel ({ commit }, payload) {
    const res = await this.$axios.$post('api/user/delete', { data: { payload } })
    commit('deleteUsers', res)
  },

  async fetchEdit ({ commit }, payload) {
    const res = await this.$axios.$put(`api/user/${payload.id}`, payload)
    commit('updateUsers', res)
  },

  async  changePassword ({ commit }, payload) {
    const res = await this.$axios.$post(`api/user/change/${payload.id}`, payload)
    commit('changePassword', res)
  }
}

export const state = () => ({
  roles: [],
  loading: false
})

export const mutations = {
  setRoles (state, roles) {
    state.roles = roles
  },
  deleteRoles (state, data) {
    const index = state.roles.findIndex(u => u.id === data[0].id)
    state.roles.splice(index, 1)
  },
  updateList (state, res) {
    state.roles.push(res.data)
  },
  updateRoles (state, res) {
    const index = state.roles.findIndex(u => u.id === res.id)
    Object.assign(state.roles[index], res)
  }
}

export const getters = {
  getRoles: state => state.roles,
  getLoading: state => state.loading
}

export const actions = {
  async inputRole ({ commit }, payload) {
    const res = await this.$axios.$post('/api/role', payload)
    commit('updateList', res)
  },
  async fetchRoles ({ commit }) {
    const res = await this.$axios.$get('/api/role')
    commit('setRoles', res)
  },
  async fetchDel ({ commit }, payload) {
    const res = await this.$axios.$post('/api/role/delete', { data: { payload } })
    commit('deleteRoles', res)
  },
  async fetchEdit ({ commit }, payload) {
    const res = await this.$axios.$put(`api/role/${payload.id}`, payload)
    commit('updateRoles', res)
  }
}

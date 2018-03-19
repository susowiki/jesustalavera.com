export const state = () => ({
  list: []
})

export const mutations = {
  setList (state, resources) {
    state.list.push(...resources)
  }
}

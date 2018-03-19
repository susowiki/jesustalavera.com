export const state = () => ({
  list: []
})

export const mutations = {
  setList (state, projects) {
    state.list.push(...projects)
  }
}

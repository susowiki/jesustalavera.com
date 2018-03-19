export const state = () => ({
  list: []
})

export const mutations = {
  setList (state, talks) {
    state.list.push(...talks)
  }
}

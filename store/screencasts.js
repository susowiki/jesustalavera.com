export const state = () => ({
  list: []
})

export const mutations = {
  setList (state, screencasts) {
    state.list.push(...screencasts)
  }
}

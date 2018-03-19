export const state = () => ({
  futureList: [],
  pastList: []
})

export const mutations = {
  setFutureList (state, events) {
    state.futureList.push(...events)
  },

  setPastList (state, events) {
    state.pastList.push(...events)
  }
}

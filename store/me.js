export const state = () => ({
  entry: {}
})

export const mutations = {
  setMe (state, me) {
    state.entry = me
  }
}

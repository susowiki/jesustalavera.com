export const state = () => ({
  list: [],
  active: null
})

export const mutations = {
  setActiveWithSlug (state, slug) {
    const item = state.list.find(entry => entry.fields.slug === slug)
    state.active = item
  },
  setList (state, posts) {
    state.list.push(...posts)
  }
}

import ReadingTime from '~/plugins/reading-time.js'

export const state = () => ({
  list: [],
  active: null
})

export const mutations = {
  setActive (state, post) {
    state.active = post
  },
  setActiveWithSlug (state, slug) {
    const item = state.list.find(entry => entry.fields.slug === slug)
    state.active = item
  },
  setList (state, posts) {
    state.list.push(...posts.map((entry) => {
      entry.fields.readingTime = ReadingTime(entry)
      return entry
    }))
  }
}

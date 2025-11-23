import ReadingTime from '~/plugins/reading-time.js'

export const state = () => ({
  list: [],
  activeTag: null,
  activePageNumber: null,
  active: null
})

export const mutations = {
  setActivePageNumber (state, page) {
    state.activePageNumber = page
  },
  setActiveTag (state, tag) {
    state.activeTag = tag
  },
  setActiveWithSlug (state, slug) {
    const item = state.list.find(entry => entry.fields.slug === slug)
    state.active = item
  },
  setList (state, posts) {
    state.list.length = 0
    state.list.push(
      ...posts.map((entry) => {
        entry.fields.readingTime = ReadingTime(entry)
        entry.fields.isDraft = entry.sys.revision === 0
        return entry
      })
    )
  }
}

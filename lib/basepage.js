import getTransition from '~/plugins/transition.js'

const basePage = {
  transition (to, from) {
    return getTransition(from, to)
  }
}

export function createPage (page) {
  return Object.assign({}, basePage, page)
}

export function getHeadForPost (post) {
  return {
    title: post.fields.title,
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: post.fields.description
      },
      { property: 'og:title', content: post.fields.title },
      { property: 'og:description', content: post.fields.description }
    ]
  }
}

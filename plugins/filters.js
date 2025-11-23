import Vue from 'vue'
Vue.filter('externalUrl', (value) => {
  try {
    return new URL(value).host
  } catch (e) {
    return ''
  }
})

Vue.filter('idAlize', (title, options = {}) => {
  return (
    (options.prependHash ? '#' : '') + title.replace(/[\s]/g, '-').toLowerCase()
  )
})

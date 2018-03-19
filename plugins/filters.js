import Vue from 'vue'
import url from 'url'

Vue.filter('externalUrl', value => {
  return url.parse(value).host
})

Vue.filter('idAlize', (title, options = {}) => {
  return (
    (options.prependHash ? '#' : '') + title.replace(/[\s]/g, '-').toLowerCase()
  )
})

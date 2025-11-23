<script>
export default {
  props: ['entry', 'text'],
  computed: {
    url () {
      const URL_PREFIX_MAP = {
        tilPost: 'today-i-learned',
        '2wKn6yEnZewu2SCCkus4as': 'blog'
      }

      return this.entry.fields.externalUrl
        ? this.entry.fields.externalUrl
        : `/${URL_PREFIX_MAP[this.entry.sys.contentType.sys.id]}/${this.entry.fields.slug}/`
    }
  },

  render (h) {
    const externalUrl = this.entry.fields.externalUrl

    return h(
      externalUrl ? 'a' : 'nuxt-link',
      externalUrl ? { attrs: { href: this.url } } : { props: { to: this.url } },
      [
        this.text || this.entry.fields.title
      ]
    )
  }
}
</script>

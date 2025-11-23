<template>
  <Container class="t-container">
    <h1 slot="headline" tabindex="-1">
      Developer Smalltalk
    </h1>
    <ul class="o-list-grid">
      <li v-for="screencast in screenCasts" :key="screencast.sys.id">
        <Screen-cast :screencast="screencast" />
      </li>
    </ul>
  </Container>
</template>

<script>
import Container from '~/components/Container.vue'
import LazyImage from '~/components/LazyImage.vue'
import PrettyDate from '~/components/PrettyDate.vue'
import ScreenCast from '~/components/ScreenCast.vue'
import { createPage } from '~/lib/basepage.js'

export default createPage({
  async fetch ({ app, store, env }) {
    const { getScreencasts } = app.contentful

    await Promise.all([
      getScreencasts()
    ])
  },
  computed: {
    screenCasts () {
      return this.$store.state.screencasts.list
    }
  },
  head () {
    return {
      title: 'Projects | Jesus Talavera Web Development',
      meta: [
        { hid: 'description', name: 'description', content: 'Listing of my current side projects.' }
      ]
    }
  },
  components: {
    Container,
    LazyImage,
    PrettyDate,
    ScreenCast
  }
})
</script>

<style lang="scss">
  .c-project {
    img {
      display: block;
      max-height: 6em;
      margin: 0 auto 1em;
    }
  }
</style>

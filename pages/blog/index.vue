<template>
  <Container class="t-container" accessible-line-length="true">
    <h1 slot="headline" tabindex="-1">
      Blog
    </h1>
    <ul class="o-list-reset">
      <li v-for="post in posts" :key="post.fields.slug" class="u-marginBottomLarge">
        <ItemPreview :item="post" :show-excerpt="true" :show-date="true" :level="2" />
      </li>
    </ul>
    <PaginationActions :next-page="nextPage" />
  </Container>
</template>

<script>
import Container from '~/components/Container.vue'
import ItemPreview from '~/components/ItemPreview.vue'
import PaginationActions from '~/components/PaginationActions.vue'
import { createPage } from '~/lib/basepage.js'

export default createPage({
  async fetch ({ app }) {
    await app.contentful.getPosts()
  },
  computed: {
    nextPage () {
      return '/blog/page/2'
    },
    posts () {
      return this.$store.state.posts.list.slice(0, 5)
    }
  },
  head () {
    return {
      title: 'Blog | Jesus Talavera Web Development',
      meta: [
        { hid: 'description', name: 'description', content: 'Writings on web development including mainly JavaScript, web performance and accessibility.' }
      ]
    }
  },
  components: {
    Container,
    ItemPreview,
    PaginationActions
  }
})
</script>

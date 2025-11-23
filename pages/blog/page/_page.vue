<template>
  <Container class="t-container" accessible-line-length="true">
    <h1 slot="headline" tabindex="-1">
      Blog - Page {{ page }}
    </h1>

    <ul class="o-list-reset">
      <li v-for="post in posts" :key="post.sys.id" class="u-marginBottomLarge">
        <ItemPreview :item="post" :show-excerpt="true" :show-date="true" :level="2" />
      </li>
    </ul>
    <PaginationActions :prev-page="prevPage" :next-page="nextPage" />
  </Container>
</template>

<script>
import Container from '~/components/Container.vue'
import ItemPreview from '~/components/ItemPreview.vue'
import PaginationActions from '~/components/PaginationActions.vue'
import { createPage } from '~/lib/basepage.js'

const NR_OF_POSTS = 5

export default createPage({
  async fetch ({ app, params, store }) {
    await app.contentful.getPosts()
    store.commit('posts/setActivePageNumber', +params.page)
  },
  computed: {
    page () {
      return this.$store.state.posts.activePageNumber
    },
    nextPage () {
      return this.$store.state.posts.list.length > this.$store.state.posts.activePageNumber * NR_OF_POSTS
        ? `/blog/page/${this.$store.state.posts.activePageNumber + 1}`
        : null
    },
    prevPage () {
      return this.$store.state.posts.activePageNumber > 2
        ? `/blog/page/${this.$store.state.posts.activePageNumber - 1}`
        : '/blog/'
    },
    posts () {
      if ((this.$store.state.posts.activePageNumber - 1) * NR_OF_POSTS > this.$store.state.posts.list.length) {
        return this.$router.replace({ path: '/404' })
      }

      return this.$store.state.posts.list.slice(
        (this.$store.state.posts.activePageNumber - 1) * NR_OF_POSTS,
        (this.$store.state.posts.activePageNumber) * NR_OF_POSTS
      )
    }
  },
  head () {
    return {
      title: `Blog - Page ${this.page} | Jesus Talavera Web Development`,
      meta: [
        { hid: 'description', name: 'description', content: `Writings on web development including mainly JavaScript, web performance and accessibility - Page ${this.page}` }
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

<style></style>

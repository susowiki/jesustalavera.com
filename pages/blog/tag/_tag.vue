<template>
  <Container class="t-container" accessible-line-length="true">
    <h1 slot="headline" tabindex="-1">Blog - #{{ tag }}</h1>

    <ul class="o-list-reset">
      <li v-for="post in posts" class="u-marginBottomLarge">
        <ItemPreview :item="post" :show-excerpt="true" :show-date="true" :level="2"></ItemPreview>
      </li>
    </ul>
  </Container>
</template>

<script>
  import Container from '~/components/Container.vue'
  import ItemPreview from '~/components/ItemPreview.vue'
  import {createPage} from '~/lib/basepage.js'

  export default createPage({
    async fetch ({ app, params, store }) {
      await app.contentful.getPosts()
      store.commit('posts/setActiveTag', params.tag)
    },
    computed: {
      posts () {
        return this.$store.state.posts.list.filter(post => {
          if (post.fields.tags) {
            return post.fields.tags.some(
              tag => tag === this.$store.state.posts.activeTag
            )
          }

          return false
        })
      },
      tag () {
        return this.$store.state.posts.activeTag
      }
    },
    head () {
      return {
        title: `Blog - #${this.tag} | Jesus Talavera Web Development`,
        meta: [
          { hid: 'description', name: 'description', content: `Writings on web development including mainly JavaScript, web performance and accessibility - #${this.page}` }
        ]
      }
    },
    components: {
      Container,
      ItemPreview
    }
  })
</script>

<style></style>

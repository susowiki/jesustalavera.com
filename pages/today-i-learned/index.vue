<template>
  <Container class="t-container" :full-width="true">
    <h1 slot="headline" tabindex="-1">
      TIL - Today I learned
    </h1>
    <ul class="o-list-grid">
      <li v-for="tag in Object.keys(tags).sort()" :key="tag" :class="`area-${tag}`">
        <div :id="tag | idAlize" class="c-tile">
          <div class="c-tile__container">
            <h2 class="o-headline-2">
              <a class="o-anchorHeadline" :href="tag | idAlize({prependHash: true})">{{ tag }}</a>
            </h2>
            <ul class="o-list-reset">
              <li v-for="post in tags[tag]" :key="post.sys.id" class="u-marginBottomSmall">
                <entry-link :entry="post" />
              </li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
  </Container>
</template>

<script>
import Container from '~/components/Container.vue'
import EntryLink from '~/components/EntryLink.vue'
import ItemPreview from '~/components/ItemPreview.vue'
import PaginationActions from '~/components/PaginationActions.vue'
import { createPage } from '~/lib/basepage.js'

export default createPage({
  async fetch ({ app }) {
    await app.contentful.getTil()
  },
  computed: {
    tags () {
      return this.$store.state.til.list.reduce((acc, post) => {
        if (post.fields.tags) {
          post.fields.tags.forEach((tag) => {
            if (!acc[tag]) {
              acc[tag] = []
            }
            acc[tag].push(post)

            return acc
          })
        }

        return acc
      }, {})
    }
  },
  head () {
    return {
      title: 'Today I learned | Jesus Talavera Web Development',
      meta: [
        { hid: 'description', name: 'description', content: 'My daily Web Development learnings' }
      ]
    }
  },
  components: {
    Container,
    ItemPreview,
    PaginationActions,
    EntryLink
  }
})
</script>

<style lang="scss">
  .area-javascript {
    @media (min-width: 70em) {
      grid-row: 2 / 6;
      grid-column: 3;
    }
  }
</style>

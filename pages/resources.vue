<template>
  <Container class="t-container">
    <h1 slot="headline" tabindex="-1">Resources</h1>
    <ul class="o-list-grid">
      <li v-for="resource in resources" :key="resource.sys.id">
        <div class="c-tile">
          <div class="c-tile__container">
            <h2 class="o-headline-2">{{ resource.fields.title }}</h2>
            <p class="u-marginTopAuto">{{ resource.fields.description }}</p>
            <div class="c-tile__footer">
              <!-- TODO these calls currently make an http request -->
              <nuxt-link :to="`/${resource.fields.slug}/`" :aria-labelledby="resource.fields.title | idAlize">Read more</nuxt-link>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </Container>
</template>

<script>
  import Container from '~/components/Container.vue'
  import {createPage} from '~/lib/basepage.js'

  export default createPage({
    async fetch ({ app, store, env }) {
      const { getResources } = app.contentful

      await Promise.all([
        getResources()
      ])
    },
    computed: {
      resources () {
        return this.$store.state.resources.list
      }
    },
    head () {
      return {
        title: 'Resources | Jesus Talavera Web Development',
        meta: [
          { hid: 'description', name: 'description', content: `A collection of resources I keep collecting.` }
        ]
      }
    },
    components: {
      Container
    }
  })
</script>

<style scoped>
</style>

<template>
  <Container :class="['t-container', page.fields.slug]" accessible-line-length="true">
    <DynamicHeadline slot="headline" :level="1" :id="page.fields.title | idAlize" class="p-name">{{ page.fields.title }}</DynamicHeadline>
    <div class="c-tile">
      <div class="c-tile__container">
        <p v-if="page.fields.isResource">
          <strong>Last updated at: <PrettyDate v-if="page.fields.isResource" slot="date" :date="page.sys.updatedAt"></PrettyDate></strong>
        </p>
        <Marked :markdown="page.fields.body" class="e-content"></Marked>
      </div>
    </div>
  </Container>
</template>

<script>
  import Container from '~/components/Container.vue'
  import DynamicHeadline from '~/components/DynamicHeadline.vue'
  import SharingLine from '~/components/SharingLine.vue'
  import PrettyDate from '~/components/PrettyDate.vue'
  import {createPage, getHeadForPost} from '~/lib/basepage.js'
  import Marked from '~/components/Marked.vue'

  export default createPage({
    async fetch ({ app, store, params, redirect }) {
      await app.contentful.getLandingpages()
      store.commit('landingpages/setActiveWithSlug', params.slug)

      if (!store.state.landingpages.active) {
        return redirect('/404/')
      }
    },
    computed: {
      page () {
        return this.$store.state.landingpages.active
      }
    },
    head () {
      return getHeadForPost(this.page)
    },
    components: {
      Container,
      DynamicHeadline,
      Marked,
      PrettyDate,
      SharingLine
    }
  })
</script>

<style lang="scss">
.useful-talk-quotes {
  blockquote {
    font-weight: bold;

    + p {
      margin: -.5em 0 2em;
    }
  }
}
</style>

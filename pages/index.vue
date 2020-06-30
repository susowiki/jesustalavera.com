<template>
  <div class="t-container">
    <Container>
      <h1 slot="headline" class="o-headline-1" tabindex="-1">Hey, I'm Jesús Talavera. Software developer.</h1>
      <Person :person="me"></Person>
    </Container>
  </div>
</template>

<script>
  import Container from '~/components/Container.vue'
  import Person from '~/components/Person.vue'
  import PrettyDate from '~/components/PrettyDate.vue'
  import ScreenCast from '~/components/ScreenCast.vue'
  import ItemPreview from '~/components/ItemPreview.vue'
  import Icon from '~/components/Icon.vue'
  import Talk from '~/components/Talk.vue'
  import {createPage} from '~/lib/basepage.js'

  export default createPage({
    async fetch ({ app, redirect }) {
      const { getMe, getPosts, getScreencasts, getTalks } = app.contentful

      await Promise.all([
        getMe(),
        getPosts(),
        getTalks(),
        getScreencasts()
      ])
    },
    computed: {
      me () {
        return this.$store.state.me.entry
      },
      posts () {
        return this.$store.state.posts.list.slice(0, 3)
      },
      talks () {
        return this.$store.state.talks.list.slice(0, 3)
      },
      screencasts () {
        return this.$store.state.screencasts.list.slice(0, 3)
      }
    },
    head () {
      return {
        title: `Jesús Talavera`,
        meta: [
          { hid: 'description', name: 'description', content: 'My personal website dealing with daily web development things.' },
          { property: 'og:description', content: 'My personal website dealing with daily web development things.' }
        ]
      }
    },
    components: {
      ItemPreview,
      Container,
      Icon,
      Person,
      PrettyDate,
      Talk,
      ScreenCast
    }
  })
</script>

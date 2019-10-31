<template>
  <Container>
    <h1 v-if="error.statusCode === 404" slot="headline">Page not found</h1>
    <h1 v-else slot="headline">An error occurred</h1>
  </Container>
</template>

<script>
import Container from '~/components/Container.vue'

export default {
  props: ['error'],
  head () {
    return {
      title: `Error | Jesus Talavera Web Development`,
      meta: [
        { hid: 'description', name: 'description', content: `Something went wrong here. ;) You shouldn't see it...` }
      ]
    }
  },
  components: {
    Container
  }
}
</script>

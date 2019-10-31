<template>
  <div class="c-sharingLine">
    <p>If you like this post <a :href="sharingUrl" target="_blank" rel="noopener noreferrer">share it</a> or subscribe to <nuxt-link :to="`/newsletter/?back=${$route.path}`">my monthly newsletter</nuxt-link>.</p>
  </div>
</template>

<script>
  import Container from '~/components/Container.vue'
  export default {
    props: ['item'],
    computed: {
      sharingUrl () {
        return encodeURI(`https://twitter.com/intent/tweet?text=${this.item.fields.title}&url=https://www.jesustalavera.com/blog/${this.item.fields.slug}&via=jesustalavera`)
      }
    },
    components: {
      Container
    }
  }
</script>

<style lang="scss">
  .c-sharingLine {
    background: var(--c-highlight);
    color: #fff;
    padding: 1em;
    margin: 0 -1em -1em;

    a:hover {
      color: currentColor;
    }

    p {
      margin: 0;
    }
  }
</style>

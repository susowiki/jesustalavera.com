<template>
  <div class="c-tile c-tile--noHighlight">
    <div class="c-tile__container">
      <!-- this is container is needed because of a FF bug -->
      <div class="c-tile__image">
        <lazy-image :asset="talk.fields.thumbnail" :ratio="0.5625" />
        <div class="c-tile__imageActions">
          <a v-if="talk.fields.slideUrl" :href="talk.fields.slideUrl" class="o-btn o-btn--floating u-marginHorizontalSmall">Slides</a>
          <a v-if="talk.fields.videoUrl" :href="talk.fields.videoUrl" class="o-btn o-btn--floating u-marginHorizontalSmall">Recording</a>
        </div>
      </div>
      <h3 class="o-headline-3">
        {{ talk.fields.title }}
      </h3>
    </div>
  </div>
</template>

<script>
import LazyImage from '~/components/LazyImage.vue'

export default {
  components: {
    LazyImage
  },
  props: {
    talk: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showOverlay: false
    }
  },
  methods: {
    toggleOverlay () {
      this.showOverlay = !this.showOverlay
    }
  }
}
</script>

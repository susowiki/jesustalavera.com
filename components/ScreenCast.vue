<template>
  <div class="c-tile c-tile--noHighlight">
    <div class="c-tile__container">
      <!-- this is container is needed because of a FF bug -->
      <div class="c-tile__image">
        <lazy-image :asset="screencast.fields.coverImage" :ratio="0.5625" />
        <div class="c-tile__imageActions">
          <a class="o-btn o-btn--floating" :href="screencast.fields.url" :aria-labelledby="screencast.fields.title | idAlize" rel="noopener">Watch on YouTube</a>
        </div>
      </div>
      <pretty-date :date="screencast.fields.publishDate"></pretty-date>
      <h3 class="u-noMarginTop o-headline-3" :id="screencast.fields.title | idAlize">{{ screencast.fields.title }}</h3>
    </div>
  </div>
</template>

<script>
  import Icon from '~/components/Icon.vue'
  import LazyImage from '~/components/LazyImage.vue'
  import PrettyDate from '~/components/PrettyDate.vue'

  export default {
    props: ['screencast'],
    components: {
      Icon,
      LazyImage,
      PrettyDate
    }
  }
</script>

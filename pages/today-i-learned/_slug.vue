<template>
  <Container class="t-container" accessible-line-length="true">
    <PrettyDate slot="date" :date="post.fields.date"></PrettyDate>
    <h1 slot="headline" tabindex="-1">{{ post.fields.title }}</h1>
    <span slot="readingTime">{{ post.fields.readingTime }} min read</span>
    <div class="c-tile">
      <div class="c-tile__container">
        <Marked :markdown="post.fields.body"></Marked>
        <div v-if="(post.fields.video || post.fields.videoWebm)">
          <video autoplay muted loop playsinline preload="metadata" :class="{ 'is-mobile-video': post.fields.isMobileVideo }">
            <source v-if="post.fields.videoWebm" :src="post.fields.videoWebm.fields.file.url" type="video/webm">
            <source v-if="post.fields.video" :src="post.fields.video.fields.file.url" type="video/mp4">
          </video>
        </div>
        <RelatedItems :items="posts" :item="post" />
        <Comments class="u-marginBottomMedium" />
        <SharingLine :item="post"></SharingLine>
      </div>
    </div>
  </Container>
</template>

<script>
  import Container from '~/components/Container.vue'
  import Comments from '~/components/Comments.vue'
  import DynamicHeadline from '~/components/DynamicHeadline.vue'
  import Marked from '~/components/Marked.vue'
  import PrettyDate from '~/components/PrettyDate.vue'
  import RelatedItems from '~/components/RelatedItems.vue'
  import SharingLine from '~/components/SharingLine.vue'
  import {createPage, getHeadForPost} from '~/lib/basepage.js'

  export default createPage({
    async fetch ({ app, params, store, redirect }) {
      await app.contentful.getTil()

      store.commit('til/setActiveWithSlug', params.slug)

      if (!store.state.til.active) {
        return redirect('/404/')
      }
    },
    computed: {
      post () {
        return this.$store.state.til.active
      },
      posts () {
        return this.$store.state.til.list
      }
    },
    head () {
      return getHeadForPost(this.post)
    },
    components: {
      Container,
      Comments,
      DynamicHeadline,
      Marked,
      PrettyDate,
      RelatedItems,
      SharingLine
    }
  })
</script>

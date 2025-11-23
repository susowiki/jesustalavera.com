<template>
  <Container class="t-container" accessible-line-length="true">
    <PrettyDate slot="date" :date="post.fields.date" />
    <h1 slot="headline" tabindex="-1">
      {{ post.fields.title }}
    </h1>
    <span slot="readingTime">{{ post.fields.readingTime }} min read</span>
    <div class="c-tile">
      <div class="c-tile__container">
        <Marked :markdown="post.fields.body" />
        <div v-if="post.fields.isTmil">
          <ul class="o-list-reset u-marginBottomLarge">
            <li v-for="tilPost in post.fields.tilPosts" :key="tilPost.sys.id">
              <DynamicHeadline :id="tilPost.fields.title | idAlize" :level="2" class="p-name">
                {{ tilPost.fields.title }}
              </DynamicHeadline>
              <Marked :markdown="tilPost.fields.body" />
              <div v-if="(tilPost.fields.video || tilPost.fields.videoWebm)">
                <video
                  autoplay
                  muted
                  loop
                  playsinline
                  preload="metadata"
                  :class="{ 'is-mobile-video': tilPost.fields.isMobileVideo }"
                >
                  <source v-if="tilPost.fields.videoWebm" :src="tilPost.fields.videoWebm.fields.file.url" type="video/webm">
                  <source v-if="tilPost.fields.video" :src="tilPost.fields.video.fields.file.url" type="video/mp4">
                </video>
              </div>
            </li>
          </ul>
        </div>
        <div v-if="post.fields.tags && post.fields.tags.length" class="u-marginBottomMedium">
          <h3>Tags for this post</h3>
          <ul class="o-list-inline">
            <li v-for="tag in post.fields.tags" :key="tag">
              <nuxt-link class="o-tag u-marginRightSmall u-marginBottomSmall" :to="`/blog/tag/${tag}`">
                {{ tag }}
              </nuxt-link>
            </li>
          </ul>
        </div>
        <RelatedItems :items="posts" :item="post" />
        <Comments class="u-marginBottomMedium" />
        <SharingLine :item="post" />
      </div>
    </div>
  </Container>
</template>

<script>
import Container from '~/components/Container.vue'
import Comments from '~/components/Comments.vue'
import DynamicHeadline from '~/components/DynamicHeadline.vue'
import PrettyDate from '~/components/PrettyDate.vue'
import Marked from '~/components/Marked.vue'
import ItemPreview from '~/components/ItemPreview.vue'
import SharingLine from '~/components/SharingLine.vue'
import RelatedItems from '~/components/RelatedItems.vue'
import { createPage, getHeadForPost } from '~/lib/basepage.js'

export default createPage({
  async fetch ({ app, params, store, redirect }) {
    await app.contentful.getPosts()
    store.commit('posts/setActiveWithSlug', params.slug)

    if (!store.state.posts.active) {
      return redirect('/404/')
    }
  },
  computed: {
    post () {
      return this.$store.state.posts.active
    },
    posts () {
      return this.$store.state.posts.list
    },
    relatedPosts () {
      if (this.post) {
        return this.$store.state.posts.list.filter((item) => {
          return item.fields.tags.some((tag) => {
            return this.post.fields.tags.includes(
              tag
            )
          }) && item.sys.id !== this.post.sys.id
        }).slice(0, 3)
      }
    }
  },
  head () {
    return getHeadForPost(this.post)
  },
  components: {
    Container,
    Comments,
    DynamicHeadline,
    PrettyDate,
    Marked,
    SharingLine,
    RelatedItems,
    ItemPreview
  }
})
</script>

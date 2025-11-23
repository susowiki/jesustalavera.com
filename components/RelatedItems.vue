<template>
  <div v-if="relatedItems.length">
    <h3>Related posts</h3>
    <ul>
      <li v-for="related in relatedItems" :key="related.sys.id">
        <entry-link :entry="related" />
      </li>
    </ul>
  </div>
</template>

<script>
import EntryLink from '~/components/EntryLink.vue'

export default {
  components: {
    EntryLink
  },
  props: ['item', 'items'],
  computed: {
    relatedItems () {
      const currentItem = this.item

      return this.items.filter((item) => {
        return item.fields.tags && item.fields.tags.some((tag) => {
          return currentItem.fields.tags.includes(
            tag
          )
        }) && item.sys.id !== currentItem.sys.id
      }).slice(0, 3)
    }
  }
}
</script>

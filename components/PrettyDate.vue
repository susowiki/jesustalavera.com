<template>
  <time :datetime="date" :class="classes">{{ readableDate }}</time>
</template>
<script>
  export default {
    props: ['date', 'isSmall'],
    computed: {
      readableDate () {
        const [, year, month, day] = this.date.match(/(\d{4})-(\d{2})-(\d{2})/)
        return (new Date(year, +month - 1, day)).toDateString()
      },
      classes () {
        return {
          'c-prettyDate': true
        }
      }
    }
  }
</script>

<style lang="scss">
  .c-prettyDate {
    display: block;
    font-size: .875em;
    font-weight: 500;
  }
</style>

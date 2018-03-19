<template>
  <section :class="classes">
    <div>
      <header v-if="$slots.date || $slots.headline || $slots.readingTime" class="c-container__headline">
        <slot name="date"></slot>
        <slot name="headline"></slot>
        <slot name="readingTime"></slot>
      </header>
      <slot/>

      <div v-if="$slots.footerLine" class="c-container__footerLine">
        <slot name="footerLine"></slot>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    computed: {
      classes () {
        return {
          'c-container': true,
          'c-container--noPadding': this.noPadding,
          'c-container--smallPadding': this.smallPadding,
          'c-container--accessibleLineLength': this.accessibleLineLength,
          'c-container--fullWidth': this.fullWidth
        }
      }
    },
    props: ['noPadding', 'smallPadding', 'accessibleLineLength', 'fullWidth']
  }
</script>

<style lang="scss">
  .c-container {
    & > div {
      max-width: 65em;
      margin: 0 auto;
      padding: 1em;
    }
  }

  .c-container--noPadding > div {
    padding: 0;
  }

  .c-container--smallPadding > div {
    padding: 1em 2em;
  }

  .c-container--accessibleLineLength > div {
    max-width: 45em;
    max-width: 65ch;
  }

  .c-container--fullWidth > div {
    max-width: none;
  }

  .c-container--noPadding {
    padding: 0;
  }

  .c-container__headline {
    margin: 1em 0 2em;

    @media (min-width: 38em) {
      margin-top: 2em;
    }

    time, span {
      font-size: .875em;
      display: block;
      text-align: center;
    }

    span {
      margin-top: -.125em;
    }

    h1, h2 {
      margin: 0;
      font-family: 'Georgia', serif;
      font-size: 2em;
      letter-spacing: 1px;
      text-align: center;

      @media (min-width: 30em) {
        font-size: 2em;
      }
    }
  }


  .c-container__footerLine {
    text-align: center;
  }
</style>

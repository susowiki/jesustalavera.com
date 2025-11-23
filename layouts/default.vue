<template>
  <div :class="[ !isOnline ? 'is-offline' : '', 'u-overflowHidden' ]">
    <offline-notice v-if="!isOnline" />
    <navigation />
    <main>
      <nuxt />
    </main>
    <closing />
  </div>
</template>

<script>
import Closing from '~/components/Closing.vue'
import Navigation from '~/components/Navigation.vue'
import OfflineNotice from '~/components/OfflineNotice.vue'

export default {
  components: {
    Closing,
    Navigation,
    OfflineNotice
  },
  data () {
    return {
      isOnline: true
    }
  },
  mounted () {
    window.addEventListener('load', () => {
      window.addEventListener('online', () => { this.isOnline = true })
      window.addEventListener('offline', () => { this.isOnline = false })
    })
  }
}
</script>

<style lang="scss">
  @use '../assets/styles/objects/anchor.scss';
  @use '../assets/styles/objects/button.scss';
  @use '../assets/styles/objects/code.scss';
  @use '../assets/styles/objects/emoji.scss';
  @use '../assets/styles/objects/headline.scss';
  @use '../assets/styles/objects/grid.scss';
  @use '../assets/styles/objects/list.scss';
  @use '../assets/styles/objects/tile.scss';
  @use '../assets/styles/objects/tag.scss';
  @use '../assets/styles/transitions.scss';
  @use '../assets/styles/util.scss';

  body {
    --blue: #1d7cbb;
    --blue-dark: #1a79b8;
    --blue-bright: #3a99d8;
    --blue-brighter: #dbf1ff;
    --green: #10967a;
    --green-dark: #09795c;
    --green-bright: #39b97c;
    --red: #d73f34;
    --red-dark: #c52d22;
    --red-bright: #f55d52;
    --grey-bright: #f8f8f8;
    --grey: #eee;
    --grey-dark: #5a5a5a;
    --grey-very-dark: #3a3a3a;

    --c-highlight: var(--blue-dark);
    --c-text: var(--grey-dark);

    --shadow-tile: 0 .5em 3.5em #ddd;
    --shadow-btn: 0 .125em .375em #e1e1e1;
    --shadow-person: var(--shadow-tile);

    --navigation-break: 30em;

    margin: 0;
    padding: 0;

    font-size: 110%;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-weight: 400;
    line-height: 1.5;

    background: #fff;
    color: var(--c-text);

    padding-bottom: 5em;

    @media (min-width: 47em) {
      padding-top: 3.5em;
      padding-bottom: 0;
    }
  }

  h1, h2, h3 {
    font-weight: normal;
  }

  main {
    min-height: calc(100vh - 2.5em);
  }

  video {
    max-width: 100%;
    display: block;
    margin: 1em auto;
  }

  video.is-mobile-video {
    display: block;
    max-width: 20em;
    margin: 0 auto;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  a {
    color: currentColor;
    text-decoration: underline;
    text-decoration-skip: ink;

    &:hover {
      color: var(--c-highlight);
    }

    &:active {
      filter: brightness(.875)
    }
  }

  :focus {
    outline-style: dashed;
    outline-width: 3px;
    outline-offset: 2px;
    outline-color: var(--c-highlight);

    .js-focus-ring &:not(.focus-ring) {
      outline: none;
    }
  }

  img {
    max-width: 100%;
  }

  ::selection {
    background: var(--c-highlight);
    color: #fff;
  }

  .is-offline {
    filter: grayscale(100%);
  }

  .is-offline { --c-highlight: var(--grey-dark); }
</style>

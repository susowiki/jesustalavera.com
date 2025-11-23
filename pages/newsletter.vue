<template>
  <Container class="c-newsletter t-container">
    <div class="c-tile c-tile--bigHighlight u-heightAuto u-marginBottomMedium">
      <div class="c-tile__container">
        <nuxt-link v-if="$route.query.back" :to="$route.query.back" class="c-newsletter__close" aria-label="Go to preview page">
          <span aria-hidden="true">×</span>
        </nuxt-link>
        <svg viewBox="0 0 380 200" class="c-newsletter__letter" preserveAspectRatio="none"><rect fill="#F8F8F8" width="380" height="200" rx="5" /><path fill="#E7E7E7" d="M190 35l188 162H2z" /><path fill="#D2D2D2" d="M190 132L2 3h376z" /></svg>
        <h1 tabindex="-1" class="u-noMarginBottom u-marginTopMedium">
          Monthly digest
        </h1>
        <form style="text-align:center;" action="https://tinyletter.com/jesustalavera" method="post" target="popupwindow" onsubmit="window.open('https://tinyletter.com/stefanjudis', 'popupwindow', 'scrollbars=yes,width=800,height=600');return true">
          <p class="u-marginBottomLarge u-noMarginTop">
            <nuxt-link to="/blog/">
              New posts
            </nuxt-link> and <nuxt-link to="/today-i-learned">
              new learnings
            </nuxt-link> directly to your inbox.
          </p>
          <p class="u-marginBottomMedium">
            <label for="tlemail">Email address
              <input id="tlemail" type="email" name="email" placeholder="janedoe@example.com" required>
            </label>
          </p>
          <div class="c-tile__footer">
            <input type="hidden" value="1" name="embed">
            <button type="submit">
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
    <a href="https://tinyletter.com">powered by TinyLetter</a>
  </Container>
</template>

<script>
import Container from '~/components/Container.vue'
import { createPage } from '~/lib/basepage.js'

export default createPage({
  head () {
    return {
      title: 'Jesus Talavera Web Development - Newsletter',
      meta: [
        { hid: 'description', name: 'description', content: 'Subscribe to my monthly newsletter' }
      ]
    }
  },
  components: {
    Container
  }
})
</script>

<style lang="scss">
  .c-newsletter {
    text-align: center;

    @media (min-width: 38em) {
      position: absolute;
      top: 3.5em;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    &__close {
      position: absolute;
      top: 0;
      right: .25em;
      line-height: 1;

      font-size: 3em;
      text-decoration: none;
    }

    &__letter {
      position: absolute;
      width: 180px;
      height: auto;

      left: 50%;
      transform: translate(-50%,0 );
      box-shadow: 0 .0625em .125em #aaa;

      top: -3.5em;
    }

    input {
      display: block;
      width: 100%;

      line-height: 1.75;
      font-size: 1.5em;
      padding: .25em .5em;
      margin: .25em 0 1em;
      text-align: center;
      color: currentColor;

      border: none;
      border-bottom: 2px solid var(--c-text);
    }
  }
</style>
